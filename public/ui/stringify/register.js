define(function (require) {
  let fieldFormats = require('plugins/customTileMap/ui/registry/field_formats');
  fieldFormats.register(require('plugins/customTileMap/ui/stringify/types/Url'));
  fieldFormats.register(require('plugins/customTileMap/ui/stringify/types/Bytes'));
  fieldFormats.register(require('plugins/customTileMap/ui/stringify/types/Date'));
  fieldFormats.register(require('plugins/customTileMap/ui/stringify/types/Ip'));
  fieldFormats.register(require('plugins/customTileMap/ui/stringify/types/Number'));
  fieldFormats.register(require('plugins/customTileMap/ui/stringify/types/Percent'));
  fieldFormats.register(require('plugins/customTileMap/ui/stringify/types/String'));
  fieldFormats.register(require('plugins/customTileMap/ui/stringify/types/Source'));
  fieldFormats.register(require('plugins/customTileMap/ui/stringify/types/Color'));
  fieldFormats.register(require('plugins/customTileMap/ui/stringify/types/truncate'));
});
