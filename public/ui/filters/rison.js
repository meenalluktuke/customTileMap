define(function (require) {
  let rison = require('plugins/customTileMap/ui/utils/rison');
  let module = require('plugins/customTileMap/ui/modules').get('kibana');

  module.filter('rison', function () {
    return function (str) {
      return rison.encode(str);
    };
  });

  module.filter('risonDecode', function () {
    return function (str) {
      return rison.decode(str);
    };
  });
});
