describe('Filter Bar Directive', function () {
  describe('mapQueryString()', function () {
    let expect = require('expect.js');
    let ngMock = require('ngMock');
    let mapQueryString;
    let $rootScope;
    beforeEach(ngMock.module('kibana'));
    beforeEach(ngMock.inject(function (Private, _$rootScope_) {
      $rootScope = _$rootScope_;
      mapQueryString = Private(require('plugins/customTileMap/ui/filter_bar/lib/mapQueryString'));
    }));

    it('should return the key and value for matching filters', function (done) {
      let filter = { query: { query_string: { query: 'foo:bar' } } };
      mapQueryString(filter).then(function (result) {
        expect(result).to.have.property('key', 'query');
        expect(result).to.have.property('value', 'foo:bar');
        done();
      });
      $rootScope.$apply();
    });

    it('should return undefined for none matching', function (done) {
      let filter = { query: { match: { query: 'foo' } } };
      mapQueryString(filter).catch(function (result) {
        expect(result).to.be(filter);
        done();
      });
      $rootScope.$apply();
    });

  });
});
