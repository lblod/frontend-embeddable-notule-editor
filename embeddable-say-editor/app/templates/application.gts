import Route from 'ember-route-template';
import { pageTitle } from 'ember-page-title';
import AuModalContainer from '@appuniversum/ember-appuniversum/components/au-modal-container';
import SimpleEditor from '../components/simple-editor.gts';
import BasicDropdownWormhole from 'ember-basic-dropdown/components/basic-dropdown-wormhole';
import "../styles/app.scss"

export default Route(
  <template>
    {{pageTitle "EmbeddableblehEditor"}}

    {{! Feel free to remove this! }}
    <AuModalContainer />
    <SimpleEditor />
    <BasicDropdownWormhole />
  </template>,
) as unknown;
