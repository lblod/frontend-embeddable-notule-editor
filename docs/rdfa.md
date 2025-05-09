### RDFA

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
