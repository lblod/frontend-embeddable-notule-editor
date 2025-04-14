import { default as App } from './app.ts';
import type { EditorElement } from './editor-element.ts';
export { setupPlugins } from './plugins/setup/setup-plugins.ts';
export type { EditorElement } from './editor-element.ts';
import type { RenderEditorOptions } from './render-editor-options.ts';

type SimpleElement = Parameters<App['visit']>[1]['rootElement'];

/**
 * Renders the editor in an iframe and initializes it with the passed in plugins
 * and options. It waits for everything to initialize and returns the fully initialized
 * editor element, which has access to a controller and other methods (see docs)
 */
export async function renderEditor(
  options: RenderEditorOptions,
): Promise<EditorElement> {
  return startApp(options);
}
export async function startApp(
  { element, plugins = [], options = {}, cssVariables }: RenderEditorOptions,
  customDocument: Document = document,
): Promise<EditorElement> {
  const app = App.create({
    autoboot: false,
    name: `@lblod/embeddable-say-editor`,
    location: 'none',
  });

  const container: Element = ensureElement(element, customDocument);

  // Launch the editor
  await app.visit('/', {
    // SimpleElement is a weird internal type, but just passing a normal html element works fine
    rootElement: container as unknown as SimpleElement,
    location: 'none',
    document: customDocument,
  });
  // get the element
  const editorElement = container.querySelector(
    '.notule-editor',
  ) as unknown as EditorElement;
  // initialize the editor
  await editorElement.initEditor(plugins, options);

  if (cssVariables && Object.keys(cssVariables).length > 0) {
    Object.entries(cssVariables).forEach(([key, value]) => {
      editorElement.style.setProperty(key, value);
    });
  }

  return editorElement;
}

export async function renderAsIframe(
  options: RenderEditorOptions,
): Promise<EditorElement> {
  const { element, width, height } = options;

  const containerId = '__embedded-say-container';
  const srcDoc = `
<!DOCTYPE html>
<html style="overflow: hidden;">
  <head>
    <meta charset="utf-8" />
    <!-- Requirements for the style -->
  </head>

  <!-- Next up, we put some tags in the body of our web page. We'll place the editor in those tags. -->

  <body>
  <div id="${containerId}" prefix="besluit: http://data.vlaanderen.be/ns/besluit"></div>
  </body>
</html>
`;
  const container = ensureElement(element);

  const iframe = document.createElement('iframe');
  iframe.setAttribute('height', height);
  iframe.setAttribute('width', width);
  iframe.setAttribute('srcdoc', srcDoc);
  iframe.style.overflow = 'auto';
  container.replaceChildren(iframe);

  await new Promise((resolve) =>
    iframe.addEventListener('load', resolve, { once: true }),
  );
  const editorElement = await startApp(
    {
      ...options,
      element: ensureElement(`#${containerId}`, iframe.contentDocument!) as HTMLElement,
    },
    iframe.contentDocument!,
  );
  return editorElement;
}
class Wrapper {
  el: Element;
  constructor(el: Element) {
    this.el = el;
  }
}
export function ensureElement(
  selectorOrElement: Element | string,
  customDocument: Document = document,
): Element {
  if (typeof selectorOrElement === 'string') {
    const foundElement = customDocument.querySelector(selectorOrElement);
    if (!foundElement) {
      throw new Error(
        `Element with selector ${selectorOrElement} not found. Are you sure it's a valid selector or dom element?`,
      );
    }
    return foundElement;
  } else {
    return selectorOrElement;
  }
}
