let RouteManager = require('./RouteManager');
let defaultRouteManager = new RouteManager();

module.exports = {
  ...defaultRouteManager,
  enable() {
    require('angular-route/angular-route');
    require('plugins/customTileMap/ui/modules')
    .get('kibana', ['ngRoute'])
    .config(defaultRouteManager.config);
  }
};
