# frontend-embeddable-notule-editor

## 3.0.1

### Patch Changes

- [`117ee38`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/117ee382410f2d8f19fd8c65e6041b4010e6d69b) Thanks [@abeforgit](https://github.com/abeforgit)! - fix typo in ci setup

## 3.0.0

### Major Changes

- [#163](https://github.com/lblod/frontend-embeddable-notule-editor/pull/163) [`5f61b89`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/5f61b89a8fca291af0f7482b73445efc1082c7aa) Thanks [@Dietr](https://github.com/Dietr)! - - replace ember-cli-sass with ember-cli-postcss

  - add postcss-rem-to-pixels
  - all rem units are converted to px units

- [#176](https://github.com/lblod/frontend-embeddable-notule-editor/pull/176) [`8a9471d`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/8a9471d0f14da965d776f6819d8ccca180f58d96) Thanks [@abeforgit](https://github.com/abeforgit)! - Adds a way to import the editor through npm

  - rename the package to `@lblod/embeddable-say-editor`
  - export `renderEditor`, a function which renders the editor in an iframe
  - export `SayWebComponent`, which can be imported and registered as a custom element
  - adds a prepare script to bundle the project in an npm-compatible way

### Patch Changes

- [#164](https://github.com/lblod/frontend-embeddable-notule-editor/pull/164) [`ce5a770`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/ce5a770cf5ba0f41698e2069ddd5da042a841c71) Thanks [@x-m-el](https://github.com/x-m-el)! - Add citation card to search for citations that activates when typing citation plugin keywords

- [#166](https://github.com/lblod/frontend-embeddable-notule-editor/pull/166) [`a410031`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/a410031c8ca1019a9575e61c3b2e0b547051c6da) Thanks [@x-m-el](https://github.com/x-m-el)! - remove some left over mentions of rdfa-date plugin in readme and code, as this is now fully encompassed in the variable plugin

## 2.0.0

### Major Changes

- [#132](https://github.com/lblod/frontend-embeddable-notule-editor/pull/132) [`8cd3be4`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/8cd3be42c7f224adfeef15880e6f4aa83d994f98) Thanks [@abeforgit](https://github.com/abeforgit)! - Update all deps and necessary config values

  - removed "template-variable" config section: this plugin was merged into the
    variable plugin, and all its config options are also moved there to reflect this.

  - split up the variable plugin into "insert" and "edit" sections, for inserting
    and "filling in" variables respectively. The "edit" behavior is what
    the now-removed template-variable plugin used to handle. Its options
    have been moved verbatim to the variable->edit->location section.
    This is because all its options only mattered for the location variable type.

  - adds "enable" keys to the edit and insert configs for variables to maintain
    the ability to selectively enable either one. They both default to true.

  - the activeInRanges config for variables has been removed (this was a
    mistake in the docs)

  - the "defaultEndpoint" option for the variable plugin has been renamed to
    "codelistEndpoint" to better reflect it only matters for codelists

- [#158](https://github.com/lblod/frontend-embeddable-notule-editor/pull/158) [`2aaa620`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/2aaa620f583832675f6b74754ae2a35c76d4ce05) Thanks [@abeforgit](https://github.com/abeforgit)! - - update ember to 4.12

  - bump editor and plugins to latest
  - adjust imports and components of date plugin to new names
  - move date config over to variable section
  - remove now redundant references to rdfa-date plugin and move docs over
  - remove date insert button from insert menu to be consistent with other variables

- [#155](https://github.com/lblod/frontend-embeddable-notule-editor/pull/155) [`b656b3f`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/b656b3f6a2d9dfeb915f75f526b1b806fbc0986a) Thanks [@x-m-el](https://github.com/x-m-el)! - Changes the workings of the `besluit` and `article-structure` plugins

  - the modes for `article-structure` are gone.
  - `besluit` and `article-structure` can be used together
  - no more configuration needed for either plugins
  - some more documentation about using `article-structure` effectively

  Now the besluit plugin adds besluit nodes and adds the insert buttons for these node(s) (before it only added the structure)
  Now the article structure plugin adds article structure nodes and insert buttons (like before) and is not connected at all anymore with besluit nodes (before insert buttons for besluit nodes were added via article structure plugin)

  To migrate:

  - What was `article-structure` in `regulatoryStatement` mode before is now just the `article-structure` plugin, without specifying a mode.
  - What was `article-structure` in `besluit` mode before is now just the `besluit` plugin, without specifying a mode.

### Minor Changes

- [#145](https://github.com/lblod/frontend-embeddable-notule-editor/pull/145) [`d10cff0`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/d10cff0f62336ead94dabf158284e29b02dbb913) Thanks [@x-m-el](https://github.com/x-m-el)! - - Bugfix: controller is now loaded correctly to the `editorElement` and can be used.

  - On/Off methods bound to the `editorElement` are removed, as they are methods that didn't do anything.

- [#148](https://github.com/lblod/frontend-embeddable-notule-editor/pull/148) [`109016a`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/109016af39d06e18caf9b521381da43a5face112) Thanks [@x-m-el](https://github.com/x-m-el)! - - fix: localize language of the editor based on the user's browser local. The fallback in all cases is Dutch (nl-BE)

  - Add extra locale helper functions to give control over the editor's language to a consumer
    - `setLocale` to set a general locale
    - `getLocale` to get the current locale
    - `setLocaleToDutch` to easily set the editor to Dutch
    - `setLocaleToEnglish` to easily set the editor to English

- [#150](https://github.com/lblod/frontend-embeddable-notule-editor/pull/150) [`3f25d21`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/3f25d21b5092b35f318831654b3733cac58618ee) Thanks [@x-m-el](https://github.com/x-m-el)! - The variable plugin does not need the RDFa date plugin to be active anymore.
  It will activate what it needs itself. Configurations stay the same.

- [#142](https://github.com/lblod/frontend-embeddable-notule-editor/pull/142) [`7cb6a74`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/7cb6a74bcadbd78cfbecd514a93a230b01aabe02) Thanks [@elpoelma](https://github.com/elpoelma)! - Render svgs inline in order to solve svg symbol file cors issues

- [#159](https://github.com/lblod/frontend-embeddable-notule-editor/pull/159) [`f4b18f8`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/f4b18f8748ac4361e079d1daf8b6578b4f85cbf7) Thanks [@dkozickis](https://github.com/dkozickis)! - GN-4543: Fix issues reported by `dependency-lint`

  - Pin `tracked-toolbox` to `^2.0.0` based on this comment - https://github.com/appuniversum/ember-appuniversum/pull/421#issuecomment-1706553230
  - Pin `ember-focus-trap` to `1.0.1` based on this issue - https://github.com/josemarluedke/ember-focus-trap/issues/82

- [#153](https://github.com/lblod/frontend-embeddable-notule-editor/pull/153) [`40e880f`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/40e880fec98f465efa5aafa896c25145de7bce7c) Thanks [@elpoelma](https://github.com/elpoelma)! - Remove references to decision validation from readme

### Patch Changes

- [#152](https://github.com/lblod/frontend-embeddable-notule-editor/pull/152) [`c775acc`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/c775acc4228856d046eb5c09ecb46d3e795fc368) Thanks [@elpoelma](https://github.com/elpoelma)! - Remove citations-only sample page

- [#159](https://github.com/lblod/frontend-embeddable-notule-editor/pull/159) [`f4b18f8`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/f4b18f8748ac4361e079d1daf8b6578b4f85cbf7) Thanks [@dkozickis](https://github.com/dkozickis)! - GN-4543: Enable `dependency-lint` on CI

- [#157](https://github.com/lblod/frontend-embeddable-notule-editor/pull/157) [`8525363`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/8525363b3e799d278ba4d02bc31143b740c95658) Thanks [@dkozickis](https://github.com/dkozickis)! - GN-4518: Bump `@appuniversum/ember-appuniversum` to `^2.15.0` to use bundled fonts instead of CDN fonts

- [#154](https://github.com/lblod/frontend-embeddable-notule-editor/pull/154) [`5e63a17`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/5e63a17d88886255eed141fb503f794b25f1721d) Thanks [@elpoelma](https://github.com/elpoelma)! - Internationalize sidebar insert-button

- [#147](https://github.com/lblod/frontend-embeddable-notule-editor/pull/147) [`b54225f`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/b54225f3d6836b58f132af77e0e9faac47e39267) Thanks [@dkozickis](https://github.com/dkozickis)! - GN-4510: Keep default values of config where user config is not specified

- [#137](https://github.com/lblod/frontend-embeddable-notule-editor/pull/137) [`7da0bd4`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/7da0bd4ec2995544c84ec6be5095f3dac54100a3) Thanks [@elpoelma](https://github.com/elpoelma)! - Move to changesets for changelog management

- [#154](https://github.com/lblod/frontend-embeddable-notule-editor/pull/154) [`5e63a17`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/5e63a17d88886255eed141fb503f794b25f1721d) Thanks [@elpoelma](https://github.com/elpoelma)! - Internationalize insert-variable dropdown

## 1.2.1 (2023-09-08)

#### :bug: Bug Fix

- [#128](https://github.com/lblod/frontend-embeddable-notule-editor/pull/128) GN-4483: Remove styling for `#ember-basic-dropdown-wormhole` ([@dkozickis](https://github.com/dkozickis))

#### :house: Internal

- [#138](https://github.com/lblod/frontend-embeddable-notule-editor/pull/138) Add release-it packages ([@elpoelma](https://github.com/elpoelma))
- [#134](https://github.com/lblod/frontend-embeddable-notule-editor/pull/134) Bump eslint-config-prettier from 8.5.0 to 9.0.0 ([@dependabot[bot]](https://github.com/apps/dependabot))
- [#135](https://github.com/lblod/frontend-embeddable-notule-editor/pull/135) Bump eslint-plugin-ember from 11.4.7 to 11.11.1 ([@dependabot[bot]](https://github.com/apps/dependabot))
- [#136](https://github.com/lblod/frontend-embeddable-notule-editor/pull/136) add woodpecker pipeline responsible for verifying PR ([@elpoelma](https://github.com/elpoelma))
- [#117](https://github.com/lblod/frontend-embeddable-notule-editor/pull/117) Bump qunit from 2.19.3 to 2.19.4 ([@dependabot[bot]](https://github.com/apps/dependabot))
- [#119](https://github.com/lblod/frontend-embeddable-notule-editor/pull/119) Bump ember-auto-import from 2.6.1 to 2.6.3 ([@dependabot[bot]](https://github.com/apps/dependabot))
- [#124](https://github.com/lblod/frontend-embeddable-notule-editor/pull/124) Bump semver from 5.7.1 to 5.7.2 ([@dependabot[bot]](https://github.com/apps/dependabot))
- [#125](https://github.com/lblod/frontend-embeddable-notule-editor/pull/125) Bump webpack from 5.85.1 to 5.88.2 ([@dependabot[bot]](https://github.com/apps/dependabot))
- [#126](https://github.com/lblod/frontend-embeddable-notule-editor/pull/126) Bump word-wrap from 1.2.3 to 1.2.4 ([@dependabot[bot]](https://github.com/apps/dependabot))

#### Committers: 2

- Deniss Kozickis ([@dkozickis](https://github.com/dkozickis))
- Elena Poelman ([@elpoelma](https://github.com/elpoelma))

## 1.2.0 (2023-07-10)

#### :rocket: Enhancement

- [#123](https://github.com/lblod/frontend-embeddable-notule-editor/pull/123) Get citation-plugin working in prebuilt sources ([@elpoelma](https://github.com/elpoelma))

#### Committers: 1

- Elena Poelman ([@elpoelma](https://github.com/elpoelma))

## 1.1.0 (2023-07-10)

#### :rocket: Enhancement

- [#93](https://github.com/lblod/frontend-embeddable-notule-editor/pull/93) Feature/new configurable plugins ([@lagartoverde](https://github.com/lagartoverde))

#### :house: Internal

- [#122](https://github.com/lblod/frontend-embeddable-notule-editor/pull/122) Add link to article-structure-plugin docs in README ([@elpoelma](https://github.com/elpoelma))
- [#121](https://github.com/lblod/frontend-embeddable-notule-editor/pull/121) Add link to decision-plugin docs in README ([@elpoelma](https://github.com/elpoelma))
- [#120](https://github.com/lblod/frontend-embeddable-notule-editor/pull/120) Clarify readme to indicate which plugin each config block configures ([@elpoelma](https://github.com/elpoelma))
- [#114](https://github.com/lblod/frontend-embeddable-notule-editor/pull/114) Bump engine.io and socket.io ([@dependabot[bot]](https://github.com/apps/dependabot))
- [#113](https://github.com/lblod/frontend-embeddable-notule-editor/pull/113) Use au-modal-container component ([@elpoelma](https://github.com/elpoelma))
- [#112](https://github.com/lblod/frontend-embeddable-notule-editor/pull/112) Bump eslint-plugin-qunit from 7.3.1 to 8.0.0 ([@dependabot[bot]](https://github.com/apps/dependabot))
- [#73](https://github.com/lblod/frontend-embeddable-notule-editor/pull/73) Bump @xmldom/xmldom from 0.8.3 to 0.8.6 ([@dependabot[bot]](https://github.com/apps/dependabot))
- [#109](https://github.com/lblod/frontend-embeddable-notule-editor/pull/109) GN-4411: update editor plugins to 8.4.1 ([@elpoelma](https://github.com/elpoelma))
- [#71](https://github.com/lblod/frontend-embeddable-notule-editor/pull/71) Bump minimist from 0.2.2 to 0.2.4 ([@dependabot[bot]](https://github.com/apps/dependabot))
- [#108](https://github.com/lblod/frontend-embeddable-notule-editor/pull/108) Update editor to 3.10.0 ([@elpoelma](https://github.com/elpoelma))
- [#101](https://github.com/lblod/frontend-embeddable-notule-editor/pull/101) Bump socket.io-parser from 4.2.1 to 4.2.4 ([@dependabot[bot]](https://github.com/apps/dependabot))
- [#102](https://github.com/lblod/frontend-embeddable-notule-editor/pull/102) Bump webpack from 5.74.0 to 5.85.1 ([@dependabot[bot]](https://github.com/apps/dependabot))

#### Committers: 4

- Deniss Kozickis ([@dkozickis](https://github.com/dkozickis))
- Elena Poelman ([@elpoelma](https://github.com/elpoelma))
- Oscar Rodriguez Villalobos ([@lagartoverde](https://github.com/lagartoverde))
- [@x-m-el](https://github.com/x-m-el)

## 1.0.2-vendor.6 (2023-05-09)

add svgxuse workaround

## 1.0.2-vendor.5 (2023-05-09)

remove cors config hack

## 1.0.2-vendor.4 (2023-05-09)

hopefully fix copy directive

## 1.0.2-vendor.3 (2023-05-08)

revert CI back to drone

## 1.0.2-vendor.2 (2023-05-08)

hopefully fix docker config

## 1.0.2-vendor (2023-05-08)

#### :bug: Bug Fix

- [#91](https://github.com/lblod/frontend-embeddable-notule-editor/pull/91) Solved dropdown problems ([@lagartoverde](https://github.com/lagartoverde))

#### Committers: 2

- Niels V ([@nvdk](https://github.com/nvdk))
- Oscar Rodriguez Villalobos ([@lagartoverde](https://github.com/lagartoverde))

## 1.0.2 (2023-05-02)

#### :rocket: Enhancement

- [#88](https://github.com/lblod/frontend-embeddable-notule-editor/pull/88) Feature/improve docs and expose controller ([@lagartoverde](https://github.com/lagartoverde))

#### :house: Internal

- [#88](https://github.com/lblod/frontend-embeddable-notule-editor/pull/88) Feature/improve docs and expose controller ([@lagartoverde](https://github.com/lagartoverde))

#### Committers: 1

- Oscar Rodriguez Villalobos ([@lagartoverde](https://github.com/lagartoverde))

## 1.0.1 (2023-04-12)

#### :rocket: Enhancement

- [#83](https://github.com/lblod/frontend-embeddable-notule-editor/pull/83) Use `ResponsiveToolbar` component ([@elpoelma](https://github.com/elpoelma))

#### Committers: 2

- Elena Poelman ([@elpoelma](https://github.com/elpoelma))
- [@x-m-el](https://github.com/x-m-el)

## 1.0.0 (2023-04-07)

#### :boom: Breaking Change

- [#78](https://github.com/lblod/frontend-embeddable-notule-editor/pull/78) Feature/update editor ([@lagartoverde](https://github.com/lagartoverde))

#### :rocket: Enhancement

- [#78](https://github.com/lblod/frontend-embeddable-notule-editor/pull/78) Feature/update editor ([@lagartoverde](https://github.com/lagartoverde))

#### :house: Internal

- [#70](https://github.com/lblod/frontend-embeddable-notule-editor/pull/70) Bump eslint-plugin-ember from 11.1.0 to 11.4.7 ([@dependabot[bot]](https://github.com/apps/dependabot))
- [#68](https://github.com/lblod/frontend-embeddable-notule-editor/pull/68) Bump ember-qunit from 5.1.5 to 6.2.0 ([@dependabot[bot]](https://github.com/apps/dependabot))
- [#54](https://github.com/lblod/frontend-embeddable-notule-editor/pull/54) Bump @lblod/ember-rdfa-editor from 0.63.5 to 0.64.1 ([@dependabot[bot]](https://github.com/apps/dependabot))
- [#51](https://github.com/lblod/frontend-embeddable-notule-editor/pull/51) Bump decode-uri-component from 0.2.0 to 0.2.2 ([@dependabot[bot]](https://github.com/apps/dependabot))
- [#46](https://github.com/lblod/frontend-embeddable-notule-editor/pull/46) Bump engine.io from 6.2.0 to 6.2.1 ([@dependabot[bot]](https://github.com/apps/dependabot))

#### Committers: 1

- Oscar Rodriguez Villalobos ([@lagartoverde](https://github.com/lagartoverde))

## 0.18.2 (2022-10-27)

#### :house: Internal

- [#37](https://github.com/lblod/frontend-embeddable-notule-editor/pull/37) chore(deps): upgrade eslint setup ([@abeforgit](https://github.com/abeforgit))
- [#34](https://github.com/lblod/frontend-embeddable-notule-editor/pull/34) Bump ember-auto-import from 2.4.2 to 2.4.3 ([@dependabot[bot]](https://github.com/apps/dependabot))
- [#32](https://github.com/lblod/frontend-embeddable-notule-editor/pull/32) Bump sass from 1.54.9 to 1.55.0 ([@dependabot[bot]](https://github.com/apps/dependabot))
- [#31](https://github.com/lblod/frontend-embeddable-notule-editor/pull/31) Bump eslint-plugin-prettier from 3.4.1 to 4.2.1 ([@dependabot[bot]](https://github.com/apps/dependabot))
- [#36](https://github.com/lblod/frontend-embeddable-notule-editor/pull/36) chore(deps): bump inhouse deps to latest ([@abeforgit](https://github.com/abeforgit))
- [#30](https://github.com/lblod/frontend-embeddable-notule-editor/pull/30) feat(bot): enable dependabot ([@abeforgit](https://github.com/abeforgit))
- [#29](https://github.com/lblod/frontend-embeddable-notule-editor/pull/29) Bump mout from 1.2.3 to 1.2.4 ([@dependabot[bot]](https://github.com/apps/dependabot))
- [#28](https://github.com/lblod/frontend-embeddable-notule-editor/pull/28) Bump @xmldom/xmldom from 0.8.2 to 0.8.3 ([@dependabot[bot]](https://github.com/apps/dependabot))

#### Committers: 1

- Arne Bertrand ([@abeforgit](https://github.com/abeforgit))

## 0.18.1 (2022-09-13)

#### :house: Internal

- [#27](https://github.com/lblod/frontend-embeddable-notule-editor/pull/27) chore(deps): bump editor to v0.63.2 ([@abeforgit](https://github.com/abeforgit))

#### Committers: 1

- Arne Bertrand ([@abeforgit](https://github.com/abeforgit))

## 0.18.0 (2022-09-13)

#### :rocket: Enhancement

- [#25](https://github.com/lblod/frontend-embeddable-notule-editor/pull/25) Introduce environment banner ([@elpoelma](https://github.com/elpoelma))

#### :bug: Bug Fix

- [#26](https://github.com/lblod/frontend-embeddable-notule-editor/pull/26) Chore/bump editor v0.63.1 ([@abeforgit](https://github.com/abeforgit))

#### Committers: 2

- Arne Bertrand ([@abeforgit](https://github.com/abeforgit))
- Elena Poelman ([@elpoelma](https://github.com/elpoelma))

## 0.17.1 (2022-08-18)

#### :house: Internal

- [#24](https://github.com/lblod/frontend-embeddable-notule-editor/pull/24) Bump terser from 4.8.0 to 4.8.1 ([@dependabot[bot]](https://github.com/apps/dependabot))

## 0.17.0 (2022-07-18)

#### :rocket: Enhancement

- [#22](https://github.com/lblod/frontend-embeddable-notule-editor/pull/22) Dynamic plugin configuration ([@elpoelma](https://github.com/elpoelma))

#### Committers: 1

- Elena Poelman ([@elpoelma](https://github.com/elpoelma))

## 0.16.3 (2022-07-12)

#### :rocket: Enhancement

- [#19](https://github.com/lblod/frontend-embeddable-notule-editor/pull/19) bump plugins and editor ([@nvdk](https://github.com/nvdk))

#### :house: Internal

- [#23](https://github.com/lblod/frontend-embeddable-notule-editor/pull/23) bumped editor, citation plugin, rdfa-date plugin ([@Asergey91](https://github.com/Asergey91))

#### Committers: 3

- Arne Bertrand ([@abeforgit](https://github.com/abeforgit))
- Niels V ([@nvdk](https://github.com/nvdk))
- Sergey Andreev ([@Asergey91](https://github.com/Asergey91))

## 0.16.2 (2022-05-06)

#### :bug: Bug Fix

- [#18](https://github.com/lblod/frontend-embeddable-notule-editor/pull/18) Add needed "optional" powerselect dependency ([@abeforgit](https://github.com/abeforgit))

#### Committers: 1

- Arne Bertrand ([@abeforgit](https://github.com/abeforgit))

## 0.16.1 (2022-05-06)

#### :bug: Bug Fix

- [#17](https://github.com/lblod/frontend-embeddable-notule-editor/pull/17) Fix roadsign-regulation-plugin crashing on opening of modal ([@abeforgit](https://github.com/abeforgit))

#### :house: Internal

- [#14](https://github.com/lblod/frontend-embeddable-notule-editor/pull/14) Bump chownr from 1.0.1 to 1.1.4 ([@dependabot[bot]](https://github.com/apps/dependabot))

#### Committers: 1

- Arne Bertrand ([@abeforgit](https://github.com/abeforgit))

## 0.16.0 (2022-04-28)

#### :rocket: Enhancement

- [#13](https://github.com/lblod/frontend-embeddable-notule-editor/pull/13) Adding roadsign regulation related plugins ([@benjay10](https://github.com/benjay10))
- [#10](https://github.com/lblod/frontend-embeddable-notule-editor/pull/10) Upgrade ember 3.28 ([@benjay10](https://github.com/benjay10))

#### :bug: Bug Fix

- [#12](https://github.com/lblod/frontend-embeddable-notule-editor/pull/12) Fix ember-concurrency dependency ([@benjay10](https://github.com/benjay10))

#### :house: Internal

- [#10](https://github.com/lblod/frontend-embeddable-notule-editor/pull/10) Upgrade ember 3.28 ([@benjay10](https://github.com/benjay10))
- [#11](https://github.com/lblod/frontend-embeddable-notule-editor/pull/11) Fix Drone setup ([@benjay10](https://github.com/benjay10))

#### Committers: 1

- Ben ([@benjay10](https://github.com/benjay10))

## 0.15.0 (2021-09-23)

#### :bug: Bug Fix

- [#9](https://github.com/lblod/frontend-embeddable-notule-editor/pull/9) Remove broken plugins and bump everything to working versions ([@abeforgit](https://github.com/abeforgit))

#### Committers: 1

- Arne Bertrand ([@abeforgit](https://github.com/abeforgit))

## 0.14.0 (2021-09-01)

#### :rocket: Enhancement

- [#7](https://github.com/lblod/frontend-embeddable-notule-editor/pull/7) Add release-it config ([@abeforgit](https://github.com/abeforgit))

#### :house: Internal

- [#8](https://github.com/lblod/frontend-embeddable-notule-editor/pull/8) Bump editor to v0.47.0 ([@abeforgit](https://github.com/abeforgit))

#### Committers: 1

- Arne Bertrand ([@abeforgit](https://github.com/abeforgit))

# Release 0.8.0

- new version of the citation plugin: a new modal window allows finetuning search results and citing articles

# Release 0.7.2

- links and hints are treated as inline elements again
