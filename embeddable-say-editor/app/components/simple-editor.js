import { v4 as uuidv4 } from 'uuid';
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
  inlineRdfaWithConfig,
  inlineRdfaWithConfigView,
} from '@lblod/ember-rdfa-editor/nodes/inline-rdfa';
import {
  table_of_contents,
  tableOfContentsView,
} from '@lblod/ember-rdfa-editor-lblod-plugins/plugins/table-of-contents-plugin/nodes';
import { firefoxCursorFix } from '@lblod/ember-rdfa-editor/plugins/firefox-cursor-fix';
import { lastKeyPressedPlugin } from '@lblod/ember-rdfa-editor/plugins/last-key-pressed';
import recreateUuidsOnPaste from '@lblod/ember-rdfa-editor/plugins/recreateUuidsOnPaste';

import {
  em,
  strikethrough,
  strong,
  subscript,
  superscript,
  underline,
} from '@lblod/ember-rdfa-editor/plugins/text-style';
import {
  docWithConfig,
  paragraph,
  text,
  hard_break,
  horizontal_rule,
  blockRdfaWithConfig,
  invisibleRdfaWithConfig,
  repairedBlockWithConfig,
} from '@lblod/ember-rdfa-editor/nodes';
import {
  tableKeymap,
  tableNodes,
  tablePlugins,
} from '@lblod/ember-rdfa-editor/plugins/table';
import { placeholder } from '@lblod/ember-rdfa-editor/plugins/placeholder';
import { blockquote } from '@lblod/ember-rdfa-editor/plugins/blockquote';
import { code_block } from '@lblod/ember-rdfa-editor/plugins/code';
import {
  imageWithConfig,
  imageView,
  checkPasteSize,
} from '@lblod/ember-rdfa-editor/plugins/image';

import {
  editableNodePlugin,
  getActiveEditableNode,
} from '@lblod/ember-rdfa-editor/plugins/_private/editable-node';
import AttributeEditor from '@lblod/ember-rdfa-editor/components/_private/attribute-editor';
import RdfaEditor from '@lblod/ember-rdfa-editor/components/_private/rdfa-editor';
import DebugInfo from '@lblod/ember-rdfa-editor/components/_private/debug-info';
import {
  createInvisiblesPlugin,
  hardBreak,
  heading as headingInvisible,
  paragraph as paragraphInvisible,
} from '@lblod/ember-rdfa-editor/plugins/invisibles';
import { citationPlugin } from '@lblod/ember-rdfa-editor-lblod-plugins/plugins/citation-plugin';
import { roadsign_regulation } from '@lblod/ember-rdfa-editor-lblod-plugins/plugins/roadsign-regulation-plugin/nodes';
import { highlight } from '@lblod/ember-rdfa-editor/plugins/highlight/marks/highlight';
import { color } from '@lblod/ember-rdfa-editor/plugins/color/marks/color';
import {
  structureWithConfig,
  structureViewWithConfig,
} from '@lblod/ember-rdfa-editor-lblod-plugins/plugins/structure-plugin/node';
import StructureControlCardComponent from '@lblod/ember-rdfa-editor-lblod-plugins/components/structure-plugin/control-card';
import InsertArticleComponent from '@lblod/ember-rdfa-editor-lblod-plugins/components/decision-plugin/insert-article';
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
  defaultLocationPluginConfig,
  mergeConfigs,
} from '../config/defaults';
import {
  bulletListWithConfig,
  listItemWithConfig,
  orderedListWithConfig,
} from '@lblod/ember-rdfa-editor/plugins/list';
import { headingWithConfig } from '@lblod/ember-rdfa-editor/plugins/heading';
import {
  osloLocation,
  osloLocationView,
} from '@lblod/ember-rdfa-editor-lblod-plugins/plugins/location-plugin/node';

export default class SimpleEditorComponent extends Component {
  @tracked controller;

  @tracked environment = '';

  @tracked showEnvironmentBanner = false;
  @tracked initCompleted = false;
  @tracked schema;
  @tracked plugins;
  @tracked config;
  @tracked nodeViews;
  @tracked activePlugins;
  @tracked citationPlugin;
  @tracked hasSidebarPlugins;
  @service intl;

