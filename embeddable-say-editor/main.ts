import { default as App } from './app/app.ts';
import type { EditorElement } from './shared-types/editor-element';
export type { EditorElement } from './shared-types/editor-element';
import type { RenderEditorOptions } from './shared-types/render-editor-options';
import type { UserPluginOptions } from './shared-types/embedded-plugin.js';

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
type SimpleElement = Parameters<App['visit']>[1]['rootElement'];

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
  const app = App.create({
    autoboot: false,
    name: '@lblod/embeddable-say-editor',
    location: 'none',
  });
  // Launch the editor
  await app.visit('/', {
    rootElement: element as SimpleElement | string,
    location: 'none',
  });
  // get the element
  const editorElement = document.getElementsByClassName(
    'notule-editor',
  )[0] as unknown as EditorElement;
  // initialize the editor
  await editorElement.initEditor(plugins, options);

  if (cssVariables && Object.keys(cssVariables).length > 0) {
    Object.entries(cssVariables).forEach(([key, value]) => {
      editorElement.style.setProperty(key, value);
    });
  }

  return editorElement;
}
