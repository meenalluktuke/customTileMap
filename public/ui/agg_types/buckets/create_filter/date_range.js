define(function (require) {
  let dateRange = require('plugins/customTileMap/ui/utils/date_range');

  return function createDateRangeFilterProvider(config) {
    let buildRangeFilter = require('plugins/customTileMap/ui/filter_manager/lib/range');

    return function (agg, key) {
      let range = dateRange.parse(key, config.get('dateFormat'));

      let filter = {};
      if (range.from) filter.gte = +range.from;
      if (range.to) filter.lt = +range.to;
      if (range.to && range.from) filter.format = 'epoch_millis';

      return buildRangeFilter(agg.params.field, filter, agg.vis.indexPattern);
    };

  };
});
