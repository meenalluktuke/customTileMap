define(function (require) {
  return function NumberFormatProvider(Private) {
    let _ = require('lodash');
    let BoundToConfigObj = Private(require('plugins/customTileMap/ui/bound_to_config_obj'));
    let Numeral = Private(require('plugins/customTileMap/ui/stringify/types/_Numeral'));

    return Numeral.factory({
      id: 'percent',
      title: 'Percentage',
      paramDefaults: new BoundToConfigObj({
        pattern: '=format:percent:defaultPattern',
        fractional: true
      }),
      sampleInputs: [
        0.10, 0.99999, 1, 100, 1000
      ],
      prototype: {
        _convert: _.compose(Numeral.prototype._convert, function (val) {
          return this.param('fractional') ? val : val / 100;
        })
      }
    });
  };
});
