let expect = require('expect.js');
let ngMock = require('ngMock');

describe('AggTypesComponent', function () {
  require('./AggType');
  require('./AggParams');
  require('./bucketCountBetween');
  require('./buckets/_histogram');
  require('./buckets/_range');

  describe('bucket aggs', function () {
    let bucketAggs;
    let BucketAggType;

    beforeEach(ngMock.module('kibana'));
    beforeEach(ngMock.inject(function (Private) {
      bucketAggs = Private(require('plugins/customTileMap/ui/agg_types/index')).byType.buckets;
      BucketAggType = Private(require('plugins/customTileMap/ui/agg_types/buckets/_bucket_agg_type'));
    }));

    it('all extend BucketAggType', function () {
      bucketAggs.forEach(function (bucketAgg) {
        expect(bucketAgg).to.be.a(BucketAggType);
      });
    });
  });

  describe('metric aggs', function () {
    let metricAggs;
    let MetricAggType;

    beforeEach(ngMock.module('kibana'));
    beforeEach(ngMock.inject(function (Private) {
      metricAggs = Private(require('plugins/customTileMap/ui/agg_types/index')).byType.metrics;
      MetricAggType = Private(require('plugins/customTileMap/ui/agg_types/metrics/MetricAggType'));
    }));

    it('all extend MetricAggType', function () {
      metricAggs.forEach(function (metricAgg) {
        expect(metricAgg).to.be.a(MetricAggType);
      });
    });
  });
});
