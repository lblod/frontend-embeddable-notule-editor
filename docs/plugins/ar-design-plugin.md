# AR Design Plugin

Add annotated traffic signaling designs to an _aanvullend reglement_ based on data returned by the passed query function.

## Setup

```javascript
const editor = await renderEditor({
  plugins: [, /*...*/ "ar-design"],
  options: {
    arDesign: {
      designQuery: (pagination) => { /*...*/ },
      // optional
      decisionContext?: {
        decisionUri: "http://my-endpoint.be/id/besluiten/1234",
        // optional
        // see below for valid decision types in which the plugin will activate
        decisionType:
          "https://data.vlaanderen.be/id/concept/BesluitType/4d8f678a-6fa4-4d5f-a2a1-80974e43bf34",
      };
    },
  },
  /*...*/
});
```

#### `designQuery`

The signature of the designQuery function can be found [in the @lblod/say-ar-design-plugin documentation](https://github.com/lblod/ember-rdfa-editor/blob/master/packages/say-ar-design-plugin/README.md#ardesignquery-function)

#### `decisionUri`

If you pass this, the plugin will not scan for a `besluit` context.
This allows you to insert the articles which make up the AR design anywhere in your document.

#### `decisionType`

Along with the `decisionUri`, allows you to explicitly pass in the type of decision that is being worked on.
This is used to disable the plugin when the type is not in the whitelist of valid types.

## Usage

Clicking the _AR-ontwerp_ button in the sidebar will show a modal to filter and select an AR design.

<details>
<summary>Show image</summary>
![AR design overview](/docs/images/ar-design-plugin-overview)
</details>

Selecting a design will first show a preview with any applicable warnings.
The insert position amongst any existing articles can be chosen (if operating in contextual mode) and the design inserted.

<details>
<summary>Show image</summary>
![AR design preview](/docs/images/ar-design-plugin-preview)
</details>

### Contextual mode

Unless you pass the above `decisionUri` and `decisionType` options, this plugin will only activate in _besluiten_ with a certain rdf type.
You will also need to activate the [Besluit](#besluit) plugin to be able to create _besluiten_.

<details><summary>Exhaustive list of decision types in which this plugin will activate</summary>

https://data.vlaanderen.be/id/concept/BesluitType/4d8f678a-6fa4-4d5f-a2a1-80974e43bf34

https://data.vlaanderen.be/id/concept/BesluitType/7d95fd2e-3cc9-4a4c-a58e-0fbc408c2f9b

https://data.vlaanderen.be/id/concept/BesluitType/3bba9f10-faff-49a6-acaa-85af7f2199a3

https://data.vlaanderen.be/id/concept/BesluitType/0d1278af-b69e-4152-a418-ec5cfd1c7d0b

https://data.vlaanderen.be/id/concept/BesluitType/e8afe7c5-9640-4db8-8f74-3f023bec3241

https://data.vlaanderen.be/id/concept/BesluitType/256bd04a-b74b-4f2a-8f5d-14dda4765af9

https://data.vlaanderen.be/id/concept/BesluitType/67378dd0-5413-474b-8996-d992ef81637a

</details>

When the cursor is inside such a _besluit_, the button _AR-ontwerp_ will be enabled in the insert menu.

### Direct mode

If you pass the `decisionUri` option, the plugin will be active anywhere in the document.

### Required prefixes

The output of this plugin makes use of the following prefixes, so ensure they are defined when
interpreting or publishing the documents produced:

- dct: `http://purl.org/dc/terms/`
- ext: `http://mu.semte.ch/vocabularies/ext/`
- mobiliteit: `https://data.vlaanderen.be/ns/mobiliteit#`
- onderdeel: `https://wegenenverkeer.data.vlaanderen.be/ns/onderdeel#`
- prov: `http://www.w3.org/ns/prov#`
