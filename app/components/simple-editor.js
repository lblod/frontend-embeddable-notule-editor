import Component from '@glimmer/component';
import { action } from '@ember/object';
import { getOwner } from '@ember/application';
import { tracked } from 'tracked-built-ins';
export default class SimpleEditorComponent extends Component {
  @tracked editor;

  @tracked plugins = tracked(Set);

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
    element.enablePlugin = this.enablePlugin;
    element.setActivePlugins = this.setActivePlugins;
    element.disablePlugin = this.disablePlugin;
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
  enablePlugin(plugin) {
    this.plugins.add(plugin);
  }

  @action
  disablePlugin(plugin) {
    this.plugins.delete(plugin);
  }

  @action
  setActivePlugins(...plugins) {
    this.plugins = tracked(new Set(plugins));
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
