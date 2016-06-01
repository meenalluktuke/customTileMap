define(function (require) {
  return function TileMapFactory(Private) {
    let d3 = require('d3');
    let _ = require('lodash');
    let $ = require('jquery');

    let Chart = Private(require('plugins/customTileMap/ui/vislib/visualizations/_chart'));
    let TileMapMap = Private(require('plugins/customTileMap/ui/vislib/visualizations/_map'));

    /**
     * Tile Map Visualization: renders maps
     *
     * @class customTileMap
     * @constructor
     * @extends Chart
     * @param handler {Object} Reference to the Handler Class Constructor
     * @param chartEl {HTMLElement} HTML element to which the map will be appended
     * @param chartData {Object} Elasticsearch query results for this map
     */
    _.class(customTileMap).inherits(Chart);
    function customTileMap(handler, chartEl, chartData) {
      if (!(this instanceof customTileMap)) {
        return new customTileMap(handler, chartEl, chartData);
      }

      customTileMap.Super.apply(this, arguments);

      // track the map objects
      this.maps = [];
      this._chartData = chartData || {};
      _.assign(this, this._chartData);

      this._appendGeoExtents();
    }

    /**
     * Draws tile map, called on chart render
     *
     * @method draw
     * @return {Function} - function to add a map to a selection
     */
    customTileMap.prototype.draw = function () {
      let self = this;

      // clean up old maps
      self.destroy();

      return function (selection) {
        selection.each(function () {
          self._appendMap(this);
        });
      };
    };

    /**
     * Invalidate the size of the map, so that leaflet will resize to fit.
     * then moves to center
     *
     * @method resizeArea
     * @return {undefined}
     */
    customTileMap.prototype.resizeArea = function () {
      this.maps.forEach(function (map) {
        map.updateSize();
      });
    };

    /**
     * clean up the maps
     *
     * @method destroy
     * @return {undefined}
     */
    customTileMap.prototype.destroy = function () {
      this.maps = this.maps.filter(function (map) {
        map.destroy();
      });
    };

    /**
     * Adds allmin and allmax properties to geoJson data
     *
     * @method _appendMap
     * @param selection {Object} d3 selection
     */
    customTileMap.prototype._appendGeoExtents = function () {
      // add allmin and allmax to geoJson
      let geoMinMax = this.handler.data.getGeoExtents();
      this.geoJson.properties.allmin = geoMinMax.min;
      this.geoJson.properties.allmax = geoMinMax.max;
    };

    /**
     * Renders map
     *
     * @method _appendMap
     * @param selection {Object} d3 selection
     */
    customTileMap.prototype._appendMap = function (selection) {
      let container = $(selection).addClass('tilemap');

      let map = new TileMapMap(container, this._chartData, {
        // center: this._attr.mapCenter,
        // zoom: this._attr.mapZoom,
        events: this.events,
        markerType: this._attr.mapType,
        tooltipFormatter: this.tooltipFormatter,
        valueFormatter: this.valueFormatter,
        attr: this._attr
      });

      // add title for splits
      if (this.title) {
        map.addTitle(this.title);
      }

      // add fit to bounds control
      if (_.get(this.geoJson, 'features.length') > 0) {
        map.addFitControl();
        map.addBoundingControl();
      }

      this.maps.push(map);
    };

    return customTileMap;
  };
});
