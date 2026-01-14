## RDFA

The [rdfa](https://rdfa.info/) standard is a way to add data annotations to xml (and in particular, html) documents.
It uses linked data as its data modelling method.
RDFA-annotated html is the one and only document format of the say-editor. Because it is a strict superset of html,
this also means that the editor can be used as a plain WYSIWYG html editor. But the addition of rdfa-aware
tools and features is the editor's unique strength, and the reason for its existence.

Throughout the editor and its plugins, the rdfa-annotated html document is the single format which contains all information.
This means that any document metadata is also stored in this standard way, allowing easy interop with other
linked-data tools.

In fact, it can be interesting to paste the output of `getHtmlContent()` in the [reference rdfa parser](https://rdfa.info/play/)
to see what data the parser can extract from the document.

(Note: it's important to use the `getHtmlContent()` method as opposed to copying the html from the browser inspector. We do not guarantee
compliance with the standard in the live, editable, html.)

### Prefixes

The annotations contain many URIs with common roots and RDF formats normally include standard ways
to specify prefixes that can be used to reduce this repetition and give more human-readable output.
Adding a `prefix` attribute to a HTML element defines those prefixes for any children.

Unfortunately there is not currently an automated way for the editor to output the prefixes that are
needed for the output. For the output of the editor to be a valid RDFa document, it is necessary to
define certain prefixes, depending on which plugins are used. Details of these can be found in the
documentation of the individual plugins.

There are core prefixes that are used by the editor, even with no plugins active:
- xsd: `http://www.w3.org/2001/XMLSchema#`
- skos: `http://www.w3.org/2004/02/skos/core#`
- rdf: `http://www.w3.org/1999/02/22-rdf-syntax-ns#`

For example, these can be specified using the following HTML:

```
<div prefix="xsd: http://www.w3.org/2001/XMLSchema# skos: http://www.w3.org/2004/02/skos/core# rdf: http://www.w3.org/1999/02/22-rdf-syntax-ns#">
  <!-- Editor content -->
</div>
```

More details of how prefixes work are specified in the [RDFa specification](https://www.w3.org/TR/rdfa-primer/#multipleVocabs)
