import {
  templateComment,
  templateCommentView,
} from '@lblod/ember-rdfa-editor-lblod-plugins/plugins/template-comments-plugin';
import type { SayController } from '@lblod/ember-rdfa-editor';
import type { PluginInitializer } from '../../shared-types/embedded-plugin';

const name = 'templateComments' as const;
declare module 'plugin-registry' {
  export interface EmbeddedPlugins {
    [name]: typeof setupTemplateCommentsPlugin;
  }
}
export const setupTemplateCommentsPlugin = (() => {
  const nodes = { templateComment };
  const nodeViews = {
    templateComment: (controller: SayController) =>
      templateCommentView(controller),
  };
  return { name, nodes, nodeViews };
}) satisfies PluginInitializer;
