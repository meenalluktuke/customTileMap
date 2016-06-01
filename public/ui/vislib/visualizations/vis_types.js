define(function (require) {
  return function VisTypeFactory(Private) {

    /**
     * Provides the visualizations for the vislib
     *
     * @module vislib
     * @submodule VisTypeFactory
     * @param Private {Object} Loads any function as an angular module
     * @return {Function} Returns an Object of Visualization classes
     */
    return {
      histogram: Private(require('plugins/customTileMap/ui/vislib/visualizations/column_chart')),
      pie: Private(require('plugins/customTileMap/ui/vislib/visualizations/pie_chart')),
      line: Private(require('plugins/customTileMap/ui/vislib/visualizations/line_chart')),
      area: Private(require('plugins/customTileMap/ui/vislib/visualizations/area_chart')),
      custom_tile_map: Private(require('plugins/customTileMap/ui/vislib/visualizations/custom_tile_map'))
    };
  };
});
