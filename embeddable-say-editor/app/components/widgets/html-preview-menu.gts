import { on } from '@ember/modifier';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import type { SayController } from '@lblod/ember-rdfa-editor';
import { generatePageForExport } from '@lblod/ember-rdfa-editor/utils/export-utils';
import ToolbarButton from '@lblod/ember-rdfa-editor/components/toolbar/button';
import type { TOC } from '@ember/component/template-only';
import AuModal from '@appuniversum/ember-appuniversum/components/au-modal';
import AuButtonGroup from '@appuniversum/ember-appuniversum/components/au-button-group';
import AuButton from '@appuniversum/ember-appuniversum/components/au-button';

type Signature = {
  Args: {
    controller: SayController;
  };
};

export default class HTMLPreviewMenu extends Component<Signature> {
  @tracked previewOpen = false;

  get exportPreview() {
    return generatePageForExport(this.args.controller, false);
  }

  @action
  openPreview() {
    this.previewOpen = true;
  }
  @action
  closePreview() {
    this.previewOpen = false;
  }

  <template>
    {{! @glint-expect-error fix typechecking here }}
    <ToolbarButton
      {{! @glint-expect-error fix typechecking here }}
      {{on 'click' this.openPreview}}
      class='au-u-margin-left-tiny au-u-margin-right-tiny'
    >
      Preview Rendered HTML
    </ToolbarButton>
    <Modal
      @open={{this.previewOpen}}
      @doc={{this.exportPreview}}
      @onClose={{this.closePreview}}
    />
  </template>
}

type ModalSignature = {
  Args: {
    onClose: () => void;
    open?: boolean;
    doc: string;
  };
};
const Modal: TOC<ModalSignature> = <template>
  {{! FIXME fix the copy-pasted things }}
  <AuModal
    class='say-html-editor-modal'
    @title='HTML Editor'
    @closable={{true}}
    @closeModal={{@onClose}}
    @modalOpen={{@open}}
    @size='large'
    @padding='none'
  >
    <:title>Preview</:title>
    <:body>
      <iframe title='preview' height='100%' width='100%' srcdoc={{@doc}} />
    </:body>
    <:footer>
      <AuButtonGroup>
        <AuButton @skin='secondary' {{on 'click' @onClose}}>
          Close
        </AuButton>
      </AuButtonGroup>
    </:footer>
  </AuModal>
</template>;
