/* eslint-disable @typescript-eslint/ban-ts-comment */
import vendor from './ember-build/assets/vendor.js';
// @ts-ignore disable type-checking
import vendorBundle from './ember-build/assets/@lblod/embeddable-say-editor-vendor-bundle.js';
import app from './ember-build/assets/@lblod/embeddable-say-editor-app.js';
// @ts-ignore disable type-checking
import embeddable from './ember-build/assets/@lblod/embeddable-say-editor.js';
// @ts-ignore disable type-checking
import editorCss from './ember-build/assets/@lblod/embeddable-say-editor.css';
// @ts-ignore disable type-checking
import vendorCss from './ember-build/assets/vendor.css';
import type { RenderEditorOptions } from './shared-types/editor-options';
import type { EditorElement } from './shared-types/editor-element.js';

const srcDoc = `
<!DOCTYPE html>
<html style="overflow: hidden;">
  <head>
    <meta charset="utf-8" />
    <!-- Requirements for the style -->
  </head>

  <!-- Next up, we put some tags in the body of our web page. We'll place the editor in those tags. -->

  <body>
  </body>
</html>
`;

const EDITOR_CONTAINER_ID = 'my-editor';
// adjusting this won't actually change the toolbar height, this is just the constant
// value of the height as given by the editor css
const TOOLBAR_HEIGHT = '44px';

/**
 * Renders the editor in an iframe and initializes it with the passed in plugins
 * and options. It waits for everything to initialize and returns the fully initialized
 * editor element, which has access to a controller and other methods (see docs)
 */
export async function renderEditor({
  element,
  title,
  width,
  height,
  plugins = [],
  options = {},
  cssVariables = {},
  growEditor = false,
}: RenderEditorOptions): Promise<EditorElement> {
  // build the iframe
  const editorFrame = document.createElement('iframe');
  editorFrame.setAttribute('srcdoc', srcDoc);
  editorFrame.setAttribute('width', width);
  editorFrame.setAttribute('height', height);
  editorFrame.setAttribute('title', title ?? 'say-editor');
  editorFrame.style.overflow = 'auto';

  element.replaceChildren(editorFrame);

  // wait for the iframe to render
  await new Promise((resolve) =>
    editorFrame.addEventListener('load', resolve, { once: true }),
  );
  const frameDoc = editorFrame.contentDocument!.body;

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

  const vendorBundleScript = document.createElement('script');
  vendorBundleScript.text = vendorBundle;
  frameDoc.appendChild(vendorBundleScript);

  const appScript = document.createElement('script');
  appScript.text = app as string;
  frameDoc.appendChild(appScript);

  const embeddableScript = document.createElement('script');
  embeddableScript.text = embeddable as string;
  frameDoc.appendChild(embeddableScript);

  // append container
  const editorContainer = document.createElement('div');
  editorContainer.setAttribute('id', EDITOR_CONTAINER_ID);
  editorContainer.classList.add('demo-content');
  editorContainer.setAttribute(
    'prefix',
    'besluit: http://data.vlaanderen.be/ns/besluit#',
  );

  frameDoc.appendChild(editorContainer);

  // important here to use window.require so that webpack doesn't interfere

  const App = editorFrame
    .contentWindow! // @ts-expect-error disable typechecking
    .require('@lblod/embeddable-say-editor/app')
    .default.create({
      autoboot: false,
      name: '@lblod/embeddable-say-editor',
    });
  // Launch the editor
  await App.visit('/', { rootElement: `#${EDITOR_CONTAINER_ID}` });
  // get the element
  const editorElement = editorContainer.getElementsByClassName(
    'notule-editor',
  )[0] as unknown as EditorElement;
  // remove the now unnecessary javascript to avoid overloading the dom
  frameDoc.removeChild(vendorScript);
  frameDoc.removeChild(vendorBundleScript);
  frameDoc.removeChild(appScript);
  frameDoc.removeChild(embeddableScript);
  // initialize the editor
  await editorElement.initEditor(plugins, options);

  if (cssVariables && Object.keys(cssVariables).length > 0) {
    Object.entries(cssVariables).forEach(([key, value]) => {
      editorElement.style.setProperty(key, value);
    });
  }

  const editorPaper =
    editorContainer.getElementsByClassName('say-editor__paper');
  const sayContainer = editorContainer.getElementsByClassName(
    'say-container__main',
  )[0] as HTMLElement;
  sayContainer.style.overflow = 'auto';

  const editorPaperElement = editorPaper[0] as HTMLElement;

  if (growEditor) {
    // Set min heights to those passed
    const sayEditorElement = editorContainer.getElementsByClassName(
      'say-editor',
    )[0] as HTMLElement;
    let topPadding, bottomPadding;
    if (sayEditorElement.computedStyleMap) {
      const stylemap = sayEditorElement.computedStyleMap();
      topPadding = stylemap.get('padding-top');
      bottomPadding = stylemap.get('padding-bottom');
    } else {
      // firefox doesn't support the computedStyleMap yet, so we hardcode it
      topPadding = '24px';
      bottomPadding = '24px';
    }

    editorPaperElement.style.minHeight = `calc(${height} - ${TOOLBAR_HEIGHT} - ${topPadding} - ${bottomPadding})`;
    const sayContentElement = editorPaperElement.getElementsByClassName(
      'say-content',
    )[0] as HTMLElement;
    sayContentElement.style.minHeight = `calc(${height} - ${TOOLBAR_HEIGHT} - ${topPadding} - ${bottomPadding})`;

    // Resize to fit content
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { height: contentHeight } = entry.contentRect;
        editorFrame.style.height = `${contentHeight}px`;
      }
    });

    resizeObserver.observe(frameDoc);
  } else {
    const mainContainer = editorContainer.getElementsByClassName(
      'say-container__main',
    )[0] as HTMLElement;
    mainContainer.style.height = `calc(100vh - ${TOOLBAR_HEIGHT})`;
  }

  return editorElement;
}

