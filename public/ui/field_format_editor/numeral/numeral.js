define(function (require) {
  require('plugins/customTileMap/ui/field_format_editor/pattern/pattern');

  require('plugins/customTileMap/ui/modules')
  .get('kibana')
  .directive('fieldEditorNumeral', function () {
    return {
      restrict: 'E',
      template: require('plugins/customTileMap/ui/field_format_editor/numeral/numeral.html')
    };
  });
});
