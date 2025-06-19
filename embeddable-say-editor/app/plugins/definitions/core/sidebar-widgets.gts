import StructureControlCard from '@lblod/ember-rdfa-editor-lblod-plugins/components/structure-plugin/control-card';
import type { TOC } from '@ember/component/template-only';

import DebugInfo from '@lblod/ember-rdfa-editor/components/_private/debug-info';
import AttributeEditor from '@lblod/ember-rdfa-editor/components/_private/attribute-editor';
import RelationshipEditor from '@lblod/ember-rdfa-editor/components/_private/relationship-editor/card';
import type { WidgetSignature } from '../../widgets.ts';

declare module '../../plugin-registry' {
  export interface SidebarWidgets {
    'structure:edit': typeof StructureControlCard;
    'devtools:debug-info': typeof debugInfo;
    'devtools:attribute-editor': typeof attributeEditor;
    /** @deprecated use 'devtools:relationship-editor' instead */
    'devtools:rdfa-editor': typeof relationshipEditor;
    'devtools:relationship-editor': typeof relationshipEditor;
  }
}
const debugInfo: TOC<WidgetSignature> = <template>
  {{#if @activeNode}}
    <DebugInfo @node={{@activeNode}} />
  {{/if}}
</template>;

const attributeEditor: TOC<WidgetSignature> = <template>
  {{#if @activeNode}}
    <AttributeEditor @node={{@activeNode}} @controller={{@controller}} />
  {{/if}}
</template>;

const relationshipEditor: TOC<WidgetSignature> = <template>
  {{#if @activeNode}}
    <RelationshipEditor @node={{@activeNode}} @controller={{@controller}} />
  {{/if}}
</template>;

export const coreSidebarWidgets = {
  'structure:edit': StructureControlCard,
  'devtools:debug-info': debugInfo,
  'devtools:attribute-editor': attributeEditor,
  /** @deprecated use 'devtools:relationship-editor' instead */
  'devtools:rdfa-editor': relationshipEditor,
  'devtools:relationship-editor': relationshipEditor,
} as const;
