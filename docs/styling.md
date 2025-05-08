## Styling

Styling the editor is supported via setting the CSS Variables used by the editor. You can do it in two ways:

- Setting CSS Variables of the editor at runtime.
- Target the editor in your own CSS and set CSS Variables of the editor in your own CSS.

### Setting CSS variables at runtime

#### When using the `npm` package

When initializing editor with `renderEditor` pass an object `cssVariables` with the variables you want to set.

```js
const cssVariables = {
  "--say-font-family": "Comic Sans MS",
};

const editor = await renderEditor({
  // all other config options
  cssVariables,
});
```

#### When using the prebuilt bundles

After calling the `initEditor` on the `editorElement` you can use the snippet to modify CSS variables used by the editor

```js
// initialization code
editorElement.initEditor(/* some config */);

// Example of calling the setProperty method on the editorElement
// Will set default font used by editor to Comic Sans MS
editorElement.style.setProperty("--say-font-family", "Comic Sans MS");
```

### Setting CSS variables by targeting the editor in your own CSS

This method uses the CSS specificity to override the default CSS variables used by the editor.
You can target the editor by using the `notule-editor` class on the element that contains the editor.

Below example expects that the editor was attached to an element with id `my-editor`.

```css
#my-editor .notule-editor {
  --say-font-family: "Comic Sans MS";
}
```

### Exposed CSS variables

- `--say-font-family`: controls the font family used by the editor.
- `--say-page-bg`: controls the background of the editor (not the background of the editor's page).
- `--say-font-size-text`: size of the basic text in the editor.
- `--say-font-size-h1`: size of the Heading 1 in the editor.
- `--say-font-size-h2`: size of the Heading 2 in the editor.
- `--say-font-size-h3`: size of the Heading 3 in the editor.
- `--say-font-size-h4`: size of the Heading 4 in the editor.
- `--say-font-size-h5`: size of the Heading 5 in the editor.
- `--say-font-size-h6`: size of the Heading 6 in the editor.

- `--say-paragraph-spacing`: spacing between paragraphs, default is 12px.
- `--say-editor-line-height`: line height of the editor, default is 1.5.
