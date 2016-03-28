import Ember from 'ember';

const {
  Route,
  RSVP
} = Ember;

export default Route.extend({

  // ----- Overridden methods -----
  model (params/*, transition*/) {
    return RSVP.hash({
      games:   this.store.query('game', {tags: params.tags}),
      mappers: this.store.findAll('mapper')
    });
  }
});
