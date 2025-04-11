import type { WidgetSignature } from '../utils/types';
import type {
  ToolbarConfig,
  ToolbarGroupConfig,
  ToolbarWidget,
} from '../../shared-types/_private/toolbar';
import Undo from '@lblod/ember-rdfa-editor/components/plugins/history/undo';
import Redo from '@lblod/ember-rdfa-editor/components/plugins/history/redo';
import Bold from '@lblod/ember-rdfa-editor/components/plugins/text-style/bold';
import Italic from '@lblod/ember-rdfa-editor/components/plugins/text-style/italic';
import Strikethrough from '@lblod/ember-rdfa-editor/components/plugins/text-style/strikethrough';
import Underline from '@lblod/ember-rdfa-editor/components/plugins/text-style/underline';
import Subscript from '@lblod/ember-rdfa-editor/components/plugins/text-style/subscript';
import Superscript from '@lblod/ember-rdfa-editor/components/plugins/text-style/superscript';
import Highlight from '@lblod/ember-rdfa-editor/components/plugins/text-style/highlight';
import ColorMenu from '@lblod/ember-rdfa-editor/components/plugins/text-style/color';
import IndentationMenu from '@lblod/ember-rdfa-editor/components/plugins/indentation/indentation-menu';
import HeadingMenu from '@lblod/ember-rdfa-editor/components/plugins/heading/heading-menu';
import ListOrdered from '@lblod/ember-rdfa-editor/components/plugins/list/ordered';
import ListUnordered from '@lblod/ember-rdfa-editor/components/plugins/list/unordered';
import AlignmentMenu from '@lblod/ember-rdfa-editor/components/plugins/alignment/alignment-menu';
import LinkMenu from '@lblod/ember-rdfa-editor/components/plugins/link/link-menu';
import ImageInsertMenu from '@lblod/ember-rdfa-editor/components/plugins/image/insert-menu';
import TableMenu from '@lblod/ember-rdfa-editor/components/plugins/table/table-menu';
import FormattingToggle from '@lblod/ember-rdfa-editor/components/plugins/formatting/formatting-toggle';
import HTMLEditorMenu from '@lblod/ember-rdfa-editor/components/plugins/html-editor/menu';
import TOCToggle from '@lblod/ember-rdfa-editor-lblod-plugins/components/table-of-contents-plugin/toolbar-button';
import BesluitTopicDropdown from '@lblod/ember-rdfa-editor-lblod-plugins/components/besluit-topic-plugin/besluit-topic-toolbar-dropdown';
import ResponsiveToolbar from '@lblod/ember-rdfa-editor/components/responsive-toolbar';

import type { ComponentLike } from '@glint/template';
import Component from '@glimmer/component';
import type { SayController } from '@lblod/ember-rdfa-editor';
import type {
  EditorConfig,
  PluginName,
} from '../../shared-types/editor-options';

import { get } from '@ember/helper';
import type { TOC } from '@ember/component/template-only';
import type { ResolvedPNode } from '@lblod/ember-rdfa-editor/utils/_private/types';
import HTMLPreviewMenu from './widgets/html-preview-menu';

type ToolbarWidgetComponent = ComponentLike<WidgetSignature>;

const TOOLBAR_WIDGET_MAP: Record<ToolbarWidget, ToolbarWidgetComponent> = {
  undo: Undo,
  redo: Redo,
  bold: Bold,
  italic: Italic,
  strikethrough: Strikethrough,
  underline: Underline,
  subscript: Subscript,
  superscript: Superscript,
  highlight: <template>
    <Highlight @controller={{@controller}} @defaultColor='#000000' />
  </template> as TOC<WidgetSignature>,
  color: <template>
    <ColorMenu @controller={{@controller}} @defaultColor='#000000' />
  </template> as TOC<WidgetSignature>,
  indentation: IndentationMenu,
  heading: HeadingMenu,
  'list:bullet': ListUnordered,
  'list:numbered': ListOrdered,
  alignment: AlignmentMenu,
  hyperlink: LinkMenu,
  image: ImageInsertMenu,
  table: TableMenu,
  formatting: FormattingToggle,
  'html:edit': HTMLEditorMenu,
  'html:preview': HTMLPreviewMenu,
  'table-of-contents': TOCToggle,
  'besluit:topic': <template>
    <BesluitTopicDropdown
      @controller={{@controller}}
      {{! @glint-expect-error }}
      @options={{@config.besluitTopic}}
    />
  </template> as TOC<WidgetSignature>,
};

type ToolbarSignature = {
  activeNode: ResolvedPNode;
  controller: SayController;
  toolbar: ToolbarConfig;
  config: EditorConfig;
  plugins: PluginName[];
};

const Toolbar: TOC<ToolbarSignature> = <template>
  <ResponsiveToolbar>
    {{! @glint-expect-error }}
    <:main as |Tb|>
      {{#each @toolbar.main as |toolbarGroup|}}
        <Tb.Group>
          <ToolbarGroup
            @activeNode={{@activeNode}}
            @controller={{@controller}}
            @config={{@config}}
            @toolbarGroup={{toolbarGroup}}
            @plugins={{@plugins}}
          />
        </Tb.Group>
      {{/each}}
    </:main>
    {{! @glint-expect-error }}
    <:side as |Tb|>
      {{#each @toolbar.side as |toolbarGroup|}}
        <Tb.Group>
          <ToolbarGroup
            @activeNode={{@activeNode}}
            @controller={{@controller}}
            @config={{@config}}
            @toolbarGroup={{toolbarGroup}}
            @plugins={{@plugins}}
          />
        </Tb.Group>
      {{/each}}
    </:side>
  </ResponsiveToolbar>
</template>;

export default Toolbar;

type ToolbarGroupSignature = {
  activeNode: ResolvedPNode;
  controller: SayController;
  toolbarGroup: ToolbarGroupConfig;
  config: EditorConfig;
  plugins: PluginName[];
};
class ToolbarGroup extends Component<ToolbarGroupSignature> {
  get widgets() {
    if (Array.isArray(this.args.toolbarGroup)) {
      return this.args.toolbarGroup;
    } else {
      return this.args.toolbarGroup.items;
    }
  }
  <template>
    {{#each this.widgets as |widget|}}
      {{#let (get TOOLBAR_WIDGET_MAP widget) as |WidgetComponent|}}
        <WidgetComponent
          @activeNode={{@activeNode}}
          @config={{@config}}
          @plugins={{@plugins}}
          @controller={{@controller}}
        />
      {{/let}}
    {{/each}}
  </template>
}
