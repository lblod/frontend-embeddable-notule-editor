import {
  templateComment,
  templateCommentView,
} from '@lblod/ember-rdfa-editor-lblod-plugins/plugins/template-comments-plugin';
import type { PluginInitializer } from '../../shared-types/editor-options';
import type { SayController } from '@lblod/ember-rdfa-editor';
export type TemplateCommentsPluginConfig = unknown;

export const setupTemplateCommentsPlugin: PluginInitializer<
  TemplateCommentsPluginConfig
> = (_setup, config) => {
  const nodes = { templateComment };
  const nodeViews = {
    templateComment: (controller: SayController) =>
      templateCommentView(controller),
  };
  return { name: 'template-comments', nodes, nodeViews, config };
};
