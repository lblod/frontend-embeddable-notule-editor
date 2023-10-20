import vendor from './dist/assets/vendor.js';
import app from './dist/assets/@lblod/embeddable-say-editor-app.js';
import embeddable from './dist/assets/@lblod/embeddable-say-editor.js';
import editorCss from './dist/assets/@lblod/embeddable-say-editor.css';
import vendorCss from './dist/assets/vendor.css';

const srcDoc = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <!-- Requirements for the style -->
  </head>

  <!-- Next up, we put some tags in the body of our web page. We'll place the editor in those tags. -->

  <body>
  </body>
</html>
`;

/**
 * @typedef {Object} RenderOpts
 * @property {HTMLElement} element
 * @property {string?} title
 * @property {string} width
 * @property {string} height
 * @property {string[]?} plugins
 * @property {Record<string, any>} options
 */

/**
 * Renders the editor in an iframe and initializes it with the passed in plugins
 * and options. It waits for everything to initialize and returns the fully initialized
 * editor element, which has access to a controller and other methods (see docs)
 * @param {RenderOpts} options
 * @returns the enhanced editor element.
 */
export async function renderEditor({
  element,
  title,
  width,
  height,
  plugins = [],
  options = {},
}) {
  // build the iframe
  const editorFrame = document.createElement('iframe');
  editorFrame.setAttribute('srcdoc', srcDoc);
  editorFrame.setAttribute('width', width);
  editorFrame.setAttribute('height', height);
  editorFrame.setAttribute('title', title ?? 'say-editor');
  element.replaceChildren(editorFrame);

  // wait for the iframe to render
  await new Promise((resolve) =>
    editorFrame.addEventListener('load', resolve, { once: true })
  );
  const frameDoc = editorFrame.contentDocument.body;

  // append styles
  const vendorStyle = document.createElement('style');
  vendorStyle.textContent = vendorCss;
  const editorStyle = document.createElement('style');
  editorStyle.textContent = editorCss;
  frameDoc.append(editorStyle, vendorStyle);

  // append scripts
  const vendorScript = document.createElement('script');
  vendorScript.text = vendor;
  frameDoc.appendChild(vendorScript);

  const appScript = document.createElement('script');
  appScript.text = app;
  frameDoc.appendChild(appScript);

  const embeddableScript = document.createElement('script');
  embeddableScript.text = embeddable;
  frameDoc.appendChild(embeddableScript);

  // append container
  const editorContainer = document.createElement('div');
  editorContainer.setAttribute('id', 'my-editor');
  editorContainer.classList.add('demo-content');
  editorContainer.setAttribute(
    'prefix',
    'besluit: http://data.vlaanderen.be/ns/besluit#'
  );

  frameDoc.appendChild(editorContainer);

  // important here to use window.require so that webpack doesn't interfere
  const App = editorFrame.contentWindow
    .require('@lblod/embeddable-say-editor/app')
    .default.create({
      autoboot: false,
      name: '@lblod/embeddable-say-editor',
    });
  // Launch the editor
  await App.visit('/', { rootElement: editorContainer });
  // get the element
  const editorElement =
    editorContainer.getElementsByClassName('notule-editor')[0];
  // remove the now unnecessary javascript to avoid overloading the dom
  frameDoc.removeChild(vendorScript);
  frameDoc.removeChild(appScript);
  frameDoc.removeChild(embeddableScript);
  // initialize the editor
  await editorElement.initEditor(plugins, options);
  return editorElement;
}

/**
 * Webcomponent implementation of the embeddable editor.
 * To use, import this class and register it using `customElements.define`.
 * Then you can use the name you chose in your html as a custom tag.
 *
 * You'll need to initialize the editor by getting a reference to the custom element
 * and awaiting the `initEditor` method.
 */
export class SayWebComponent extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'closed' });

    const vendorStyle = document.createElement('style');
    vendorStyle.textContent = vendorCss;

    const editorStyle = document.createElement('style');
    editorStyle.textContent = editorCss;

    shadow.append(editorStyle, vendorStyle);

    const vendorScript = document.createElement('script');
    vendorScript.text = vendor;
    shadow.appendChild(vendorScript);

    const appScript = document.createElement('script');
    appScript.text = app;
    shadow.appendChild(appScript);

    const embeddableScript = document.createElement('script');
    embeddableScript.text = embeddable;
    shadow.appendChild(embeddableScript);

    const editorContainer = document.createElement('div');
    editorContainer.setAttribute('id', 'my-editor');
    editorContainer.classList.add('demo-content');
    editorContainer.setAttribute(
      'prefix',
      'besluit: http://data.vlaanderen.be/ns/besluit#'
    );

    shadow.appendChild(editorContainer);

    const App = window
      .require('@lblod/embeddable-say-editor/app')
      .default.create({
        autoboot: false,
        name: '@lblod/embeddable-say-editor',
      });
    // Launch the editor
    this.editorPromise = App.visit('/', { rootElement: editorContainer }).then(
      () => {
        return editorContainer.getElementsByClassName('notule-editor')[0];
      }
    );
    shadow.removeChild(vendorScript);
    shadow.removeChild(appScript);
    shadow.removeChild(embeddableScript);
  }
  /**
   * Initialize the editor and return it
   * @param {string[]?} plugins
   * @param {Record<string, any>?} options
   * @returns the editor element
   */
  async initEditor(plugins = [], options = {}) {
    const editor = await this.editorPromise;
    await editor.initEditor(plugins, options);
    return editor;
  }
}
