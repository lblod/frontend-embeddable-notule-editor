import {
  tableKeymap,
  tableNodes,
  tablePlugins,
} from '@lblod/ember-rdfa-editor/plugins/table';
import type { PluginInitializer } from '../../shared-types/embedded-plugin';
import { mergeConfigs } from '../setup/defaults';

const name = 'table';

export type TableConfig = {
  tableGroup: string;
  cellContent: string;
  inlineBorderStyle: { width: string; color: string };
  rowBackground?: { even?: string; odd?: string };
};

declare module '../../shared-types/plugin-registry' {
  export interface PluginOptions {
    [name]?: Partial<TableConfig>;
  }
  export interface EmbeddedPlugins {
    [name]: typeof tableSetup;
  }
}

const defaultTableConfig: TableConfig = {
  tableGroup: 'block',
  cellContent: 'block+',
  inlineBorderStyle: { width: '0.5px', color: '#CCD1D9' },
  rowBackground: undefined,
};
export const tableSetup = (({ options }) => {
  const config = mergeConfigs(defaultTableConfig, options?.table);
  const nodes = {
    ...tableNodes(config),
  };
  const prosePlugins = [...tablePlugins, tableKeymap];
  return {
    name,
    config,
    nodes,
    prosePlugins,
  };
}) satisfies PluginInitializer;
