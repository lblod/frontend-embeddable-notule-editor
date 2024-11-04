# Confidential Content

## Setup
```javascript
const editor = await renderEditor({
  plugins: [/*...*/,"confidentiality"], 
  /*...*/
})

```
## Usage

Adds a toolbar button to redact content. This simply adds an RDFa annotation with a particular styling applied to it. It is up to any processor handling the document to actually remove the content.

#### rdfa-awareness

Adds the RDFa annotation `property` set to `ext:redacted` for the redacted text.
