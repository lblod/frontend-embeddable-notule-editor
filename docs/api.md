## Editor API
The RDFa editor uses [the Prosemirror toolkit](https://prosemirror.net/) as a base. After the `editorElement.initEditor()` function is called and awaited, you will have access to the editor methods, including the controller with `editorElement.controller`. 
The `renderEditor` function does this for you, but you might want to call it again at a later point to re-initialize the editor.
This controller is an instance of the [SayController](https://github.com/lblod/ember-rdfa-editor/blob/master/addon/core/say-controller.ts) class of the [ember-rdfa-editor](https://github.com/lblod/ember-rdfa-editor). 

#### editorElement API
These are functions available from the editor element, which is the HTML element with the class `notule-editor`. 
- `async initEditor(arrayOfPluginNames: string[], configurationOptions)`: Initialize the editor by passing an array of plugin names that should be activated and an object that contains the configuration for the editor and its plugins. See [Managing Plugins](managing-plugins) for more info.
  :warning: **`initEditor` has to be called before accessing any other methods**.
- `enableEnvironmentBanner()`: enable the banner that shows the environment and versions of plugins used.
- `disableEnvironmentBanner()`: disable the banner.
- `controller`: provides direct access to a [SayController](https://github.com/lblod/ember-rdfa-editor/blob/master/addon/core/say-controller.ts) object. See [controller API](#controller-api).
- `setHtmlContent(content: string)`: set the HTML content inside the editor, overwriting all previous content.  
- `getHtmlContent()`: Get the HTML content of the editor. This might be different than custom content set via `setHtmlContent`, because of HTML parsing logic.
- `setLocaleToDutch()`: Set the locale (language used) of the editor to Dutch.
- `setLocaleToEnglish()`: Set the locale (language used) of the editor to English.
- `getLocale()`: returns the current locale of the editor. This will be the user's browser locale, the set local with `setLocale`, or `nl-BE`/`en-US`, the supported languages. See more at [Localization](/docs/configuration.md#localization).
- `setLocale(locale: string)`: set the current locale of the editor. Any locale is accepted, but will fallback to `nl-BE` if it is not `nl-BE` or `en-US` (the supported languages).

#### controller API
These methods are accessible via `editorElement.controller` and contain a way to directly interact with the Prosemirror logic underneath. This is an instance of [SayController](https://github.com/lblod/ember-rdfa-editor/blob/master/addon/core/say-controller.ts). Not all possible methods are shown.
- `focus()`: focus the window to the main editor view
- `setHtmlContent(content: string)`: sets the content of the main editor, overwriting all previous content.
- `htmlContent`: property containing the "serialized" html content of the editor. This is essentially the raw content without all the plugin bells and whistles, suitable for storing in a database. It can then be loaded with `setHtmlContent`.
- `doCommand(command: Command, { view = this.activeEditorView } = {})`: executes a [Prosemirror command](https://prosemirror.net/docs/guide/#commands) on the main view. A different view can be provided, which is mainly used internally to control nested editor instances (e.g. for the implementation of the variables)
- `checkCommand(command: Command, { view = this.activeEditorView } = {})`: checks whether a [Prosemirror command](https://prosemirror.net/docs/guide/#commands) may be executed. Often used together with `doCommand` to disable an action if it is not allowed.
- `isMarkActive(mark: MarkType)`: checks whether a mark is currently active. This is currently of not much use in this package, since we do not expose the MarkType interface yet. (But for the curious, this is what the toolbar buttons use to update their active state).
- `withTransaction(callback: (tr: Transaction) => Transaction | null, includeEmbeddedView = false)`: apply a [Prosemirror transaction](https://prosemirror.net/docs/ref/#state.Transaction) on the main view (or currently active embedded view). When you want to apply the transaction, the callback should return the transaction object.
- `mainEditorState`: the [editor state](https://prosemirror.net/docs/ref/#state.Editor_State) instance of the main editor
- `mainEditorView`: the [view](https://prosemirror.net/docs/ref/#view.EditorView) instance of the main editor

#### Interacting via Prosemirror Commands
A good way to add extra interaction to editor, besides the plugins and buttons provided, is via Prosemirror commands. Most of the plugins also use these commands. A command can be a [command from Prosemirror](https://prosemirror.net/docs/ref/#commands) or a custom command.
These commands might check certain conditions and run `withTransaction` to change something in the editor. A good run-through of how they work can be found on the [ember-rdfa-editor wiki](https://github.com/lblod/ember-rdfa-editor/wiki/Quickstart#commands).  
Do note that more advanced commands will need knowledge about the used schema and other internal information of Embeddable. You can access this (via the `mainEditorState`), but as this is not yet made public, the schema might change in the future.



