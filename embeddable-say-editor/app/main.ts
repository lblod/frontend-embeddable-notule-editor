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
  const { scopedCss = true } = options;
  if (scopedCss) {
    return renderInShadow(options);
  }
  return startApp(options);
}
async function startApp({
  element,
  plugins = [],
  options = {},
  width,
  height,
  growEditor,
  cssVariables,
}: RenderEditorOptions): Promise<EditorElement> {
  const app = App.create({
    autoboot: false,
    name: `@lblod/embeddable-say-editor`,
    location: 'none',
  });

  const container: HTMLElement = ensureElement(element as HTMLElement);
  container.style.overflow = 'auto';
  if (width) {
    container.style.maxWidth = width;
  }

  if (height) {
    container.style.minHeight = height;
    if (!growEditor) {
      container.style.maxHeight = height;
    }
  }

  // Launch the editor
  await app.visit('/', {
    // SimpleElement is a weird internal type, but just passing a normal html element works fine
    rootElement: container as unknown as SimpleElement,
    location: 'none',
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

function ensureElement(selectorOrElement: HTMLElement | string): HTMLElement {
  if (typeof selectorOrElement === 'string') {
    const foundElement = document.querySelector(selectorOrElement);
    if (!foundElement) {
      throw new Error(
        `Element with selector ${selectorOrElement} not found. Are you sure it's a valid selector or dom element?`,
      );
    }
    return foundElement as HTMLElement;
  } else {
    return selectorOrElement;
  }
}
async function renderInShadow(options: RenderEditorOptions) {
  const { element, width, height, growEditor } = options;
  const container = ensureElement(element as HTMLElement);
  container.attachShadow({ mode: 'open' });
  container.style.width = '100%';

  if (width) {
    container.style.maxWidth = width;
  }

  if (height) {
    container.style.minHeight = height;
    if (!growEditor) {
      container.style.maxHeight = height;
    }
  }
  const editorContainer = document.createElement('div');
  // This is a small hack needed for elements which have `position: fixed` to display correctly in the shadow-root (https://stackoverflow.com/questions/30271404/how-should-position-fixed-work-in-a-shadow-dom-root/70422489#70422489)
  editorContainer.style.transform = 'scale(1)';
  editorContainer.style.container = 'say-editor';
  editorContainer.style.containerType = 'size';
  const style = document.createElement('style');
  style.innerHTML = (await import('../app/styles/app.scss?inline')).default;

  container.shadowRoot!.appendChild(style);
  container.shadowRoot!.appendChild(editorContainer);
  return startApp({ ...options, element: editorContainer });
}
