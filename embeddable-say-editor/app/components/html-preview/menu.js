import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { generatePageForExport } from '@lblod/ember-rdfa-editor/utils/export-utils';

export default class HtmlPreviewMenuComponent extends Component {
  @tracked previewOpen = false;

  get exportPreview() {
    return generatePageForExport(this.args.controller);
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
