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
import type { NodeSpec, SayController } from '@lblod/ember-rdfa-editor';
import { inlineRdfaWithConfigView } from '@lblod/ember-rdfa-editor/nodes/inline-rdfa';
import CodelistInsertComponent from '@lblod/ember-rdfa-editor-lblod-plugins/components/variable-plugin/codelist/insert';
import DateInsertVariableComponent from '@lblod/ember-rdfa-editor-lblod-plugins/components/variable-plugin/date/insert-variable';
import VariablePluginAddressInsertVariableComponent from '@lblod/ember-rdfa-editor-lblod-plugins/components/variable-plugin/address/insert-variable';
import LocationInsertComponent from '@lblod/ember-rdfa-editor-lblod-plugins/components/variable-plugin/location/insert';
import NumberInsertComponent from '@lblod/ember-rdfa-editor-lblod-plugins/components/variable-plugin/number/insert';
import TextVariableInsertComponent from '@lblod/ember-rdfa-editor-lblod-plugins/components/variable-plugin/text/insert';
import InsertVariableCard from '@lblod/ember-rdfa-editor-lblod-plugins/components/variable-plugin/insert-variable-card';
import CodelistEdit from '@lblod/ember-rdfa-editor-lblod-plugins/components/variable-plugin/codelist/edit';
import DateEdit from '@lblod/ember-rdfa-editor-lblod-plugins/components/variable-plugin/date/edit';
import LocationEdit from '@lblod/ember-rdfa-editor-lblod-plugins/components/variable-plugin/location/edit';
import AddressEdit from '@lblod/ember-rdfa-editor-lblod-plugins/components/variable-plugin/address/edit';
import type { LocationEditOptions } from '@lblod/ember-rdfa-editor-lblod-plugins/components/variable-plugin/location/edit';
import type { PluginInitializer } from '../../shared-types/embedded-plugin';
import { mergeConfigs } from '../config/defaults';
import type { WidgetSignature } from '../../shared-types/widgets';
import type { TOC } from '@ember/component/template-only';

const name = 'variable' as const;
export type VariablePluginConfig = {
  insert: {
    enable: boolean;
    locationEndpoint: string;
    codelistEndpoint: string;
    codelistPublisher?: string | null;
  };
  edit: { enable: boolean; date: DateOptions; location: LocationEditOptions };
};

declare module 'plugin-registry' {
  export interface PluginOptions {
    [name]?: Partial<VariablePluginConfig>;
  }
  export interface EmbeddedPlugins {
    [name]: typeof setupVariablePlugin;
  }
  export interface SidebarWidgets {
    'variable:insert': typeof insert;
    'variable:edit': typeof edit;
  }
}

const insert: TOC<WidgetSignature> = <template>
  <InsertVariableCard
    @controller={{@controller}}
    @variableTypes={{@setup.pluginSpecs.variable.config.insert.variableTypes}}
  />
</template>;
const edit: TOC<WidgetSignature> = <template>
  <CodelistEdit
    @controller={{@controller}}
    @options={{@setup.pluginSpecs.variable.config.edit.codelist}}
  />
  <DateEdit
    @controller={{@controller}}
    @options={{@setup.pluginSpecs.variable.config.edit.date}}
  />
  <LocationEdit
    @controller={{@controller}}
    @options={{@setup.pluginSpecs.variable.config.edit.location}}
  />
  <AddressEdit
    @controller={{@controller}}
    @defaultMunicipality={{@setup.pluginSpecs.variable.config.edit.address.defaultMunicipality}}
  />
</template>;
const defaultConfig: VariablePluginConfig = {
  insert: {
    enable: true,
    codelistEndpoint: 'https://dev.roadsigns.lblod.info/sparql',
    codelistPublisher: null,
    locationEndpoint: 'https://dev.roadsigns.lblod.info',
  },
  edit: {
    enable: true,
    location: {
      endpoint: 'https://dev.roadsigns.lblod.info',
      zonalLocationCodelistUri:
        'http://lblod.data.gift/concept-schemes/62331E6900730AE7B99DF7EF',
      nonZonalLocationCodelistUri:
        'http://lblod.data.gift/concept-schemes/62331FDD00730AE7B99DF7F2',
    },
    date: {
      allowCustomFormat: true,
      formats: [
        {
          label: 'Short Date',
          key: 'short',
          dateFormat: 'dd/MM/yy',
          dateTimeFormat: 'dd/MM/yy HH:mm',
        },
        {
          label: 'Long Date',
          key: 'long',
          dateFormat: 'EEEE dd MMMM yyyy',
          dateTimeFormat: 'PPPPp',
        },
      ],
    },
  },
};
export const setupVariablePlugin = (({ options, intl }) => {
  const config = mergeConfigs(defaultConfig, options?.variable);
  const variableNodes: Record<string, NodeSpec> = {
    text_variable,
    number,
    address,
    date: date(config.edit.date),
    location,
    codelist,
  };
  const variableNodeViews = {
    address: (controller: SayController) => addressView(controller),
    number: (controller: SayController) => numberView(controller),
    text_variable: (controller: SayController) => textVariableView(controller),
    location: (controller: SayController) => locationView(controller),
    codelist: (controller: SayController) => codelistView(controller),
    date: (controller: SayController) => dateView(config.edit.date)(controller),
    inline_rdfa: (controller: SayController) =>
      inlineRdfaWithConfigView({ rdfaAware: true })(controller),
  };
  if (config.insert.enable) {
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
    sidebarWidgets: {
      'variable:insert': insert,
      'variable:edit': edit,
    },
  };
}) satisfies PluginInitializer;
