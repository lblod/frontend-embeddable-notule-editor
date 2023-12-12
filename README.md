# @lblod/embeddable-say-editor

This application allows you to embed the RDFa editor in other applications without integrating with EmberJS directly. It will behave like any other HTML editor.

The readme is structured as follows:

- [Live Demo](#live-demo): an online demo to test out the application and what is possible.
- [Using the editor yourself](#using-the-embeddable-editor-in-your-app): How to get the needed packages for use in your app.
- [Code Example](#basic-example-the-editor-in-an-html-file): An example which gives a basic showcase on how to initialize and use the editor.
- [Editor API](#editor-api): list of methods and properties to customize the editor and interact with it through code.
- [Configuring The Editor](#configuring-the-editor): ways to configure the editor during loading. The editor includes a list of plugins that can be enabled and configured as explained in [Managing Plugins](#managing-plugins). 

## Live Demo
A [live demo](https://embeddable.gelinkt-notuleren.lblod.info) is available for easy testing. 
This environment is NOT suited for any production use, as it might change without notice and might be an outdated version. 
Any content entered here will not be saved.

## Using the embeddable editor in your app

### With npm

`npm install @lblod/embeddable-say-editor`

We export a simple function to launch the editor in your app. It currently renders inside an 
iframe element. A WebComponent version is also in the works and should be available soon after we 
work out the kinks.

#### as an iframe


```javascript
import { renderEditor } from '@lblod/embeddable-say-editor';


// make a container element for the editor to render in in your html
// the id is not required, you just need to be able to get hold of this element 
// in whatever way you like

// note: the editor will replace all children of this element, so best to keep it empty.
// <div id="editorContainer"></div>

const container = document.getElementById('editorContainer');
const editor = await renderEditor({
  element: container,
  title: 'my editor', // optional, this will set the "title" attribute of the iframe
  width: '500px', // width attribute of the iframe
  height: '300px', // height attribute of the iframe
  plugins: [], // array of plugin names (see below)
  options: {} // configuration object (see below)
  })

// the editor is now initialized and can be used
editor.setHtmlContent('hello world');

```

### Using the prebuilt bundles

The prebuilt bundles are currently hosted on `https://embeddable.gelinkt-notuleren.lblod.info/`.
For information on how to include them in your html file, see the [Code Example](#basic-example-the-editor-in-an-html-file) section below.
This is considered a test environment and is subject to change, so it is not recommended to use it in production.

For **production**, use the prebuilt packages in the [Github releases](https://github.com/lblod/frontend-embeddable-notule-editor/releases/). At this point `vendor.css` is empty and can be ignored.

### Building the sources yourself

In order to build the JavaScript and CSS sources of this repository you will need `ember-cli` installed (more info at the [Development section](#development-of-@lblod/embeddable-say-editor)), then execute the following:

```bash
git clone https://github.com/lblod/frontend-embeddable-notule-editor.git
cd frontend-embeddable-notule-editor
npm install
ember build -prod
```

In the 'dist' folder structure, two CSS files and three JavaScript files will have been generated under assets. These are the files to use, as demonstrated in the [Code Example](#basic-example-the-editor-in-an-html-file). Note that the fingerprints of your files may vary. Other files in the dist folder can be ignored at this point, as they are not needed.

```bash
dist
└── assets
    ├── @lblod/embeddable-say-editor-app.js
    ├── @lblod/embeddable-say-editor.css
    ├── @lblod/embeddable-say-editor.js
    ├── vendor.css # currently empty and not needed
    └── vendor.js
```

## Basic Example: The editor in an HTML file 
The idea is that you can have multiple HTML tags in which you can initialize an editor. We'll explain how it works and the process can be repeated if multiple editors are required. We need some HTML structure to start with, and then set-up the editor when everything has finished loading and rendering. We can also initialize the editor with some content or set it later via an event. Use something like the following HTML snippet as a base.  
**Note**: the order of the JavaScript files matters.

In this section, we will assume you are using the prebuilt package. If you choose to build and host the bundles yourself, simply link the corresponding files to the correct location for your setup.

For an interactive example, refer to this [jsfiddle](https://jsfiddle.net/0qd27rmg/).

```html
<!DOCTYPE html>
<html>
  <head>
    <title>I have an editor in my document</title>

    <!-- Requirements for the style -->
    <link rel="stylesheet" href="https://embeddable.gelinkt-notuleren.lblod.info/assets/@lblod/embeddable-say-editor.css">
    <!-- Can be left out as `vendor.css` is currently empty -->
    <link rel="stylesheet" href="https://embeddable.gelinkt-notuleren.lblod.info/assets/vendor.css">

    <!-- Sources of the editor, THE ORDER MATTERS -->
    <script src="https://embeddable.gelinkt-notuleren.lblod.info/assets/vendor.js"></script>
    <script src="https://embeddable.gelinkt-notuleren.lblod.info/assets/@lblod/embeddable-say-editor-app.js"></script>
    <script src="https://embeddable.gelinkt-notuleren.lblod.info/assets/@lblod/embeddable-say-editor.js"></script>
  </head>
  <body>
    ...
  </body>
</html>
```

Next, put some tags in the body of the page. We'll place the editor in those tags.

```html
<body>
  <div id="my-editor"></div>
</body>
```

Lastly, we'll instantiate the editor. We wait until the DOM has loaded and then initialize the embedded EmberJS app with the editor inside. Put this script in the head of the HTML page with `<script>...</script>`, or use another method if desired (e.g. at the bottom of the HTML).

```javascript
window.addEventListener('load', function () {
  let App = require('@lblod/embeddable-say-editor/app').default.create({
    autoboot: false,
    name: '@lblod/embeddable-say-editor'
  });
  App.visit('/', { rootElement: '#my-editor' }).then(() => {
    const editorContainer = document.getElementById('my-editor');
    const editorElement =
    editorContainer.getElementsByClassName('notule-editor')[0];
    const arrayOfPluginNames = ['citation', 'variable'];
    const userConfigObject = {}
    editorElement.initEditor(arrayOfPluginNames, userConfigObject);
  });
})
```

Let's break down this code, the entire snippet is executed inside a load listener, that will only trigger when the document has loaded.

```javascript
let App = require('@lblod/embeddable-say-editor/app').default.create({
  autoboot: false,
  name: '@lblod/embeddable-say-editor'
});
```
These lines create the app that will be in charge of rendering our editor

```javascript
App.visit('/', { rootElement: '#my-editor' })
```
Then we visit the main route of the application and render inside our root element, which in this case will be the HTML div with id `my-editor`. This returns a Promise, which we can await or chain with `.then` as we do in the example code. After this promise is resolved, our editor will be rendered so we can start interacting with it.

```javascript
const editorContainer = document.getElementById('my-editor');
const editorElement = editorContainer.getElementsByClassName('notule-editor')[0];
```
After rendering the editor we can select the editorElement, which we do with the above code. We get the editorContainer in which we rendered our app, and then select the editor div that has the `notule-editor` class.

```javascript
const arrayOfPluginNames = ['citation', 'variable'];
const userConfigObject = {}
editorElement.initEditor(arrayOfPluginNames, userConfigObject);
```
After selecting the editor element, we create an array with the names of the plugins we want to use and an object with custom configuration if needed (See [configuring the editor](#configuring-the-editor) for more info about plugin names and configuration options). Finally, we initialize the editor with the `initEditor` function.

Once the editor is initialized, you can get the relevant document node and set its content. You can play with this by opening the developer console and executing the following, or use the following code in another script.
```javascript
// run after waiting for the editor to initialize 
const editorContainer = document.getElementById('my-editor');
const editorElement = editorContainer.getElementsByClassName('notule-editor')[0]
editorElement.setHtmlContent('<h1>Hello World</h1>'); // the content in the page changes
console.log(editorElement.getHtmlContent()); // there may be a difference in returned content
```

The contents may be slightly different between setting and getting the content. As the editor evolves, the exporting functionality will be able to better filter out the relevant HTML and remove temporary styling.


You can enable/disable an environment banner using the following methods:
```javascript
// run after waiting for the editor to initialize 
editorElement.enableEnvironmentBanner('Testing');
editorElement.enableEnvironmentBanner(); // the default environment name is 'Test'
editorElement.disableEnvironmentBanner();
```

For a complete version of this example, checkout this file: [public/test.html](public/test.html). It also includes another button that inserts a template in the editor to showcase the plugins.

## Editor API
The RDFa editor uses [the Prosemirror toolkit](https://prosemirror.net/) as a base. After the `editorElement.initEditor()` function is called you will have access to the editor methods, including the controller with `editorElement.controller`. This controller is an instance of the [SayController](https://github.com/lblod/ember-rdfa-editor/blob/d4472d2e237256d30333cfcc20ce6eea7db241f2/addon/core/say-controller.ts) class of the [ember-rdfa-editor](https://github.com/lblod/ember-rdfa-editor). 

#### editorElement API
These are functions available from the editor element, which is the HTML element with the class `notule-editor`. 
- `initEditor(arrayOfPluginNames: string[], userConfigObject)`: Initialize the editor by passing an array of plugin names that should be activated and an object that contains the configuration for the editor and its plugins. See [Managing Plugins](managing-plugins) for more info.  
  :warning: **`initEditor` has to be called before accessing any other methods**.
- `enableEnvironmentBanner()`: enable the banner that shows the environment and versions of plugins used.
- `disableEnvironmentBanner()`: disable the banner.
- `controller`: provides direct access to a [SayController](https://github.com/lblod/ember-rdfa-editor/blob/d4472d2e237256d30333cfcc20ce6eea7db241f2/addon/core/say-controller.ts) object. See [controller API](controller-api).
- `setHtmlContent(content: string)`: set the HTML content inside the editor, overwriting all previous content.  
- `getHtmlContent()`: Get the HTML content of the editor. This might be different than custom content set via `setHtmlContent`, because of HTML parsing logic.
- `setLocaleToDutch()`: Set the locale (language used) of the editor to Dutch.
- `setLocaleToEnglish()`: Set the locale (language used) of the editor to English.
- `getLocale()`: returns the current locale of the editor. This will be the user's browser locale, the set local with `setLocale`, or `nl-BE`/`en-US`, the supported languages. See more at [Localization](localization).
- `setLocale(locale: string)`: set the current locale of the editor. Any locale is accepted, but will fallback to `nl-BE` if it is not `nl-BE` or `en-US` (the supported languages).

#### controller API
These methods are accessible via `editorElement.controller` and contain a way to directly interact with the Prosemirror logic underneath. This is an instance of [SayController](https://github.com/lblod/ember-rdfa-editor/blob/d4472d2e237256d30333cfcc20ce6eea7db241f2/addon/core/say-controller.ts). Not all possible methods are shown.
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

# Configuring The Editor

The editor can be customized to best fit your application. 
* [Plugin System](#plugin-system): An overview of some of the general concepts behind our plugins.
* [Managing Plugins](#managing-plugins): A list of plugins you can enable, including explanation of how to use them
* [Environment banner](#enabling-disabling-the-environment-banner): how to enable/disable this banner
* [Localization](#localization): language options in the editor
* [Styling](#styling)
## Plugin system

The Say-editor is conceptualized as a core component which can be extended through a powerful plugin system.
This plugin system mirrors Prosemirror's own system, and in fact, the core itself is built using
a prosemirror instance with various always-enabled plugins, UI elements, and custom commands and utils.

Currently, due to portability concerns, this system is not directly exposed to the embeddable editor.
Instead, embeddable ships with a few pre-defined plugins which can be turned on or off, and have 
some of their configuration exposed. 

However, for using and configuring embeddable, it is still useful to understand some of the concepts 
that plugins use to create a smart editor.

### RDFA
The [rdfa](https://rdfa.info/) standard is a way to add data annotations to xml (and in particular, html) documents.
It uses linked data as its data modelling method. 
RDFA-annotated html is the one and only document format of the say-editor. Because it is a strict superset of html, 
this also means that the editor can be used as a plain WYSIWYG html editor. But the addition of rdfa-aware
tools and features is the editor's unique strength, and the reason for its existence.

Throughout the editor and its plugins, the rdfa-annotated html document is the single format which contains all information.
This means that any document metadata is also stored in this standard way, allowing easy interop with other
linked-data tools.

In fact, it can be interesting to paste the output of `getHtmlContent()` in the [reference rdfa parser](https://rdfa.info/play/) 
to see what data the parser can extract from the document.

(Note: it's important to use the `getHtmlContent()` method as opposed to copying the html from the browser inspector. We do not guarantee 
compliance with the standard in the live, editable, html.)

### RDFA-aware plugins

Most plugins use RDFA in some way to provide their features. 

In some cases, they simply use it as a way to store information they need to operate. 
For example: the [variable plugin](#rdfa-variables) will insert 
nodes in the document that are rdfa-annotated with certain properties 
that the plugin interacts with.
When loading a document from html, this is what the plugin will use to determine whether to render 
its special interactive "pills" for a particular node. 

In other cases, plugins use rdfa to determine whether they should be "active" (show their UI) or not.
This is usually done based on the idea of "context". 

Because html, and also the internal prosemirror datastructure, is a tree, there is an inherent hierarchy to the document. 
At the top there's a root element, usually a `div`, which we also call the `doc` node, which contains the entire document.
It also contains the selection, the blinking text cursor or blue region that you are surely familiar with.
This idea of the selection being "inside" a certain node is what drives the context-aware plugins.
Essentially, all they do is walk up the tree structure from the point of the cursor, and see if they encounter 
any nodes they're interested in.

This means we can have different plugins active depending on where you are in the document!

A third way a plugin might use rdfa, is by searching the document for the existence of a particular rdfa-annotated node,
and interacting with it (by adding content in that node, for example).

_Technical note: rather than interacting with html/rdfa directly, plugins interact with prosemirror's internal datastructure. 
This is why adjusting the page html in the inspector or with javascript will not give any meaningful results. The provided interfaces are the only supported ways to interact with the 
editor. In fact, the plugins each get their own controller, which is identical to the 
controller we expose on the embeddable element._


## Managing Plugins
Embeddable ships with the following plugins available. 
This Readme contains all the important info and configuration for the plugins. For more technical and Ember-specific explanations of every plugin, you can check out the Readme of [lblod/ember-rdfa-editor-lblod-plugins](https://github.com/lblod/ember-rdfa-editor-lblod-plugins).

Every plugin can be enabled by passing its name to the `arrayOfPluginNames` array and optionally its configuration to `userConfigObject` with the initialization function `initEditor(arrayOfPluginNames, userConfigObject)`.  
Any configuration value not provided will use the default value, which are shown in the example configs of the plugins.

* [article-structure](#article-structure): Provides structures like titles, chapters, articles and paragraphs, which can be used to better manage official documents like regulatory statements. It allows you to insert, move and delete them.
* [besluit](#besluit): Provides the correct rdfa-structure for constructing a decision (besluit) with ways to move and delete them.
* [citation](#citation): Search and insert references to citations (a legal resource/expression).
* [roadsign-regulation](#roadsign-regulation): Insert roadsign regulations, based on the registry managed and provided by MOW (Mobiliteit en Openbare Werken).
* [table-of-contents](#table-of-contents): Show a table of contents with clickable sections defined by [article-structure](#article-structure).
* [variable](#rdfa-variables): Allows insertion and filling in of custom rdfa variables.
* [formatting-toggle](#formatting-toggle): Allows to toggle the formatting marks with a button.
* [rdfa-blocks-toggle](#rdfa-blocks-toggle): Allows to toggle the visual indications of the rdfa blocks with a button.
* [template-comments](#template-comments): Allows insertion and editing of comment blocks to provide extra information to a user filling in a document. These are visually distinct units with a special RDFa type, which allows them to be filtered out during postprocessing.

##### General Config options
There are some options you can pass to `pluginsConfig` in `initEditor` that are not connected to a plugin.
- `docContent: 'block+'`: The property docContent specifies which nodes are allowed in the document. By default we allow one or more nodes of the group block, which includes most content. A group can be seen as a supertype that includes multiple types. For more info about this check the [Prosemirror docs](https://prosemirror.net/docs/guide/#schema.content_expressions).  
  See `public/test.html` where `docContent` is specified to allow a [table of contents](#table-of-contents) and [article-structure](#article-structure) nodes in a specific order.

### Article Structure
This plugin is in charge of inserting and manipulating structures. There are several insertion buttons in the right sidebar under *Document Structuren*.

After inserting a structure and selecting it, a card will show options to move and delete the structure. These might be disabled if the action is not possible. Using the button *en inhoud verwijderen* will also delete everything included in the structure, instead of just the closest heading. 

Anything part of the `block` group (almost everything) is allowed under these structures. However, the article structure nodes themselves are only allowed in a specific order. 

![article structure card and insert buttons example](https://github.com/lblod/frontend-embeddable-notule-editor/assets/126079676/9920df02-3e9c-43c2-bf7e-fdce182439b9)

***
:heavy_plus_sign: Enable by adding `"article-structure"` to the `arrayOfPluginNames` array.

These structures are not part of the `block` group. You will need to edit `docContent` to accept one of these structures as a base. The following config will allow a title, chapter or article to be added as the first node, or any general block. See [general config options](general-config-options) for more info.
```
// pass to pluginsConfig
docContent: '((title|block)+|(chapter|block)+|(article|block)+)'
```

#### rdfa-awareness

The structures the plugin inserts are rdfa-annotated according to a custom model. This model
is as of yet undocumented. For more information please contact the team.

### Besluit 

:heavy_plus_sign: Enable by adding `"besluit"` to the `arrayOfPluginNames` array.

No configuration is needed.

#### rdfa-awareness

This is a context-sensitive plugin which scans for the existence of a `div` with 
a `typeof` attribute with a value containing the [Besluit](https://data.vlaanderen.be/ns/besluit/#Besluit) type. 
It also needs a  BesluitType, a `prov:generated` property, and a uri (which should be unique for each besluit).
If the selection is inside such a node, the plugin will provide some controls to work with 
[articles](https://data.vlaanderen.be/ns/besluit/#Artikel) inside a besluit.

These articles are always inserted in the `value` (annotated using the [prov](https://www.w3.org/ns/prov/) namespace) of the besluit, which means a node of that type 
must also be present.
a minimal besluit template which activates all of this plugin's features looks something like this:

``` html
<div typeof="http://data.vlaanderen.be/ns/besluit#Besluit https://data.vlaanderen.be/id/concept/BesluitType/4d8f678a-6fa4-4d5f-a2a1-80974e43bf34"
     property="prov:generated"
     resource="http://data.lblod.info/id/besluiten/1">
  <h5>Beslissing</h5>
  <div property="prov:value" datatype="xsd:string">
  </div>
</div>
```
But in practice a much more elaborate template is typically used, [see here] (https://github.com/lblod/frontend-embeddable-notule-editor/blob/ab5a9619385f4b795a44a675fdc30b658bdcb344/public/test.html#L91) for an example.

### Citation
Add the possibility to add references to specific legal documents. There are two ways to use this plugin

**A. Insert Button**
Click the button *citeeropschrijft toevoegen* in the right sidebar.
This will open a modal where you can search for different types of legal documents, preview them and insert them if desired.

**B. Type Keyword**
Type one of the trigger phrases, where `[words to search for]` will be filled in as a search term.
* [specification]**decreet** [words to search for] *(e.g. "gemeentedecreet wijziging")*
* **omzendbrief** [words to search for]
* **verdrag** [words to search for]
* **grondwetswijziging** [words to search for]
* **samenwerkingsakkoord** [words to search for]
* [specification]**wetboek** [words to search for]
* **protocol** [words to search for]
* **besluit van de vlaamse regering** [words to search for]
* **gecoordineerde wetten** [words to search for]
* [specification]**wet** [words to search for] *(e.g. "kieswet wijziging", or "grondwet")*
* **koninklijk besluit** [words to search for]
* **ministerieel besluit** [words to search for]
* **genummerd besluit** [words to search for]

After typing this trigger phrase, a card will appear in the right sidebar with the type and search term filled in. Click *Uitgebreid zoeken* to pop open the same modal as shown in **A.**  

![citation plugin examples](https://github.com/lblod/frontend-embeddable-notule-editor/assets/126079676/d3b1e511-412a-4cab-95ba-e3f92371f261)

***
:heavy_plus_sign: Enable by adding `"citation"` to the `arrayOfPluginNames` array.

```javascript
// pass to pluginsConfig

// activate everywhere using type 'ranges'
citation: {
  endpoint: '/codex/sparql',
  type: 'ranges',
  // The doc node is the main node and contains the whole document
  activeInRanges: (state) => [[0, state.doc.content.size]],
},

// activate everywhere using type 'nodes'
citation: {
  endpoint: '/codex/sparql',
  type: 'nodes',
  activeInNodeTypes(schema, _state) {
    // the root node of the document is the doc.
    return new Set([schema.nodes.doc]);
  }
},
```
- `endpoint`: where to fetch the citation data from (the codex)
- `type`: this is `'nodes'` or `'ranges'` and specifies the type of check that can be specified. 
	- if type `'nodes'`:
		- `activeInNodeTypes`: given the Prosemirror schema and editor state, return a `Set` of nodetypes inside which the plugin should be active. Embeddable does not expose the schema directly, so some internal knowledge is needed to use this effectively.
	- if type `'ranges'`: 
		- `activeInRanges`: given the Prosemirror editor state, return an array of ranges for the plugin to be active in, for example `[[0,50], [70,100]]`

Both examples show how to activate the plugin for the *whole* document, which is also the default.

#### rdfa-awareness

The citations inserted are rdfa-annotated, but as you can see above, this plugin uses a 
different mechanism to determine where it is active.

### Roadsign Regulation
Add annnotated *mobiliteitsmaatregelen* from a specified registry, which will most likely be using the [public facing sparql endpoint](https://register.mobiliteit.vlaanderen.be/sparql) of [the roadsign registry](https://register.mobiliteit.vlaanderen.be). This data is maintained by experts at [MOW Vlaanderen](https://www.vlaanderen.be/departement-mobiliteit-en-openbare-werken).


***
:heavy_plus_sign: Enable by adding `"roadsign-regulation"` to the `arrayOfPluginNames` array.
```javascript

// pass to pluginsConfig
roadsignRegulation: {
  endpoint: 'https://dev.roadsigns.lblod.info/sparql',
  imageBaseUrl: 'https://register.mobiliteit.vlaanderen.be/',
}
```
- `endpoint`: The sparql endpoint to fetch roadsigns. By default the development endpoint is used, so make sure to change this in production to your own registry or `https://register.mobiliteit.vlaanderen.be/sparql`.
- `imageBaseUrl`: In production, some old roadsigns of MOW miss a base URL for images, which will be prepend with this URL. If you provide your own registry with correct data, this will not be used.


#### rdfa-awareness 

:warning: This plugin will only activate in *besluiten* with a certain rdf type. You will also need to activate the [Besluit](#besluit) plugin to be able to create *besluiten*.
<details><summary>Exhaustive list of decision types in which this plugin will activate</summary>

https://data.vlaanderen.be/id/concept/BesluitType/4d8f678a-6fa4-4d5f-a2a1-80974e43bf34

https://data.vlaanderen.be/id/concept/BesluitType/7d95fd2e-3cc9-4a4c-a58e-0fbc408c2f9b

https://data.vlaanderen.be/id/concept/BesluitType/3bba9f10-faff-49a6-acaa-85af7f2199a3

https://data.vlaanderen.be/id/concept/BesluitType/0d1278af-b69e-4152-a418-ec5cfd1c7d0b

https://data.vlaanderen.be/id/concept/BesluitType/e8afe7c5-9640-4db8-8f74-3f023bec3241

https://data.vlaanderen.be/id/concept/BesluitType/256bd04a-b74b-4f2a-8f5d-14dda4765af9

https://data.vlaanderen.be/id/concept/BesluitType/67378dd0-5413-474b-8996-d992ef81637a
</details>

When the cursor is inside such a *besluit*, the button *Voeg mobiliteitsmaatregel in* will appear under the insert menu. Clicking this will show a modal to filter and select roadsign regulation to insert.

![roadsign regulation modal](https://github.com/lblod/frontend-embeddable-notule-editor/assets/126079676/713d32bf-baea-4e90-9b1e-e6e5131c4d54)

### Table of Contents
Add a table of contents at the top of the document. It can be toggled with a button in the top toolbar. 

At this time it will only work well together with [article-structure plugin](#article-structure) by using the default config.

:warning: For use in different situations, open an issue on this repo with the usecase, so we can help. The [Prosemirror schema](https://prosemirror.net/docs/guide/#schema) that is used in the config is public-facing yet, so changing this is not trivial.
***
:heavy_plus_sign: Enable by adding `"table-of-contents"` to the `arrayOfPluginNames` array.
```javascript
// pass to pluginsConfig
docContent: /*adjust to include `table_of_contents?` as an accepted node*/ ,
tableOfContents: [
  {
    nodeHierarchy: [
      'title|chapter|section|subsection|article',
      'structure_header|article_header',
    ],
  },
],
```
- `nodeHierarchy`: a list of regex strings to specify the node structure. The default value works for the [article-structure plugin](#article-structure). 
  The first string are the main nodes that should be added to the structure.
  The strings afterwards are the sub-nodes of the main node that should be used to find the actual content to display in the table of contents.
- `docContent`: You will need to adjust `docContent` to accept `table_of_contents?`, as it is not part of the `block` group. See [general config options](general-config-options) for more info.

**note**: this config is a *list*. Multiple `nodeHierarchy`s can be passed to let the table of contents work in multiple situation. The last matching hierarchy will be used.

#### rdfa awareness

As mentioned above, this plugin will only work with structures from the `article-structure` plugin,
which are of course rdfa-annotated.

### RDFa Variables
These are placeholders that can be inserted in a document. A variable placeholder has a specific type (text, number, date, address or codelist), which changes the type of input it can receive. These placeholders can then be filled in by a user using the document.

Usually variables are inserted in an editor made to create *templates* (documents to be filled in), and only edited in an editor to fill in these *templates*. Via the config you can customize if you want to allow insertion and/or filling in a variable.  
**Note**: a user will always be able to remove a variable, even if insertion is not allowed.

A variable can be inserted with the card shown in the right sidebar.  
![insert variable card](https://github.com/lblod/frontend-embeddable-notule-editor/assets/126079676/7cf29af3-069e-4c45-b65d-3a898ac7b830)


**Types of variables:**
- *text*: a variable that any text can be typed in
- *number*: pops up an input box that will validate constraints and includes a button to show the number in words. Constraints (min/max) can be set when inserting the variable.
- *date*: insert date and time values using a datepicker. Supports a variety of formats. For more information about the syntax of defining date(time) formats check the documentation of the underlying library used [date-fns](https://date-fns.org/v2.29.3/docs/format).
- *location*: choose out of a list of location options, that can contain placeholders themselves. 
- *codelist*: when inserting, a specific codelist has to be chosen. This codelist is a list of values the user can choose from to fill in the variable. Either the user can select one (single selection) or multiple (multiple selection). 
- *address*: when inserted, the user can click this to get a modal for searching addresses from the Belgium address register. This can be used to insert existing addresses.  
  **note**: when searching for submunicipalities, only the main municipality will show up in the search. However, when searching for a street, the correct zip-code will be used.
***
:heavy_plus_sign: Enable by adding `"variable"` to the `arrayOfPluginNames` array.
```javascript
// pass to pluginsConfig
variable: {
  insert: {
      enable: true,
      codelistEndpoint: 'https://dev.roadsigns.lblod.info/sparql',
      codelistPublisher: null,
      locationEndpoint: 'https://dev.roadsigns.lblod.info'
    },
    edit: {
      enable: true,
      location: {
        endpoint: 'https://dev.roadsigns.lblod.info',
        zonalLocationCodelistUri:
          'http://lblod.data.gift/concept-schemes/62331E6900730AE7B99DF7EF',
        nonZonalLocationCodelistUri:
          'http://lblod.data.gift/concept-schemes/62331FDD00730AE7B99DF7F2',
      },
      date: {
        allowCustomFormat: true,
        formats: [
          {
            label: 'Short Date',
            key: 'short',
            dateFormat: 'dd/MM/yy',
            dateTimeFormat: 'dd/MM/yy HH:mm',
          },
          {
            label: 'Long Date',
            key: 'long',
            dateFormat: 'EEEE dd MMMM yyyy',
            dateTimeFormat: 'PPPPp',
          },
        ],
      },
    }
},
```
- `insert`: configuration for inserting a variable
  - `enable`: is inserting a variable allowed (removing is always possible!)
  - `codelistEndpoint`: the endpoint from which to fetch the codelists, which will be added to a codelist variable's RDFa. For production you'll likely want to use https://register.mobiliteit.vlaanderen.be/sparql`.
  - `codelistPublisher`: Limit the codelists to a specific publisher. *null* will allow all codelists.
  - `locationEndpoint`: the endpoint to fetch location options, which will be added to the location variable's RDFa and used as the endpoint when selecting a location variable. For production you'll likely want to use `https://register.mobiliteit.vlaanderen.be`.

- `edit`: configuration for editing an inserted variable
  - `enable`: is editing a variable allowed (removing is always possible!)
  - `location`: config for the location variable
    - `endpoint`: *fallback* endpoint for location variable if the variable is missing the endpoint in its RDFa. This will most likely be the same as the endpoint used for inserting.
    - `zonalLocationCodelistUri`: the URI to search for if the location variable is included in a zonal traffic measure.
    - `nonZonalLocationCodelistUri`: the URI to search for if the location variable is included in a non-zonal traffic measure.
  - `date`: config for the date variable
    - `formats`: specify default formats to show for selection in the date card.
      - `label` (optional): The label shown to the user on the card. If not provided, the format is used instead e.g.: `dd/MM/yyyy`
      - `key`: A **unique** identifier used for identification in the internal code. 
      - `dateFormat`: The date format used when this is selected.
      - `dateTimeFormat`: The datetime format to use when this is selected. Used when the user selects "Include time".
    - `allowCustomFormat`: true/false, determines if the option to insert a fully custom format is available.

#### rdfa-awareness

The serialization format of these variables uses rdfa to store its data.

### Formatting Toggle
This will add a button *Toon opmaakmarkeringen* in the top toolbar. This toggles the visibility of all formatting marks of the document such as break lines, paragraphs...  
![document with formatting annotations](https://github.com/lblod/frontend-embeddable-notule-editor/assets/126079676/bfc7ff1e-b8e3-4220-b80c-b5456d58208e)

***
:heavy_plus_sign: Enable by adding `"formatting-toggle"` to the `arrayOfPluginNames` array.
No configuration is needed.

#### rdfa-awareness

none.

### Rdfa Blocks Toggle
This will add a button *Toon annotaties* in the top toolbar. This toggles the visibility of RDFa information contained in the document. This is useful if you want to check for errors in the RDFa structure, or simply have a look at what data the editor is generating behind the scenes. As such, it is mostly useful for expert users.  

![document with rdfa blocks visible](https://github.com/lblod/frontend-embeddable-notule-editor/assets/126079676/279900d3-7798-43e5-a560-298d15cf937c)
***
:heavy_plus_sign: Enable by adding `"rdfa-blocks-toggle"` to the `arrayOfPluginNames` array.
No configuration is needed.

#### rdfa-awareness

Visualizes rdfa.

### Template Comments
Adds buttons to the right sidebar for insertion, moving and removing of comment blocks, also called *toelichtings- of voorbeeldbepaling*. These blocks are meant to provide extra info to users filling in a document that do not need to be published when the document is complete.

It has a special RDFa type `ext:TemplateComment` with `ext` the prefix for `http://mu.semte.ch/vocabularies/ext/`, so this can be filtered out when a document is finished.
***
:heavy_plus_sign: Enable by adding `"template-comments"` to the `arrayOfPluginNames` array.
No configuration is needed.
## Enabling/disabling the environment banner
The environment banner is a visual indication of the environment you are currently using and which versions of Embeddable, the editor and editor-plugins are in use.

You can enable/disable the banner using the following methods: `enableEnvironmentBanner` and `disableEnvironmentBanner`.

#### rdfa-awareness

The serialization format of the comment blocks uses rdfa.

## Localization
Localization of the editor is an ongoing effort, the main target usage of Embeddable is currently Dutch speaking users. The editor will use the user's browser language and supports English (en-US) and Dutch (nl-BE). If the user has a different language set, the editor will default to Dutch.

Some plugins, like the [citation plugin](#citation), use date pickers. The display format of these dates are connected with the local.

The locale can be overwritten with `setLocaleToDutch()`, `setLocaleToEnglish()` and `setLocale(locale: string)`. You can call one of these functions after `initEditor()` to always use the same language for the editor, ignoring the user's browser language.

## Styling

Styling the editor is supported via setting the CSS Variables used by the editor. You can do it in two ways:

* Setting CSS Variables of the editor at runtime.
* Target the editor in your own CSS and set CSS Variables of the editor in your own CSS.

### Setting CSS variables at runtime

#### When using the `npm` package

When initializing editor with `renderEditor` pass an object `cssVariables` with the variables you want to set.

```js
const cssVariables = {
  '--say-font-family': 'Comic Sans MS', 
}

const editor = await renderEditor({
  // all other config options
  cssVariables,
})
```

#### When using the prebuilt bundles

After calling the `initEditor` on the `editorElement` you can use the snippet to modify CSS variables used by the editor

```js
// initialization code
editorElement.initEditor(/* some config */);

// Example of calling the setProperty method on the editorElement
// Will set default font used by editor to Comic Sans MS
editorElement.style.setProperty('--say-font-family', 'Comic Sans MS');
```

### Setting CSS variables by targeting the editor in your own CSS

> [!IMPORTANT]
> This wont work if you are using the `npm` package and the `renderEditor` it provides, as the editor is isolated inside an `iframe`.

This method uses the CSS specificity to override the default CSS variables used by the editor.
You can target the editor by using the `notule-editor` class on the element that contains the editor.

Below example expects that the editor was attached to an element with id `my-editor`.

```css
#my-editor .notule-editor {
  --say-font-family: 'Comic Sans MS';
}
```

### Exposed CSS variables

* `--say-font-family`: controls the font family used by the editor.
* `--say-page-bg`: controls the background of the editor (not the background of the editor's page).
* `--say-font-size-text`: size of the basic text in the editor.
* `--say-font-size-h1`: size of the Heading 1 in the editor.
* `--say-font-size-h2`: size of the Heading 2 in the editor.
* `--say-font-size-h3`: size of the Heading 3 in the editor.
* `--say-font-size-h4`: size of the Heading 4 in the editor.
* `--say-font-size-h5`: size of the Heading 5 in the editor.
* `--say-font-size-h6`: size of the Heading 6 in the editor.

# Development of @lblod/embeddable-say-editor

## Prerequisites
You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with npm)
* [Ember CLI](https://cli.emberjs.com/release/)
* [Mozilla Firefox](https://www.mozilla.org/en-US/firefox/) or [Google Chrome](https://google.com/chrome/)

## Installation

* `git clone https://github.com/lblod/frontend-embeddable-notule-editor.git` this repository
* `cd frontend-embeddable-notule-editor`
* `npm install`

## Running
* `ember serve`
* Visit an example of the embeddable at [http://localhost:4200/test.html](http://localhost:4200/test.html).
### Linting
* `npm run lint:hbs`
* `npm run lint:js`
* `npm run lint:js -- --fix`

### Building
* `ember build` (development)
* `ember build --environment production` (production)
### Releasing
Take special care when releasing a new version of this.
- The changelog is automatically created using the PRs. 
- To avoid a connection to Github, build files are not automatically added to the release
	- Create a .zip archive with the important files from a production build. Remove any other files from dist and assets. Make sure the .zip release has the following structure:
		```bash
		dist
		└── assets
		    ├── @lblod/embeddable-say-editor-app.js
		    ├── @lblod/embeddable-say-editor.css
		    ├── @lblod/embeddable-say-editor.js
		    ├── vendor.css # currently empty, but added for consistency
		    └── vendor.js
		```

### Developing
#### How it works
This repository includes [the editor](https://github.com/lblod/ember-rdfa-editor) and [editor plugins](https://github.com/lblod/ember-rdfa-editor-lblod-plugins) packaged together with Ember so the editor can be used in projects outside of Ember. This is mostly done by adjust the build process in `ember-cli-build.js`, by specifying the output filename and limiting the chunks to one file, for easy importing.

the consumer loads the editor in their own div element. This editor is fully defined in `app/components/simple-editor.js`, with consumer-facing logic bound in `insertedInDom` and  logic that needs a controller bound in `handleRdfaEditorInit`. 
Because the editor is a black box for the consumer, it is not possible to load plugins the same way as in Ember for them. Instead, all plugins are loaded in ember code depending on a config the consumer passes. 

The consumer will access the controller and other methods by accessing the `notule-editor` element. For developing, you can access this element easily in the console by searching for the div with `class="notule-editor"`, right-click and select click "use in console" (Firefox) or "store as global variable" (Chrome).
#### Important Develop notes 
- **Placement of UI elements is important**: Because the consumer can only choose to enable or disable a plugin, it is important to fully specify everything a plugin needs correctly (like buttons). Unlike with the dummy-app of ember-rdfa-editor, everything placed in the template will be visible, so give some thought about placement and CSS.
- **Update Readme**: Make sure to update the Readme for any changes to PRs (e.g. bumping the editor-plugins version). The Readme includes quite a lot of duplicate explanation as there can be subtle differences for using a plugin in the Embeddable. This means that updating the plugins might also mean having to update the readme to include some new changes.

#### Specific Embeddable Quirks
- **SVGs icons are inline**: `ember-svg-jar` is used in a custom `AuIcon` component to render SVGs inline. This is because linking to the icons via `@appUniversum` would create CORS errors. 

## Further Reading / Useful Links
* [ember.js](https://emberjs.com/)
* [ember-cli](https://cli.emberjs.com/release/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)

