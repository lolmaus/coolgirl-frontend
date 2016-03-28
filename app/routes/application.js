import Ember from 'ember';

export default Ember.Route.extend({
  
  // ----- Actions -----
  actions: {
    transitionTo(...args) {
      this.transitionTo(...args);
    }
  }  
});
