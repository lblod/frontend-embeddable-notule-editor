import { computed } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  profile: 'default',

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
  }
});
