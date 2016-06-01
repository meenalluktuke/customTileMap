define(function (require) {
  const _ = require('lodash');
  const $ = require('jquery');
  const module = require('plugins/customTileMap/ui/modules').get('kibana');
  require('plugins/customTileMap/ui/directives/inequality');

  module.directive('pointSeriesOptions', function ($parse, $compile) {
    return {
      restrict: 'E',
      template: require('plugins/kbn_vislib_vis_types/controls/point_series_options.html'),
      replace: true
    };
  });
});
