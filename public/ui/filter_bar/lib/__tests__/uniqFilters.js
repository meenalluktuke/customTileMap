let uniqFilters = require('plugins/customTileMap/ui/filter_bar/lib/uniqFilters');
let expect = require('expect.js');
describe('Filter Bar Directive', function () {
  describe('uniqFilter', function () {

    it('should filter out dups', function () {
      let before = [
        { query: { _type: { match: { query: 'apache', type: 'phrase' } } } },
        { query: { _type: { match: { query: 'apache', type: 'phrase' } } } }
      ];
      let results = uniqFilters(before);
      expect(results).to.have.length(1);
    });

    it('should filter out duplicates, ignoring meta attributes', function () {
      let before = [
        {
          meta: { negate: true },
          query: { _type: { match: { query: 'apache', type: 'phrase' } } }
        },
        {
          meta: { negate: false },
          query: { _type: { match: { query: 'apache', type: 'phrase' } } }
        }
      ];
      let results = uniqFilters(before);
      expect(results).to.have.length(1);
    });

    it('should filter out duplicates, ignoring $state attributes', function () {
      let before = [
        {
          $state: { store: 'appState' },
          query: { _type: { match: { query: 'apache', type: 'phrase' } } }
        },
        {
          $state: { store: 'globalState' },
          query: { _type: { match: { query: 'apache', type: 'phrase' } } }
        }
      ];
      let results = uniqFilters(before);
      expect(results).to.have.length(1);
    });
  });
});
