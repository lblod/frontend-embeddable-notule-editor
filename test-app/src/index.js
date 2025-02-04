import { renderEditor } from '@lblod/embeddable-say-editor';
import { router } from './router';

const container = document.createElement('div');
document.body.appendChild(router);
document.body.appendChild(container);
container.style.height = '90vh';
const editor = await renderEditor({
  element: container,
  title: 'my editor', // optional, this will set the "title" attribute of the iframe
  width: '100%', // width attribute of the iframe
  height: '100%', // height attribute of the iframe
  plugins: ['html-edit'], // array of plugin names (see below)
  options: {
    table: {
      rowBackground: {
        odd: 'whitesmoke',
      },
    },
    image: {
      allowBase64Images: true,
      pasteLimit: 2000000,
      onLimitReached: () => console.error('You can only paste up to 2 MB'),
    },
  }, // configuration object (see below)
});

// the editor is now initialized and can be used
editor.setHtmlContent('hello world');

// Facilitate development by making editor globally available
window.editor = editor;
