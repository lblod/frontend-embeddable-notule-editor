import {
  address,
  addressView,
  codelist,
  codelistView,
  date,
  dateView,
  location,
  locationView,
  number,
  numberView,
  text_variable,
  textVariableView,
  type DateOptions,
} from '@lblod/ember-rdfa-editor-lblod-plugins/plugins/variable-plugin/variables';
import type {
  PluginInitializer,
  PluginSetup,
} from '../../shared-types/editor-options';
import type { NodeSpec } from '@lblod/ember-rdfa-editor';
import { inlineRdfaWithConfigView } from '@lblod/ember-rdfa-editor/nodes/inline-rdfa';
import CodelistInsertComponent from '@lblod/ember-rdfa-editor-lblod-plugins/components/variable-plugin/codelist/insert';
import DateInsertVariableComponent from '@lblod/ember-rdfa-editor-lblod-plugins/components/variable-plugin/date/insert-variable';
import VariablePluginAddressInsertVariableComponent from '@lblod/ember-rdfa-editor-lblod-plugins/components/variable-plugin/address/insert-variable';
import LocationInsertComponent from '@lblod/ember-rdfa-editor-lblod-plugins/components/variable-plugin/location/insert';
import NumberInsertComponent from '@lblod/ember-rdfa-editor-lblod-plugins/components/variable-plugin/number/insert';
import TextVariableInsertComponent from '@lblod/ember-rdfa-editor-lblod-plugins/components/variable-plugin/text/insert';
import type { LocationEditOptions } from '@lblod/ember-rdfa-editor-lblod-plugins/components/variable-plugin/location/edit';

export type VariablePluginConfig = {
  insert: {
    enable: boolean;
    locationEndpoint: string;
    codelistEndpoint: string;
    codelistPublisher: string;
  };
  edit: { date: DateOptions; location: LocationEditOptions };
};
export const setupVariablePlugin: PluginInitializer<VariablePluginConfig> = (
  setup,
  config,
) => {
  const variableNodes: Record<string, NodeSpec> = {
    text_variable,
    number,
    address,
    date: date(config.edit.date),
    location,
    codelist,
  };
  const variableNodeViews: PluginSetup['nodeViews'] = {
    address: (controller) => addressView(controller),
    number: (controller) => numberView(controller),
    text_variable: (controller) => textVariableView(controller),
    location: (controller) => locationView(controller),
    codelist: (controller) => codelistView(controller),
    date: (controller) => dateView(config.edit.date)(controller),
    inline_rdfa: (controller) =>
      inlineRdfaWithConfigView({ rdfaAware: true })(controller),
  };
  if (config.insert.enable) {
    const { intl } = setup;
    const variableTypes = [
      {
        label: intl.t('editor.variables.text'),
        component: TextVariableInsertComponent,
      },
      {
        label: intl.t('editor.variables.number'),
        component: NumberInsertComponent,
      },
      {
        label: intl.t('editor.variables.location'),
        component: LocationInsertComponent,
        options: {
          endpoint: config.insert.locationEndpoint,
        },
      },
      {
        label: intl.t('editor.variables.address'),
        component: VariablePluginAddressInsertVariableComponent,
      },
      {
        label: intl.t('editor.variables.date'),
        component: DateInsertVariableComponent,
      },
      {
        label: intl.t('editor.variables.codelist'),
        component: CodelistInsertComponent,
        options: {
          endpoint: config.insert.codelistEndpoint,
          publisher: config.insert.codelistPublisher,
        },
      },
    ];
  }
  return {
    name: 'variable',
    config,
    nodes: variableNodes,
    nodeViews: variableNodeViews,
  };
};
