import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class SimpleEditorComponent extends Component {
  @tracked editor;
  @tracked profile = 'default';

  get vocabString() {
    return this.args.model.context.vocab;
  }

  get prefixString() {
    const ctx = this.args.model.context;
    return Object.keys(ctx.prefix)
      .map((key) => `${key}: ${ctx.prefix[key]}`)
      .join(' ');
  }

  @action
  handleRdfaEditorInit(editor) {
    this.editor = editor;
  }

  @action
  insertedInDom(element) {
    element.getHtmlContent = this.getHtmlContent;
    element.setHtmlContent = this.setHtmlContent;
    element.on = this.on;
    element.off = this.off;
  }

  @action
  getHtmlContent() {
    return this.editor.htmlContent;
  }

  @action
  setHtmlContent(content) {
    this.editor.setHtmlContent(content);
  }

  @action
  on(eventName, callback) {
    this.editor.on(eventName, callback);
  }

  @action
  off(eventName, callback) {
    this.editor.off(eventName, callback);
  }
}
