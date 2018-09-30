import { computed } from '@ember/object';
import Component from '@ember/component';
import PublicDomMixin from 'ember-public-dom-interface/mixins/public-dom';

export default Component.extend(PublicDomMixin, {
  profile: 'default',

  tagName: "notule-editor",

  vocabString: computed( 'model.context', function(){
    return this.model.context.vocab;
  }),

  prefixString: computed( 'model.context', function(){
    const ctx = this.model.context;

    return Object.keys(ctx.prefix).map( function(key) {
      return `${key}: ${ctx.prefix[key]}`;
    } ).join(" ");
  }),

  didInsertElement(){
    this._super(...arguments);
    this.element.setAttribute("vocab", this.vocabString);
    this.element.setAttribute("prefix", this.prefixString);
  },

  actions: {
    handleRdfaEditorInit(editor){
      this.set('editor', editor); // not sure where we'll need this yet
    }
  },

  publicInterface: {
    getHtmlContent(){
      return this.editor.rootNode.innerHTML;
    },
    setHtmlContent(content){
      // TODO: Alter this to set the innerHTML of the correct DOM
      // node, and request the editor's to refresh its inner state.  A
      // method for this exists for input events which were not
      // understood.
      this.set('model.content', content);
    }
  }
});
