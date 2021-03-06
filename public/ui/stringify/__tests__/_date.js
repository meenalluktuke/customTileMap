describe('Date Format', function () {
  let expect = require('expect.js');
  let ngMock = require('ngMock');
  let moment = require('moment-timezone');
  let fieldFormats;
  let settings;
  let convert;
  let $scope;
  let off;

  beforeEach(ngMock.module('kibana'));
  beforeEach(ngMock.inject(function (Private, config, $rootScope) {
    $scope = $rootScope;
    settings = config;

    fieldFormats = Private(require('plugins/customTileMap/ui/registry/field_formats'));
    let DateFormat = fieldFormats.getType('date');
    let date = new DateFormat();

    convert = date.convert.bind(date);
  }));

  it('decoding an undefined or null date should return an empty string', function () {
    expect(convert(null)).to.be('-');
    expect(convert(undefined)).to.be('-');
  });

  it('should clear the memoization cache after changing the date', function () {
    function setDefaultTimezone() {
      moment.tz.setDefault(settings.get('dateFormat:tz'));
    }
    let time = 1445027693942;

    off = $scope.$on('change:config.dateFormat:tz', setDefaultTimezone);

    settings.set('dateFormat:tz', 'America/Chicago');
    $scope.$digest();
    let chicagoTime = convert(time);

    settings.set('dateFormat:tz', 'America/Phoenix');
    $scope.$digest();
    let phoenixTime = convert(time);

    expect(chicagoTime).not.to.equal(phoenixTime);
    off();
  });
});
