# frontend-embeddable-notule-editor

This application allows you to ember the editor in other applications without integrating with EmberJS directly.  It will behave like any other HTML editor.

## Target usage

The idea is that you can have multiple tags in which you initialize the editor.  In order for this to work, we require some resources so the right content is available.  We set up the editor when everything has finished loading and rendering, and we can initialize it with some content.

    <html>
      <head>
        <title>I have two editors in my document</title>

        <!-- Requirements for the style -->
        <link href="//dij151upo6vad.cloudfront.net/2.latest/css/vlaanderen-ui.css" rel="stylesheet" type="text/css" />
        <link href="//dij151upo6vad.cloudfront.net/2.latest/css/vlaanderen-ui-corporate.css" rel="stylesheet" type="text/css" />
        <link href="//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.4.0/css/font-awesome.min.css" rel="stylesheet" />
        <link integrity="" rel="stylesheet" href="assets/vendor.css">
        <link integrity="" rel="stylesheet" href="assets/frontend-embeddable-notule-editor.css">

        <!-- Sources of the editor -->
        <script src="assets/vendor.js"></script>
        <script src="assets/frontend-embeddable-notule-editor.js"></script>
      </head>

Next up, we put some tags in the body of our web page.  We'll place the editor in those tags.

      <body>
        <p>Here is the first editor:</p>
        <div id="my-editor" style="border: 1px solid red;"></div>
        <p>Here is the second editor:</p>
        <div id="another-editor" style="border: 1px solid blue;"></div>

Lastly, we'll instantiate the two editors.  We wait until the dom has loaded using jQuery and we'd put this script in the head, but you can use another method if desired.

        <script>
          $(function() {
            let App = require("frontend-embeddable-notule-editor/app").default.create({
                autoboot: false,
                name: "frontend-embeddable-notule-editor"
            });

            let options = {
                rootElement: '#my-editor'
            };

            // Lanuch the first editor
            App.visit('/', options);


            let AnotherApp = require("frontend-embeddable-notule-editor/app").default.create({
                autoboot: false,
                name: "frontend-embeddable-notule-editor"
            });

            let otherOptions = {
                rootElement: '#another-editor'
            };

            // Launch the second editor
            AnotherApp.visit('/', otherOptions);

          });
        </script>
      </body>
    </html>

Once the editor is initialized, you can get the relevant document node and set its content.  You can play with this by opening the developer console and executing the following:

    editorElement = document.getElementById("another-editor").getElementsByTagName("notule-editor")[0]
    editorElement.setHtmlContent("<h1>Hello World</h1>");  // note the content in the page changing
    editorElement.getHtmlContent();  // note there may be a difference in returned content

The contents may be slightly different between the two modes.  As the editor evolves, the exporting functionality will be able to better filter out the relevant html and remove temporary styling.

## Building the sources

In order to build the javascript and css sources of this repository you will need ember-cli installed (more info at Development of frontend-embeddable-notule-editor), then execute the following:

    git clone https://github.com/lblod/frontend-embeddable-notule-editor.git
    cd frontend-embeddable-notule-editor
    npm install
    ember build -prod

In the 'dist' folder structure, two css files and two JavaScript files will have been generated.  These are the files to use in the snippet above.  Note that the fingerprints of your files may vary.  You should find the following files to use in the examples above:

- dist/assets/frontend-embeddable-notule-editor.css
- dist/assets/frontend-embeddable-notule-editor.js
- dist/assets/vendor.css
- dist/assets/vendor.js

## Configuring the editor

The editor can be configured by adding plugins.  The enabled plugins are currently conifgured in the `app/config/editor-profiles.js` file.  Install the desired plugins through npm install, and add their services to this file.  You can usually derive the plugin's name from the name of the repository.

In order to use the editor with these options, be sure to rebuild the sources.

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

If you go to any other page than test.html, the application will fall back on https://dev.gelinkt-notuleren.lblod.info/login .

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

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
