describe('String Format', function () {
  let fieldFormats;
  let expect = require('expect.js');
  let ngMock = require('ngMock');

  beforeEach(ngMock.module('kibana'));
  beforeEach(ngMock.inject(function (Private) {
    fieldFormats = Private(require('plugins/customTileMap/ui/registry/field_formats'));
  }));

  it('decode a base64 string', function () {
    let StringFormat = fieldFormats.getType('string');
    let string = new StringFormat({
      transform: 'base64'
    });
    expect(string.convert('Zm9vYmFy')).to.be('foobar');
  });

});
