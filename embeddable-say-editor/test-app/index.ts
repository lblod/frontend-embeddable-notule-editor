import { renderEditor } from '../app/main.ts';
import { router } from './router.ts';
import './index.css';

const container = document.createElement('div');
container.className = 'editor-container';
document.body.appendChild(router);
document.body.appendChild(container);
const editor = await renderEditor({
  element: container,
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
    },
  }, // configuration object (see below)
});

// the editor is now initialized and can be used
editor.setHtmlContent('hello world');

// Facilitate development by making editor globally available
window.editor = editor;
