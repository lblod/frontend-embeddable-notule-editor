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
import { inlineRdfaWithConfig } from '@lblod/ember-rdfa-editor/nodes/inline-rdfa';
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

import { getActiveEditableNode } from '@lblod/ember-rdfa-editor/plugins/_private/editable-node';
import AttributeEditor from '@lblod/ember-rdfa-editor/components/_private/attribute-editor';
import RdfaEditor from '@lblod/ember-rdfa-editor/components/_private/rdfa-editor';
import DebugInfo from '@lblod/ember-rdfa-editor/components/_private/debug-info';
import {
  createInvisiblesPlugin,
  hardBreak,
  heading as headingInvisible,
  paragraph as paragraphInvisible,
} from '@lblod/ember-rdfa-editor/plugins/invisibles';
import { highlight } from '@lblod/ember-rdfa-editor/plugins/highlight/marks/highlight';
import { color } from '@lblod/ember-rdfa-editor/plugins/color/marks/color';
import StructureControlCardComponent from '@lblod/ember-rdfa-editor-lblod-plugins/components/structure-plugin/control-card';
import InsertArticleComponent from '@lblod/ember-rdfa-editor-lblod-plugins/components/decision-plugin/insert-article';
import { mergeConfigs } from '../config/defaults';
import {
  bulletListWithConfig,
  listItemWithConfig,
  orderedListWithConfig,
} from '@lblod/ember-rdfa-editor/plugins/list';
import { headingWithConfig } from '@lblod/ember-rdfa-editor/plugins/heading';
import { DEFAULT_CONTEXT } from '../utils/constants';

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
  @tracked hasSidebarPlugins;
  @service intl;

  AttributeEditor = AttributeEditor;
  RdfaEditor = RdfaEditor;
  DebugInfo = DebugInfo;
  StructureControlCard = StructureControlCardComponent;
  InsertArticle = InsertArticleComponent;

  get vocabString() {
    return DEFAULT_CONTEXT.vocab;
  }

  get prefixString() {
    const ctx = DEFAULT_CONTEXT;
    return Object.keys(ctx.prefix)
      .map((key) => `${key}: ${ctx.prefix[key]}`)
      .join(' ');
  }

  get defaultToolbarConfig() {
    const plugins = this.activePlugins ?? [];
    const mainSection = [];
    mainSection.push(
      ['undo', 'redo'],
      [
        'bold',
        'italic',
        'strikethrough',
        'underline',
        'subscript',
        'superscript',
        'highlight',
        'color',
      ],
      ['list:bullet', 'list:numbered', 'indentation'],
      ['hyperlink', 'image'],
      ['table'],
      ['heading'],
      ['alignment'],
    );
    const HTMLWidgets = [];
    if (plugins.includes('html-edit')) {
      HTMLWidgets.push('html:edit');
    }
    if (plugins.includes('html-preview')) {
      HTMLWidgets.push('html:preview');
    }
    if (HTMLWidgets.length) {
      mainSection.push(HTMLWidgets);
    }

    const group = [];
    if (plugins.includes('table-of-contents')) {
      group.push('table-of-contents');
    }
    if (plugins.includes('formatting-toggle')) {
      group.push('formatting');
    }
    if (
      plugins.includes('besluit-topic') &&
      this.config.besluitTopic.widgetLocation === 'toolbar'
    ) {
      group.push('besluit:topic');
    }
    const sideSection = group.length ? [group] : undefined;
    return {
      main: mainSection,
      side: sideSection,
    };
  }

  get defaultSidebarConfig() {
    const plugins = this.activePlugins ?? [];
    const sidebar = [];
    if (
      plugins.includes('besluit-topic') &&
      this.config.besluitTopic.widgetLocation === 'sidebar'
    ) {
      sidebar.push('besluit:topic');
    }
    const insertContainer = [];
    if (plugins.includes('besluit')) {
      insertContainer.push('besluit:article-insert');
    }
    if (plugins.includes('lpdc')) {
      insertContainer.push('lpdc:insert');
    }
    if (plugins.includes('article-structure')) {
      insertContainer.push('article-structure:insert');
    }
    if (plugins.includes('citation')) {
      insertContainer.push('citation:insert');
    }
    if (plugins.includes('roadsign-regulation')) {
      insertContainer.push('roadsign-regulation:insert');
    }
    if (plugins.includes('location')) {
      insertContainer.push('location:insert');
    }
    if (plugins.includes('template-comments')) {
      insertContainer.push('template-comments:insert');
    }
    if (insertContainer.length) {
      sidebar.push(insertContainer);
    }
    if (plugins.includes('article-structure') || plugins.includes('besluit')) {
      sidebar.push('structure:edit');
    }
    if (plugins.includes('variable')) {
      sidebar.push('variable:insert');
      sidebar.push('variable:edit');
    }
    if (plugins.includes('template-comments')) {
      sidebar.push('template-comments:edit');
    }
    if (plugins.includes('citation')) {
      sidebar.push('citation:edit');
    }
    if (plugins.includes('rdfa-editor')) {
      sidebar.push(
        'devtools:rdfa-editor',
        'devtools:attribute-editor',
        'devtools:debug-info',
      );
    }
    return sidebar;
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
        },
      ),
    ];
    if (userConfig.image?.allowBase64Images) {
      plugins.push(
        checkPasteSize({
          pasteLimit: userConfig.image.pasteLimit,
          onLimitReached: userConfig.image.onLimitReached,
        }),
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
}
