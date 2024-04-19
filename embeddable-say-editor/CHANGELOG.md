# frontend-embeddable-notule-editor

## 3.7.2-next.3

### Patch Changes

- [`71b3249`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/71b3249ef75c02ab361f2bfd2fabee7c4a4f5272) Thanks [@abeforgit](https://github.com/abeforgit)! - attempt to fix ci tag parsing again

## 3.7.2-next.2

### Patch Changes

- [`ecbe6f1`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/ecbe6f1eaf12d1222a0278c03dc56029a74a9844) Thanks [@abeforgit](https://github.com/abeforgit)! - fix ci tag parsing

## 3.7.2-next.1

### Patch Changes

- [`feb4d10`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/feb4d106c17c0d10dfb3c4cbd7fb1ea6446b66b8) Thanks [@abeforgit](https://github.com/abeforgit)! - empty bump for CI configuration

## 3.7.2-next.0

### Patch Changes

- [`f83685d`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/f83685d3764686d8dc45e084792c00118a2d49c4) Thanks [@abeforgit](https://github.com/abeforgit)! - use woodpecker node plugin in ci

## 3.7.1

### Patch Changes

- [`f50055c`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/f50055cb2c36ad459dabe5911ef5219e86c1de09) Thanks [@piemonkey](https://github.com/piemonkey)! - Fix release process to correctly bump the version of embeddable used in the test-app.
  NOTE: This is identical to v3.7.0 because the only changes are in the build process of the test app

## 3.7.0

NOTE: While this version technically works, and is identical to 3.7.1, due to a misconfigured build, it was not pushed to npm.

### Minor Changes

- [#251](https://github.com/lblod/frontend-embeddable-notule-editor/pull/251) [`a9feddf`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/a9feddf207fe4e00d899ca7cfbea6f6e1f282b2d) Thanks [@piemonkey](https://github.com/piemonkey)! - Update to latest editor and plugins, including the latest ember-appuniversum using inline SVG icons

- [#239](https://github.com/lblod/frontend-embeddable-notule-editor/pull/239) [`2f4fd4f`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/2f4fd4fdbef3ca1f157db455673b4c70bbe99d7b) Thanks [@piemonkey](https://github.com/piemonkey)! - Update to version `9.6.0` of ember-rdfa-editor

- [#239](https://github.com/lblod/frontend-embeddable-notule-editor/pull/239) [`8dbec82`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/8dbec826e78d9e6cfeb49d94e7fcbe3a705cc948) Thanks [@piemonkey](https://github.com/piemonkey)! - Add plugins to allow html editing and html export preview

### Patch Changes

- [#252](https://github.com/lblod/frontend-embeddable-notule-editor/pull/252) [`21a23c5`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/21a23c50fe5518cec0f316935fd1b09dda63df81) Thanks [@elpoelma](https://github.com/elpoelma)! - Update `@lblod/ember-environment-banner` to version [0.5.0](https://github.com/lblod/ember-environment-banner/releases/tag/v0.5.0)

- [#250](https://github.com/lblod/frontend-embeddable-notule-editor/pull/250) [`8963773`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/8963773c65e8e335f2f2b14b50c838add5890d55) Thanks [@piemonkey](https://github.com/piemonkey)! - Move to pnpm for package management internally

## 3.6.0

### Minor Changes

- [#232](https://github.com/lblod/frontend-embeddable-notule-editor/pull/232) [`33278fc`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/33278fc4972e15a4a844680f3c97890fe339b449) Thanks [@elpoelma](https://github.com/elpoelma)! - Add floating table menu which provides users quick access to table editing tools
  This floating menu is implemented to be as non-intrusive as possible: it only displays when clicking; and disappears when typing.
  The menu contains the following actions:

  - Add row after
  - Add row before
  - Add column after
  - Add column before
  - Toggle row header
  - Toggle column header
  - Delete row
  - Delete column
  - Delete table

- [#245](https://github.com/lblod/frontend-embeddable-notule-editor/pull/245) [`b53d4ab`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/b53d4ab846a0684973c8def7d281ebca2b7ad4ac) Thanks [@elpoelma](https://github.com/elpoelma)! - Enable support for customizable, alternating row backgrounds

- [#245](https://github.com/lblod/frontend-embeddable-notule-editor/pull/245) [`f669800`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/f669800b4771f825a96f5245ad9531b624e85fd6) Thanks [@elpoelma](https://github.com/elpoelma)! - - Update `@lblod/ember-rdfa-editor` to version 9.5.1

  - Update `@lblod/ember-rdfa-editor-lblod-plugins` to 16.2.0

  These releases contain support for the following features:

  - Table cell backgrounds

  These release also contain the following fixes/improvements:

  - Addition of title attributes to toolbar buttons
  - Improvements in translations of toolbar buttons

- [#229](https://github.com/lblod/frontend-embeddable-notule-editor/pull/229) [`73d656f`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/73d656fdaf01ade77aa9ccda8926de1eb3613c20) Thanks [@elpoelma](https://github.com/elpoelma)! - Update `@lblod/ember-rdfa-editor-lblod-plugins` to version [16.1.0](https://github.com/lblod/ember-rdfa-editor-lblod-plugins/releases/tag/v16.1.0)

- [#229](https://github.com/lblod/frontend-embeddable-notule-editor/pull/229) [`4459eb3`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/4459eb3794331949288ec67dbd2fc23a12146eaa) Thanks [@elpoelma](https://github.com/elpoelma)! - Add option to pass styles to table borders. These are shown in the editor as well as exported in HTML or clipboard contents.

- [#233](https://github.com/lblod/frontend-embeddable-notule-editor/pull/233) [`67a660a`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/67a660a049838cdae11a90bba9b6e35442b7df20) Thanks [@dkozickis](https://github.com/dkozickis)! - Update `@lblod/ember-rdfa-editor` to version [9.4.0](https://github.com/lblod/ember-rdfa-editor/releases/tag/v9.4.0)

  This release includes the following (improved) features:

  - Better support for copying lists
  - When resizing tables, percentages are used instead of absolute pixels
  - Merge/Split table cells

### Patch Changes

- [#230](https://github.com/lblod/frontend-embeddable-notule-editor/pull/230) [`d0b6e17`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/d0b6e17d93bf8ed75f216f41151e963dbb499da3) Thanks [@elpoelma](https://github.com/elpoelma)! - Downgrade `@appuniversum/ember-appuniversum` to 2.15.0

- [#234](https://github.com/lblod/frontend-embeddable-notule-editor/pull/234) [`30293f8`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/30293f801f1f5100787a8fae8b86ef0451a2ebb3) Thanks [@piemonkey](https://github.com/piemonkey)! - Add Typescript types generated from mostly existing JSDOCs

- [#248](https://github.com/lblod/frontend-embeddable-notule-editor/pull/248) [`9f2a99a`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/9f2a99afe9aeccaceed40771652b074242a1ce43) Thanks [@abeforgit](https://github.com/abeforgit)! - Fix toolbar scrolling in all instances

  If you were using an explicit height set with the (undocumented) `cssVariables` argument to `renderEditor`, you can likely remove it now, the editor should now correctly scroll in any scenario.

## 3.6.0-next.2

### Minor Changes

- [#245](https://github.com/lblod/frontend-embeddable-notule-editor/pull/245) [`b53d4ab`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/b53d4ab846a0684973c8def7d281ebca2b7ad4ac) Thanks [@elpoelma](https://github.com/elpoelma)! - Enable support for customizable, alternating row backgrounds

- [#245](https://github.com/lblod/frontend-embeddable-notule-editor/pull/245) [`f669800`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/f669800b4771f825a96f5245ad9531b624e85fd6) Thanks [@elpoelma](https://github.com/elpoelma)! - - Update `@lblod/ember-rdfa-editor` to version 9.5.1

  - Update `@lblod/ember-rdfa-editor-lblod-plugins` to 16.2.0

  These releases contain support for the following features:

  - Table cell backgrounds

  These release also contain the following fixes/improvements:

  - Addition of title attributes to toolbar buttons
  - Improvements in translations of toolbar buttons

## 3.6.0-next.1

### Minor Changes

- [#233](https://github.com/lblod/frontend-embeddable-notule-editor/pull/233) [`67a660a`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/67a660a049838cdae11a90bba9b6e35442b7df20) Thanks [@dkozickis](https://github.com/dkozickis)! - Update `@lblod/ember-rdfa-editor` to version [9.4.0](https://github.com/lblod/ember-rdfa-editor/releases/tag/v9.4.0)

  This release includes the following (improved) features:

  - Better support for copying lists
  - When resizing tables, percentages are used instead of absolute pixels
  - Merge/Split table cells

### Patch Changes

- [#234](https://github.com/lblod/frontend-embeddable-notule-editor/pull/234) [`30293f8`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/30293f801f1f5100787a8fae8b86ef0451a2ebb3) Thanks [@piemonkey](https://github.com/piemonkey)! - Add Typescript types generated from mostly existing JSDOCs

## 3.6.0-next.0

### Minor Changes

- [#232](https://github.com/lblod/frontend-embeddable-notule-editor/pull/232) [`33278fc`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/33278fc4972e15a4a844680f3c97890fe339b449) Thanks [@elpoelma](https://github.com/elpoelma)! - Add floating table menu which provides users quick access to table editing tools
  This floating menu is implemented to be as non-intrusive as possible: it only displays when clicking; and disappears when typing.
  The menu contains the following actions:

  - Add row after
  - Add row before
  - Add column after
  - Add column before
  - Toggle row header
  - Toggle column header
  - Delete row
  - Delete column
  - Delete table

- [#229](https://github.com/lblod/frontend-embeddable-notule-editor/pull/229) [`73d656f`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/73d656fdaf01ade77aa9ccda8926de1eb3613c20) Thanks [@elpoelma](https://github.com/elpoelma)! - Update `@lblod/ember-rdfa-editor-lblod-plugins` to version [16.1.0](https://github.com/lblod/ember-rdfa-editor-lblod-plugins/releases/tag/v16.1.0)

- [#229](https://github.com/lblod/frontend-embeddable-notule-editor/pull/229) [`4459eb3`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/4459eb3794331949288ec67dbd2fc23a12146eaa) Thanks [@elpoelma](https://github.com/elpoelma)! - Add option to pass styles to table borders. These are shown in the editor as well as exported in HTML or clipboard contents.

- [#229](https://github.com/lblod/frontend-embeddable-notule-editor/pull/229) [`73d656f`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/73d656fdaf01ade77aa9ccda8926de1eb3613c20) Thanks [@elpoelma](https://github.com/elpoelma)! - Update `@lblod/ember-rdfa-editor` to version [9.3.0](https://github.com/lblod/ember-rdfa-editor/releases/tag/v9.3.0)

  This release includes the following (improved) features:

  - Better support for copying lists
  - When resizing tables, percentages are used instead of absolute pixels

### Patch Changes

- [#230](https://github.com/lblod/frontend-embeddable-notule-editor/pull/230) [`d0b6e17`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/d0b6e17d93bf8ed75f216f41151e963dbb499da3) Thanks [@elpoelma](https://github.com/elpoelma)! - Downgrade `@appuniversum/ember-appuniversum` to 2.15.0

## 3.5.0

### Minor Changes

- [`938cf6b`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/938cf6b05d2ff1f8525067bfd48c102156cba29c) Thanks [@elpoelma](https://github.com/elpoelma)! - Add LICENSE file

- [#223](https://github.com/lblod/frontend-embeddable-notule-editor/pull/223) [`df88570`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/df885707eee1d197e955ad0995c5edae0f1c20c5) Thanks [@elpoelma](https://github.com/elpoelma)! - Reconfigure repository structure to allow for an effective QA strategy before releasing to npm.

- [#222](https://github.com/lblod/frontend-embeddable-notule-editor/pull/222) [`cb62755`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/cb62755c8b9d6104f280f85ee7166a98c7d61f24) Thanks [@dkozickis](https://github.com/dkozickis)! - Introduce `growEditor` option

  `growEditor` is a boolean option that allows the editor to grow in height as the content grows, instead of
  having a fixed height and a scrollbar.

### Patch Changes

- [#203](https://github.com/lblod/frontend-embeddable-notule-editor/pull/203) [`b06c5bb`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/b06c5bbb6198343eedc45cc401021b9f3ea1a4b4) Thanks [@redpencil-renovate-bot](https://github.com/apps/redpencil-renovate-bot)! - Bump changesets-release-it-plugin from 0.1.1 to 0.1.2

- [#205](https://github.com/lblod/frontend-embeddable-notule-editor/pull/205) [`17676d1`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/17676d1d0da0314dac20b06aafa96eae9f715648) Thanks [@redpencil-renovate-bot](https://github.com/apps/redpencil-renovate-bot)! - Bump ember-cli-dependency-checker from 3.3.1 to 3.3.2

- [#206](https://github.com/lblod/frontend-embeddable-notule-editor/pull/206) [`eb59d2d`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/eb59d2d699aba331487b929320eb98d7c29e3321) Thanks [@redpencil-renovate-bot](https://github.com/apps/redpencil-renovate-bot)! - Bump ember-svg-jar from 2.4.6 to 2.4.7

- [#209](https://github.com/lblod/frontend-embeddable-notule-editor/pull/209) [`31951d4`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/31951d4baf6383701c4e1fb57f43bd2c4518f122) Thanks [@redpencil-renovate-bot](https://github.com/apps/redpencil-renovate-bot)! - Bump @changesets/changelog-github from 0.4.8 to 0.5.0

- [#211](https://github.com/lblod/frontend-embeddable-notule-editor/pull/211) [`8a5ee56`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/8a5ee56cfa2e58adfb54a7d66765589a1006619e) Thanks [@redpencil-renovate-bot](https://github.com/apps/redpencil-renovate-bot)! - Bump @csstools/postcss-sass from 5.0.1 to 5.1.1

- [#212](https://github.com/lblod/frontend-embeddable-notule-editor/pull/212) [`3e14417`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/3e14417a9e2e0b571492bdd6427e2043e2b6b118) Thanks [@redpencil-renovate-bot](https://github.com/apps/redpencil-renovate-bot)! - Bump @ember/render-modifiers from 2.0.5 to 2.1.0

- [#213](https://github.com/lblod/frontend-embeddable-notule-editor/pull/213) [`81401ed`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/81401ed3cad8176648deee9ec49bcaa8e67d4eaa) Thanks [@redpencil-renovate-bot](https://github.com/apps/redpencil-renovate-bot)! - Bump @lblod/ember-environment-banner from 0.2.0 to 0.4.0

- [#214](https://github.com/lblod/frontend-embeddable-notule-editor/pull/214) [`37fc99d`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/37fc99d0596b28006e1dd62ec446934a9edeed0b) Thanks [@redpencil-renovate-bot](https://github.com/apps/redpencil-renovate-bot)! - Bump ember-auto-import from 2.6.3 to 2.7.2

- [#204](https://github.com/lblod/frontend-embeddable-notule-editor/pull/204) [`967bf08`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/967bf0880f2b2aa9b3f2ddbabb73c16119f247c8) Thanks [@redpencil-renovate-bot](https://github.com/apps/redpencil-renovate-bot)! - Bump cypress from 13.6.1 to 13.6.2

- [#210](https://github.com/lblod/frontend-embeddable-notule-editor/pull/210) [`04aadac`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/04aadac0f5b436897b92832ffa3d971e2a6b9883) Thanks [@redpencil-renovate-bot](https://github.com/apps/redpencil-renovate-bot)! - Bump @changesets/cli from 2.26.2 to 2.27.1

- [#217](https://github.com/lblod/frontend-embeddable-notule-editor/pull/217) [`a98bae3`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/a98bae3589c9d51e2a5f67ca889ead8b7781bc52) Thanks [@redpencil-renovate-bot](https://github.com/apps/redpencil-renovate-bot)! - Bump ember-template-lint from 5.11.2 to 5.13.0

- [#218](https://github.com/lblod/frontend-embeddable-notule-editor/pull/218) [`6711cfa`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/6711cfa16130221d8a60ac30792684b1a209e346) Thanks [@redpencil-renovate-bot](https://github.com/apps/redpencil-renovate-bot)! - Bump qunit from 2.19.4 to 2.20.0

- [#220](https://github.com/lblod/frontend-embeddable-notule-editor/pull/220) [`96d59ab`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/96d59ab2e8f92b65d87ecd45e0252744c6e419a2) Thanks [@elpoelma](https://github.com/elpoelma)! - Update `@lblod/ember-rdfa-editor-lblod-plugins` to 16.0.0

- [#224](https://github.com/lblod/frontend-embeddable-notule-editor/pull/224) [`37888a3`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/37888a310f4aece5a00740f31cd37ee01d4c91d1) Thanks [@dkozickis](https://github.com/dkozickis)! - GN-4713: Include mention of paragraph markers in README to make it more discoverable

- [#220](https://github.com/lblod/frontend-embeddable-notule-editor/pull/220) [`96d59ab`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/96d59ab2e8f92b65d87ecd45e0252744c6e419a2) Thanks [@elpoelma](https://github.com/elpoelma)! - Update `ember-intl` to 6.1.0

- [#221](https://github.com/lblod/frontend-embeddable-notule-editor/pull/221) [`4dbc63c`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/4dbc63cce876a096786b011d9c7f6ecc6ff8366c) Thanks [@dkozickis](https://github.com/dkozickis)! - GN-4670: Fix column resize handles

- [#219](https://github.com/lblod/frontend-embeddable-notule-editor/pull/219) [`e45414e`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/e45414e704cfea1083321afa6a8ec6d1d1fd3b66) Thanks [@piemonkey](https://github.com/piemonkey)! - Add test environment to more closely mimic real installations

- [#220](https://github.com/lblod/frontend-embeddable-notule-editor/pull/220) [`96d59ab`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/96d59ab2e8f92b65d87ecd45e0252744c6e419a2) Thanks [@elpoelma](https://github.com/elpoelma)! - Update `@lblod/ember-rdfa-editor` package to 9.0.0

## 3.5.0-next.0

### Minor Changes

- [`938cf6b`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/938cf6b05d2ff1f8525067bfd48c102156cba29c) Thanks [@elpoelma](https://github.com/elpoelma)! - Add LICENSE file

- [#223](https://github.com/lblod/frontend-embeddable-notule-editor/pull/223) [`df88570`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/df885707eee1d197e955ad0995c5edae0f1c20c5) Thanks [@elpoelma](https://github.com/elpoelma)! - Reconfigure repository structure to allow for an effective QA strategy before releasing to npm.

- [#222](https://github.com/lblod/frontend-embeddable-notule-editor/pull/222) [`cb62755`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/cb62755c8b9d6104f280f85ee7166a98c7d61f24) Thanks [@dkozickis](https://github.com/dkozickis)! - Introduce `growEditor` option

  `growEditor` is a boolean option that allows the editor to grow in height as the content grows, instead of
  having a fixed height and a scrollbar.

### Patch Changes

- [#203](https://github.com/lblod/frontend-embeddable-notule-editor/pull/203) [`b06c5bb`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/b06c5bbb6198343eedc45cc401021b9f3ea1a4b4) Thanks [@redpencil-renovate-bot](https://github.com/apps/redpencil-renovate-bot)! - Bump changesets-release-it-plugin from 0.1.1 to 0.1.2

- [#205](https://github.com/lblod/frontend-embeddable-notule-editor/pull/205) [`17676d1`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/17676d1d0da0314dac20b06aafa96eae9f715648) Thanks [@redpencil-renovate-bot](https://github.com/apps/redpencil-renovate-bot)! - Bump ember-cli-dependency-checker from 3.3.1 to 3.3.2

- [#206](https://github.com/lblod/frontend-embeddable-notule-editor/pull/206) [`eb59d2d`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/eb59d2d699aba331487b929320eb98d7c29e3321) Thanks [@redpencil-renovate-bot](https://github.com/apps/redpencil-renovate-bot)! - Bump ember-svg-jar from 2.4.6 to 2.4.7

- [#209](https://github.com/lblod/frontend-embeddable-notule-editor/pull/209) [`31951d4`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/31951d4baf6383701c4e1fb57f43bd2c4518f122) Thanks [@redpencil-renovate-bot](https://github.com/apps/redpencil-renovate-bot)! - Bump @changesets/changelog-github from 0.4.8 to 0.5.0

- [#211](https://github.com/lblod/frontend-embeddable-notule-editor/pull/211) [`8a5ee56`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/8a5ee56cfa2e58adfb54a7d66765589a1006619e) Thanks [@redpencil-renovate-bot](https://github.com/apps/redpencil-renovate-bot)! - Bump @csstools/postcss-sass from 5.0.1 to 5.1.1

- [#212](https://github.com/lblod/frontend-embeddable-notule-editor/pull/212) [`3e14417`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/3e14417a9e2e0b571492bdd6427e2043e2b6b118) Thanks [@redpencil-renovate-bot](https://github.com/apps/redpencil-renovate-bot)! - Bump @ember/render-modifiers from 2.0.5 to 2.1.0

- [#213](https://github.com/lblod/frontend-embeddable-notule-editor/pull/213) [`81401ed`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/81401ed3cad8176648deee9ec49bcaa8e67d4eaa) Thanks [@redpencil-renovate-bot](https://github.com/apps/redpencil-renovate-bot)! - Bump @lblod/ember-environment-banner from 0.2.0 to 0.4.0

- [#214](https://github.com/lblod/frontend-embeddable-notule-editor/pull/214) [`37fc99d`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/37fc99d0596b28006e1dd62ec446934a9edeed0b) Thanks [@redpencil-renovate-bot](https://github.com/apps/redpencil-renovate-bot)! - Bump ember-auto-import from 2.6.3 to 2.7.2

- [#204](https://github.com/lblod/frontend-embeddable-notule-editor/pull/204) [`967bf08`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/967bf0880f2b2aa9b3f2ddbabb73c16119f247c8) Thanks [@redpencil-renovate-bot](https://github.com/apps/redpencil-renovate-bot)! - Bump cypress from 13.6.1 to 13.6.2

- [#210](https://github.com/lblod/frontend-embeddable-notule-editor/pull/210) [`04aadac`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/04aadac0f5b436897b92832ffa3d971e2a6b9883) Thanks [@redpencil-renovate-bot](https://github.com/apps/redpencil-renovate-bot)! - Bump @changesets/cli from 2.26.2 to 2.27.1

- [#217](https://github.com/lblod/frontend-embeddable-notule-editor/pull/217) [`a98bae3`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/a98bae3589c9d51e2a5f67ca889ead8b7781bc52) Thanks [@redpencil-renovate-bot](https://github.com/apps/redpencil-renovate-bot)! - Bump ember-template-lint from 5.11.2 to 5.13.0

- [#218](https://github.com/lblod/frontend-embeddable-notule-editor/pull/218) [`6711cfa`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/6711cfa16130221d8a60ac30792684b1a209e346) Thanks [@redpencil-renovate-bot](https://github.com/apps/redpencil-renovate-bot)! - Bump qunit from 2.19.4 to 2.20.0

- [#220](https://github.com/lblod/frontend-embeddable-notule-editor/pull/220) [`96d59ab`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/96d59ab2e8f92b65d87ecd45e0252744c6e419a2) Thanks [@elpoelma](https://github.com/elpoelma)! - Update `@lblod/ember-rdfa-editor-lblod-plugins` to 16.0.0

- [#224](https://github.com/lblod/frontend-embeddable-notule-editor/pull/224) [`37888a3`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/37888a310f4aece5a00740f31cd37ee01d4c91d1) Thanks [@dkozickis](https://github.com/dkozickis)! - GN-4713: Include mention of paragraph markers in README to make it more discoverable

- [#220](https://github.com/lblod/frontend-embeddable-notule-editor/pull/220) [`96d59ab`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/96d59ab2e8f92b65d87ecd45e0252744c6e419a2) Thanks [@elpoelma](https://github.com/elpoelma)! - Update `ember-intl` to 6.1.0

- [#221](https://github.com/lblod/frontend-embeddable-notule-editor/pull/221) [`4dbc63c`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/4dbc63cce876a096786b011d9c7f6ecc6ff8366c) Thanks [@dkozickis](https://github.com/dkozickis)! - GN-4670: Fix column resize handles

- [#219](https://github.com/lblod/frontend-embeddable-notule-editor/pull/219) [`e45414e`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/e45414e704cfea1083321afa6a8ec6d1d1fd3b66) Thanks [@piemonkey](https://github.com/piemonkey)! - Add test environment to more closely mimic real installations

- [#220](https://github.com/lblod/frontend-embeddable-notule-editor/pull/220) [`96d59ab`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/96d59ab2e8f92b65d87ecd45e0252744c6e419a2) Thanks [@elpoelma](https://github.com/elpoelma)! - Update `@lblod/ember-rdfa-editor` package to 9.0.0

## 3.4.0

### Minor Changes

- [#216](https://github.com/lblod/frontend-embeddable-notule-editor/pull/216) [`d056b8a`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/d056b8a0402b9ed660718e18bb73982c0ee663a9) Thanks [@abeforgit](https://github.com/abeforgit)! - Add option to have the insert menu open on first load

- [#215](https://github.com/lblod/frontend-embeddable-notule-editor/pull/215) [`2a4b95d`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/2a4b95d8c351406297e1331e5f31be7d18b4b47c) Thanks [@abeforgit](https://github.com/abeforgit)! - enable resizeable table plugin

## 3.3.0

### Minor Changes

- [#207](https://github.com/lblod/frontend-embeddable-notule-editor/pull/207) [`ab49ce3`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/ab49ce3e928c86fe0489b5cecd44eb234bd634ab) Thanks [@abeforgit](https://github.com/abeforgit)! - enable alignment feature

### Patch Changes

- [#197](https://github.com/lblod/frontend-embeddable-notule-editor/pull/197) [`1cbd71c`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/1cbd71c5e9569b52e2f134972be1e3a529e52e11) Thanks [@redpencil-renovate-bot](https://github.com/apps/redpencil-renovate-bot)! - Bump @babel/plugin-syntax-decorators from 7.22.10 to 7.23.3

- [#198](https://github.com/lblod/frontend-embeddable-notule-editor/pull/198) [`f2600d4`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/f2600d478ae0b1def8748a7b2424d8424761f801) Thanks [@redpencil-renovate-bot](https://github.com/apps/redpencil-renovate-bot)! - Bump @ember/test-helpers from 2.9.3 to 2.9.4

- [#208](https://github.com/lblod/frontend-embeddable-notule-editor/pull/208) [`fa384c1`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/fa384c19719a129c77a51f4a482c3893dcb1996b) Thanks [@piemonkey](https://github.com/piemonkey)! - Hide the sidebar or insert menu when there are no plugins that make use of them.

- [#202](https://github.com/lblod/frontend-embeddable-notule-editor/pull/202) [`5f64fb6`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/5f64fb6f43444e1c71a55c19166c3d55b2af1f0a) Thanks [@elpoelma](https://github.com/elpoelma)! - Add default endpoint for citation plugin (https://codex.opendata.api.vlaanderen.be:8888/sparql)

- [#195](https://github.com/lblod/frontend-embeddable-notule-editor/pull/195) [`3bcf658`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/3bcf658030b25b1538636e01a1589509e9998043) Thanks [@abeforgit](https://github.com/abeforgit)! - Use consistent editor initialization method in readme

## 3.2.1

### Patch Changes

- [`ca2b40d`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/ca2b40d1c68c7af29a1c07a486c1d136fb64666a) Thanks [@elpoelma](https://github.com/elpoelma)! - Fix wrong variable name in `main.js`

## 3.2.0

### Minor Changes

- [#190](https://github.com/lblod/frontend-embeddable-notule-editor/pull/190) [`0a41560`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/0a41560f8e7ae4142d5f4184128414ad82517d3d) Thanks [@dkozickis](https://github.com/dkozickis)! - GN-4625: Expose CSS variable to adjust line spacing

  - `--say-paragraph-spacing`: spacing between paragraphs, default is 12px.
  - `--say-editor-line-height`: line height of the editor, default is 1.5.

- [#188](https://github.com/lblod/frontend-embeddable-notule-editor/pull/188) [`3be94d3`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/3be94d3c6f609e2f851583c91188085494d88ac1) Thanks [@piemonkey](https://github.com/piemonkey)! - Add confidentiality plugin

- [#187](https://github.com/lblod/frontend-embeddable-notule-editor/pull/187) [`91cb42b`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/91cb42bdd3c5491ed8b4c0a6a76a4882210099ee) Thanks [@elpoelma](https://github.com/elpoelma)! - Remove `space` invisible from formatting marks in order to improve performance

### Patch Changes

- [#178](https://github.com/lblod/frontend-embeddable-notule-editor/pull/178) [`5f0ef53`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/5f0ef539c2f564431826bc081f02613824002e65) Thanks [@elpoelma](https://github.com/elpoelma)! - Update `@lblod/ember-rdfa-editor` to 8.2.0

- [#189](https://github.com/lblod/frontend-embeddable-notule-editor/pull/189) [`0c31c71`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/0c31c715ae09060274ce584617a2d264625502ff) Thanks [@dkozickis](https://github.com/dkozickis)! - Introduce dummy Cypress test to validate that embeddable is launching

- [#186](https://github.com/lblod/frontend-embeddable-notule-editor/pull/186) [`8920243`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/89202439a77f333b6a871b6c896215fdcc525788) Thanks [@abeforgit](https://github.com/abeforgit)! - Add info about rdfa in the editor

- [#174](https://github.com/lblod/frontend-embeddable-notule-editor/pull/174) [`9794667`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/9794667dea80550c85a2b6c88de9ec46f00f3b75) Thanks [@piemonkey](https://github.com/piemonkey)! - Pass component classes to variable plugin instead of component names

- [#192](https://github.com/lblod/frontend-embeddable-notule-editor/pull/192) [`6a74ab3`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/6a74ab3fee5a0c0235ccfbd21d4a96fa1aaa5d56) Thanks [@piemonkey](https://github.com/piemonkey)! - Update readme to deprecate hosted version and to recommend use of unpkg.com instead

- [#188](https://github.com/lblod/frontend-embeddable-notule-editor/pull/188) [`9287abd`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/9287abd6ddad6a48acb2e67c24242d2318385392) Thanks [@piemonkey](https://github.com/piemonkey)! - Update `@lblod/ember-rdfa-editor-plugins` to 15.2.2

## 3.1.0

### Minor Changes

- [#183](https://github.com/lblod/frontend-embeddable-notule-editor/pull/183) [`5c5811e`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/5c5811e041014a0dcf72e456efe272073b6ccdc2) Thanks [@dkozickis](https://github.com/dkozickis)! - GN-4562: Inform user how to apply CSS overrides

### Patch Changes

- [#185](https://github.com/lblod/frontend-embeddable-notule-editor/pull/185) [`f49b40a`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/f49b40ae0d323b388ce96d38dd469c60d8f8772e) Thanks [@dkozickis](https://github.com/dkozickis)! - GN-4610: Remove `endpoint` config for citation plugin

  Remove the `endpoint` config for the citation plugin used in the `test.html` file.

- [#184](https://github.com/lblod/frontend-embeddable-notule-editor/pull/184) [`8dbf8d9`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/8dbf8d9d3524dd70af89def788779149ce693a95) Thanks [@dkozickis](https://github.com/dkozickis)! - GN-4615: Fix display of some SVG icons

  Overrides "fill" attribute of "g" elements with `fill="none"` with `fill="currentColor"`
  to make sure we see the icons. This is an artifact of using `svg-jar` to inline the icons.

## 3.0.2

### Patch Changes

- [`b4710f7`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/b4710f7540062268597168f9257b209fd24c109a) Thanks [@abeforgit](https://github.com/abeforgit)! - set package scope to public

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
