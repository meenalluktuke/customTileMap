define(function (require) {
  return require('plugins/customTileMap/ui/registry/_registry')({
    name: 'visTypes',
    index: ['name'],
    order: ['order']
  });
});
