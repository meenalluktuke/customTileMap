
let _ = require('lodash');
describe('Filter Bar Directive', function () {
  describe('mapFlattenAndWrapFilters()', function () {
    let sinon = require('auto-release-sinon');
    let expect = require('expect.js');
    let ngMock = require('ngMock');
    let mapFlattenAndWrapFilters;
    let $rootScope;

    beforeEach(ngMock.module(
      'kibana',
      'kibana/courier',
      function ($provide) {
        $provide.service('courier', require('fixtures/mock_courier'));
      }
    ));

    beforeEach(ngMock.inject(function (Private, _$rootScope_) {
      mapFlattenAndWrapFilters = Private(require('plugins/customTileMap/ui/filter_bar/lib/mapFlattenAndWrapFilters'));
      $rootScope = _$rootScope_;
    }));

    let filters = [
      null,
      [
        { meta: { index: 'logstash-*' }, exists: { field: '_type' } },
        { meta: { index: 'logstash-*' }, missing: { field: '_type' } }
      ],
      { meta: { index: 'logstash-*' }, query: { query_string: { query: 'foo:bar' } } },
      { meta: { index: 'logstash-*' }, range: { bytes: { lt: 2048, gt: 1024 } } },
      { meta: { index: 'logstash-*' }, query: { match: { _type: { query: 'apache', type: 'phrase' } } } }
    ];

    it('should map, flatten and wrap filters', function (done) {
      mapFlattenAndWrapFilters(filters).then(function (results) {
        expect(results).to.have.length(5);
        _.each(results, function (filter) {
          expect(filter).to.have.property('meta');
          expect(filter.meta).to.have.property('apply', true);
        });
        done();
      });
      $rootScope.$apply();
    });

  });
});
