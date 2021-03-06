// Gets all fields of a given type.
// You may also pass "*" to get all types
// Or an array of types to get all fields of that type
define(function (require) {
  let _ = require('lodash');
  let propFilter = require('plugins/customTileMap/ui/filters/_prop_filter');

  require('plugins/customTileMap/ui/modules')
  .get('kibana')
  .filter('fieldType', function () {
    return propFilter('type');
  });
});
