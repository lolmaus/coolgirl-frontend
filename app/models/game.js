import Model       from 'ember-data/model';
import attr        from 'ember-data/attr';
import {belongsTo} from 'ember-data/relationships';

import Ember from 'ember';
const {
  computed
} = Ember;

import ENV from 'coolgirl-frontend/config/environment';

export default Model.extend({
  
  // ----- Attributes -----
  checked:     attr('boolean'),
  file:        attr('string'),
  menuName:    attr('string'),
  fullName:    attr('string'),
  language:    attr('string'),
  size:        attr('number'),
  battery:     attr('boolean'),
  tag:         attr('string'),
  description: attr('string'),
  
  
  
  // ----- Relationships -----
  mapper: belongsTo('mapper', {async: false}),
  
  
  
  // ----- Computed properties -----
  imageUrl: computed('file', function () {
    const host     = ENV.APP.host;
    const fileName = this.get('file');
    
    return `${host}/gifs/${fileName}.gif`;
  })
});
