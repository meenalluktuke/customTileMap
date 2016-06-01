
describe('Filter Bar Directive', function () {
  describe('filterOutTimeBasedFilter()', function () {

    let expect = require('expect.js');
    let ngMock = require('ngMock');
    let sinon = require('auto-release-sinon');
    let filterOutTimeBasedFilter;
    let $rootScope;

    beforeEach(ngMock.module(
      'kibana',
      'kibana/courier',
      function ($provide) {
        $provide.service('courier', require('fixtures/mock_courier'));
      }
    ));

    beforeEach(ngMock.inject(function (Private, _$rootScope_, Promise) {
      filterOutTimeBasedFilter = Private(require('plugins/customTileMap/ui/filter_bar/lib/filterOutTimeBasedFilter'));
      $rootScope = _$rootScope_;
    }));

    it('should return the matching filter for the defualt time field', function (done) {
      let filters = [
        { meta: { index: 'logstash-*' }, query: { match: { _type:  { query: 'apache', type: 'phrase' } } } },
        { meta: { index: 'logstash-*' }, range: { 'time': { gt: 1388559600000, lt: 1388646000000 } } }
      ];
      filterOutTimeBasedFilter(filters).then(function (results) {
        expect(results).to.have.length(1);
        expect(results).to.not.contain(filters[1]);
        done();
      });
      $rootScope.$apply();
    });

  });
});