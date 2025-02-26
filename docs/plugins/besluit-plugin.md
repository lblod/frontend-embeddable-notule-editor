# Besluit


## Setup

```javascript
const editor = await renderEditor({
  plugins: [/*...*/,"besluit"], 
  options: {
    /*...*/
    // optional
    besluit: {
      // optional, see "Direct mode" below
      decisionUri: undefined,
      // optional, below is the default generator
      uriGenerator: () =>
      `http://data.lblod.info/artikels/${uuidv4()}`,
      // optional, default false
      fullLengthArticles: false,
      // optional, default true
      onlyArticleSpecialName: true,
    },
  }
  /*...*/
})

```

#### Options


- `decisionUri`: see [direct mode](#direct_mode) below
- `uriGenerator`: When the plugin generates an article, it needs to generate a URI. To do this, it will use this `uriGenerator` function.
As you can see above, the default generator will generate a URI with a base
namespace of `http://data.lblod.info/artikels/`.

This can be overridden by providing a custom generator function for URIs, for
example:

```javascript
const options = {
  besluit: {
    uriGenerator: () => `http://example.org/some/uri/${someUniqueIdGenerator()}`
  }
}
```
- `fullLengthArticles`: if true, all articles will have a header of `Artikel. x`. 
If set to false, all articles after the first one will be shortened to the `Art. x` form. 
(This second form follows the style of articles in legislative documents)
- `onlyArticleSpecialName`: when you set this to true, and if there is only one article in the document, the title of that article will be "Enig Artikel" instead of the usual Artikel 1.
(Once again, following the style of legislative documents)

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

#### RDFa generated


