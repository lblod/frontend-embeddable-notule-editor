# test-angular

## 5.0.12

### Patch Changes

- Updated dependencies [[`b1c1b62`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/b1c1b629861d404b1e92084a48e7c149c10c5fa6)]:
  - @lblod/embeddable-say-editor@7.0.1

## 5.0.11

### Patch Changes

- [#296](https://github.com/lblod/frontend-embeddable-notule-editor/pull/296) [`1339acd`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/1339acdf8542cf39dbea49397a99a227d26a0b77) Thanks [@lagartoverde](https://github.com/lagartoverde)! - New UI for input-fields

  This version introduces our new "floating" UI paradigm for all input fields (aka "variables"). We already saw this UI for number fields and for links, but now every interactive element in the text follows the same logic. Rather than requiring the user to fiddle with the sidebar, the edit-actions open immediately next to the interactive node, making it easy to discover, and following much more closely to established UI paradigms in other editors.

  This is released as a breaking change, as we do not currently plan on maintaining support for the old "sidebar cards" workflow. Therefore, it is not possible to disable the new edit UI in this version. Since the UI is unobtrusive by design and only shows itself when needed, we did not see a reason to make it possible to disable it.

  We are of course open to feedback. Let us know your usecases, and we can add new configuration options quite easily.

  ### Breaking changes

  #### new ui

  As part of this change, the following configuration options were removed, since they no longer make sense:
  - the `variable:edit` widget: this enabled the sidebar-cards for the various variables. As mentioned, this workflow is no longer supported, and the new edit interfaces appear automatically in-place when a variable is selected.
  - the `variable>edit>enable` option: this one never made much sense: why would you ever need variables that you couldn't edit? In the background, this used to also enable the parsing support for these interactive variables. But now, this is simply always enabled and has become a core feature of the editor. When a template is loaded which contains variables, they will always render as expected.

  The `variable>insert>enable` option and widget does remain, since "filling in" interactive fields is a significantly different action compared to defining input fields.

  #### others

  Additionally the deprecated "address" variable was removed, since it is superceded by the much more powerful "location" variable. The location variable can auto-convert from old address variables in your documents, but it is unlikely you'll have those in the first place.

- Updated dependencies [[`1339acd`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/1339acdf8542cf39dbea49397a99a227d26a0b77), [`66a6130`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/66a61309e7f235e0c1d29f25b517a13ee57048b9), [`2670bee`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/2670bee1f895e09daa9523932a908c8b0a3750db), [`2670bee`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/2670bee1f895e09daa9523932a908c8b0a3750db), [`bafbaea`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/bafbaea2ae02e089de66bfb0c711809aeb3cde43)]:
  - @lblod/embeddable-say-editor@7.0.0

## 5.0.10

### Patch Changes

- Updated dependencies [[`4e24a29`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/4e24a29cc33a688d4cfd454fad580623ed1ac1fc), [`06fdeec`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/06fdeec79561e717927b2bde0dccd716c042a86a), [`74d5925`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/74d592552f74f9eefb041577cff29e875d78332e), [`2f43329`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/2f43329b824766a19476a42c5f5088c502b813c4), [`4a1797f`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/4a1797fb239e5072fb4d086e64359dd62a9becbd), [`e433f39`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/e433f395ac105044f2f75326f8a3265fabc23878), [`06fdeec`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/06fdeec79561e717927b2bde0dccd716c042a86a), [`06fdeec`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/06fdeec79561e717927b2bde0dccd716c042a86a), [`411170e`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/411170ee761f8cc76dac94d8401132eac69229ab), [`7881da9`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/7881da9d133df577186e9c5b37a77e8843b158bc), [`f39ca76`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/f39ca76c47c03c89068436a4f728474ac3c3c866), [`7b9e320`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/7b9e320635d8b28c0a1faef9c13b1e1002dbc1d2)]:
  - @lblod/embeddable-say-editor@6.5.0

## 5.0.9

### Patch Changes

- Updated dependencies [[`47e97bc`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/47e97bc08ad05eabc5d925bb74911ab60dd01efa)]:
  - @lblod/embeddable-say-editor@6.4.1

## 5.0.8

### Patch Changes

- Updated dependencies [[`89b9cb3`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/89b9cb381c2776aa1ae1915ed1202789afb6139a), [`14b61fa`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/14b61fa617707fa2eba393c0d120c5c6fca54806), [`4baf1d5`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/4baf1d583a19601dda2c673bf56b94903d3e0d68)]:
  - @lblod/embeddable-say-editor@6.4.0

## 5.0.7

### Patch Changes

- Updated dependencies [[`21f7b3e`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/21f7b3ea00eba5f4399748691b6a89bdaf78d948)]:
  - @lblod/embeddable-say-editor@6.3.0

## 5.0.6

### Patch Changes

- Updated dependencies [[`125ee97`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/125ee9734b91d70970bc99363bd16624aad88862)]:
  - @lblod/embeddable-say-editor@6.2.1

## 5.0.5

### Patch Changes

- Updated dependencies [[`1a065b4`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/1a065b44354d6864c9bc93b8e7db42c385afbb0a), [`1a065b4`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/1a065b44354d6864c9bc93b8e7db42c385afbb0a), [`1a065b4`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/1a065b44354d6864c9bc93b8e7db42c385afbb0a)]:
  - @lblod/embeddable-say-editor@6.2.0

## 5.0.4

### Patch Changes

- Updated dependencies [[`f870bd0`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/f870bd00d08c7e7149749df0cc881e110ceb7a36), [`bf445dc`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/bf445dcc8c29250a2d7e11ede4219dbc0906b632)]:
  - @lblod/embeddable-say-editor@6.1.0

## 5.0.3

### Patch Changes

- Updated dependencies [[`abc349e`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/abc349ef8dc794ca72e02ea54efb139fceabec98)]:
  - @lblod/embeddable-say-editor@6.0.1

## 5.0.2

### Patch Changes

- Updated dependencies [[`fbc7f5f`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/fbc7f5f6ba4e559ba9aa2e86e465d00d54b84edb), [`1f2ab76`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/1f2ab76c93667935f6a4f85f9f6f3af6d0709756), [`fbc7f5f`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/fbc7f5f6ba4e559ba9aa2e86e465d00d54b84edb), [`b89697a`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/b89697a7d7ea43638f9bda87134a6f7c509cbad3), [`3da99de`](https://github.com/lblod/frontend-embeddable-notule-editor/commit/3da99de946ad8ff342924832a090879c4ee8d890)]:
  - @lblod/embeddable-say-editor@6.0.0
