import type { PluginInitializer } from '../embedded-plugin.ts';

const name = 'rdfaEditor';
/** This plugin is a no-op that is used to switch on developer features in the default sidebar */
export const setupEditableRdfaPlugin = (() => {
  return { name };
}) satisfies PluginInitializer;
