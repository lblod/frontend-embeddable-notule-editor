import type { PluginInitializer } from '../embedded-plugin';
import SidebarWidget from '@lblod/say-ar-design-plugin/components/sidebar-widget';
import Component from '@glimmer/component';
import type { WidgetSignature } from '../widgets';
import { _processDocumentHeadlesslyFromEditorSetup } from '../../utils/_private/headless-document-internals';
import type { EditorSetup } from '../setup/setup-plugins';
import type {  DesignInfo, Pagination } from '@lblod/say-ar-design-plugin/plugin/types';

const name = 'arDesign';
export interface ArDesignPluginOptions {
  proxyHeader: string,
  proxyUrl: string,
  decisionContext?: {
    decisionUri: string;
    decisionType?: string;
  };
  regulatoryStatementMode?: boolean
}


type RecordJsonApi = {
  id: string,
  attributes: {
    [s: string]: string;
  }
  relationships: Relationships
}

type Relationships = {
  [s: string]: {data : RecordJsonApi | RecordJsonApi[]};
}


type JsonApiResponse = {
  data: RecordJsonApi[]
  included: RecordJsonApi[]
}



const arDesignQuery = async (proxyUrl: string, header: string, pagination: Pagination) => {
  const url = new URL(proxyUrl);
  if(pagination.nameFilter) {
    url.searchParams.append('filter[name]', pagination.nameFilter)
  }
  url.searchParams.append('page[size]', String(pagination.pageSize))
  url.searchParams.append('page[number]', String(pagination.pageNumber))
  if(pagination.sort) {
    url.searchParams.append('sort', pagination.sort)
  }
  const designsResponse = await fetch(url, {
    method: 'GET',
    headers: {
      'mu-auth-allowed-groups': header
    }
  })
  const designsData= await designsResponse.json() as JsonApiResponse;

  const designs = await Promise.all(designsData.data.map(async design => {
    const measureDesignsResponse = await fetch(`${proxyUrl}/${design.id}/measure-designs`, {
      method: 'GET',
      headers: {
        'mu-auth-allowed-groups': header
      }
    })
    const measureDesignsData = await measureDesignsResponse.json() as JsonApiResponse;
    return {
      id: design.id,
      ...design.attributes,
      measureDesigns: measureDesignsData.data.map(processEntity.bind(this, measureDesignsData.included))

    }
  }))
    return {
      designs,
      inDocs: []
    } as unknown as DesignInfo
  };


  function processEntity(includedData: RecordJsonApi[], entity?: RecordJsonApi) : Record<string, unknown> | undefined {
    if(!entity) return undefined
    const attributesCamelCase = {} as Record<string, string>
    for(const key in entity.attributes) {
      attributesCamelCase[kebabCaseToCamelCase(key)] = entity.attributes[key] as string;
    }
    return {
       id: entity.id,
      ...attributesCamelCase,
      ...processRelationships(includedData, entity.relationships)
    }

  }

  function processRelationships(includedData: RecordJsonApi[], relationships: Relationships) {
    const processedRelationships = {} as Record<string, unknown>
    for(const key in relationships) {
      const camelCaseKey = kebabCaseToCamelCase(key)
      if(relationships[key]) {
        if(Array.isArray(relationships[key].data)) {
          processedRelationships[camelCaseKey] = relationships[key].data.map((data) => processEntity(includedData, includedData.find(included => included.id === data.id)))
        } else {
          processedRelationships[camelCaseKey] = processEntity(includedData, includedData.find(included => relationships[key] && included.id === (relationships[key].data as RecordJsonApi).id))
        }
      }
    }
    return processedRelationships;
  }

  function kebabCaseToCamelCase(string: string) {
    const arr = string.split('-');
    const capital = arr.map((item,index) => index === 0 ? item : item.charAt(0).toUpperCase() + item.slice(1).toLowerCase());
    const capitalString = capital.join("");
    return capitalString
  }

function processDocumentHelper(editorSetup: EditorSetup) {
  return (
    html: Parameters<typeof _processDocumentHeadlesslyFromEditorSetup>[0],
    generator: Parameters<typeof _processDocumentHeadlesslyFromEditorSetup>[1],
  ) => _processDocumentHeadlesslyFromEditorSetup(html, generator, editorSetup);
}



export class arDesignWidget extends Component<WidgetSignature<'arDesign'>> {
  get designQuery() {
    const config = this.args.setup.pluginSpecs.arDesign.config;
    if(!config?.proxyUrl || !config?.proxyHeader) {
      throw new Error('You have to configure proxyUrl and proxyHeader to use this component')
    }
    return arDesignQuery.bind(undefined, config?.proxyUrl, config?.proxyHeader)
  }
  <template>
    <SidebarWidget
      @controller={{@controller}}
      @designQuery={{this.designQuery}}
      @processDocumentHeadlessly={{processDocumentHelper @setup}}
      @decisionContext={{@setup.pluginSpecs.arDesign.config.decisionContext}}
      @regulatoryStatementMode={{@setup.pluginSpecs.arDesign.config.regulatoryStatementMode}}
    />
  </template>
}

export const setupArDesignPlugin = (({ options }) => {
  return {
    name,
    config: options?.arDesign,
    sidebarWidgets: { 'ar-design:insert': arDesignWidget },
  };
}) satisfies PluginInitializer;
