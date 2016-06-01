define(function (require) {
  return require('plugins/customTileMap/ui/registry/_registry')({
    name: 'savedObjects',
    index: ['loaderProperties.name'],
    order: ['loaderProperties.name']
  });
});
