define(function (require) {
	var colors = [];
	var typemap=[];
	var counter=0;
	var legendvalues=[];
	var legendColors = ['#DF0101','#04B404','#0040FF','#FFE503','#B404AE','#FF8000','#5E0B8E','#04651E','#823A1B','#08C3F7'];
	var legendMap = [[0,'#027b50'],[1,'#0633ed'],[2,'#ce4105'],[3,'#360468']];
	
  return function MarkerFactory() {
    let d3 = require('d3');
    let _ = require('lodash');
    let $ = require('jquery');
    let L = require('leaflet');

    /**
     * Base map marker overlay, all other markers inherit from this class
     *
     * @param map {Leaflet Object}
     * @param geoJson {geoJson Object}
     * @param params {Object}
     */
    function BaseMarker(map, geoJson, params) {
      this.map = map;
      this.geoJson = geoJson;
      this.popups = [];

      this._tooltipFormatter = params.tooltipFormatter || _.identity;
      this._valueFormatter = params.valueFormatter || _.identity;
      this._attr = params.attr || {};

      // set up the default legend colors
      //this.quantizeLegendColors();
    }

    /**
     * Adds legend div to each map when data is split
     * uses d3 scale from BaseMarker.prototype.quantizeLegendColors
     *
     * @method addLegend
     * @return {undefined}
     */
    BaseMarker.prototype.addLegend = function () {
      // ensure we only ever create 1 legend
      //if (this._legend) return;

	  this._legend="";
	 // legendvalues=[];
      let self = this;

      // create the legend control, keep a reference
      self._legend = L.control({position: 'bottomright'});

      self._legend.onAdd = function () {
        // creates all the neccessary DOM elements for the control, adds listeners
        // on relevant map events, and returns the element containing the control
        let $div = $('<div>').addClass('tilemap-legend');

		
		var i=0,j=0,k=0;
		//console.log("In addLegend colors array is -"+colors);
		_.each(colors,function(value){
			//console.log("In legend function, value is:"+value);
			i=_.indexOf(legendvalues,value);
			if(i==-1)
				legendvalues.push(value);
				
		});
		
		legendvalues.sort();
		i=0;
		console.log(legendvalues);
        _.each(legendvalues, function (value) {
          let labelText = value;
          let label = $('<div>').text(labelText);
		
		  k=_.indexOf(legendvalues,value);
	      var color = legendColors[k];
		  
          let icon = $('<i>').css({
            background: color,
            'border-color': self.darkerColor(color)
          });

          label.append(icon);
          $div.append(label);
        });

        return $div.get(0);
      };

      self._legend.addTo(self.map);
    };

    /**
     * Apply style with shading to feature
     *
     * @method applyShadingStyle
     * @param value {Object}
     * @return {Object}
     */
    BaseMarker.prototype.applyShadingStyle = function (value) {
	  var i=0,j=0,k=0;
	  var len=0;
	    
	  //console.log("colors array is -"+colors+" and value is: "+value);
	  //console.log("value is not undefined");
	  if(value!==undefined){
		  len=value.length;
	  }
		
	  if(len>0)
	  {
		 //console.log("Length of value:"+value.length);
		 colors.push(value); 
	  }
	  
		
		_.each(colors,function(value){
			i=_.indexOf(legendvalues,value);
			if(i==-1)
				legendvalues.push(value);
				
		});
	  legendvalues.sort();
	  j=_.indexOf(legendvalues,value);
	  var color="";
	  if(j==-1){
		  color="#FA5858";
		  
	  }
	  else{
       color= legendColors[j];
	  }
	  // console.log("In applyShadingStyle:"+j+"  "+color);
	  counter++;
	  //console.log("In function applyShadingStyle "+counter+" times. And value of value is: "+value);
      return {
        fillColor: color,
        color: this.darkerColor(color),
        weight: 1.5,
        opacity: 1,
        fillOpacity: 0.85
      };
	  

    };

    /**
     * Binds popup and events to each feature on map
     *
     * @method bindPopup
     * @param feature {Object}
     * @param layer {Object}
     * return {undefined}
     */
    BaseMarker.prototype.bindPopup = function (feature, layer) {
      let self = this;

      let popup = layer.on({
        mouseover: function (e) {
          let layer = e.target;
          // bring layer to front if not older browser
          if (!L.Browser.ie && !L.Browser.opera) {
            layer.bringToFront();
          }
          self._showTooltip(feature);
        },
        mouseout: function (e) {
          self._hidePopup();
        }
      });

      self.popups.push(popup);
    };

    /**
     * d3 method returns a darker hex color,
     * used for marker stroke color
     *
     * @method darkerColor
     * @param color {String} hex color
     * @param amount? {Number} amount to darken by
     * @return {String} hex color
     */
    BaseMarker.prototype.darkerColor = function (color, amount) {
      amount = amount || 1.3;
      return d3.hcl(color).darker(amount).toString();
    };

    BaseMarker.prototype.destroy = function () {
      let self = this;

      // remove popups
      self.popups = self.popups.filter(function (popup) {
        popup.off('mouseover').off('mouseout');
      });

      if (self._legend) {
        self.map.removeControl(self._legend);
        self._legend = undefined;
      }

      // remove marker layer from map
      if (self._markerGroup) {
        self.map.removeLayer(self._markerGroup);
        self._markerGroup = undefined;
      }
    };

    BaseMarker.prototype._addToMap = function () {
      this.map.addLayer(this._markerGroup);
    };

    /**
     * Creates leaflet marker group, passing options to L.geoJson
     *
     * @method _createMarkerGroup
     * @param options {Object} Options to pass to L.geoJson
     */
    BaseMarker.prototype._createMarkerGroup = function (options) {
      let self = this;
	  counter=0;
	  legendvalues=[];
	  colors=[];
	  
      let defaultOptions = {
        onEachFeature: function (feature, layer) {
          self.bindPopup(feature, layer);
        },
        style: function (feature) {
          let value = _.get(feature, 'properties.typehash');
          return self.applyShadingStyle(value);
        },
        filter: self._filterToMapBounds()
      };

      this._markerGroup = L.geoJson(this.geoJson, _.defaults(defaultOptions, options));
      this._addToMap();
    };

    /**
     * return whether feature is within map bounds
     *
     * @method _filterToMapBounds
     * @param map {Leaflet Object}
     * @return {boolean}
     */
    BaseMarker.prototype._filterToMapBounds = function () {
      let self = this;
      return function (feature) {
        let mapBounds = self.map.getBounds();
        let bucketRectBounds = _.get(feature, 'properties.rectangle');
        return mapBounds.intersects(bucketRectBounds);
      };
    };

    /**
     * Checks if event latlng is within bounds of mapData
     * features and shows tooltip for that feature
     *
     * @method _showTooltip
     * @param feature {LeafletFeature}
     * @param latLng? {Leaflet latLng}
     * @return undefined
     */
    BaseMarker.prototype._showTooltip = function (feature, latLng) {
      if (!this.map) return;
      let lat = _.get(feature, 'geometry.coordinates.1');
      let lng = _.get(feature, 'geometry.coordinates.0');
      latLng = latLng || L.latLng(lat, lng);

      let content = this._tooltipFormatter(feature);

      if (!content) return;
      this._createTooltip(content, latLng);
    };

    BaseMarker.prototype._createTooltip = function (content, latLng) {
      L.popup({autoPan: false})
      .setLatLng(latLng)
      .setContent(content)
      .openOn(this.map);
    };

    /**
     * Closes the tooltip on the map
     *
     * @method _hidePopup
     * @return undefined
     */
    BaseMarker.prototype._hidePopup = function () {
      if (!this.map) return;

      this.map.closePopup();
    };

    /**
     * d3 quantize scale returns a hex color, used for marker fill color
     *
     * @method quantizeLegendColors
     * return {undefined}
     */
    BaseMarker.prototype.quantizeLegendColors_original = function () {
      let min = _.get(this.geoJson, 'properties.allmin', 0);
      let max = _.get(this.geoJson, 'properties.allmax', 1);
      let quantizeDomain = (min !== max) ? [min, max] : d3.scale.quantize().domain();

      let reds1 = ['#ff6128'];
      let reds3 = ['#fecc5c', '#fd8d3c', '#e31a1c'];
      let reds5 = ['#fed976', '#feb24c', '#fd8d3c', '#f03b20', '#bd0026'];
      let bottomCutoff = 2;
      let middleCutoff = 24;

      if (max - min <= bottomCutoff) {
        this._legendColors = reds1;
      } else if (max - min <= middleCutoff) {
        this._legendColors = reds3;
      } else {
        this._legendColors = reds5;
      }

      this._legendQuantizer = d3.scale.quantize().domain(quantizeDomain).range(this._legendColors);
    };
	

    return BaseMarker;
  };
});
