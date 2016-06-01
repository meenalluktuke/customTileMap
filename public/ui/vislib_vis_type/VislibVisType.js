define(function (require) {
  return function VislibVisTypeFactory(Private) {
    let _ = require('lodash');

    require('plugins/customTileMap/ui/vislib');
    let VisTypeSchemas = Private(require('plugins/customTileMap/ui/Vis/Schemas'));
    let VisType = Private(require('plugins/customTileMap/ui/Vis/VisType'));
    let pointSeries = Private(require('plugins/customTileMap/ui/agg_response/point_series/point_series'));
    let VislibRenderbot = Private(require('plugins/customTileMap/ui/vislib_vis_type/VislibRenderbot'));

    require('plugins/customTileMap/controls/vislib_basic_options');
    require('plugins/customTileMap/controls/point_series_options');
    require('plugins/customTileMap/controls/line_interpolation_option');

    _.class(VislibVisType).inherits(VisType);
    function VislibVisType(opts) {
      opts = opts || {};

      VislibVisType.Super.call(this, opts);

      if (this.responseConverter == null) {
        this.responseConverter = pointSeries;
      }

      this.listeners = opts.listeners || {};
    }

    VislibVisType.prototype.createRenderbot = function (vis, $el, uiState) {
      return new VislibRenderbot(vis, $el, uiState);
    };

    return VislibVisType;
  };
});
