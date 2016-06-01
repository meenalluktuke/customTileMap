const _ = require('lodash');
const resolve = require('path').resolve;
const basename = require('path').basename;
const readdir = require('fs').readdirSync;

const utils = require('requirefrom')('src/utils');
const fromRoot = utils('fromRoot');

function scan(type) {
  const dir = fromRoot('src/ui/public', type);

  return _.chain(readdir(dir))
  .reject(function (name) {
    return name[0] === '.' || name[0] === '_';
  })
  .map(function (filename) {
    const path = resolve(dir, filename);
    const name = basename(filename, '.js');
    return `ui/${type}/${name}`;
  })
  .value();
}

function findStyles() {
  const base = ['plugins/customTileMap/ui/styles/theme.less', 'plugins/customTileMap/ui/styles/base.less'];
  const exclude = ['plugins/customTileMap/ui/styles/mixins.less', 'plugins/customTileMap/ui/styles/variables.less'];
  const found = scan('styles', true);

  return _.difference(_.union(base, found), exclude);
}

exports.reload = function () {
  exports.directives = scan('directives');
  exports.filters = scan('filters');
  exports.styles = findStyles();
  exports.modules = [
    'angular',
    'plugins/customTileMap/ui/chrome',
    'plugins/customTileMap/ui/chrome/context',
    'plugins/customTileMap/ui/bind',
    'plugins/customTileMap/ui/bound_to_config_obj',
    'plugins/customTileMap/ui/config',
    'plugins/customTileMap/ui/courier',
    'plugins/customTileMap/ui/debounce',
    'plugins/customTileMap/ui/doc_title',
    'plugins/customTileMap/ui/elastic_textarea',
    'plugins/customTileMap/ui/es',
    'plugins/customTileMap/ui/events',
    'plugins/customTileMap/ui/fancy_forms',
    'plugins/customTileMap/ui/filter_bar',
    'plugins/customTileMap/ui/filter_manager',
    'plugins/customTileMap/ui/index_patterns',
    'plugins/customTileMap/ui/listen',
    'plugins/customTileMap/ui/notify',
    'plugins/customTileMap/ui/parse_query',
    'plugins/customTileMap/ui/persisted_log',
    'plugins/customTileMap/ui/private',
    'plugins/customTileMap/ui/promises',
    'plugins/customTileMap/ui/safe_confirm',
    'plugins/customTileMap/ui/state_management/app_state',
    'plugins/customTileMap/ui/state_management/global_state',
    'plugins/customTileMap/ui/storage',
    'plugins/customTileMap/ui/stringify/register',
    'plugins/customTileMap/ui/styleCompile',
    'plugins/customTileMap/ui/timefilter',
    'plugins/customTileMap/ui/timepicker', // TODO: remove this for 5.0
    'plugins/customTileMap/ui/tooltip',
    'plugins/customTileMap/ui/typeahead',
    'plugins/customTileMap/ui/url',
    'plugins/customTileMap/ui/validateDateInterval',
    'plugins/customTileMap/ui/watch_multi'
  ];

  exports.require = _.flatten([
    exports.directives,
    exports.filters,
    exports.styles,
    exports.modules
  ]);
};

exports.reload();
