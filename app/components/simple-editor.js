import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from 'tracked-built-ins';
import { inject as service } from '@ember/service';

import { Schema } from '@lblod/ember-rdfa-editor';

import { linkPasteHandler } from '@lblod/ember-rdfa-editor/plugins/link';
import {
  tableOfContentsView,
  table_of_contents,
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
  variable,
  variableView,
} from '@lblod/ember-rdfa-editor-lblod-plugins/plugins/variable-plugin/nodes';
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
import date from '@lblod/ember-rdfa-editor-lblod-plugins/plugins/rdfa-date-plugin/nodes/date';

import {
  createInvisiblesPlugin,
  hardBreak,
  heading as headingInvisible,
  paragraph as paragraphInvisible,
  space,
} from '@lblod/ember-rdfa-editor/plugins/invisibles';

import {
  besluitNodes,
  structureSpecs,
} from '@lblod/ember-rdfa-editor-lblod-plugins/plugins/standard-template-plugin';

import { citationPlugin } from '@lblod/ember-rdfa-editor-lblod-plugins/plugins/citation-plugin';

import { roadsign_regulation } from '@lblod/ember-rdfa-editor-lblod-plugins/plugins/roadsign-regulation-plugin/nodes';
import { link, linkView } from '@lblod/ember-rdfa-editor/plugins/link';
import { highlight } from '@lblod/ember-rdfa-editor/plugins/highlight/marks/highlight';
import { color } from '@lblod/ember-rdfa-editor/plugins/color/marks/color';

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
    this.controller = controller;
  }

  @action
  insertedInDom(element) {
    this.setVocab(element);
    this.setPrefix(element);
    element.getHtmlContent = this.getHtmlContent;
    element.setHtmlContent = this.setHtmlContent;
    element.on = this.on;
    element.off = this.off;
    element.initEditor = this.initEditor;
    element.enableEnvironmentBanner = this.enableEnvironmentBanner;
    element.disableEnvironmentBanner = this.disableEnvironmentBanner;
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
  on(eventName, callback) {
    this.controller.on(eventName, callback);
  }

  @action
  off(eventName, callback) {
    this.controller.off(eventName, callback);
  }

  @action
  initEditor(activePlugins, userConfig = {}) {
    this.initCompleted = false;
    this.activePlugins = activePlugins;
    const config = {
      link: {
        interactive: true,
      },
    };
    let nodes = {
      doc: {
        content: userConfig.docContent ?? 'block+',
      },
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
        [space, hardBreak, paragraphInvisible, headingInvisible],
        {
          shouldShowInvisibles: false,
        }
      ),
    ];
    if (activePlugins.includes('rdfa-date')) {
      if (!userConfig.date) {
        config.date = {
          placeholder: {
            insertDate: this.intl.t('date-plugin.insert.date'),
            insertDateTime: this.intl.t('date-plugin.insert.datetime'),
          },
          formats: [
            {
              label: 'Short Date',
              key: 'short',
              dateFormat: 'dd/MM/yy',
              dateTimeFormat: 'dd/MM/yy HH:mm',
            },
            {
              label: 'Long Date',
              key: 'long',
              dateFormat: 'EEEE dd MMMM yyyy',
              dateTimeFormat: 'PPPPp',
            },
          ],
          allowCustomFormat: true,
        };
      } else {
        config.date = userConfig.date;
      }
      nodes.date = date(config.date);
    }
    if (activePlugins.includes('citation')) {
      const citationConfig = userConfig.citation;
      if (citationConfig) {
        config.citation = citationConfig;
      } else {
        config.citation = {
          type: 'ranges',
          activeInRanges: (state) => [[0, state.doc.content.size]],
        };
      }
      const citationPluginVariable = citationPlugin(config.citation);
      this.citationPlugin = citationPluginVariable;
      plugins.push(citationPluginVariable);
    }
    if (activePlugins.includes('article-structure')) {
      if (
        userConfig.articleStructure &&
        userConfig.articleStructure.mode === 'besluit'
      ) {
        config.structures = structureSpecs;
      } else {
        config.structures = STRUCTURE_SPECS;
      }
      nodes = { ...nodes, ...STRUCTURE_NODES };
    }
    if (activePlugins.includes('besluit')) {
      nodes = { ...nodes, ...besluitNodes };
    }
    if (activePlugins.includes('roadsign-regulation')) {
      nodes.roadsign_regulation = roadsign_regulation;
    }
    if (activePlugins.includes('variable')) {
      nodes.variable = variable;
      config.variable = userConfig.variable ?? {
        defaultEndpoint: 'https://dev.roadsigns.lblod.info/sparql',
      };
    }
    if (activePlugins.includes('table-of-contents')) {
      config.tableOfContents = userConfig.tableOfContents ?? [
        {
          nodeHierarchy: [
            'title|chapter|section|subsection|article',
            'structure_header|article_header',
          ],
        },
      ];
      nodes.table_of_contents = table_of_contents(config.tableOfContents);
    }
    this.config = config;
    nodes = { ...nodes, heading, invisible_rdfa, block_rdfa };
    this.schema = new Schema({ nodes, marks });
    this.plugins = plugins;
    this.nodeViews = (controller) => {
      return {
        variable: activePlugins.includes('variable')
          ? variableView(controller)
          : undefined,
        table_of_contents: activePlugins.includes('table-of-contents')
          ? tableOfContentsView(config.tableOfContents)(controller)
          : undefined,
        link: linkView(this.config.link)(controller),
        image: imageView(controller),
      };
    };
    this.initCompleted = true;
  }
}