const extraStyles = `
:host {
      --au-white:#ffffff;
      --au-gray-100:#f7f9fc;
      --au-gray-200:#e8ebee;
      --au-gray-300:#cfd5dd;
      --au-gray-400:#afb9c5;
      --au-gray-500:#8695a8;
      --au-gray-600:#7f8b99;
      --au-gray-700:#687483;
      --au-gray-800:#4f5864;
      --au-gray-900:#333332;
      --au-gray-1000:#000000;
      --au-blue-100:#f4f7fb;
      --au-blue-200:#e4ebf5;
      --au-blue-300:#b2ccef;
      --au-blue-500:#5990de;
      --au-blue-600:#3779d7;
      --au-blue-700:#0055cc;
      --au-blue-800:#004ab2;
      --au-blue-900:#003b8e;
      --au-yellow-100:#fff9d5;
      --au-yellow-200:#fff29b;
      --au-yellow-300:#ffe615;
      --au-yellow-400:#ffc515;
      --au-yellow-600:#7f6e3b;
      --au-yellow-900:#473d21;
      --au-orange-200:#fff9e8;
      --au-orange-300:#ffeeb9;
      --au-orange-400:#ffe49c;
      --au-orange-500:#ffa10a;
      --au-orange-600:#d07b06;
      --au-orange-700:#9f5804;
      --au-red-100:#fdf7f7;
      --au-red-200:#fbeded;
      --au-red-300:#f4c8c9;
      --au-red-400:#f1aeae;
      --au-red-500:#e77474;
      --au-red-600:#d2373c;
      --au-red-700:#aa2729;
      --au-red-900:#470000;
      --au-green-100:#f8fcf9;
      --au-green-200:#ecf6ee;
      --au-green-300:#c5e5cc;
      --au-green-400:#b1dcbb;
      --au-green-500:#009e47;
      --au-green-700:#007a37;
      --au-green-900:#323d08;
      --vl-white:#ffffff;
      --vl-grey-05:#f7f9fc;
      --vl-grey-10:#e8ebee;
      --vl-grey-20:#cfd5dd;
      --vl-grey-50:#8695a8;
      --vl-grey-70:#687483;
      --vl-grey-100:#333332;
      --vl-grey-110:#000000;
      --vl-yellow-100:#ffe615;
      --vl-blue-15:#e4ebf5;
      --vl-blue-30:#b2ccef;
      --vl-blue-65:#5990de;
      --vl-blue-100:#0055cc;
      --vl-blue-110:#003b8e;
      --vl-green-10:#ecf6ee;
      --vl-green-30:#c5e5cc;
      --vl-green-40:#b1dcbb;
      --vl-green-100:#009e47;
      --vl-green-130:#007a37;
      --vl-red-10:#fbeded;
      --vl-red-30:#f4c8c9;
      --vl-red-40:#f1aeae;
      --vl-red-100:#d2373c;
      --vl-red-130:#aa2729;
      --vl-orange-10:#fff9e8;
      --vl-orange-30:#ffeeb9;
      --vl-orange-40:#ffe49c;
      --vl-orange-100:#ffa10a;
      --vl-orange-110:#d07b06;
      --vl-orange-120:#9f5804;
      --vl-lime-100:#a3cc00;
      --vl-lime-120:#6f8b00;
      --vl-brick-100:#d53d5e;
      --vl-brick-120:#85273b;
      --vl-chocolate-100:#d26e25;
      --vl-chocolate-120:#904e1d;
      --vl-picton-100:#32b1e9;
      --vl-picton-120:#16465b;
      --au-page-bg:#ffffff;
      --au-select-text-color:#333332;
      --au-select-text-bg:#e4ebf5;
      --au-divider-color:#e8ebee;
      --au-outline-color:#5990de;
      --au-global-font-size:1.5rem;
      --au-global-line-height:1.5;
      --au-font:"flanders-sans",BlinkMacSystemFont,-apple-system,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
      --au-font-secondary:"flanders-serif";
      --au-font-tertiary:courier,monospace;
      --au-light:300;
      --au-regular:400;
      --au-medium:500;
      --au-bold:700;
      --au-base:15px;
      --au-para:18px;
      --au-para-small:16px;
      --au-lead:22px;
      --au-lead-medium:20px;
      --au-lead-small:18px;
      --au-small:14px;
      --au-tiny:13px;
      --au-h-functional-small:13px;
      --au-h-functional:15px;
      --au-h6:16px;
      --au-h5:18px;
      --au-h4:20px;
      --au-h3-small:22px;
      --au-h3:26px;
      --au-h2-small:26px;
      --au-h2:32px;
      --au-h1-small:30px;
      --au-h1-medium:40px;
      --au-h1:44px;
      --au-icon-size:13px;
      --au-icon-size-medium:16px;
      --au-icon-size-large:19px;
      --au-radius:3px;
      --au-border:2px;
      --au-outline-border:3px;
      --au-outline-border-style:solid;
      --au-outline:#5990de 3px solid;
      --au-outline-offset:2px;
      --au-outline-offset-negative:-3px;
      --au-duration:0.125s;
      --au-easing:cubic-bezier(0.19, 1, 0.22, 1);
      --au-transition:0.125s cubic-bezier(0.19, 1, 0.22, 1);
      --au-z-index-alpha:1;
      --au-z-index-beta:2;
      --au-z-index-gamma:3;
      --duet-color-primary:var(--au-blue-700);
      --duet-color-text:var(--au-gray-1000);
      --duet-color-text-active:var(--au-white);
      --duet-color-placeholder:var(--au-gray-700);
      --duet-color-button:var(--au-white);
      --duet-color-surface:var(--au-white);
      --duet-color-overlay:rgba(0, 0, 0, 0.3);
      --duet-font:var(--au-font);
      --duet-font-normal:400;
      --duet-font-bold:500;
      --duet-radius:3px;
      --duet-z-index:10
    }

    :host {
      font-family: var(--au-font);
      font-size: var(--au-global-font-size);
      line-height: var(--au-global-line-height);
      background-color: var(--au-page-bg);
      text-rendering: optimizeLegibility;
      -webkit-overflow-scrolling: touch;
    }
    :host * {
      box-sizing: border-box;
      font-family: var(--au-font);
    }
    :host *:before {
      box-sizing: border-box;
      font-family: var(--au-font);
    }
    :host *:after {
      box-sizing: border-box;
      font-family: var(--au-font);
    }

`;
/**
 * Webcomponent implementation of the embeddable editor.
 * To use, import this class and register it using `customElements.define`.
 * Then you can use the name you chose in your html as a custom tag.
 *
 * You'll need to initialize the editor by getting a reference to the custom element
 * and awaiting the `initEditor` method.
 */
