import vendor from './dist/assets/vendor.js';
import app from './dist/assets/frontend-embeddable-notule-editor-app.js';
import embeddable from './dist/assets/frontend-embeddable-notule-editor.js';
import editorCss from './dist/assets/frontend-embeddable-notule-editor.css';
import vendorCss from './dist/assets/vendor.css';

const srcDoc = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <!-- Requirements for the style -->
    <script>${vendor}</script>
    <script>${app}</script>
    <script>${embeddable}</script>
    <style>${editorCss}</style>
    <style>${vendorCss}</style>
  </head>

  <!-- Next up, we put some tags in the body of our web page. We'll place the editor in those tags. -->

  <body>
    <div
      id="my-editor"
      class="demo-content"
      prefix="besluit: http://data.vlaanderen.be/ns/besluit#"
    ></div>
  <script>
  window.addEventListener('load', function () {
    const App = require('frontend-embeddable-notule-editor/app').default.create(
      {
        autoboot: false,
        name: 'frontend-embeddable-notule-editor',
      }
    );
    // Launch the editor
    App.visit('/', { rootElement: '#my-editor' }).then(function () {
      const editorContainer = document.getElementById('my-editor');
      const editorElement =
        editorContainer.getElementsByClassName('notule-editor')[0];
      window['__editorElement'] = editorElement;
      const doneEvent = new CustomEvent("iframe-done");
      window.dispatchEvent(doneEvent);
    });
   });
  </script>
  </body>
</html>
`;
export function renderEditor({ element, title, width, height, initFunc }) {
  const editorFrame = document.createElement('iframe');
  editorFrame.setAttribute('srcdoc', srcDoc);
  editorFrame.setAttribute('width', width);
  editorFrame.setAttribute('height', height);
  editorFrame.setAttribute('title', title ?? 'say-editor');
  element.replaceChildren(editorFrame);
  editorFrame.contentWindow.addEventListener("iframe-done", function () {
    initFunc(editorFrame.contentWindow['__editorElement'])
  });

}
