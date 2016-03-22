/* jshint ignore:start */
import JSONSerializer from 'ember-data/serializers/json';
import _ from 'npm:lodash';
import Ember from 'ember';

const {
  String: { underscore }
} = Ember;

export default JSONSerializer.extend({

  // ----- Overridden methods -----
  normalizeFindAllResponse (store, primaryModelClass, payload, id, requestType) {
    const payloadSemiNormalized = _.map(payload, (attrsRaw, id) => ({...attrsRaw, id}));
    return this._super(store, primaryModelClass, payloadSemiNormalized, id, requestType);
  },

  keyForAttribute: underscore
});
