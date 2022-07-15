# frontend-embeddable-notule-editor

This application allows you to embed the RDFa editor in other applications without integrating with EmberJS directly. It will behave like any other HTML editor.

## Target usage

The idea is that you can have multiple HTML tags in which you can initialize an editor. We'll explain how it works and the process can be repeated if multiple editors are required. We need some HTML structure to start with, and then set-up the editor when everything has finished loading and rendering. We can also initialize the editor with some content or set it later via an event. Use something like the following HTML snippet as a base. *Note that the order of the JavaScript files matters.*

```html
<!DOCTYPE html>
<html>
  <head>
    <title>I have an editor in my document</title>

    <!-- Requirements for the style -->
    <link rel="stylesheet" href="assets/frontend-embeddable-notule-editor.css">
    <link rel="stylesheet" href="assets/vendor.css">

    <!-- Sources of the editor, THE ORDER MATTERS -->
    <script src="assets/vendor.js"></script>
    <script src="assets/frontend-embeddable-notule-editor-app.js"></script>
    <script src="assets/frontend-embeddable-notule-editor.js"></script>
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
  App.visit('/', { rootElement: '#my-editor' });
});
```

Once the editor is initialized, you can get the relevant document node and set its content. You can play with this by opening the developer console and executing the following, or use the following code in another script:

```javascript
const editorContainer = document.getElementById('my-editor');
const editorElement = editorContainer.getElementsByClassName('notule-editor')[0]
editorElement.setHtmlContent('<h1>Hello World</h1>');  // note: the content in the page changes
console.log(editorElement.getHtmlContent());           // note: there may be a difference in returned content
```

The contents may be slightly different between the two modes. As the editor evolves, the exporting functionality will be able to better filter out the relevant HTML and remove temporary styling.

You can also dynamically enable and disable plugins using the following methods:
```javascript
editorElement.enablePlugin('citaten-plugin'); // enabling the citaten-plugin
editorElement.disablePlugin('citaten-plugin'); // disabling the citaten-plugin
editorElement.setActivePlugins('citaten-plugin', 'besluit'); // sets citaten-plugin and besluit as the active plugins.
```

For a complete version of this example, checkout this file: [public/test.html](public/test.html). It also includes another button that inserts a template in the editor to showcase the plugins (see later to enable or disable the plugins).

## Building the sources

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

## Configuring the editor

The editor can be customized to best fit your application. In order to use the editor with these options, be sure to rebuild the sources.

### Adding/removing plugins

The editor can be configured by adding plugins. The enabled plugins are currently configured in the `app/components/simple-editor.js` file via the tracked `plugins` array at the top of the file. Install the desired plugins through `npm install`, and add their name to this array. You can usually derive the plugin's name from the name of the repository, a good starting point is this [search](https://github.com/search?q=org%3Alblod+ember-rdfa-editor-*-plugin) on the [lblod github organization](https://github.com/lblod/). Removing plugins works in the same way, but backwards: uninstall the plugins with `npm` and remove their reference from the plugins array in the described location above. You should be able to temporarily disable the plugin by just removing its reference, but a complete uninstall is always preferred to reduce package sizes.

### Localization

Localization of the editor is an ongoing effort, the main target usage of embeddable is currently Dutch speaking users. Some plugins, like the [citation plugin](https://github.com/lblod/ember-rdfa-editor-citaten-plugin/), use date pickers. The display format of these dates can be configured in the localization initializer.

### Styling

Styling the editor is covered in the [README](https://github.com/lblod/ember-rdfa-editor#customisation) of ember-rdfa-editor. This frontend supports SASS, customizations can be added to [app.scss](app/styles/app.scss)

**The following section is automatically generated. It can provide usefull information on how to get started on development on this editor and with EmberJS.**

# Development of frontend-embeddable-notule-editor

This README outlines the details of collaborating on this Ember application.
A short introduction of this app could easily go here.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with npm)
* [Ember CLI](https://ember-cli.com/)
* [Mozilla Firefox](https://www.mozilla.org/en-US/firefox/) or [Google Chrome](https://google.com/chrome/)

## Installation

* `git clone <repository-url>` this repository
* `cd frontend-embeddable-notule-editor`
* `npm install`

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200/test.html](http://localhost:4200/test.html).
* Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Linting

* `npm run lint:hbs`
* `npm run lint:js`
* `npm run lint:js -- --fix`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

* [ember.js](https://emberjs.com/)
* [ember-cli](https://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)

