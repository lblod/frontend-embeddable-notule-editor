---
'frontend-embeddable-notule-editor': minor
---

- fix: localize language of the editor based on the user's browser local. The fallback in all cases is Dutch (nl-BE)
- Add extra locale helper functions to give control over the editor's language to a consumer
  - `setLocale` to set a general locale
  - `getLocale` to get the current locale
  - `setLocaleToDutch` to easily set the editor to Dutch
  - `setLocaleToEnglish` to easily set the editor to English
