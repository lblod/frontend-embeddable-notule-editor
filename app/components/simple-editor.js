import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

import { Schema } from '@lblod/ember-rdfa-editor';

import {
  link,
  linkPasteHandler,
  linkView,
} from '@lblod/ember-rdfa-editor/plugins/link';
import {
  table_of_contents,
  tableOfContentsView,
} from '@lblod/ember-rdfa-editor-lblod-plugins/plugins/table-of-contents-plugin/nodes';
import { firefoxCursorFix } from '@lblod/ember-rdfa-editor/plugins/firefox-cursor-fix';
import { lastKeyPressedPlugin } from '@lblod/ember-rdfa-editor/plugins/last-key-pressed';

import {
  em,
  strikethrough,
  strong,
  subscript,
  superscript,
  underline,
} from '@lblod/ember-rdfa-editor/plugins/text-style';
import {
  block_rdfa,
  docWithConfig,
  hard_break,
  horizontal_rule,
  invisible_rdfa,
  paragraph,
  repaired_block,
  text,
} from '@lblod/ember-rdfa-editor/nodes';
import {
  tableKeymap,
  tableNodes,
  tablePlugin,
} from '@lblod/ember-rdfa-editor/plugins/table';
import {
  STRUCTURE_NODES,
  STRUCTURE_SPECS,
} from '@lblod/ember-rdfa-editor-lblod-plugins/plugins/article-structure-plugin/structures';
import {
  bullet_list,
  list_item,
  ordered_list,
} from '@lblod/ember-rdfa-editor/plugins/list';
import { placeholder } from '@lblod/ember-rdfa-editor/plugins/placeholder';
import { heading } from '@lblod/ember-rdfa-editor/plugins/heading';
import { blockquote } from '@lblod/ember-rdfa-editor/plugins/blockquote';
import { code_block } from '@lblod/ember-rdfa-editor/plugins/code';
import { image, imageView } from '@lblod/ember-rdfa-editor/plugins/image';
import { inline_rdfa } from '@lblod/ember-rdfa-editor/marks';

import {
  createInvisiblesPlugin,
  hardBreak,
  heading as headingInvisible,
  paragraph as paragraphInvisible,
} from '@lblod/ember-rdfa-editor/plugins/invisibles';

import {
  besluitNodes,
  structureSpecs as besluitStructure,
} from '@lblod/ember-rdfa-editor-lblod-plugins/plugins/standard-template-plugin';

import { citationPlugin } from '@lblod/ember-rdfa-editor-lblod-plugins/plugins/citation-plugin';

import { roadsign_regulation } from '@lblod/ember-rdfa-editor-lblod-plugins/plugins/roadsign-regulation-plugin/nodes';
import { highlight } from '@lblod/ember-rdfa-editor/plugins/highlight/marks/highlight';
import { color } from '@lblod/ember-rdfa-editor/plugins/color/marks/color';

import {
  templateComment,
  templateCommentView,
} from '@lblod/ember-rdfa-editor-lblod-plugins/plugins/template-comments-plugin';
import {
  address,
  addressView,
  date,
  dateView,
  codelist,
  codelistView,
  location,
  locationView,
  number,
  numberView,
  text_variable,
  textVariableView,
} from '@lblod/ember-rdfa-editor-lblod-plugins/plugins/variable-plugin/variables';
import TextVariableInsertComponent from '@lblod/ember-rdfa-editor-lblod-plugins/components/variable-plugin/text/insert';
import NumberInsertComponent from '@lblod/ember-rdfa-editor-lblod-plugins/components/variable-plugin/number/insert';
import DateInsertVariableComponent from '@lblod/ember-rdfa-editor-lblod-plugins/components/variable-plugin/date/insert-variable';
import LocationInsertComponent from '@lblod/ember-rdfa-editor-lblod-plugins/components/variable-plugin/location/insert';
import CodelistInsertComponent from '@lblod/ember-rdfa-editor-lblod-plugins/components/variable-plugin/codelist/insert';
import VariablePluginAddressInsertVariableComponent from '@lblod/ember-rdfa-editor-lblod-plugins/components/variable-plugin/address/insert-variable';
import { redacted } from '@lblod/ember-rdfa-editor-lblod-plugins/plugins/confidentiality-plugin/marks/redacted';

import {
  defaultCitationPluginConfig,
  defaultLocationVariablePluginConfig,
  defaultRdfaDatePluginConfig,
  defaultRoadsignRegulationPluginConfig,
  defaultTableOfContentsPluginConfig,
  mergeConfigs,
} from '../config/defaults';

export default class SimpleEditorComponent extends Component {
  @tracked controller;

  @tracked environment = '';

  @tracked showEnvironmentBanner = false;
  @tracked initCompleted = false;
  @tracked schema;
  @tracked config;
  @tracked nodeViews;
  @tracked activePlugins;
  @tracked citationPlugin;
  @tracked hasSidebarPlugins;
  @service intl;

  get vocabString() {
    return this.args.model.context.vocab;
  }

