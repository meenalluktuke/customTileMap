define(function (require) {
  let moment = require('moment');
  let dateRange = require('plugins/customTileMap/ui/utils/date_range');
  require('plugins/customTileMap/ui/directives/validate_date_math');

  return function DateRangeAggDefinition(Private, config) {
    let BucketAggType = Private(require('plugins/customTileMap/ui/agg_types/buckets/_bucket_agg_type'));
    let createFilter = Private(require('plugins/customTileMap/ui/agg_types/buckets/create_filter/date_range'));
    let fieldFormats = Private(require('plugins/customTileMap/ui/registry/field_formats'));


    return new BucketAggType({
      name: 'date_range',
      title: 'Date Range',
      createFilter: createFilter,
      getKey: function (bucket, key, agg) {
        let formatter = agg.fieldOwnFormatter('text', fieldFormats.getDefaultInstance('date'));
        return dateRange.toString(bucket, formatter);
      },
      getFormat: function () {
        return fieldFormats.getDefaultInstance('string');
      },
      makeLabel: function (aggConfig) {
        return aggConfig.params.field.displayName + ' date ranges';
      },
      params: [{
        name: 'field',
        filterFieldTypes: 'date',
        default: function (agg) {
          return agg.vis.indexPattern.timeFieldName;
        }
      }, {
        name: 'ranges',
        default: [{
          from: 'now-1w/w',
          to: 'now'
        }],
        editor: require('plugins/customTileMap/ui/agg_types/controls/date_ranges.html')
      }]
    });
  };
});
