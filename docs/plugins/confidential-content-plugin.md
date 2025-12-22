# Confidential Content

## Setup

```javascript
const editor = await renderEditor({
  plugins: [, /*...*/ "confidentiality"],
  /*...*/
});
```

## Usage

Adds a toolbar button to redact content. This simply adds an RDFa annotation with a particular styling applied to it. It is up to any processor handling the document to actually remove the content.

#### rdfa-awareness

Adds the RDFa annotation `property` set to `http://mu.semte.ch/vocabularies/ext/redacted` for the redacted text.

##### Required prefixes

The output of this plugin makes use of the following prefixes, so ensure they are defined when
interpreting or publishing the documents produced:

- ext: `http://mu.semte.ch/vocabularies/ext/`
