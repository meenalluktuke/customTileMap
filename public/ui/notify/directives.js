define(function (require) {
  let notify = require('plugins/customTileMap/ui/modules').get('kibana/notify');
  let _ = require('lodash');

  notify.directive('kbnNotifications', function () {
    return {
      restrict: 'E',
      scope: {
        list: '=list'
      },
      replace: true,
      template: require('plugins/customTileMap/ui/notify/partials/toaster.html')
    };
  });
});
