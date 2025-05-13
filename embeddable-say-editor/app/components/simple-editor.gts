import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';
import { modifier } from 'ember-modifier';

import { SayController } from '@lblod/ember-rdfa-editor';

import { getActiveEditableNode } from '@lblod/ember-rdfa-editor/plugins/_private/editable-node';
import EditorContainer from '@lblod/ember-rdfa-editor/components/editor-container';
import Editor from '@lblod/ember-rdfa-editor/components/editor';
import TableTooltip from '@lblod/ember-rdfa-editor/components/plugins/table/table-tooltip';
import { DEFAULT_CONTEXT } from '../utils/constants';
import type IntlService from 'ember-intl/services/intl';
import Toolbar from './toolbar';
import { hash } from '@ember/helper';
import type { EditorElement } from '../editor-element';
import {
  setupPlugins,
  type EditorSetup,
} from '../plugins/setup/setup-plugins.ts';
import type { KebabPluginName } from '../plugins/embedded-plugin.ts';
import type { ModifierLike } from '@glint/template';
import type { PluginOptions } from '../plugins/plugin-registry';
import Sidebar from './sidebar.gts';

interface Sig {
  Blocks: { default: [] };
}
export default class SimpleEditorComponent extends Component<Sig> {
  @tracked controller?: SayController;

  @tracked environment = '';

  @tracked showEnvironmentBanner = false;

  @tracked setup?: EditorSetup;

  resolveEditorPromise?: () => void;

  declare editorElement: EditorElement;

  @service
  declare intl: IntlService;

  get vocabString() {
    return DEFAULT_CONTEXT.vocab;
  }

  get prefixString() {
    const ctx = DEFAULT_CONTEXT;
    return (
      Object.keys(ctx.prefix) as Array<keyof (typeof DEFAULT_CONTEXT)['prefix']>
    )
      .map((key) => `${key}: ${ctx.prefix[key]}`)
      .join(' ');
  }

  @action
  handleRdfaEditorInit(controller: SayController) {
    // This, together with `insertedInDom` adds the public-facing logic available to the consumer.
    // This includes the controller with most of the functionality
    // and some other helper functions for easy accessing.
    this.controller = controller;
    this.editorElement.getHtmlContent = this.getHtmlContent;
    this.editorElement.setHtmlContent = this.setHtmlContent;
    this.editorElement.controller = this.controller;
    this.resolveEditorPromise?.();
  }

  insertedInDom: ModifierLike<{ Element: HTMLElement }> = modifier(
    (element: HTMLElement) => {
      this.setVocab(element);
      this.setPrefix(element);
      this.editorElement = element as EditorElement;
      // `insertedInDom` will run before `handleRdfaEditorInit`, which gives access to the controller
      // these methods can be used before the controller has been loaded
      this.editorElement.initEditor = this.initEditor;
      this.editorElement.enableEnvironmentBanner = this.enableEnvironmentBanner;
      this.editorElement.disableEnvironmentBanner =
        this.disableEnvironmentBanner;
      this.editorElement.setLocaleToDutch = this.setLocaleToDutch;
      this.editorElement.setLocaleToEnglish = this.setLocaleToEnglish;
      this.editorElement.getLocale = this.getLocale;
      this.editorElement.setLocale = this.setLocale;
    },
  );

  /**
   * this is a workaround because emberjs does not allow us to assign the prefix attribute in the template
   * see https://github.com/emberjs/ember.js/issues/19369
   */
  @action
  setPrefix(element: HTMLElement) {
    element.setAttribute('prefix', this.prefixString);
  }

  @action
  setVocab(element: HTMLElement) {
    element.setAttribute('vocab', this.vocabString);
  }

  getHtmlContent = () => {
    return this.controller?.htmlContent ?? '';
  };

  setHtmlContent = (content: string) => {
    if (!this.controller) {
      throw new Error('Controller used before editor was initialized');
    }
    this.controller.setHtmlContent(content);
  };

  setLocaleToDutch = () => {
    this.intl.setLocale(['nl-BE']);
  };

  setLocaleToEnglish = () => {
    this.intl.setLocale(['en-US', 'nl-BE']);
  };

  getLocale = () => {
    return this.intl.primaryLocale ?? '';
  };

  setLocale = (locale: string) => {
    return this.intl.setLocale([locale, 'nl-BE']);
  };

  @action
  setEnvironment(environment: string) {
    this.environment = environment;
  }

  enableEnvironmentBanner = (environment: string = 'Test') => {
    this.environment = environment;
    this.showEnvironmentBanner = true;
  };

  disableEnvironmentBanner = () => {
    this.showEnvironmentBanner = false;
  };

  initEditor = async (
    plugins: readonly KebabPluginName[],
    options: PluginOptions,
  ): Promise<void> => {
    const setup = setupPlugins({ plugins, options, intl: this.intl });

    const editorPromise = new Promise<void>((resolve): void => {
      this.resolveEditorPromise = resolve;
    });
    this.setup = setup;
    return editorPromise;
  };

  get activeNode() {
    if (this.controller) {
      return getActiveEditableNode(this.controller.activeEditorState);
    }

    return null;
  }
  <template>
    <div id="ember-appuniversum-wormhole"></div>
    <div {{this.insertedInDom}} class="notule-editor">
      <div id="ember-basic-dropdown-wormhole"></div>
      {{#if this.setup}}
        {{#let this.setup as |s|}}
          <EditorContainer
            @editorOptions={{hash showPaper=true showToolbarBottom=false}}
          >
            <:top>
              {{#if this.controller}}
                <Toolbar
                  @activeNode={{this.activeNode}}
                  @toolbar={{s.toolbarConfig}}
                  @controller={{this.controller}}
                  @setup={{s}}
                />
              {{/if}}
            </:top>
            <:default>
              <Editor
                @plugins={{s.prosePlugins}}
                @schema={{s.schema}}
                @nodeViews={{s.nodeViews}}
                @rdfaEditorInit={{this.handleRdfaEditorInit}}
              />
              {{#if this.controller}}
                <TableTooltip @controller={{this.controller}} />
              {{/if}}
            </:default>
            <:aside>
              {{#if this.controller}}
                <Sidebar
                  @activeNode={{this.activeNode}}
                  @sidebar={{s.sidebarConfig}}
                  @controller={{this.controller}}
                  @setup={{s}}
                />
              {{/if}}
            </:aside>
          </EditorContainer>
        {{/let}}
      {{/if}}
    </div>
    {{yield}}
  </template>
}
