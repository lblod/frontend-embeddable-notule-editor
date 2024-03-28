import { renderEditor } from '@lblod/embeddable-say-editor';
import { router } from './router';

const container = document.createElement('div');
document.body.appendChild(router);
document.body.appendChild(container);
const editor = await renderEditor({
  element: container,
  title: 'my editor', // optional, this will set the "title" attribute of the iframe
  width: '100%', // width attribute of the iframe
  height: '500px', // height attribute of the iframe
  plugins: [], // array of plugin names (see below)
  options: {
    table: {
      rowBackground: {
        odd: 'whitesmoke',
      },
    },
  }, // configuration object (see below)
});

// the editor is now initialized and can be used
editor.setHtmlContent('hello world');
