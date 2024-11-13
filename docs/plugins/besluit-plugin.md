# Besluit


## Setup

```javascript
const editor = await renderEditor({
  plugins: [/*...*/,"besluit"], 
  /*...*/
})

```

## Usage

#### Contextual mode

By default, this plugin scans for the existence of a `div` with 
a `typeof` attribute with a value containing the [Besluit](https://data.vlaanderen.be/ns/besluit/#Besluit) type. 
It also needs a  BesluitType, a `http://www.w3.org/ns/prov#generated` property, and a uri (which should be unique for each besluit).
If the selection is inside such a node, the plugin will provide some controls to work with 
[articles](https://data.vlaanderen.be/ns/besluit/#Artikel) inside a besluit.

These articles are always inserted in the `value` (annotated using the [prov](https://www.w3.org/ns/prov/) namespace) of the besluit, which means a node of that type 
must also be present.
a minimal besluit template which activates all of this plugin's features looks something like this:

``` html
<div typeof="http://data.vlaanderen.be/ns/besluit#Besluit https://data.vlaanderen.be/id/concept/BesluitType/4d8f678a-6fa4-4d5f-a2a1-80974e43bf34"
     property="http://www.w3.org/ns/prov#generated"
     resource="http://data.lblod.info/id/besluiten/1">
  <h5>Beslissing</h5>
  <div property="prov:value" datatype="xsd:string">
  </div>
</div>
```
But in practice a much more elaborate template is typically used, [see here](https://github.com/lblod/frontend-embeddable-notule-editor/blob/ab5a9619385f4b795a44a675fdc30b658bdcb344/public/test.html#L91) for an example.
#### Direct mode

Alternatively, you can directly configure the URI of the `besluit`. This is
useful in case you want to use multiple editors to edit the constituent parts of
a single decision, in which case you can't provide the required context inside
the document.

```javascript
const options = {
  besluit: {
    decisionUri: 'http://my-endpoint.be/id/besluiten/1234'
  }
}
```
In this mode, the plugin will not search in the way described above, and will
instead allow you to insert articles anywhere in the document, linking them to
the provided URI.
