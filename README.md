# frontend-embeddable-notule-editor

This application allows you to embed the RDFa editor in other applications without integrating with EmberJS directly. It will behave like any other HTML editor.

## Live demo
A [live demo](https://embeddable.gelinkt-notuleren.lblod.info) is available for easy testing. 
This environment is NOT suited for any production use, as it might change without notice and might be an outdated version. 
Any content entered here will not be saved.

## Using the embeddable editor in your app

### Using the prebuilt bundles

The prebuilt bundles are currently hosted on `https://embeddable.gelinkt-notuleren.lblod.info/`.
For information on how to include them in your html file, see the [target usage](#target-usage) section below.
This is considered a test environment and is subject to change, so it is not recommended to use it in production.

For **production**, use the prebuilt packages in the [Github releases](https://github.com/lblod/frontend-embeddable-notule-editor/releases/). At this point `vendor.css` is empty and is not added to the release. It can be ignored.

### Building the sources yourself

In order to build the JavaScript and CSS sources of this repository you will need `ember-cli` installed (more info at section *Development of frontend-embeddable-notule-editor* below), then execute the following:

```bash
git clone https://github.com/lblod/frontend-embeddable-notule-editor.git
cd frontend-embeddable-notule-editor
npm install
ember build -prod
```

In the 'dist' folder structure, two CSS files and three JavaScript files will have been generated. These are the files to use, as demonstrated in the example above. Note that the fingerprints of your files may vary.

```bash
dist
└── assets
    ├── frontend-embeddable-notule-editor-app.js
    ├── frontend-embeddable-notule-editor.css
    ├── frontend-embeddable-notule-editor.js
    ├── vendor.css
    └── vendor.js
```

## Target usage

The idea is that you can have multiple HTML tags in which you can initialize an editor. We'll explain how it works and the process can be repeated if multiple editors are required. We need some HTML structure to start with, and then set-up the editor when everything has finished loading and rendering. We can also initialize the editor with some content or set it later via an event. Use something like the following HTML snippet as a base. *Note that the order of the JavaScript files matters.*

In this section, we will assume you are using the prebuilt package. If you choose to build and host the bundles yourself,
simply link the corresponding files to the correct location for your setup.


For an interactive example, refer to this [jsfiddle](https://jsfiddle.net/0qd27rmg/).

```html
<!DOCTYPE html>
<html>
  <head>
    <title>I have an editor in my document</title>

    <!-- Requirements for the style -->
    <link rel="stylesheet" href="https://embeddable.gelinkt-notuleren.lblod.info/assets/frontend-embeddable-notule-editor.css">
    <link rel="stylesheet" href="https://embeddable.gelinkt-notuleren.lblod.info/assets/vendor.css">

    <!-- Sources of the editor, THE ORDER MATTERS -->
    <script src="https://embeddable.gelinkt-notuleren.lblod.info/assets/vendor.js"></script>
    <script src="https://embeddable.gelinkt-notuleren.lblod.info/assets/frontend-embeddable-notule-editor-app.js"></script>
    <script src="https://embeddable.gelinkt-notuleren.lblod.info/assets/frontend-embeddable-notule-editor.js"></script>
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
  let App = require('frontend-embeddable-notule-editor/app').default.create({
    autoboot: false,
    name: 'frontend-embeddable-notule-editor'
  });
  App.visit('/', { rootElement: '#my-editor' }).then(() => {
    const editorContainer = document.getElementById('my-editor');
    const editorElement =
    editorContainer.getElementsByClassName('notule-editor')[0];
    const arrayOfPluginNames = ['citation', 'rdfa-date'];
    const userConfigObject = {}
    editorElement.initEditor(arrayOfPluginNames, userConfigObject);
  });
})
```

Let's break down this code, the entire snippet is executed inside a load listener, that will only trigger when the document has loaded.

```javascript
let App = require('frontend-embeddable-notule-editor/app').default.create({
  autoboot: false,
  name: 'frontend-embeddable-notule-editor'
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
After rendering the editor we have to find the editorElement, which we  do with the above code. We get the editorContainer in which we rendered our app, and then find the editor div that has the `notule-editor` class.

```javascript
const arrayOfPluginNames = ['citation', 'rdfa-date'];
const userConfigObject = {}
editorElement.initEditor(arrayOfPluginNames, userConfigObject);
```
After finding the editor we create an array with the names of the plugins we want to use and an object with custom configuration if needed (See [configuring the editor](#configuring-the-editor) for more info about plugin names and configuration options). Finally, we initialize the editor with the `initEditor` function.

Once the editor is initialized, you can get the relevant document node and set its content. You can play with this by opening the developer console and executing the following, or use the following code in another script:

```javascript
const editorContainer = document.getElementById('my-editor');
const editorElement = editorContainer.getElementsByClassName('notule-editor')[0]
editorElement.setHtmlContent('<h1>Hello World</h1>');  // note: the content in the page changes
console.log(editorElement.getHtmlContent());           // note: there may be a difference in returned content
```

The contents may be slightly different between the two modes. As the editor evolves, the exporting functionality will be able to better filter out the relevant HTML and remove temporary styling.


You can enable/disable an environment banner using the following methods:
```javascript
editorElement.enableEnvironmentBanner('Testing');
editorElement.enableEnvironmentBanner(); // the default environment name is 'Test'
editorElement.disableEnvironmentBanner();
```

For a complete version of this example, checkout this file: [public/test.html](public/test.html). It also includes another button that inserts a template in the editor to showcase the plugins.

## Prosemirror

The rdfa editor uses [the prosemirror toolkit](https://prosemirror.net/) as a base. After the `editorElement.initEditor()` function is called you will have access to the editor controller with `editorElement.controller`. This is an instance of the [SayController](https://github.com/lblod/ember-rdfa-editor/blob/d4472d2e237256d30333cfcc20ce6eea7db241f2/addon/core/say-controller.ts) class of the [ember-rdfa-editor](https://github.com/lblod/ember-rdfa-editor)
It provides the following methods:
- `focus()`: method which allows one to focus the main editor view
- `setHtmlContent(content: string)`: sets the content of the main editor.
- htmlContent: getter property containing the "serialized" html content of the editor. This is essentially the raw content without all the plugin bells and whistles, suitable for storing in a database. It can then be loaded with the abovementioned `setHtmlContent`
- `doCommand(command: Command, { view = this.activeEditorView } = {})`: executes a Prosemirror command (https://prosemirror.net/docs/guide/#commands) on the main view. A different view can be provided, which is mainly used internally to control nested editor instances (e.g. for the implementation of the variables)
- `checkCommand(command: Command, { view = this.activeEditorView } = {})`: checks whether a Prosemirror command may be executed.
- `isMarkActive(mark: MarkType)`: checks whether a mark is currently active. This is currently of not much use in this package, since we do not expose the MarkType interface yet. (But for the curious, this is what the toolbar buttons use to update their active state)
- `withTransaction(callback: (tr: Transaction) => Transaction | null, includeEmbeddedView = false)`: method which allows you to apply a [transaction](https://prosemirror.net/docs/ref/#state.Transaction) on the main view (or currently active embedded view). When you want to apply the transaction, the callback should return the transaction object.
- mainEditorState: the [state](https://prosemirror.net/docs/ref/#state.Editor_State) instance of the main editor
- activeEditorState: the state instance of the active editor. This is usually the same as the mainEditorState, except when inside a nested instance (like in a variable field)
for typical use, the mainEditorState is the one you will most likely need

- mainEditorView: the [view](https://prosemirror.net/docs/ref/#view.EditorView) instance of the main editor

- activeEditorView: the view instance of the active editor. (see above for the distinction between the main and active editor)

- `setActiveView(view: RdfaEditorView)`: activate a specific view.

# Configuring the editor

The editor can be customized to best fit your application. 
* [Managing Plugins](#managing-plugins): A list of plugins you can enable, including explanation of how to use them
* [Environment banner](#enabling-disabling-the-environment-banner): how to enable/disable this banner
* [Localization](#localization): language options in the editor
* [styling](#styling)

## Managing Plugins
Embeddable ships with the following plugins available. 
This Readme contains all the important info and configuration for the plugins. For more technical and Ember-specific explanation of every plugin, you can check out the Readme of [lblod/ember-rdfa-editor-lblod-plugins](https://github.com/lblod/ember-rdfa-editor-lblod-plugins).

Every plugin can be enabled by passing its name to `activePlugins` array and its configuration to `pluginsConfig` with the initialization function `initEditor(activePlugins, pluginsConfig)`.
> :warning: The values shown for the config are default values used if you do not pass a config. If you pass **any** config for a plugin, it will not use any of these defaults and only use the config provided. Make sure to pass all required attributes in this case, even if you do not change them.

* [article-structure](#article-structure): Provides structures to better manage official documents, like titles, chapters, articles and paragraphs. It allows you to insert, move and delete them. It has two modes: `besluit` for besluit articles and `regulatoryStatement` for all other structures.
* [besluit](#besluit): Provides the correct rdfa-structure for constructing a decisions ("besluiten") and some basic validation if mandatory structures are present in the document.
* [citation](#citation): Search and insert references to citations (a legal resource/expression)
* [rdfa-date](#rdfa-date): Inserting and modify annotated date and times
* [roadsign-regulation](#roadsign-regulation): Insert roadsign regulation, based on the registry managed and provided by MOW (Mobiliteit en Openbare Werken)
* [table-of-contents](#table-of-contents): Show a table of contents with clickable sections defined by [article-structure](#article-structure)
* [variable](#rdfa-variables): Allows insertion and filling in of custom rdfa variables
* [formatting-toggle](#formatting-toggle): Allows to toggle the formatting marks with a button
* [rdfa-blocks-toggle](#rdfa-blocks-toggle): Allows to toggle the visual indications of the rdfa blocks with a button.
* [template-comments](template-comments): Allows insertion and editing of comment blocks to provide extra information to a user filling in a document. These are visually distinct units with a special RDFa type, which allows them to be filtered out during postprocessing.
##### General Config options
There are some options you can pass to `pluginsConfig` in `initEditor` that are not connected to a plugin.
- `docContent: 'block+'`: The property docContent specifies which nodes are allowed in the document. By default we allow one or more nodes of the supertype block, which includes most content. For more info about this check the [prosemirror docs](https://prosemirror.net/docs/guide/#schema.content_expressions). 
  See `public/test.html` where `docContent` is specified to allow [article-structure](#Article Structure) nodes in a specific order.

### Article Structure
This plugin is in charge of inserting and manipulating structures. There are insertion buttons in the insert menu of the right sidebar. The plugin has two modes, being `besluit` and `regulatoryStatement`. 

- `besluit` Mode
	- Only allowed to insert articles
- `regulatoryStatement` mode
	- Able to insert titles, chapters, sections... 
	- [table-of-contents](#Table of Contents) default config works with this mode.

After inserting a structure and selecting it, a card will show to move and delete the structure. These might be disabled if the action is not possible. 

Using the button "with content" will also delete everything included in the structure, instead of just the closest heading. 
![article structure card](https://imgur.com/2zkbNw3.png)
***
:heavy_plus_sign: Enable by adding `"article-structure"` to `activePlugins` array.

```javascript
// pass to pluginsConfig
articleStructure: {
  mode: 'besluit',
}
```
The options for mode are:
- 'besluit' (default): for manipulating articles in decisions. 
- 'regulatoryStatement': for manipulating chapters, sections, etc as regulatory statements.

### Besluit 
 :warning: The besluit plugin is incompatible with the `regulatoryStatement` mode of  [article-structure](#Article Structure).

This will add needed rdfa structures to create a besluit and add some validation. There is no direct interaction with the plugin. The validation will pop up in the sidebar. You can try this out by deleting the title and seeing the following pop up:
![besluit plugin](https://imgur.com/iwCudJy.png)
***
:heavy_plus_sign: Enable by adding `"besluit"` to `activePlugins` array.
No configuration is needed.

### Citation
Add the possibility to add references to specific legal documents. There are two ways to use this plugin

**A. Insert Button**
Click `insert reference` button in the right sidebar
This will open a modal where you can search for different type of legal documents, preview them and insert if desired.

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

After typing this trigger phrase, a card will shop up in the right sidebar with the type and search term filled in. Press `Advanced search` to pop open the same modal as shown in **A.** 
![citation plugin](https://imgur.com/oerd9rV.png)
***
:heavy_plus_sign: Enable by adding `"citation"` to `activePlugins` array.

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
		- `activeInNodeTypes`: given the prosemirror schema and editor state, return a `Set` of nodetypes inside which the plugin should be active. Embeddable does not expose the schema directly, so some internal knowledge is needed to use this effectively.
	- if type `'ranges'`: 
		- `activeInRanges`: given the prosemirror editor state, return an array of ranges for the plugin to be active in, for example `[[0,50], [70,100]]`

Both examples show how to activate the plugin for the *whole* document.

### RDFa Date
A simple plugin to insert and modify *semantic* dates and timestamps in an editor document. When added, an `insert date` button will be available in the right insert sidebar. When selecting a date, a card will show up at the same place to edit this date and choose a format for display. 
***
:heavy_plus_sign: Enable by adding `"rdfa-date"` to `activePlugins` array.
```javascript
// pass to pluginsConfig
date: {
  placeholder: {
    insertDate: 'Insert date',
    insertDateTime: 'Insert date and time',
  },
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
  allowCustomFormat: true,
},
```
- `placeholder`:
	- `insertDate`: placeholder to show when inserting a date that has no data yet.
	- `insertDateTime`: placeholder to show when inserting a datetime that has no data yet.
- `formats`: specify default formats to show for selection in the date card.
	- `label` (optional): The label shown to the user on the card. If not provided, the format is used instead e.g.: `dd/MMvariable/yyyy`
	- `key`: A **unique** identifier used for identification in the internal code. 
	- `dateFormat`: The date format used when this is selected.
	- `dateTimeFormat`: The datetime format to use when this is selected. Used when the user selected "Include time".
- `allowCustomFormat`: true/false, determines if the option to insert a fully custom format is available.

For more information about the syntax of defining date(time) formats check the documentation of the underlying library used [date-fns](https://date-fns.org/v2.29.3/docs/format).

### Roadsign Regulation
Add annnotated *mobiliteitsmaatregelen* from a specified registry, which will most likely be using the [public facing sparql endpoint](https://register.mobiliteit.vlaanderen.be/sparql) of [the roadsign registry](https://register.mobiliteit.vlaanderen.be). This data is maintained by experts at [MOW Vlaanderen](https://www.vlaanderen.be/departement-mobiliteit-en-openbare-werken).

:warning: This plugin will only activate in *besluiten* with a certain rdf type.
<details><summary>Exhaustive list of types</summary>
`https://data.vlaanderen.be/id/concept/BesluitType/4d8f678a-6fa4-4d5f-a2a1-80974e43bf34`

`https://data.vlaanderen.be/id/concept/BesluitType/7d95fd2e-3cc9-4a4c-a58e-0fbc408c2f9b`

`https://data.vlaanderen.be/id/concept/BesluitType/3bba9f10-faff-49a6-acaa-85af7f2199a3`

`https://data.vlaanderen.be/id/concept/BesluitType/0d1278af-b69e-4152-a418-ec5cfd1c7d0b`

`https://data.vlaanderen.be/id/concept/BesluitType/e8afe7c5-9640-4db8-8f74-3f023bec3241`

`https://data.vlaanderen.be/id/concept/BesluitType/256bd04a-b74b-4f2a-8f5d-14dda4765af9`

`https://data.vlaanderen.be/id/concept/BesluitType/67378dd0-5413-474b-8996-d992ef81637a`
</details>

When the cursor is inside such a *besluit*, the button `Voeg mobiliteitsmaatregel in` will appear under the insert menu. Clicking this will show a modal to filter and select roadsign regulation to insert.

![roadsign regulation modal](https://i.imgur.com/z7My8lm.png)
***
:heavy_plus_sign: Enable by adding `"roadsign-regulation"` to `activePlugins` array.
```javascript

// pass to pluginsConfig
roadsignRegulation: {
  endpoint: 'https://dev.roadsigns.lblod.info/sparql',
  imageBaseUrl: 'https://register.mobiliteit.vlaanderen.be/',
}
```
- `endpoint`: The sparql endpoint to fetch roadsigns. By default the development endpoint is used, so make sure to change this in production to your own registry or `https://register.mobiliteit.vlaanderen.be/sparql`.
- `imageBaseUrl`: In production, some old roadsigns of MOW miss a base URL for images, which will be prepend with this URL. If you provide your own registry with correct data, this will not be used.

### Table of Contents
Add a table of contents at the top of the document. It can be toggled with a button in the top toolbar. 

At this time it will only work well together with [article-structure plugin](#article-structure) in `regulatoryStatement` mode by using the default config.

:warning: For use in different situations, open an issue on this repo with the usecase, so we can help. The [prosemirror schema](https://prosemirror.net/docs/guide/#schema) that is used in the config is public-facing yet, so changing this is not trivial.
***
:heavy_plus_sign: Enable by adding `"table-of-contents"` to `activePlugins` array.
```javascript
// pass to pluginsConfig
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

**note**: this config is a *list*. Multiple `nodeHierarchy`s can be passed to let the table of contents work in multiple situation. The last matching hierarchy will be used.

### RDFa Variables
> :warning: [RDFa date plugin](rdfa-date) is required to be added when using this plugin.

These are placeholders that can be inserted in a document. A variable placeholder has a specific type (text, number, date, address or codelist), which changes the type of input it can receive. These placeholders can then be filled in by a user using the document.

Usually variables are inserted in an editor made to create *templates* (documents to be filled in), and only edited in an editor to fill in these *templates*. Via the config you can customize if you want to allow insertion and/or filling in a variable.
**Note**: a user will always be able to remove a variable, even if insertion is not allowed.

A variable can be inserted with the card shown in the right sidebar.
![insert variable card](https://imgur.com/9kSqgXc.png)

**Types of variables:**
- *text*: a variable that any text can be typed in
- *number*: pops up an input box that will validate constraints and includes a button to show the number in words. Constraints (min/max) can be set when inserting the variable.
- *date*: works just like the [RDFa date plugin](rdfa-date), where a user can input a date in specified formats.
- *location*: choose out of a list of location options, that can contain placeholders themselves. 
- *codelist*: when inserting, a specific codelist has to be chosen. This codelist is a list of values the user can choose from to fill in the variable. Either the user can select one (single selection) or multiple (multiple selection). 
- *address*: when inserted, the user can click this to get a modal for searching addresses from the Belgium address register. This can be used to insert existing addresses.
  **note**: when searching for submunicipalities, only the main municipality will show up in the search. However, when searching for a street, the correct zip-code will be used.
***
:heavy_plus_sign: Enable by adding `"variable"` to `activePlugins` array.
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
      }
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
	- `location`: config for location variable
		- `endpoint`: *fallback* endpoint for location variable if the variable is missing the endpoint in its RDFa. This will most likely be the same as the endpoint used for inserting.
		- `zonalLocationCodelistUri`: the URI to search for if the location variable is included in a zonal traffic measure.
		- `nonZonalLocationCodelistUri`: the URI to search for if the location variable is included in a non-zonal traffic measure.

### Formatting Toggle
This will add a button in the top toolbar `Show formatting marks`. This toggles the visibility of all formatting marks of the document such as break lines, paragraphs...
![document with formatting annotations](https://imgur.com/KTNxuBW.png)
***
:heavy_plus_sign: Enable by adding `"formatting-toggle"` to `activePlugins` array.
No configuration is needed.

### Rdfa Blocks Toggle
This will add a button in the top toolbar `Show annotations`. This toggles the visibility of RDFa information contained in the document. This is useful if you want to check for errors in the RDFa structure, or simply have a look at what data the editor is generating behind the scenes. As such, it is mostly useful for expert users.

![document with rdfa blocks visible](https://imgur.com/Asdu2aN.png)
***
:heavy_plus_sign: Enable by adding `"rdfa-blocks-toggle"` to `activePlugins` array.
No configuration is needed.

### Template Comments
Adds buttons to the right sidebar for insertion, moving and removing of comment blocks, also called *toelichtings- of voorbeeldbepaling*. These blocks are meant to provide extra info to users filling in a document that do not need to be published when the document is complete.

It has a special RDFa type `ext:TemplateComment` with `ext` the prefix for `http://mu.semte.ch/vocabularies/ext/`, so this can be filtered out when a document is finished.
***
:heavy_plus_sign: Enable by adding `"template-comments"` to `activePlugins` array.
No configuration is needed.
## Enabling/disabling the environment banner
The environment banner is a visual indication of the environment you are currently using and which versions of Embeddable, the editor and editor-plugins are in use.

You can enable/disable the banner using the following methods: `enableEnvironmentBanner` and `disableEnvironmentBanner`.

## Localization
Localization of the editor is an ongoing effort, the main target usage of Embeddable is currently Dutch speaking users. Some plugins, like the [citation plugin](https://github.com/lblod/ember-rdfa-editor-citaten-plugin/), use date pickers. The display format of these dates can be configured in the localization initializer.

## Styling
Styling the editor is covered in the [README](https://github.com/lblod/ember-rdfa-editor#customisation) of ember-rdfa-editor. This frontend supports SASS, customizations can be added to [app.scss](app/styles/app.scss)

# Development of frontend-embeddable-notule-editor

## Prerequisites
You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with npm)
* [Ember CLI](https://ember-cli.com/)
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
	- Add the files under `dist/assets` from a production build to the release in a .zip archive. 

### Developing
#### How it works
This repository includes [the editor](https://github.com/lblod/ember-rdfa-editor) and [editor plugins](https://github.com/lblod/ember-rdfa-editor-lblod-plugins) packaged together with Ember so the editor can be used in projects outside of Ember. This is mostly done by adjust the build process in `ember-cli-build.js`, by specifying the output filename and limiting the chunks to one file, for easy importing.

the consumer loads the editor in their own div element. This editor is fully defined in `app/components/simple-editor.js`, with all consumer-facing logic bound in `insertedInDom`. 
Because the editor is a black box for the consumer, it is not possible to load plugins the same way as in Ember for them. Instead, all plugins are loaded in ember code depending on a config the consumer passes. 

#### Important Develop notes 
- **Placement of UI elements is important**: Because the consumer can only choose to enable or disable a plugin, it is important to fully specify everything a plugin needs correctly (like buttons). Unlike with the dummy-app of ember-rdfa-editor, everything placed in the template will be visible, so give some thought about placement and CSS.
- **Update Readme**: Make sure to update the Readme for any changes to PRs (e.g. bumping the editor-plugins version). The Readme includes quite a lot of duplicate explanation as there can be subtle differences for using a plugin in the Embeddable. This means that updating the plugins might also mean having to update the readme to include some new changes.

#### Specific Embeddable Quirks
- **SVGs icons are inline**: `ember-svg-jar` is used in a custom `AuIcon` component to render SVGs inline. This is because linking to the icons via `@appUniversum` would create CORS errors. 

## Further Reading / Useful Links
* [ember.js](https://emberjs.com/)
* [ember-cli](https://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)

