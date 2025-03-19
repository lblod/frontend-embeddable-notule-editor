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

import type { TOC } from '@ember/component/template-only';
import HTMLPreviewMenu from '../../components/html-preview/menu';
import type { WidgetSignature } from '../../../shared-types/widgets';

const highlight: TOC<WidgetSignature> = <template>
  <Highlight @controller={{@controller}} @defaultColor='#000000' />
</template> as TOC<WidgetSignature>;

const color: TOC<WidgetSignature> = <template>
  <ColorMenu @controller={{@controller}} @defaultColor='#000000' />
</template> as TOC<WidgetSignature>;

declare module 'plugin-registry' {
  export interface ToolbarWidgets {
    undo: typeof Undo;
    redo: typeof Redo;
    bold: typeof Bold;
    italic: typeof Italic;
    strikethrough: typeof Strikethrough;
    underline: typeof Underline;
    subscript: typeof Subscript;
    superscript: typeof Superscript;
    highlight: typeof highlight;
    color: typeof color;
    indentation: typeof IndentationMenu;
    heading: typeof HeadingMenu;
    'list:bullet': typeof ListUnordered;
    'list:numbered': typeof ListOrdered;
    alignment: typeof AlignmentMenu;
    hyperlink: typeof LinkMenu;
    image: typeof ImageInsertMenu;
    table: typeof TableMenu;
    formatting: typeof FormattingToggle;
    'html:edit': typeof HTMLEditorMenu;
    'html:preview': typeof HTMLPreviewMenu;
  }
}
export const coreToolbarWidgets = {
  undo: Undo,
  redo: Redo,
  bold: Bold,
  italic: Italic,
  strikethrough: Strikethrough,
  underline: Underline,
  subscript: Subscript,
  superscript: Superscript,
  highlight,
  color,
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
} as const;
