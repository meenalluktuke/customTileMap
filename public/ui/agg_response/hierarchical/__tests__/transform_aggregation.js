
describe('buildHierarchicalData()', function () {
  describe('transformAggregation()', function () {
    let _ = require('lodash');
    let expect = require('expect.js');
    let ngMock = require('ngMock');
    let transform;
    let fixture;

    beforeEach(ngMock.module('kibana'));
    beforeEach(ngMock.inject(function (Private) {
      transform = Private(require('plugins/customTileMap/ui/agg_response/hierarchical/_transform_aggregation'));
    }));

    beforeEach(function () {

      function fakeAgg(id, name) {
        return {
          id: id,
          name: name,
          schema: { group: 'buckets' },
          getKey: _.noop,
          fieldFormatter: _.constant(String)
        };
      }

      fixture = {};
      fixture.agg = fakeAgg('agg_2', 'test');
      fixture.agg._next = fakeAgg('agg_3', 'example');

      fixture.metric = fakeAgg('agg_1', 'metric');
      fixture.metric.getValue = function (b) { return _.has(b, this.id) ? b[this.id] : b.doc_count; };

      fixture.aggData = {
        buckets: [
          { key: 'foo', doc_count: 2, agg_3: { buckets: [ { key: 'win', doc_count: 1 }, { key: 'mac', doc_count: 1 }]}},
          { key: 'bar', doc_count: 4, agg_3: {  buckets: [ { key: 'win', doc_count: 2 }, { key: 'mac', doc_count: 2 }]}}
        ]
      };

    });

    it('relies on metricAgg#getValue() for the size of the children', function () {
      let aggData = {
        buckets: [
          { key: 'foo' },
          { key: 'bar' }
        ]
      };

      let football = {};
      fixture.metric.getValue = _.constant(football);

      let children = transform(fixture.agg, fixture.metric, aggData);
      expect(children).to.be.an(Array);
      expect(children).to.have.length(2);
      expect(children[0]).to.have.property('size', football);
      expect(children[1]).to.have.property('size', football);
    });

    it('should create two levels of metrics', function () {
      let children = transform(fixture.agg, fixture.metric, fixture.aggData);
      fixture.metric.getValue = function (b) { return b.doc_count; };

      expect(children).to.be.an(Array);
      expect(children).to.have.length(2);
      expect(children[0]).to.have.property('children');
      expect(children[1]).to.have.property('children');
      expect(children[0]).to.have.property('aggConfig', fixture.agg);
      expect(children[1]).to.have.property('aggConfig', fixture.agg);
      expect(children[0].children).to.have.length(2);
      expect(children[1].children).to.have.length(2);
      expect(children[0]).to.have.property('name', 'foo');
      expect(children[0]).to.have.property('size', 2);
      expect(children[1]).to.have.property('name', 'bar');
      expect(children[1]).to.have.property('size', 4);
      expect(children[0].children[0]).to.have.property('size', 1);
      expect(children[0].children[0]).to.have.property('aggConfig', fixture.agg.agg_3);
      expect(children[0].children[0]).to.have.property('name', 'win');
      expect(children[0].children[1]).to.have.property('size', 1);
      expect(children[0].children[1]).to.have.property('parent', children[0]);
      expect(children[0].children[1]).to.have.property('aggConfig', fixture.agg.agg_3);
      expect(children[0].children[1]).to.have.property('name', 'mac');
      expect(children[1].children[0]).to.have.property('size', 2);
      expect(children[0].children[1]).to.have.property('parent', children[0]);
      expect(children[1].children[0]).to.have.property('aggConfig', fixture.agg.agg_3);
      expect(children[1].children[0]).to.have.property('name', 'win');
      expect(children[1].children[1]).to.have.property('size', 2);
      expect(children[1].children[1]).to.have.property('parent', children[1]);
      expect(children[1].children[1]).to.have.property('aggConfig', fixture.agg.agg_3);
      expect(children[1].children[1]).to.have.property('name', 'mac');
      expect(children[1].children[1]).to.have.property('parent', children[1]);
    });

  });
});
