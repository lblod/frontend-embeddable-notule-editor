# Template Comments

## Setup

```javascript
const editor = await renderEditor({
  plugins: [, /*...*/ "template-comments"],
  /*...*/
});
```

## Usage

Adds buttons to the right sidebar for insertion, moving and removing of comment blocks, also called _toelichtings- of voorbeeldbepaling_. These blocks are meant to provide extra info to users filling in a document that do not need to be published when the document is complete.

It has a special RDFa type `ext:TemplateComment` with `ext` the prefix for `http://mu.semte.ch/vocabularies/ext/`, so this can be filtered out when a document is finished.

#### rdfa-awareness

The serialization format of the comment blocks uses rdfa.
