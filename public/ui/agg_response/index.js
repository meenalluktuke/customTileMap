define(function (require) {
  return function NormalizeChartDataFactory(Private) {
    return {
      hierarchical: Private(require('plugins/customTileMap/ui/agg_response/hierarchical/build_hierarchical_data')),
      pointSeries: Private(require('plugins/customTileMap/ui/agg_response/point_series/point_series')),
      tabify: Private(require('plugins/customTileMap/ui/agg_response/tabify/tabify')),
      geoJson: Private(require('plugins/customTileMap/ui/agg_response/geo_json/geo_json'))
    };
  };
});
