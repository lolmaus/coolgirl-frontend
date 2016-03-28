import Ember from 'ember';

const {
  computed,
  computed: {filterBy, sort},
  Controller
} = Ember;

import { gt as gtByKeys } from 'ember-macaroni';

export default Controller.extend({

  // ----- Query params -----
  queryParams: ['tags', 'lang', 'mapper', 'battery'],
  tags:        null,
  lang:        null,
  mapper:      null,
  battery:     false,

  // ----- Static properties -----
  maxSize:         65536,

  // ----- Computed properties -----
  isFilterDefault: computed('lang', 'mapper', 'battery', function (){
    return (
      !this.get('lang')
      && !this.get('mapper')
      && !this.get('battery')
    );
  }),

  sortedGamesOrder: ['fullName', 'language'],
  sortedGames: sort('model.games', 'sortedGamesOrder'),

  filteredGames: computed(
    'sortedGames.@each.{language,mapper,battery}',
    'lang',
    'mapper',
    'battery',
    function () {
      return this
        .get('sortedGames')
        .filter(game => {
          return (
            (
              !this.get('lang')
              || this.get('lang') === game.get('language')
            )
            && (
              !this.get('mapper')
              || this.get('mapper') === game.get('mapper.name')
            )
            && (
              !this.get('battery')
              || game.get('battery')
            )
          );
        });
    }
  ),

  selectedGames: filterBy('filteredGames', 'checked'),

  selectedGamesSize: computed('selectedGames.@each.size', function () {
    return this
      .get('selectedGames')
      .mapBy('size')
      .reduce((a, b) => a + b, 0);
  }),

  isMaxSizeExceeded: gtByKeys('selectedGamesSize', 'maxSize'),

  languages: computed('model.games.@each.language', function () {
    return this
      .get('model.games')
      .mapBy('language')
      .uniq();
  }),

  mappers: computed('model.games.@each.mapper', function () {
    return this
      .get('model.games')
      .mapBy('mapper')
      .uniq();
  }),
  namedMappers: filterBy('mappers', 'name'),

  maxId: computed('model.games', function () {
    return this
      .get('model.games')
      .sortBy('id')
      .get('lastObject.id');
  }),

  hashh: computed('model.games', function () {
    var hash = "";
    var curhash = 0;
    var max_id = parseInt(this.get('maxId'), 10);

    for(var i = 0; i <= max_id; i++) {
      const currentGame = this.get('model.games').findBy('id', `${i}`);
      if (currentGame && currentGame.get('checked')) {
        curhash |= (1<<(i%8));
      }
      if ((i%8 === 7) || (i === max_id)) {
        hash = hash + (curhash+0x100).toString(16).substr(-2).toUpperCase();
        curhash = 0;
      }
    }

    hash = hash.replace(/00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000/g, "T");
    hash = hash.replace(/0000000000000000000000000000000000000000000000000000000000000000/g, "U");
    hash = hash.replace(/00000000000000000000000000000000/g, "V");
    hash = hash.replace(/0000000000000000/g, "W");
    hash = hash.replace(/00000000/g, "X");
    hash = hash.replace(/0000/g, "Y");
    hash = hash.replace(/00/g, "Z");

    return hash;
  }),


  // ----- Actions -----
  actions: {
    select (action) {
      this
        .get('sortedGames')
        .forEach(game => {
          if (action === 'all') {
            game.set('checked', true);
          }
          else if (action === 'none') {
            game.set('checked', false);
          } else if (action === 'default') {
            game.rollbackAttributes();
          }
        });
    },

    resetFilter () {
      this.setProperties({
        lang:        null,
        mapper:      null,
        battery:     false
      });
    }
  }
});
