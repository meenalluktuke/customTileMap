// prefetched for faster optimization runs
require('plugins/customTileMap/ui/vislib/lib/handler/types/pie');
require('plugins/customTileMap/ui/vislib/lib/handler/types/point_series');
require('plugins/customTileMap/ui/vislib/lib/handler/types/custom_tile_map');
require('plugins/customTileMap/ui/vislib/lib/handler/handler_types');
require('plugins/customTileMap/ui/vislib/lib/layout/layout_types');
require('plugins/customTileMap/ui/vislib/lib/data');
require('plugins/customTileMap/ui/vislib/visualizations/_map.js');
require('plugins/customTileMap/ui/vislib/visualizations/vis_types');
// end prefetching

/**
 * Provides the Kibana4 Visualization Library
 *
 * @module vislib
 * @main vislib
 * @return {Object} Contains the version number and the Vis Class for creating visualizations
 */
module.exports = function VislibProvider(Private) {
  require('plugins/customTileMap/ui/vislib/styles/main.less');

  return {
    version: '0.0.0',
    Vis: Private(require('plugins/customTileMap/ui/vislib/vis'))
  };
};
