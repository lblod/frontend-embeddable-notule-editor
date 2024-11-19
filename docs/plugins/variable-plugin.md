# RDFa Variables

Support for inserting and editing placeholder fields for common datatypes.

## Setup
```javascript
const editor = await renderEditor({
  plugins: [/*...*/,"variable"], 
  options: {
    variable: {
      insert: {
          enable: true,
          codelistEndpoint: 'https://dev.roadsigns.lblod.info/sparql',
          codelistPublisher: null,
          locationEndpoint: 'https://dev.roadsigns.lblod.info'
        },
        edit: {
          enable: true,
          location: {
            endpoint: 'https://dev.roadsigns.lblod.info',
            zonalLocationCodelistUri:
              'http://lblod.data.gift/concept-schemes/62331E6900730AE7B99DF7EF',
            nonZonalLocationCodelistUri:
              'http://lblod.data.gift/concept-schemes/62331FDD00730AE7B99DF7F2',
          },
          date: {
            allowCustomFormat: true,
            formats: [
              {
                label: 'Short Date',
                key: 'short',
                dateFormat: 'dd/MM/yy',
                dateTimeFormat: 'dd/MM/yy HH:mm',
              },
              {
                label: 'Long Date',
                key: 'long',
                dateFormat: 'EEEE dd MMMM yyyy',
                dateTimeFormat: 'PPPPp',
              },
            ],
          },
        }
    },
  }
  /*...*/

})

```

### `insert`
configuration for inserting a variable
  - `enable`: is inserting a variable allowed (removing is always possible!)
  - `codelistEndpoint`: the endpoint from which to fetch the codelists, which will be added to a codelist variable's RDFa. For production you'll likely want to use https://register.mobiliteit.vlaanderen.be/sparql`.
  - `codelistPublisher`: Limit the codelists to a specific publisher. *null* will allow all codelists.
  - `locationEndpoint`: the endpoint to fetch location options, which will be added to the location variable's RDFa and used as the endpoint when selecting a location variable. For production you'll likely want to use `https://register.mobiliteit.vlaanderen.be`.

### `edit`
configuration for editing an inserted variable
  - `enable`: is editing a variable allowed (removing is always possible!)
  - `location`: config for the location variable
    - `endpoint`: *fallback* endpoint for location variable if the variable is missing the endpoint in its RDFa. This will most likely be the same as the endpoint used for inserting.
    - `zonalLocationCodelistUri`: the URI to search for if the location variable is included in a zonal traffic measure.
    - `nonZonalLocationCodelistUri`: the URI to search for if the location variable is included in a non-zonal traffic measure.
  - `date`: config for the date variable
    - `formats`: specify default formats to show for selection in the date card.
      - `label` (optional): The label shown to the user on the card. If not provided, the format is used instead e.g.: `dd/MM/yyyy`
      - `key`: A **unique** identifier used for identification in the internal code. 
      - `dateFormat`: The date format used when this is selected.
      - `dateTimeFormat`: The datetime format to use when this is selected. Used when the user selects "Include time".
    - `allowCustomFormat`: true/false, determines if the option to insert a fully custom format is available.

## Usage
These are placeholders that can be inserted in a document. A variable placeholder has a specific type (text, number, date, address or codelist), which changes the type of input it can receive. These placeholders can then be filled in by a user using the document.

Usually variables are inserted in an editor made to create *templates* (documents to be filled in), and only edited in an editor to fill in these *templates*. Via the config you can customize if you want to allow insertion and/or filling in a variable.  
**Note**: a user will always be able to remove a variable, even if insertion is not allowed.

A variable can be inserted with the card shown in the right sidebar.  
![insert variable card](https://github.com/lblod/frontend-embeddable-notule-editor/assets/126079676/7cf29af3-069e-4c45-b65d-3a898ac7b830)


**Types of variables:**
- *text*: a variable that any text can be typed in
- *number*: pops up an input box that will validate constraints and includes a button to show the number in words. Constraints (min/max) can be set when inserting the variable.
- *date*: insert date and time values using a datepicker. Supports a variety of formats. For more information about the syntax of defining date(time) formats check the documentation of the underlying library used [date-fns](https://date-fns.org/v2.29.3/docs/format).
- *location*: choose out of a list of location options, that can contain placeholders themselves. 
- *codelist*: when inserting, a specific codelist has to be chosen. This codelist is a list of values the user can choose from to fill in the variable. Either the user can select one (single selection) or multiple (multiple selection). 
- *address*: when inserted, the user can click this to get a modal for searching addresses from the Belgium address register. This can be used to insert existing addresses.  
  **note**: when searching for submunicipalities, only the main municipality will show up in the search. However, when searching for a street, the correct zip-code will be used.

#### rdfa-awareness

The serialization format of these variables uses rdfa to store its data.
