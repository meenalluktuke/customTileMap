define(function (require) {
  require('plugins/customTileMap/ui/modules')
    .get('kibana')
    .filter('uriescape', function () {
      return function (str) {
        return encodeURIComponent(str);
      };
    });
});
