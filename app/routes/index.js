import Ember from 'ember';

const {
  Route,
  RSVP
} = Ember;

export default Route.extend({
  
  // ----- Overridden methods -----
  model () {
    return RSVP.hash({
      games:   this.store.findAll('game'),
      mappers: this.store.findAll('mapper')
    });
  }  
});
