import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';
import { modifier } from 'ember-modifier';

import { SayController, Schema } from '@lblod/ember-rdfa-editor';

import { getActiveEditableNode } from '@lblod/ember-rdfa-editor/plugins/_private/editable-node';
import EditorContainer from '@lblod/ember-rdfa-editor/components/editor-container';
import Editor from '@lblod/ember-rdfa-editor/components/editor';
import TableTooltip from '@lblod/ember-rdfa-editor/components/plugins/table/table-tooltip';
//@ts-expect-error no types yet
import EnvironmentBanner from '@lblod/ember-environment-banner/components/environment-banner';
import { DEFAULT_CONTEXT } from '../utils/constants';
import type IntlService from 'ember-intl/services/intl';
import Toolbar from './toolbar';
import Sidebar from './sidebar';
import { hash } from '@ember/helper';
import type { EditorElement } from '../../shared-types/editor-element';
import { setupPlugins, type EditorSetup } from '../config/setup-plugins';

interface Sig {
  Args: void;
  Blocks: { default: [] };
}
export default class SimpleEditorComponent extends Component<Sig> {
  @tracked controller?: SayController;

  @tracked environment = '';

  @tracked showEnvironmentBanner = false;
  @tracked initCompleted = false;

  @tracked schema?: Schema;

  resolveEditorPromise?: (value?: unknown) => void;

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

  insertedInDom = modifier((element: HTMLElement) => {
    this.setVocab(element);
    this.setPrefix(element);
    this.editorElement = element as EditorElement;
    // `insertedInDom` will run before `handleRdfaEditorInit`, which gives access to the controller
    // these methods can be used before the controller has been loaded
    this.editorElement.initEditor = this.initEditor;
    this.editorElement.enableEnvironmentBanner = this.enableEnvironmentBanner;
    this.editorElement.disableEnvironmentBanner = this.disableEnvironmentBanner;
    this.editorElement.setLocaleToDutch = this.setLocaleToDutch;
    this.editorElement.setLocaleToEnglish = this.setLocaleToEnglish;
    this.editorElement.getLocale = this.getLocale;
    this.editorElement.setLocale = this.setLocale;
  });

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

  @action
  getHtmlContent() {
    return this.controller?.htmlContent;
  }

  @action
  setHtmlContent(content: string) {
    this.controller?.setHtmlContent(content);
  }

  @action
  setLocaleToDutch() {
    this.intl.setLocale(['nl-BE']);
  }

  @action
  setLocaleToEnglish() {
    this.intl.setLocale(['en-US', 'nl-BE']);
  }

  @action
  getLocale() {
    return this.intl.primaryLocale;
  }

  @action
  setLocale(locale: string) {
    return this.intl.setLocale([locale, 'nl-BE']);
  }

  @action
  setEnvironment(environment: string) {
    this.environment = environment;
  }

  @action
  enableEnvironmentBanner(environment: string = 'Test') {
    this.environment = environment;
    this.showEnvironmentBanner = true;
  }

  @action
  disableEnvironmentBanner() {
    this.showEnvironmentBanner = false;
  }

  @action
  async initEditor(plugins: InitializedPluginSetup[]) {
    const setup = setupPlugins(plugins);
    this.schema = new Schema({ nodes: setup.nodes, marks: setup.marks });

    const editorPromise = new Promise(
      (resolve) => (this.resolveEditorPromise = resolve),
    );
    this.initCompleted = true;
    return editorPromise;
  }

  get activeNode() {
    if (this.controller) {
      return getActiveEditableNode(this.controller.activeEditorState);
    }

    return null;
  }
  <template>
    <div id='ember-appuniversum-wormhole'></div>
    {{#if this.showEnvironmentBanner}}
      <EnvironmentBanner
        @environmentName={{this.environment}}
        @applicationName='Embeddable Notule Editor'
      />
    {{/if}}
    <div {{this.insertedInDom}} class='notule-editor'>
      <div id='ember-basic-dropdown-wormhole'></div>
      {{#if this.initCompleted}}
        <EditorContainer
          @editorOptions={{hash showPaper=true showToolbarBottom=false}}
        >
          <:top>
            {{#if this.controller}}
              <Toolbar
                @activeNode={{this.activeNode}}
                @toolbar={{this.defaultToolbarConfig}}
                @controller={{this.controller}}
                @plugins={{this.activePlugins}}
                @config={{this.config}}
              />
            {{/if}}
          </:top>
          <:default>
            <Editor
              @plugins={{this.plugins}}
              @schema={{this.schema}}
              @nodeViews={{this.nodeViews}}
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
                @sidebar={{this.defaultSidebarConfig}}
                @controller={{this.controller}}
                @plugins={{this.activePlugins}}
                @config={{this.config}}
              />
            {{/if}}
          </:aside>
        </EditorContainer>
      {{/if}}
    </div>
    {{yield}}
  </template>
}
