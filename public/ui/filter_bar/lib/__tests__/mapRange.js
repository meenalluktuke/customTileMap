
describe('Filter Bar Directive', function () {
  describe('mapRange()', function () {
    let sinon = require('auto-release-sinon');
    let expect = require('expect.js');
    let ngMock = require('ngMock');
    let mapRange;
    let $rootScope;

    beforeEach(ngMock.module(
      'kibana',
      'kibana/courier',
      function ($provide) {
        $provide.service('courier', require('fixtures/mock_courier'));
      }
    ));

    beforeEach(ngMock.inject(function (Private, _$rootScope_) {
      mapRange = Private(require('plugins/customTileMap/ui/filter_bar/lib/mapRange'));
      $rootScope = _$rootScope_;
    }));

    it('should return the key and value for matching filters with gt/lt', function (done) {
      let filter = { meta: { index: 'logstash-*' }, range: { bytes: { lt: 2048, gt: 1024 } } };
      mapRange(filter).then(function (result) {
        expect(result).to.have.property('key', 'bytes');
        expect(result).to.have.property('value', '1,024 to 2,048');
        done();
      });
      $rootScope.$apply();
    });

    it('should return the key and value for matching filters with gte/lte', function (done) {
      let filter = { meta: { index: 'logstash-*' }, range: { bytes: { lte: 2048, gte: 1024 } } };
      mapRange(filter).then(function (result) {
        expect(result).to.have.property('key', 'bytes');
        expect(result).to.have.property('value', '1,024 to 2,048');
        done();
      });
      $rootScope.$apply();
    });

    it('should return undefined for none matching', function (done) {
      let filter = { meta: { index: 'logstash-*' }, query: { query_string: { query: 'foo:bar' } } };
      mapRange(filter).catch(function (result) {
        expect(result).to.be(filter);
        done();
      });
      $rootScope.$apply();
    });

  });
});
