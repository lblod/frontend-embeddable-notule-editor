import { redacted } from '@lblod/ember-rdfa-editor-lblod-plugins/plugins/confidentiality-plugin/marks/redacted';
import type { PluginInitializer } from '../../shared-types/embedded-plugin';

const name = 'confidentiality' as const;

declare module 'plugin-registry' {
  export interface EmbeddedPlugins {
    [name]: typeof confidentialityPlugin;
  }
}
export const confidentialityPlugin = (() => {
  return { name, marks: { redacted } };
}) satisfies PluginInitializer;
