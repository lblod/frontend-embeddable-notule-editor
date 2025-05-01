# Citation

## Setup

```javascript
const editor = await renderEditor({
  plugins: [/*...*/,"citation"],
  options: {
    // below is the default endpoint. If you have your own proxy for codex vlaanderen, this is where you'd change the config
    endpoint: 'https://codex.opendata.api.vlaanderen.be:8888/sparql',
    type: 'ranges',

    activeInNodeTypes(schema, _state) {
      // the root node of the document is the doc.
      return new Set([schema.nodes.doc]);
    }
    // The doc node is the main node and contains the whole document
    activeInRanges: (state) => [[0, state.doc.content.size]],
  }
  /*...*/
})

```

#### `endpoint`

where to fetch the citation data from (the codex)

#### `type`

this is `'nodes'` or `'ranges'` and specifies the type of check that can be specified.

- if type `'nodes'`:
  - `activeInNodeTypes`: given the Prosemirror schema and editor state, return a `Set` of nodetypes inside which the plugin should be active. Embeddable does not expose the schema directly, so some internal knowledge is needed to use this effectively.
- if type `'ranges'`:
  - `activeInRanges`: given the Prosemirror editor state, return an array of ranges for the plugin to be active in, for example `[[0,50], [70,100]]`

In the above example, both functions enable the plugin in the entire document,
which is also the default.

## Usage

This plugin adds the possibility to add references to specific legal documents. There are two ways to use this plugin:

### Insert Button

Click the button _citeeropschrijft toevoegen_ in the right sidebar.
This will open a modal where you can search for different types of legal documents, preview them and insert them if desired.

### Keyword detection

Type one of the trigger phrases, where `[words to search for]` will be filled in as a search term.

- [specification]**decreet** [words to search for] _(e.g. "gemeentedecreet wijziging")_
- **omzendbrief** [words to search for]
- **verdrag** [words to search for]
- **grondwetswijziging** [words to search for]
- **samenwerkingsakkoord** [words to search for]
- [specification]**wetboek** [words to search for]
- **protocol** [words to search for]
- **besluit van de vlaamse regering** [words to search for]
- **gecoordineerde wetten** [words to search for]
- [specification]**wet** [words to search for] _(e.g. "kieswet wijziging", or "grondwet")_
- **koninklijk besluit** [words to search for]
- **ministerieel besluit** [words to search for]
- **genummerd besluit** [words to search for]

After typing this trigger phrase, a card will appear in the right sidebar with the type and search term filled in. Click _Uitgebreid zoeken_ to pop open the same modal as shown in **A.**

![citation plugin examples](https://github.com/lblod/frontend-embeddable-notule-editor/assets/126079676/d3b1e511-412a-4cab-95ba-e3f92371f261)

#### rdfa-awareness

The citations inserted are rdfa-annotated, but as you can see above, this plugin uses a
different mechanism to determine where it is active.