export class SayWebComponent extends HTMLElement {
  declare editorPromise: Promise<EditorElement>;
  constructor() {
    super();
  }
  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });

    const vendorStyle = document.createElement('style');
    vendorStyle.textContent = vendorCss;

    const editorStyle = document.createElement('style');
    editorStyle.textContent = editorCss;

    const extraStyle = document.createElement('style');
    extraStyle.textContent = extraStyles;

    shadow.append(editorStyle, vendorStyle, extraStyle);

    const vendorScript = document.createElement('script');
    vendorScript.text = vendor;
    shadow.appendChild(vendorScript);

    const appScript = document.createElement('script');
    appScript.text = app as string;
    shadow.appendChild(appScript);

    const embeddableScript = document.createElement('script');
    embeddableScript.text = embeddable as string;
    shadow.appendChild(embeddableScript);

    const editorContainer = document.createElement('div');
    editorContainer.setAttribute('id', 'my-editor');
    editorContainer.classList.add('demo-content');
    editorContainer.setAttribute(
      'prefix',
      'besluit: http://data.vlaanderen.be/ns/besluit#',
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
      },
    );
    shadow.removeChild(vendorScript);
    shadow.removeChild(appScript);
    shadow.removeChild(embeddableScript);
  }
  /**
   * Initialize the editor and return it
   */
  async initEditor(plugins = [], options: EditorOptions = {}) {
    const editor = await this.editorPromise;
    await editor.initEditor(plugins, options);
    return editor;
  }
}
