define(function (require) {
  require('plugins/customTileMap/ui/modules')
    .get('kibana')
    .filter('startFrom', function () {
      return function (input, start) {
        if (!input) return [];
        start = +start; //parse to int
        return input.slice(start);
      };
    });
});
