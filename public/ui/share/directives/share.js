const app = require('plugins/customTileMap/ui/modules').get('kibana');

app.directive('share', function () {
  return {
    restrict: 'E',
    scope: {
      objectType: '@',
      objectId: '@',
      setAllowEmbed: '&?allowEmbed'
    },
    template: require('plugins/customTileMap/ui/share/views/share.html'),
    controller: function ($scope) {
      $scope.allowEmbed = $scope.setAllowEmbed ? $scope.setAllowEmbed() : true;
    }
  };
});
