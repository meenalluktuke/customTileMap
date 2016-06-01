define(function (require) {
  let _ = require('lodash');
  let angular = require('angular');
  let qs = require('plugins/customTileMap/ui/utils/query_string');
  let rison = require('plugins/customTileMap/ui/utils/rison');

  let module = require('plugins/customTileMap/ui/modules').get('kibana/global_state');

  module.service('globalState', function (Private, $rootScope, $location) {
    let State = Private(require('plugins/customTileMap/ui/state_management/state'));

    _.class(GlobalState).inherits(State);
    function GlobalState(defaults) {
      GlobalState.Super.call(this, '_g', defaults);
    }

    // if the url param is missing, write it back
    GlobalState.prototype._persistAcrossApps = true;

    GlobalState.prototype.removeFromUrl = function (url) {
      return qs.replaceParamInUrl(url, this._urlParam, null);
    };

    return new GlobalState();
  });
});
