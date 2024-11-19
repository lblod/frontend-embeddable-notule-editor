# Roadsign Regulation

Add annotated *mobiliteitsmaatregelen* from a specified registry, which will most likely be using the [public facing sparql endpoint](https://register.mobiliteit.vlaanderen.be/sparql) of [the roadsign registry](https://register.mobiliteit.vlaanderen.be). This data is maintained by experts at [MOW Vlaanderen](https://www.vlaanderen.be/departement-mobiliteit-en-openbare-werken).

## Setup

```javascript
const editor = await renderEditor({
  plugins: [/*...*/,"roadsign-regulation"], 
  options: {
    roadsignRegulation: {
      endpoint: 'https://dev.roadsigns.lblod.info/sparql',
      imageBaseUrl: 'https://register.mobiliteit.vlaanderen.be/',
      // optional
      decisionUri: 'http://my-endpoint.be/id/besluiten/1234',
      // optional
      // see below for valid decisiontypes in which the plugin will activate
      decisionType:'https://data.vlaanderen.be/id/concept/BesluitType/4d8f678a-6fa4-4d5f-a2a1-80974e43bf34'
    }
  }
  /*...*/
})

```
#### `endpoint`
The sparql endpoint to fetch roadsigns. By default the development endpoint is used, so make sure to change this in production to your own registry or to `https://register.mobiliteit.vlaanderen.be/sparql`.
#### `imageBaseUrl`
In production, some old roadsigns of MOW miss a base URL for images, which will be prepended with this URL. If you provide your own registry with correct data, this will not be used.
#### `decisionUri`
if you pass this, along with the type, the plugin will not scan
  for a `besluit` context and allow you to insert a traffic regulation article
anywhere in your document
#### `decisionType`
along with the above `decisionUri`, allows you to explicitly
pass in the required decision information for the plugin to operate, which makes
it possible to use the plugin outside of the `besluit` context

## Usage

![roadsign regulation modal](https://github.com/lblod/frontend-embeddable-notule-editor/assets/126079676/713d32bf-baea-4e90-9b1e-e6e5131c4d54)

### Contextual mode

Unless you pass the above `decisionUri` and `decisionType` options, this plugin will only activate in *besluiten* with a certain rdf type. You will also need to activate the [Besluit](#besluit) plugin to be able to create *besluiten*.

<details><summary>Exhaustive list of decision types in which this plugin will activate</summary>

https://data.vlaanderen.be/id/concept/BesluitType/4d8f678a-6fa4-4d5f-a2a1-80974e43bf34

https://data.vlaanderen.be/id/concept/BesluitType/7d95fd2e-3cc9-4a4c-a58e-0fbc408c2f9b

https://data.vlaanderen.be/id/concept/BesluitType/3bba9f10-faff-49a6-acaa-85af7f2199a3

https://data.vlaanderen.be/id/concept/BesluitType/0d1278af-b69e-4152-a418-ec5cfd1c7d0b

https://data.vlaanderen.be/id/concept/BesluitType/e8afe7c5-9640-4db8-8f74-3f023bec3241

https://data.vlaanderen.be/id/concept/BesluitType/256bd04a-b74b-4f2a-8f5d-14dda4765af9

https://data.vlaanderen.be/id/concept/BesluitType/67378dd0-5413-474b-8996-d992ef81637a
</details>

When the cursor is inside such a *besluit*, the button *Voeg mobiliteitsmaatregel in* will appear under the insert menu. Clicking this will show a modal to filter and select roadsign regulation to insert.

### Direct mode

If you pass the `decisionUri` and `decisionType` options, the plugin will be
active anywhere in the document.
