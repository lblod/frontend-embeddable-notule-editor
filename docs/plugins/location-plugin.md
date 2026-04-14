# Location

## Setup

> [!WARNING]
> Unlike most plugins, the default configuration is not production ready
> and has to be adjusted.

```javascript
const editor = await renderEditor({
  plugins: [, /*...*/ "location"],
  options: {
    location: {
      defaultPointUriRoot: "https://example.net/id/geometrie/",
      defaultPlaceUriRoot: "https://example.net/id/plaats/",
      defaultAddressUriRoot: "https://example.net/id/adres/",
      defaultMunicipality: "Gent",
      locationTypes: ["address", "place", "area"],
      // both below options are optional, see below for explanation
      // you'll likely only need one or the other
      explicitSubjectToLinkTo: "https://my-namespace.net/decisions/12341234",
      subjectTypesToLinkTo: ["http://data.vlaanderen.be/ns/besluit#Besluit", "http://data.vlaanderen.be/ns/besluit#Artikel"]
    },
  },
  /*...*/
});
```

The plugin expects the following configuration options:

- `defaultPointUriRoot` (default: 'https://example.net/id/geometrie/')
- `defaultPlaceUriRoot` (default: 'https://example.net/id/plaats/)
- `defaultAddressUriRoot` (default: 'https://example.net/id/adres/')
- `defaultMunicipality` (default: none)
- `locationTypes` (default: `['address', 'place', 'area']`)
- `explicitSubjectToLinkTo` (default: none)
- `subjectTypesToLinkTo` (default: none)

This plugin needs the base URI options for annotating the
locations. Unfortunately we cannot provide a reasonable default for this,
because it is up to the application to manage its URI namespace.

If you are unsure which base to choose here, we might be able to help you figure
it out.

## Linking the locations to the outer document

While inserting a location on its own is already pretty useful, it becomes more valuable if we can connect it to the surrounding document, such that [rdfa](../rdfa.md) parsers can understand the connection.
There are two ways to do this. You can use both, but you'll likely only need one.

### Direct mode

#### `explicitSubjectToLinkTo`

This option allows you to specify an explicit uri to which all locations will be linked. This is useful in cases where you are building a document from multiple form fields, and as such do not have the full context available to the editor.
It works the same way as the `decisionUri` option in the [besluit plugin](./besluit-plugin.md) or the [besluit topic plugin](./besluit-topic-plugin.md). We did not call it `decisionUri` here because you might want to link to something other than a decision, for example an article. 

### Contextual mode

#### `subjectTypesToLinkTo`

This option allows for a more dynamic approach, where the editor will link the location to a relevant subject based on the place it's been inserted in the document. This is useful when the editor works on a more complete document,
for example in a case where you would use the [besluit plugin](./besluit-plugin.md) to handle the insertion of articles. This way, each location can link itself to the nearest surrounding article.

The editor will search upwards in the node hierarchy for the first node which has one of the specified RDF types.


## Usage

Adds a button in the right sidebar to allow the user to insert a location **in
flanders**.

There are currently 3 ways to define a location:

### Address

This is the default mode. Address lookups target the [flemish location services](https://www.vlaanderen.be/digitaal-vlaanderen/onze-oplossingen/gebouwen-en-adressenregister)

<details>
<summary>Show image</summary>

![img.png](/docs/images/location-plugin-address-mode.png)

</details>

When searching for the address, the map will update and show the selected
location:

<details>
<summary>Show image</summary>

![img.png](/docs/images/location-plugin-address-mode-filled.png)

</details>

To enable this mode, add the `address` locationOption to the `locationTypes` array.

### Point location

This is the second mode, accessible by selecting the corresponding tab in the
modal. It is meant for referring to locations which don't really have a sensible
address, such as playgrounds, parks, statues, etc.

The user is required to provide a name for the location, which will appear in
the text. The location will be annotated with its geographical coordinates.

<details>
<summary>Show image</summary>

![img.png](/docs/images/location-plugin-point-mode.png)

</details>

In this mode, the search feature only centers the map. The user can then click
on the map to choose a specific location.

To enable this mode, add the `place` locationOption to the `locationTypes` array.

### Area location

In this mode, the user can draw an arbitrary shape on the map. This can be used
to specify zones such as neighbourhoods, hospital campusses, or even entire
municipalities. The given name for the area will be inserted into the text,
which will be annotated with the coordinates of the shape's points.

<details>
<summary>Show image</summary>

![img.png](/docs/images/location-plugin-area-mode.png)

</details>

Click on the map to create a shape. Each subsequent point will connect in
a straight line to the previous point. To complete the shape, click on the first
point again. To delete the last point you added, click on it again.
To change an existing shape, simply start drawing a new one. When it is
completed, it will replace the old shape.

To enable this mode, add the `area` locationOption to the `locationTypes` array.

#### rdfa-awareness

This plugin outputs RDFa that conforms to the OSLO standard for [location based
information](https://github.com/Informatievlaanderen/OSLOthema-slimmeRaadpleegOmgeving).

##### Required prefixes

The output of this plugin makes use of the following prefixes, so ensure they are defined when
interpreting or publishing the documents produced:

- ext: `http://mu.semte.ch/vocabularies/ext/`
- adres: `https://data.vlaanderen.be/ns/adres#`
- dct: `http://purl.org/dc/terms/`
- locn: `http://www.w3.org/ns/locn#`
- rdfs: `http://www.w3.org/2000/01/rdf-schema#`
- geosparql: `http://www.opengis.net/ont/geosparql#`
- prov: `http://www.w3.org/ns/prov#`
