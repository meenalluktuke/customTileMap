let d3 = require('d3');
let angular = require('angular');
let _ = require('lodash');
let $ = require('jquery');
let ngMock = require('ngMock');
let expect = require('expect.js');

describe('Vislib ChartTitle Class Test Suite', function () {
  let ChartTitle;
  let Data;
  let persistedState;
  let chartTitle;
  let el;
  let dataObj;
  let data = {
    hits: 621,
    label: '',
    ordered: {
      date: true,
      interval: 30000,
      max: 1408734982458,
      min: 1408734082458
    },
    series: [
      {
        values: [
          {
            x: 1408734060000,
            y: 8
          },
          {
            x: 1408734090000,
            y: 23
          },
          {
            x: 1408734120000,
            y: 30
          },
          {
            x: 1408734150000,
            y: 28
          },
          {
            x: 1408734180000,
            y: 36
          },
          {
            x: 1408734210000,
            y: 30
          },
          {
            x: 1408734240000,
            y: 26
          },
          {
            x: 1408734270000,
            y: 22
          },
          {
            x: 1408734300000,
            y: 29
          },
          {
            x: 1408734330000,
            y: 24
          }
        ]
      }
    ],
    xAxisLabel: 'Date Histogram',
    yAxisLabel: 'Count'
  };

  beforeEach(ngMock.module('kibana'));
  beforeEach(ngMock.inject(function (Private) {
    ChartTitle = Private(require('plugins/customTileMap/ui/vislib/lib/chart_title'));
    Data = Private(require('plugins/customTileMap/ui/vislib/lib/data'));
    persistedState = new (Private(require('plugins/customTileMap/ui/persisted_state/persisted_state')))();

    el = d3.select('body').append('div')
      .attr('class', 'vis-wrapper')
      .datum(data);

    el.append('div')
      .attr('class', 'chart-title')
      .style('height', '20px');

    dataObj = new Data(data, {}, persistedState);
    chartTitle = new ChartTitle($('.vis-wrapper')[0], 'rows');
  }));

  afterEach(function () {
    el.remove();
  });

  describe('render Method', function () {
    beforeEach(function () {
      chartTitle.render();
    });

    it('should append an svg to div', function () {
      expect(el.select('.chart-title').selectAll('svg').length).to.be(1);
    });

    it('should append text', function () {
      expect(!!el.select('.chart-title').selectAll('svg').selectAll('text')).to.be(true);
    });
  });

  describe('draw Method', function () {
    it('should be a function', function () {
      expect(_.isFunction(chartTitle.draw())).to.be(true);
    });
  });

});
