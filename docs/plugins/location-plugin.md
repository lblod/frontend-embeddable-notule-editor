# Location

## Setup

>[!WARNING]
> Unlike most plugins, the default configuration is not production ready
and has to be adjusted. 

```javascript
const editor = await renderEditor({
  plugins: [/*...*/,"location"], 
  options: {
    location: {
      defaultPointUriRoot: 'https://example.net/id/geometrie/',
      defaultPlaceUriRoot: 'https://example.net/id/plaats/',
      defaultAddressUriRoot: 'https://example.net/id/adres/',
      defaultMunicipality: 'Gent',
      locationOptions: ['address', 'place', 'area'],
    }
  }
  /*...*/
})

```

The plugin expects the following configuration options:
- `defaultPointUriRoot` (default: 'https://example.net/id/geometrie/')
- `defaultPlaceUriRoot` (default: 'https://example.net/id/plaats/)
- `defaultAddressUriRoot` (default: 'https://example.net/id/adres/')
- `defaultMunicipality` (default: none)
- `locationTypes` (default: `['address', 'place', 'area']`)

This plugin needs the base URI options for annotating the
locations. Unfortunately we cannot provide a reasonable default for this,
because it is up to the application to manage its URI namespace.

If you are unsure which base to choose here, we might be able to help you figure
it out.

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
