# LPDC plugin

## Setup

```javascript
const editor = await renderEditor({
  plugins: [, /*...*/ "lpdc"],
  options: {
    lpdc: {
      lpdcEndpoint: "https://some.endpoint.be/lpdc/doc/instatie",
      decisionUri: "http://my-domain.be/id/besluiten/1234",
    },
  },
  /*...*/
});
```

### `endpoint`

This argument is now deprecated and will be removed in the following breaking release. This has been deprecated in favor of lpdcEndpoint which is more customizable and allows you to fetch both concepts and instances

#### `lpdcEndpoint`

There is no public endpoint available for LPDC codes, so you will need to provide your own. See [here](https://vlaamseoverheid.atlassian.net/wiki/external/6317081715/ZGU4MGNlODM2N2U1NDU5MGFlY2NlYzcxYmQyYWUwMTc) for more information.
After implementing the ldpc endpoint, you can customize the url endpoint to fetch instances, for example `https://some.endpoint.be/lpdc/doc/instatie` or concepts `https://some.endpoint.be/lpdc/doc/concept`

#### `decisionUri`

If you aren't able to provide a `besluit` node, you can instead configure the
URI of the decision directly (see [usage section](#usage))

## Usage

This plugin allows inserting [LPDC](https://github.com/Informatievlaanderen/OSLOthema-slimmeRaadpleegOmgeving?tab=readme-ov-file#lpdc-codes) codes.  
![lpdc plugin](/docs/images/lpdc.png)

### Contextual mode

By default, the plugin looks for a surrounding `besluit` node (see
[besluit plugin](/docs/plugins/besluit.md)). The inserted LPDC instance will be
connected to the node via rdfa.

### Direct mode

If you aren't able to provide a `besluit` node, you can instead configure the
URI of the decision directly (see [setup](#setup)). The inserted instance will
be linked to that URI.
