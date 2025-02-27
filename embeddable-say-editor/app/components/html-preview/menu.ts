import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { generatePageForExport } from '@lblod/ember-rdfa-editor/utils/export-utils';
import type { SayController } from '@lblod/ember-rdfa-editor';

type Args = {
  controller: SayController;
};

export default class HtmlPreviewMenuComponent extends Component<Args> {
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
}
