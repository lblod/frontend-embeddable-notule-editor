import { renderEditor } from '@lblod/embeddable-say-editor';
const container = document.getElementById('editorContainer');
const editor = await renderEditor({
  element: container,
  title: 'my editor', // optional, this will set the "title" attribute of the iframe
  width: '1000px', // width attribute of the iframe
  height: '500px', // height attribute of the iframe
  plugins: [], // array of plugin names (see below)
  options: {}, // configuration object (see below)
});

// the editor is now initialized and can be used
editor.setHtmlContent('hello world');
