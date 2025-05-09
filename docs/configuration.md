# Configuring The Editor

Configuration is done by passing options to the `renderEditor` function:

```javascript
import { renderEditor } from "@lblod/embeddable-say-editor";

const container = document.getElementById("editorContainer");
const editor = await renderEditor({
  element: container,
  plugins: [], // array of plugin names (see below)
  options: {
    docContent: "block+",
    ui: {
      expandInsertMenu: false,
    },
    table: {
      inlineBorderStyle: { width: "1px", style: "solid", color: "#000" },
      rowBackgrounds: { even: "white", odd: "whitesmoke" },
    },
    // ... plugin configuration
  }, // configuration object (see below)
});
```

#### `element` (required)

The html element the editor will render in.

#### `width` and `height`

These options set the corresponding styling attributes on the editor element.

> [!WARNING]  
> The `width` and `height` options are deprecated and will be removed in a future release. Please use CSS style rules instead.

#### `growEditor`

When set to true, the editor will expand vertically in order to fit its content.
The height attribute will determine the minimum height the editor will start at.

> [!WARNING]  
> The `growEditor` option is deprecated and will be removed in a future release. 
> Please use CSS style rules instead. 
> To control the minimum height of the editor page/document, you may use the `--say-page-minimum-height` CSS variable

#### `plugins`

The plugins array will determine which plugins are enabled. Plugins are the main
way the editor is configured, and [deserve their own page](/docs/plugins.md)

#### `options`

There are some options you can pass to `options` in `renderEditor` that are not connected to a plugin.

- `docContent: 'block+'`: The property docContent specifies which nodes are allowed in the document. By default we allow one or more nodes of the group block, which includes most content. A group can be seen as a supertype that includes multiple types. For more info about this check the [Prosemirror docs](https://prosemirror.net/docs/guide/#schema.content_expressions).
  See `public/test.html` where `docContent` is specified to allow a [table of contents](/docs/plugins/table-of-contents-plugin.md) and [article-structure](/docs/plugins/article-structure-plugin.md) nodes in a specific order.
- `ui: { expandInsertMenu: false }`: Whether to automatically open the "insert" sidebar menu upon load.
- `table: { inlineBorderStyle: { width: '1px', style: 'solid', color: '#000' }`: Styles to be applied to table borders in the editor and when exporting HTML (e.g. by copying to the clipboard). If not specified, a thin border is shown in the editor but not exported.
- `table: { rowBackgrounds: { even: 'white', odd: 'whitesmoke' } }`: Configuration of row background colors. Allows for specifying alternating row colors. Rows use 1-based indexing.
- `image: { allowBase64Images: true}`: Will enable the pasting of base64 images embedded into the document, also enables a plugin to check if the paste size is too big. By default the paste limit will be 1MB and will throw an error to the console if surpassed.
- `image: { allowBase64Images: true, pasteLimit: 2000000, onLimitReached: () => console.error('You can only paste up to 2 MB')}`: You have 2 options to configure the paste size limit plugin, first the pasteLimit which will determine the size limit in bytes the user can
  paste, if this limit is surpassed the onLimitReached function will be called, which allows to show appropriate feedback to the user of your app.

Plugin configuration also goes here. See also the [plugin page](/docs/plugins.md) for details.

#### Enabling/disabling the environment banner

The environment banner is a visual indication of the environment you are currently using and which versions of Embeddable, the editor and editor-plugins are in use.

You can enable/disable the banner using the following methods: `enableEnvironmentBanner` and `disableEnvironmentBanner`.

## Localization

Localization of the editor is an ongoing effort, the main target usage of Embeddable is currently Dutch speaking users. The editor will use the user's browser language and supports English (en-US) and Dutch (nl-BE). If the user has a different language set, the editor will default to Dutch.

Some plugins, like the [citation plugin](/docs/plugins/citation-plugin.md), use date pickers. The display format of these dates are connected with the local.

The locale can be overwritten with `setLocaleToDutch()`, `setLocaleToEnglish()` and `setLocale(locale: string)`. You can call one of these functions after `initEditor()` to always use the same language for the editor, ignoring the user's browser language.
