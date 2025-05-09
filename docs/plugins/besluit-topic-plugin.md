# Besluit-topic plugin

## Setup

```javascript
const editor = await renderEditor({
  plugins: [, /*...*/ "besluit-topic"],
  options: {
    besluitTopic: {
      endpoint: "https://data.vlaanderen.be/sparql",
      //direct mode, see below
      decisionUri: "https://example.org/decisions/1",
      widgetLocation: "toolbar", // possible values: 'toolbar', 'sidebar' (default: 'toolbar')
    },
  },
  /*...*/
});
```

## Usage

### Contextual mode

By default, the plugin looks for a surrounding `besluit` node (see [besluit plugin](/docs/plugins/besluit.md)).
The topic information will be attached to this node.

### Direct mode

If you aren't able to provide a `besluit` node, you can instead configure the
URI of the decision directly (see [setup](#setup)). RDFa triples will be
inserted in a hidden span in the output html, directly referring to the decision
URI you provided.

It is then possible to manage topics from the toolbar. The cursor should be inside a `besluit` node to see the button.

![besluit topics](/docs/images/besluit-topic.png)
