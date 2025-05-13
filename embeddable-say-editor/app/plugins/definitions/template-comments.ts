import {
  templateComment,
  templateCommentView,
} from '@lblod/ember-rdfa-editor-lblod-plugins/plugins/template-comments-plugin';
import type { SayController } from '@lblod/ember-rdfa-editor';
import type { PluginInitializer } from '../embedded-plugin.ts';
import TemplateCommentEditCard from '@lblod/ember-rdfa-editor-lblod-plugins/components/template-comments-plugin/edit-card';
import TemplateCommentInsert from '@lblod/ember-rdfa-editor-lblod-plugins/components/template-comments-plugin/insert';

export const setupTemplateCommentsPlugin = (() => {
  const nodes = { templateComment };
  const nodeViews = {
    templateComment: (controller: SayController) =>
      templateCommentView(controller),
  };
  return {
    name: 'templateComments',
    nodes,
    nodeViews,
    sidebarWidgets: {
      'template-comments:edit': TemplateCommentEditCard,
      'template-comments:insert': TemplateCommentInsert,
    },
  };
}) satisfies PluginInitializer;
