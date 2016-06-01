define(function (require) {
  return function AggTypeMetricCountProvider(Private) {
    let MetricAggType = Private(require('plugins/customTileMap/ui/agg_types/metrics/MetricAggType'));
    let fieldFormats = Private(require('plugins/customTileMap/ui/registry/field_formats'));

    return new MetricAggType({
      name: 'count',
      title: 'Count',
      hasNoDsl: true,
      makeLabel: function () {
        return 'Count';
      },
      getFormat: function () {
        return fieldFormats.getDefaultInstance('number');
      },
      getValue: function (agg, bucket) {
        return bucket.doc_count;
      }
    });
  };
});