  AttributeEditor = AttributeEditor;
  RdfaEditor = RdfaEditor;
  DebugInfo = DebugInfo;
  StructureControlCard = StructureControlCardComponent;
  InsertArticle = InsertArticleComponent;

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
        rdfaAware: true,
      },
    };
    const defaultTableConfig = {
      tableGroup: 'block',
      cellContent: 'block+',
      inlineBorderStyle: { width: '0.5px', color: '#CCD1D9' },
    };
    const userTableConfig = userConfig.table && {
      inlineBorderStyle: userConfig.table.inlineBorderStyle,
      rowBackground: userConfig.table.rowBackground,
    };
    let nodes = {
      doc: docWithConfig({
        content: userConfig.docContent ?? 'block+',
        rdfaAware: true,
      }),
      paragraph,
      repaired_block: repairedBlockWithConfig({ rdfaAware: true }),
      list_item: listItemWithConfig({ rdfaAware: true }),
      ordered_list: orderedListWithConfig({ rdfaAware: true }),
      bullet_list: bulletListWithConfig({ rdfaAware: true }),
      placeholder,
      blockquote,
      horizontal_rule,
      code_block,
      text,
      image: imageWithConfig({
        allowBase64Images: userConfig.image?.allowBase64Images,
      }),
      hard_break,
      ...tableNodes(mergeConfigs(defaultTableConfig, userTableConfig)),
      link: link(config.link),
    };
    const marks = {
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
      ...tablePlugins,
      tableKeymap,
      linkPasteHandler(nodes.link),
      firefoxCursorFix(),
      lastKeyPressedPlugin,
      recreateUuidsOnPaste,
      createInvisiblesPlugin(
        [hardBreak, paragraphInvisible, headingInvisible],
        {
          shouldShowInvisibles: false,
        }
      ),
    ];
    if (userConfig.image?.allowBase64Images) {
      plugins.push(
        checkPasteSize({
          pasteLimit: userConfig.image.pasteLimit,
          onLimitReached: userConfig.image.onLimitReached,
        })
      );
    }
    const nodeViews = {};
    const setup = {
      nodes,
      marks,
      plugins,
      nodeViews,
      userConfig,
      config,
      activePlugins,
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
    if (activePlugins.includes('besluit-topic')) {
      this.setupBesluitTopicPlugin(setup);
    }
    if (activePlugins.includes('lpdc')) {
      this.setupLpdcPlugin(setup);
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
    if (activePlugins.includes('location')) {
      this.setupLocationPlugin(setup);
    }
    if (activePlugins.includes('rdfa-editor')) {
      this.setupRdfaEditor(setup);
    }
    this.config = setup.config;
    this.plugins = setup.plugins;
    this.expandInsertMenu = userConfig.ui?.expandInsertMenu ?? false;
    setup.nodes = {
      ...setup.nodes,
      heading: headingWithConfig({ rdfaAware: true }),
      block_rdfa: blockRdfaWithConfig({ rdfaAware: true }),
      inline_rdfa: inlineRdfaWithConfig({ rdfaAware: true }),
      invisible_rdfa: invisibleRdfaWithConfig({ rdfaAware: true }),
    };
    this.schema = new Schema({ nodes: setup.nodes, marks: setup.marks });
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
    return editorPromise;
  }

  setupCitationPlugin({ userConfig, config, plugins }) {
    config.citation = mergeConfigs(
      defaultCitationPluginConfig,
      userConfig.citation
    );

    const citationPluginVariable = citationPlugin(config.citation);
    this.citationPlugin = citationPluginVariable;
    plugins.push(citationPluginVariable);
  }
  setupArticleStructurePlugin(setup) {
    const { config, userConfig } = setup;

    if (setup.activePlugins.includes('besluit')) {
      throw new Error(`The besluit and article-structure plugins can not be active at the same time.
        They configure the editor to handle two different kinds of documents: 'besluiten' or 'reglementen'
        (The plugin name of 'article-structure', instead of 'reglement' is due to historical reasons)
        `);
    }
    if (userConfig.articleStructure) {
      console.warn(`The article structure plugin no longer requires any configuration.
        The config you passed in will be ignored.`);
    }
    config.articleStructure = {};

    config.structures = {
      uriGenerator: 'template-uuid4',
      fullLengthArticles: true,
      onlyArticleSpecialName: false,
    };
    setup.nodes = {
      ...setup.nodes,
      structure: structureWithConfig(config.structures),
    };
    setup.nodeViews = {
      ...setup.nodeViews,
      structure: structureViewWithConfig(config.structures),
    };
  }

  setupBesluitPlugin(setup) {
    if (setup.activePlugins.includes('article-structure')) {
      throw new Error(`The besluit and article-structure plugins can not be active at the same time.
        They configure the editor to handle two different kinds of documents: 'besluiten' or 'reglementen'
        (The plugin name of 'article-structure', instead of 'reglement', is due to historical reasons)
        `);
    }
    const { config, userConfig } = setup;
    config.besluit = {
      ...userConfig.besluit,
      uriGenerator:
        userConfig.besluit?.uriGenerator ??
        (() => `http://data.lblod.info/artikels/${uuidv4()}`),
    };
    config.structures = {
      fullLengthArticles: userConfig.besluit?.fullLengthArticles ?? true,
      onlyArticleSpecialName:
        userConfig.besluit?.onlyArticleSpecialName ?? false,
    };
    setup.nodes = {
      ...setup.nodes,
      structure: structureWithConfig(config.structures),
    };
    setup.nodeViews = {
      ...setup.nodeViews,
      structure: structureViewWithConfig(config.structures),
    };
  }

  setupBesluitTopicPlugin(setup) {
    const { config, userConfig } = setup;

    config.besluitTopic = mergeConfigs(
      {
        endpoint: 'https://data.vlaanderen.be/sparql',
      },
      userConfig.besluitTopic
    );
  }

  setupLpdcPlugin(setup) {
    const { config, userConfig } = setup;

    config.lpdc = userConfig.lpdc;
  }
  setupLocationPlugin(setup) {
    const { nodes, nodeViews, config, userConfig } = setup;
    config.location = mergeConfigs(
      defaultLocationPluginConfig,
      userConfig.location
    );
    nodes['oslo_location'] = osloLocation(config.location);
    nodeViews['oslo_location'] = (controller) =>
      osloLocationView(config.location)(controller);
  }

  setupRoadsignPlugin(setup) {
    const { nodes, config, userConfig } = setup;

    nodes.roadsign_regulation = roadsign_regulation;

    config.roadsignRegulation = mergeConfigs(
      defaultRoadsignRegulationPluginConfig,
      userConfig.roadsignRegulation
    );
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
    nodeViews.inline_rdfa = (controller) =>
      inlineRdfaWithConfigView({ rdfaAware: true })(controller);
  }

  setupTOCPlugin(setup) {
    if (
      !(
        setup.activePlugins.includes('article-structure') ||
        setup.activePlugins.includes('besluit')
      )
    ) {
      console.warn(
        `The table of contents plugin will not show any contents unless either the 'besluit' or 'article-structure' plugins are active,
        as they set up the nodes which the ToC builds its contents from (articles, chapters, etc)`
      );
    }
    const { config, userConfig, nodes, nodeViews } = setup;
    let tocConfig = null;
    if (Array.isArray(userConfig.tableOfContents)) {
      console.warn(
        `The array configuration of the ToC plugin is deprecated and will be ignored.
        This plugin no longer needs a manual configuration, it will automatically pick up on relevant
        nodes based on the "besluit" and "article-structure" plugins.

        If you would still like to pass in the scrollContainer, just pass in as a single object instead:
        { scrollContainer: () => Element }
        `
      );
    } else if (userConfig.tableOfContents) {
      tocConfig = userConfig.tableOfContents;
    }

    config.tableOfContents = tocConfig;

    nodes.table_of_contents = table_of_contents(config.tableOfContents);

    nodeViews.table_of_contents = (controller) =>
      tableOfContentsView(config.tableOfContents)(controller);
  }

  setupTemplateCommentsPlugin(setup) {
    const { nodes, nodeViews } = setup;
    nodes.templateComment = templateComment;
    nodeViews.templateComment = (controller) => templateCommentView(controller);
  }

  setupConfidentialityPlugin(setup) {
    const { marks } = setup;
    marks.redacted = redacted;
  }

  setupRdfaEditor(setup) {
    const { plugins } = setup;

    plugins.push(editableNodePlugin());
  }

  get activeNode() {
    if (this.controller) {
      return getActiveEditableNode(this.controller.activeEditorState);
    }

    return null;
  }
}