  get prefixString() {
    const ctx = this.args.model.context;
    return Object.keys(ctx.prefix)
      .map((key) => `${key}: ${ctx.prefix[key]}`)
      .join(' ');
  }

  @action
  handleRdfaEditorInit(controller) {
    // This, together with `insertedInDom` adds the public-facing logic available to the consumer.
    // This includes the controller with most of the functionality
    // and some other helper functions for easy accessing.
    this.controller = controller;
    this.editorElement.getHtmlContent = this.getHtmlContent;
    this.editorElement.setHtmlContent = this.setHtmlContent;
    this.editorElement.controller = this.controller;
    this.resolveEditorPromise?.();
  }

  @action
  insertedInDom(element) {
    this.setVocab(element);
    this.setPrefix(element);
    this.editorElement = element;
    // `insertedInDom` will run before `handleRdfaEditorInit`, which gives access to the controller
    // these methods can be used before the controller has been loaded
    this.editorElement.initEditor = this.initEditor;
    this.editorElement.enableEnvironmentBanner = this.enableEnvironmentBanner;
    this.editorElement.disableEnvironmentBanner = this.disableEnvironmentBanner;
    this.editorElement.setLocaleToDutch = this.setLocaleToDutch;
    this.editorElement.setLocaleToEnglish = this.setLocaleToEnglish;
    this.editorElement.getLocale = this.getLocale;
    this.editorElement.setLocale = this.setLocale;
  }

  /**
   * this is a workaround because emberjs does not allow us to assign the prefix attribute in the template
   * see https://github.com/emberjs/ember.js/issues/19369
   */
  @action
  setPrefix(element) {
    element.setAttribute('prefix', this.prefixString);
  }

  @action
  setVocab(element) {
    element.setAttribute('vocab', this.vocabString);
  }

  @action
  getHtmlContent() {
    return this.controller.htmlContent;
  }

