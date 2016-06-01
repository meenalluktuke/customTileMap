define(function (require) {
  let buildPhraseFilter = require('plugins/customTileMap/ui/filter_manager/lib/phrase');
  return function createTermsFilterProvider(Private) {
    return function (aggConfig, key) {
      return buildPhraseFilter(aggConfig.params.field, key, aggConfig.vis.indexPattern);
    };
  };
});
