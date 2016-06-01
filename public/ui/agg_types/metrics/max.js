define(function (require) {
  return function AggTypeMetricMaxProvider(Private) {
    let MetricAggType = Private(require('plugins/customTileMap/ui/agg_types/metrics/MetricAggType'));

    return new MetricAggType({
      name: 'max',
      title: 'Max',
      makeLabel: function (aggConfig) {
        return 'Max ' + aggConfig.params.field.displayName;
      },
      params: [
        {
          name: 'field',
          filterFieldTypes: 'number,date'
        }
      ]
    });
  };
});
