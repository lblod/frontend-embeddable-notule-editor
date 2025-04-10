import {
  templateComment,
  templateCommentView,
} from '@lblod/ember-rdfa-editor-lblod-plugins/plugins/template-comments-plugin';
import type { SayController } from '@lblod/ember-rdfa-editor';
import type { PluginInitializer } from '../../shared-types/embedded-plugin';
import TemplateCommentEditCard from '@lblod/ember-rdfa-editor-lblod-plugins/components/template-comments-plugin/edit-card';
import TemplateCommentInsert from '@lblod/ember-rdfa-editor-lblod-plugins/components/template-comments-plugin/insert';

const name = 'templateComments' as const;
declare module 'plugin-registry' {
  export interface EmbeddedPlugins {
    [name]: typeof setupTemplateCommentsPlugin;
  }
  export interface SidebarWidgets {
    'template-comments:edit': typeof TemplateCommentEditCard;
  }
  export interface SidebarListItemWidgets {
    'template-comments:insert': typeof TemplateCommentInsert;
  }
}
export const setupTemplateCommentsPlugin = (() => {
  const nodes = { templateComment };
  const nodeViews = {
    templateComment: (controller: SayController) =>
      templateCommentView(controller),
  };
  return {
    name,
    nodes,
    nodeViews,
    sidebarWidgets: {
      'template-comments:edit': TemplateCommentEditCard,
      'template-comments:insert': TemplateCommentInsert,
    },
  };
}) satisfies PluginInitializer;
