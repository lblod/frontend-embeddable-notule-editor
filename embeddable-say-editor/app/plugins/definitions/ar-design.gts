import type { PluginInitializer } from '../embedded-plugin';
import { mergeConfigs } from '../setup/defaults';
import SidebarWidget from '@lblod/say-ar-design-plugin/components/sidebar-widget';
import type { TOC } from '@ember/component/template-only';
import type { WidgetSignature } from '../widgets';
import { _processDocumentHeadlesslyFromEditorSetup } from '../../utils/_private/headless-document-internals';
import type { EditorSetup } from '../setup/setup-plugins';
import type { ArDesignQuery } from '@lblod/say-ar-design-plugin/plugin/types';

const name = 'arDesign';
export interface ArDesignPluginOptions {
  designQuery: ArDesignQuery;
  decisionContext?: {
    decisionUri: string;
    decisionType?: string;
  };
}

const arDesignTest = () =>
  Promise.resolve({
    designs: [
      {
        id: 'test',
        uri: 'test',
        name: 'test',
        date: new Date(),
        measureDesigns: Promise.resolve([
          {
            id: 'test',
            uri: 'test',
            trafficSignals: [
              {
                id: 'test',
                uri: 'test',
                designStatus:
                  'https://data.vlaanderen.be/id/concept/Verkeerstekenontwerpstatus/fc1036e7-703b-4290-b732-49abb39d0588',
                trafficSignalConcept: {
                  id: 'test',
                  uri: 'test',
                  code: 'Parkeerautomaat',
                  type: 'https://data.vlaanderen.be/ns/mobiliteit#Verkeersbordconcept',
                  categories: [
                    {
                      id: 'test',
                      uri: 'http://data.vlaanderen.be/id/concept/Verkeersbordcategorie/29ea3335e357e414d07229242607b352941c0c21e78760600cc0f5270f18c38b',
                      label: 'StilstaanParkeerBord',
                    },
                  ],
                },
              },
            ],
            measureConcept: {
              id: 'test',
              uri: 'test',
              label: 'E9a-GVIId-GVIId-GXa-GXd-GXb-Parkeerautomaat',
              templateString:
                '${locatie} \nhet parkeren is toegelaten; \nhet parkeren is voorbehouden voor ${categorie_voertuig}; \nhet parkeren is betalend; de parkeerreglementering is beperkt in de tijd ${maximumduur_betalend_parkeren}; \nhet begin van de parkeerreglementering wordt aangeduid; \nde parkeerreglementering geldt over een afstand van meer dan 300 meter; \nhet einde van de parkeerreglementering wordt aangeduid; \nbestuurders moeten parkeren op de wijze en onder de voorwaarden die op de parkeerautomaat zijn vermeld.',
              rawTemplateString:
                '${locatie} \n${E9a}; \n${GVIId}; \n${GVIId2}; \n${GXa}; \n${GXd}; \n${GXb}; \n${Parkeerautomaat}.',
            },
            unusedSignalConcepts: [],
            unIncludedSignalConcepts: [],
            variableInstances: [
              {
                id: 'test1',
                uri: 'test1',
                variable: {
                  id: 'test1',
                  uri: 'test1',
                  type: 'codelist',
                  label: 'categorie_voertuig',
                  source: 'https://roadsigns.lblod.info/sparql',
                  codelist:
                    'http://lblod.data.gift/concept-schemes/61AE3534BF5C750009000050',
                },
              },
              {
                id: 'test2',
                uri: 'test2',
                variable: {
                  id: 'test2',
                  uri: 'test2',
                  type: 'codelist',
                  label: 'maximumduur_betalend_parkeren',
                  source: 'https://roadsigns.lblod.info/sparql',
                  codelist:
                    'http://lblod.data.gift/concept-schemes/98ce0acb-a92d-4641-860e-d7f581810686',
                },
              },
              {
                id: 'test3',
                uri: 'test3',
                variable: {
                  id: 'test3',
                  uri: 'test3',
                  type: 'location',
                  label: 'locatie',
                  source: 'https://roadsigns.lblod.info/sparql',
                },
              },
            ],
          },
        ]),
      },
    ],
    inDocs: {
      test: Promise.resolve(1),
    },
  });

function processDocumentHelper(editorSetup: EditorSetup) {
  return (
    html: Parameters<typeof _processDocumentHeadlesslyFromEditorSetup>[0],
    generator: Parameters<typeof _processDocumentHeadlesslyFromEditorSetup>[1],
  ) => _processDocumentHeadlesslyFromEditorSetup(html, generator, editorSetup);
}

export const arDesignWidget: TOC<WidgetSignature<'arDesign'>> = <template>
  <SidebarWidget
    @controller={{@controller}}
    @designQuery={{@setup.pluginSpecs.arDesign.config.designQuery}}
    @processDocumentHeadlessly={{processDocumentHelper @setup}}
    @decisionContext={{@setup.pluginSpecs.arDesign.config.decisionContext}}
  />
</template>;

const defaultConfig: ArDesignPluginOptions = {
  designQuery: arDesignTest,
};

export const setupArDesignPlugin = (({ options }) => {
  return {
    name,
    config: mergeConfigs(defaultConfig, options?.arDesign),
    sidebarWidgets: { 'ar-design:insert': arDesignWidget },
  };
}) satisfies PluginInitializer;
