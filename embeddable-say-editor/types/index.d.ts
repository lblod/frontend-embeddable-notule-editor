/// <reference types="@embroider/core/virtual" />
/// <reference types="vite/client" />

declare module '@lblod/ember-rdfa-editor/components/toolbar/button' {
  import Component from '@glimmer/component';
  interface Sig {
    Args: {
      icon?: ComponentLike;
      optionsIcon?: ComponentLike;
    };
  }
  export default class ToolbarButton extends Component<Sig> {}
}
