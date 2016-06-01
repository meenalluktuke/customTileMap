define(function (require) {
  return function AggTypeMetricAvgProvider(Private) {
    let MetricAggType = Private(require('plugins/customTileMap/ui/agg_types/metrics/MetricAggType'));

    return new MetricAggType({
      name: 'avg',
      title: 'Average',
      makeLabel: function (aggConfig) {
        return 'Average ' + aggConfig.params.field.displayName;
      },
      params: [
        {
          name: 'field',
          filterFieldTypes: 'number'
        }
      ]
    });
  };
});
