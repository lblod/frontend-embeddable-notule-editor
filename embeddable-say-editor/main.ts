import { default as App } from './app/app.ts';
import type { EditorElement } from './shared-types/editor-element';
export type { EditorElement } from './shared-types/editor-element';
import type { RenderEditorOptions } from './shared-types/render-editor-options';

type SimpleElement = Parameters<App['visit']>[1]['rootElement'];

/**
 * Renders the editor in an iframe and initializes it with the passed in plugins
 * and options. It waits for everything to initialize and returns the fully initialized
 * editor element, which has access to a controller and other methods (see docs)
 */
export async function renderEditor({
  element,
  plugins = [],
  options = {},
  cssVariables = {},
}: RenderEditorOptions): Promise<EditorElement> {
  const app = App.create({
    autoboot: false,
    name: `@lblod/embeddable-say-editor`,
    location: 'none',
  });
  if (typeof element === 'string') {
    throw new Error();
  }

  // Launch the editor
  await app.visit('/', {
    // SimpleElement is a weird internal type, but just passing a normal html element works fine
    rootElement: element as unknown as SimpleElement | string,
    location: 'none',
  });
  // get the element
  const editorElement = element.querySelector(
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
