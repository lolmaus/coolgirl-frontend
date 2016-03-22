import RESTAdapter from 'ember-data/adapters/rest';
import Ember       from 'ember';
import _           from 'npm:lodash';

const {
  String: { pluralize, underscore }
} = Ember;

import ENV from 'coolgirl-frontend/config/environment';

export default RESTAdapter.extend({

  // ----- Overridden properties -----
  host: ENV.APP.host,

  // ----- Overridden methods -----
  pathForType (modelName) {
    const name = _.flow(underscore, pluralize)(modelName);
    return `${name}.php`;
  }
});
