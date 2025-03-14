import { redacted } from '@lblod/ember-rdfa-editor-lblod-plugins/plugins/confidentiality-plugin/marks/redacted';
import type { PluginInitializer } from '../../shared-types/editor-options';

export type ConfidentialityPluginConfig = unknown;
export const setupConfidentialityPlugin: PluginInitializer<
  ConfidentialityPluginConfig
> = (_setup, config) => {
  return { name: 'confidentiality', marks: { redacted }, config };
};
