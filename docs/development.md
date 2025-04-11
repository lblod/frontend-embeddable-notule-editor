# Development of @lblod/embeddable-say-editor

## Prerequisites

You will need the following things properly installed on your computer.

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/)
- [pnpm](https://pnpm.io/)
- [Ember CLI](https://cli.emberjs.com/release/)
- [Mozilla Firefox](https://www.mozilla.org/en-US/firefox/) or [Google Chrome](https://google.com/chrome/)

## Installation

- `git clone https://github.com/lblod/frontend-embeddable-notule-editor.git` this repository
- `cd frontend-embeddable-notule-editor`
- `pnpm install`

## Running

- `ember serve`
- Visit an example of the embeddable at [http://localhost:4200/test.html](http://localhost:4200/test.html).

### Linting

- `pnpm lint`
- `pnpm lint:fix`

### Building

- `ember build` (development)
- `ember build --environment production` (production)

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

the consumer loads the editor in their own div element. This editor is fully defined in `app/components/simple-editor.js`, with consumer-facing logic bound in `insertedInDom` and logic that needs a controller bound in `handleRdfaEditorInit`.
Because the editor is a black box for the consumer, it is not possible to load plugins the same way as in Ember for them. Instead, all plugins are loaded in ember code depending on a config the consumer passes.

The consumer will access the controller and other methods by accessing the `notule-editor` element. For developing, you can access this element easily in the console by searching for the div with `class="notule-editor"`, right-click and select click "use in console" (Firefox) or "store as global variable" (Chrome).

#### Important Develop notes

- **Placement of UI elements is important**: Because the consumer can only choose to enable or disable a plugin, it is important to fully specify everything a plugin needs correctly (like buttons). Unlike with the dummy-app of ember-rdfa-editor, everything placed in the template will be visible, so give some thought about placement and CSS.
- **Update Readme**: Make sure to update the Readme for any changes to PRs (e.g. bumping the editor-plugins version). The Readme includes quite a lot of duplicate explanation as there can be subtle differences for using a plugin in the Embeddable. This means that updating the plugins might also mean having to update the readme to include some new changes.

#### Specific Embeddable Quirks

- **SVGs icons are inline**: `ember-svg-jar` is used in a custom `AuIcon` component to render SVGs inline. This is because linking to the icons via `@appUniversum` would create CORS errors.

## Further Reading / Useful Links

- [ember.js](https://emberjs.com/)
- [ember-cli](https://cli.emberjs.com/release/)
- Development Browser Extensions
  - [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  - [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