  @action
  setHtmlContent(content) {
    this.controller.setHtmlContent(content);
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
  setLocale(locale) {
    return this.intl.setLocale([locale, 'nl-BE']);
  }

  @action
  setEnvironment(environment) {
    this.environment = environment;
  }

  @action
  enableEnvironmentBanner(environment = 'Test') {
    this.environment = environment;
    this.showEnvironmentBanner = true;
  }

  @action
  disableEnvironmentBanner() {
    this.showEnvironmentBanner = false;
  }

  @action
  async initEditor(activePlugins, userConfig = {}) {
    this.initCompleted = false;
    this.activePlugins = activePlugins;
    const config = {
      link: {
        interactive: true,
      },
    };
    let nodes = {
      doc: docWithConfig({
        content: userConfig.docContent ?? 'block+',
      }),
      paragraph,
      repaired_block,
      list_item,
      ordered_list,
      bullet_list,
      placeholder,
      blockquote,
      horizontal_rule,
      code_block,
      text,
      image,
      hard_break,
      ...tableNodes({ tableGroup: 'block', cellContent: 'block+' }),
      link: link(config.link),
    };
    const marks = {
      inline_rdfa,
      em,
      strong,
      underline,
      strikethrough,
      highlight,
      color,
      subscript,
      superscript,
    };
    const plugins = [
      tablePlugin,
      tableKeymap,
      linkPasteHandler(nodes.link),
      firefoxCursorFix(),
      lastKeyPressedPlugin,
      createInvisiblesPlugin(
        [hardBreak, paragraphInvisible, headingInvisible],
        {
          shouldShowInvisibles: false,
        }
      ),
    ];
    const nodeViews = {};
    const setup = {
      nodes,
      marks,
      plugins,
      nodeViews,
      userConfig,
      config,
      // Control whether UI aspects are needed
      uiConfig: { insertMenu: false, sidebar: false },
    };
    if (activePlugins.includes('citation')) {
      this.setupCitationPlugin(setup);
    }
    if (activePlugins.includes('article-structure')) {
      this.setupArticleStructurePlugin(setup);
    }
    if (activePlugins.includes('besluit')) {
      this.setupBesluitPlugin(setup);
    }
    if (activePlugins.includes('roadsign-regulation')) {
      this.setupRoadsignPlugin(setup);
    }
    if (activePlugins.includes('variable')) {
      this.setupVariablePlugin(setup);
    }
    if (activePlugins.includes('table-of-contents')) {
      this.setupTOCPlugin(setup);
    }
    if (activePlugins.includes('template-comments')) {
      this.setupTemplateCommentsPlugin(setup);
    }
    if (activePlugins.includes('confidentiality')) {
      this.setupConfidentialityPlugin(setup);
    }
    this.config = setup.config;
    this.uiConfig = setup.uiConfig;
    setup.nodes = { ...setup.nodes, heading, invisible_rdfa, block_rdfa };
    this.schema = new Schema({ nodes: setup.nodes, marks: setup.marks });

    this.plugins = setup.plugins;
    this.nodeViews = (controller) => {
      const views = {
        link: linkView(setup.config.link)(controller),
        image: imageView(controller),
      };
      for (const [key, value] of Object.entries(setup.nodeViews)) {
        views[key] = value(controller);
      }
      return views;
    };

    const editorPromise = new Promise(
      (resolve) => (this.resolveEditorPromise = resolve)
    );
    this.initCompleted = true;
    await editorPromise;
  }

  setupCitationPlugin({ userConfig, config, plugins, uiConfig }) {
    config.citation = mergeConfigs(
      defaultCitationPluginConfig,
      userConfig.citation
    );

    const citationPluginVariable = citationPlugin(config.citation);
    this.citationPlugin = citationPluginVariable;
    plugins.push(citationPluginVariable);
    uiConfig.insertMenu = true;
    uiConfig.sidebar = true;
  }

  setupArticleStructurePlugin(setup) {
    const { config } = setup;
    config.articleStructure = {};
    config.articleStructure.structures = STRUCTURE_SPECS;
    setup.nodes = { ...setup.nodes, ...STRUCTURE_NODES };
    setup.uiConfig.insertMenu = true;
    setup.uiConfig.sidebar = true;
  }

  setupBesluitPlugin(setup) {
    const { config } = setup;
    config.besluit = {};
    config.besluit.structures = besluitStructure;
    setup.nodes = { ...setup.nodes, ...besluitNodes };
    setup.uiConfig.insertMenu = true;
    setup.uiConfig.sidebar = true;
  }

  setupRoadsignPlugin(setup) {
    const { nodes, config, userConfig } = setup;

    nodes.roadsign_regulation = roadsign_regulation;

    config.roadsignRegulation = mergeConfigs(
      defaultRoadsignRegulationPluginConfig,
      userConfig.roadsignRegulation
    );
    setup.uiConfig.insertMenu = true;
    setup.uiConfig.sidebar = true;
  }

  setupVariablePlugin(setup) {
    const { config, userConfig, nodes, nodeViews } = setup;

    config.variable = {};
    config.variable.insert = {
      enable: userConfig.variable?.insert?.enable ?? true,
    };
    config.variable.edit = {
      enable: userConfig.variable?.edit?.enable ?? true,
    };
    config.variable.edit.date = mergeConfigs(
      defaultRdfaDatePluginConfig,
      userConfig.variable?.edit?.date
    );
    config.variable.edit.location = mergeConfigs(
      defaultLocationVariablePluginConfig,
      userConfig.variable?.edit?.location
    );

    config.variable.edit.codelist = {};

    config.variable.edit.address = {
      defaultMunicipality:
        userConfig.variable?.edit?.address?.defaultMunicipality,
    };

    nodes.text_variable = text_variable;
    nodes.number = number;
    nodes.address = address;
    nodes.date = date(config.variable.edit.date);
    nodes.location = location;
    nodes.codelist = codelist;

    if (config.variable.insert.enable) {
      config.variable.insert.variableTypes = [
        {
          label: this.intl.t('editor.variables.text'),
          component: TextVariableInsertComponent,
        },
        {
          label: this.intl.t('editor.variables.number'),
          component: NumberInsertComponent,
        },
        {
          label: this.intl.t('editor.variables.location'),
          component: LocationInsertComponent,
          options: {
            endpoint:
              userConfig.variable?.insert?.locationEndpoint ??
              'https://dev.roadsigns.lblod.info/sparql',
          },
        },
        {
          label: this.intl.t('editor.variables.address'),
          component: VariablePluginAddressInsertVariableComponent,
        },
        {
          label: this.intl.t('editor.variables.date'),
          component: DateInsertVariableComponent,
        },
        {
          label: this.intl.t('editor.variables.codelist'),
          component: CodelistInsertComponent,
          options: {
            endpoint:
              userConfig.variable?.insert?.codelistEndpoint ??
              'https://reglementairebijlagen.lblod.info/sparql',
            publisher: userConfig.variable?.insert?.codelistPublisher,
          },
        },
      ];
    }

    nodeViews.address = (controller) => addressView(controller);
    nodeViews.number = (controller) => numberView(controller);
    nodeViews.text_variable = (controller) => textVariableView(controller);
    nodeViews.location = (controller) => locationView(controller);
    nodeViews.codelist = (controller) => codelistView(controller);
    nodeViews.date = (controller) =>
      dateView(config.variable.edit.date)(controller);

    setup.uiConfig.sidebar = true;
  }

  setupTOCPlugin(setup) {
    const { config, userConfig, nodes, nodeViews } = setup;

    config.tableOfContents = mergeConfigs(
      defaultTableOfContentsPluginConfig,
      userConfig.tableOfContents
    );

    nodes.table_of_contents = table_of_contents(config.tableOfContents);

    nodeViews.table_of_contents = (controller) =>
      tableOfContentsView(config.tableOfContents)(controller);
  }

  setupTemplateCommentsPlugin(setup) {
    const { nodes, nodeViews } = setup;
    nodes.templateComment = templateComment;
    nodeViews.templateComment = (controller) => templateCommentView(controller);
    setup.uiConfig.insertMenu = true;
    setup.uiConfig.sidebar = true;
  }

  setupConfidentialityPlugin(setup) {
    const { marks } = setup;
    marks.redacted = redacted;
  }
}
