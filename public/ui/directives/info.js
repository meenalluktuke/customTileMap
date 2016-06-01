define(function (require) {
  let html = require('plugins/customTileMap/ui/partials/info.html');

  require('plugins/customTileMap/ui/modules')
    .get('kibana')
    .directive('kbnInfo', function () {
      return {
        restrict: 'E',
        scope: {
          info: '@',
          placement: '@'
        },
        template: html,
        link: function ($scope) {
          $scope.placement = $scope.placement || 'top';
        }
      };
    });
});
