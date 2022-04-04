import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class SimpleEditorComponent extends Component {
  @tracked editor;
  // For future plugin system
  //@tracked plugins = ['rdfa-editor-citaten-plugin'];
  @tracked plugins = ['besluit', 'template-variable', 'roadsign-regulation'];
  // Remove this in future plugin system, together with @profile on component, and editor-profiles.js
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
    this.setVocab(element);
    this.setPrefix(element);
    element.getHtmlContent = this.getHtmlContent;
    element.setHtmlContent = this.setHtmlContent;
    element.on = this.on;
    element.off = this.off;
  }

  /**
   * this is a workaround because emberjs does not allow us to assign the prefix attribute in the template
   * see https://github.com/emberjs/ember.js/issues/19369
   */
  @action
  setPrefix(element) {
    element.setAttribute('prefix', this.prefixString);
  }

  @action
  setVocab(element) {
    element.setAttribute('vocab', this.vocabString);
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
