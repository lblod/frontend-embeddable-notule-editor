# @lblod/embeddable-say-editor

This application allows you to embed the [RDFa editor](https://github.com/lblod/ember-rdfa-editor) in other applications without integrating with EmberJS directly. It will behave like any other HTML editor.

##### Live Demo

A [live demo](https://embeddable.dev.gelinkt-notuleren.lblod.info) is available for easy testing.
This environment is NOT suited for any production use, as it might change without notice and might be an outdated version.
Any content entered here will not be saved.

## Docs

You can find the docs in **[the docs folder](docs/index.md)**, or keep reading
for a quickstart guide.

## Quickstart

### nodejs

`npm install @lblod/embeddable-say-editor`

We export a simple function to launch the editor in your app. 
By default, the editor is rendered inside a Shadow DOM element.

```javascript
import { renderEditor } from "@lblod/embeddable-say-editor";

// make a container element for the editor to render into
// the id is not required, you just need to be able to get hold of this element
// in whatever way you like

// note: the editor will replace all children of this element, so best to keep it empty.
// <div id="editorContainer"></div>

const container = document.getElementById("editorContainer");
const editor = await renderEditor({
  element: container,
  plugins: [], // array of plugin names (see below)
  options: {}, // configuration object (see below)
});

// the editor is now initialized and can be used
editor.setHtmlContent("hello world");
```

For a full explanation of all the options, see
[the configuration reference](docs/configuration.md)

### Static html

If you can't use an npm package directly in your app, the easiest way is using a CDN such as unpkg.com to use the version from npm directly in a `<script>` tag. For details on how to use start and customise the editor, see the [basic code example](#basic-example-the-editor-in-an-html-file) section below.

Unlike the example which does not specify the version, for production use, we recommend to use a fixed major version number to avoid breaking changes. The changelog can be seen [on Github](https://github.com/lblod/frontend-embeddable-notule-editor/releases), any update with breaking changes will have a higher version number. For example, to have the latest version of the v3 release, use the following import:

> [!NOTE]
> the version string can be any semver range or tag supported by unpkg.

```html
<script src="https://unpkg.com/@lblod/embeddable-say-editor@^3.2.1"></script>
```

In this section, we will assume you are using unpkg, but using another service that serves npm modules or building and hosting the bundles yourself should work just as well. Simply link the corresponding files to the correct location for your setup.

For an interactive example, refer to this [jsfiddle](https://jsfiddle.net/abeforfiddle/7zugt5nv/).

```html
<!DOCTYPE html>
<html>
  <head>
    <title>I have an editor in my document</title>
    <script src="https://unpkg.com/@lblod/embeddable-say-editor@^3.2.1"></script>
  </head>

  <body>
    <div id="my-editor"></div>
  </body>
</html>
```

Next, we'll instantiate the editor. We wait until the DOM has loaded and then render the editor inside it. Put this script in the head of the HTML page with `<script>...</script>`, or use another method if desired (e.g. at the bottom of the HTML, or in a separate js file you refer to in the html).

```javascript
window.addEventListener("load", async function () {
  const renderEditor = window["@lblod/embeddable-say-editor"].renderEditor;

  const editorContainer = document.getElementById("my-editor");
  const editorElement = await renderEditor({
    element: editorContainer,
    plugins: arrayOfPluginNames, // array of plugin names (see below)
    options: configurationOptions, // configuration object (see below)
  });
});
```

For a full explanation of all the options, see
[the configuration reference](docs/configuration.md)
