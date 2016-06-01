define(function (require) {
  let _ = require('lodash');
  let typeahead = require('plugins/customTileMap/ui/modules').get('kibana/typeahead');
  let listTemplate = require('plugins/customTileMap/ui/typeahead/partials/typeahead-items.html');

  require('plugins/customTileMap/ui/notify/directives');

  typeahead.directive('kbnTypeaheadItems', function () {
    return {
      restrict: 'E',
      require: '^kbnTypeahead',
      replace: true,
      template: listTemplate,

      link: function ($scope, $el, attr, typeaheadCtrl) {
        $scope.typeahead = typeaheadCtrl;
      }
    };
  });
});
