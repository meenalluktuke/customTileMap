require('babel/polyfill');

let _ = require('lodash');
let $ = require('jquery');
let angular = require('angular');

require('plugins/customTileMap/ui/timefilter');
require('plugins/customTileMap/ui/private');
require('plugins/customTileMap/ui/promises');

let metadata = require('plugins/customTileMap/ui/metadata');

let chrome = {};
let internals = _.defaults(
  _.cloneDeep(metadata),
  {
    basePath: '',
    rootController: null,
    rootTemplate: null,
    showAppsLink: null,
    xsrfToken: null,
    brand: null,
    nav: [],
    applicationClasses: []
  }
);

$('<link>').attr({
  href: require('plugins/customTileMap/ui/images/elk.ico'),
  rel: 'shortcut icon'
}).appendTo('head');

require('./api/apps')(chrome, internals);
require('./api/xsrf')(chrome, internals);
require('./api/nav')(chrome, internals);
require('./api/angular')(chrome, internals);
require('./api/controls')(chrome, internals);
require('./api/tabs')(chrome, internals);
require('./api/template')(chrome, internals);
require('./api/theme')(chrome, internals);

chrome.bootstrap = function () {
  chrome.setupAngular();
  angular.bootstrap(document, ['kibana']);
};

module.exports = chrome;
