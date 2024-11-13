# Besluit-topic plugin

## Setup
```javascript
const editor = await renderEditor({
  plugins: [/*...*/,"besluit-topic"], 
  options: {
    besluitTopic: {
      endpoint: 'https://data.vlaanderen.be/sparql',
    }
  }
  /*...*/
})

```

## Usage

The `BesluitTopic` plugin depends on the [`besluit` plugin](/docs/plugins/besluit-plugin.md). It allows for inserting and editing topics of a besluit. By default, the available topics are fetched from the `https://data.vlaanderen.be/sparql` endpoint, but this can be configured via the options.


It is then possible to manage topics from the toolbar. The cursor should be inside a `besluit` node to see the button.

![besluit topics](/docs/images/besluit-topic.png)
