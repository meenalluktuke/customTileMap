define(function (require) {
  return function HandlerTypeFactory(Private) {
    let pointSeries = Private(require('plugins/customTileMap/ui/vislib/lib/handler/types/point_series'));

    /**
     * Handles the building of each visualization
     *
     * @return {Function} Returns an Object of Handler types
     */
    return {
      histogram: pointSeries.column,
      line: pointSeries.line,
      pie: Private(require('plugins/customTileMap/ui/vislib/lib/handler/types/pie')),
      area: pointSeries.area,
      custom_tile_map: Private(require('plugins/customTileMap/ui/vislib/lib/handler/types/custom_tile_map'))
    };
  };
});
