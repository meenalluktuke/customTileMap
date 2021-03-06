describe('renderbot#buildChartData', function () {
  let _ = require('lodash');
  let ngMock = require('ngMock');
  let expect = require('expect.js');
  let sinon = require('auto-release-sinon');

  let buildChartData;
  let aggResponse;
  let TableGroup;
  let Table;

  beforeEach(ngMock.module('kibana'));
  beforeEach(ngMock.inject(function (Private) {
    Table = Private(require('plugins/customTileMap/ui/agg_response/tabify/_table'));
    TableGroup = Private(require('plugins/customTileMap/ui/agg_response/tabify/_table_group'));
    aggResponse = Private(require('plugins/customTileMap/ui/agg_response/index'));
    buildChartData = Private(require('plugins/customTileMap/ui/vislib_vis_type/buildChartData'));
  }));

  describe('for hierarchical vis', function () {
    it('defers to hierarchical aggResponse converter', function () {
      let football = {};
      let renderbot = {
        vis: {
          isHierarchical: _.constant(true)
        }
      };

      let stub = sinon.stub(aggResponse, 'hierarchical').returns(football);
      expect(buildChartData.call(renderbot, football)).to.be(football);
      expect(stub).to.have.property('callCount', 1);
      expect(stub.firstCall.args[0]).to.be(renderbot.vis);
      expect(stub.firstCall.args[1]).to.be(football);
    });
  });

  describe('for point plot', function () {
    it('calls tabify to simplify the data into a table', function () {
      let renderbot = {
        vis: {
          isHierarchical: _.constant(false)
        }
      };
      let football = { tables: [], hits: { total: 1 } };

      let stub = sinon.stub(aggResponse, 'tabify').returns(football);
      expect(buildChartData.call(renderbot, football)).to.eql({ rows: [], hits: 1 });
      expect(stub).to.have.property('callCount', 1);
      expect(stub.firstCall.args[0]).to.be(renderbot.vis);
      expect(stub.firstCall.args[1]).to.be(football);
    });

    it('returns a single chart if the tabify response contains only a single table', function () {
      let chart = { hits: 1, rows: [], columns: [] };
      let renderbot = {
        vis: {
          isHierarchical: _.constant(false),
          type: {
            responseConverter: _.constant(chart)
          }
        }
      };
      let esResp = { hits: { total: 1 } };
      let tabbed = { tables: [ new Table() ] };

      sinon.stub(aggResponse, 'tabify').returns(tabbed);
      expect(buildChartData.call(renderbot, esResp)).to.eql(chart);
    });

    it('converts table groups into rows/columns wrappers for charts', function () {
      let chart = { hits: 1, rows: [], columns: [] };
      let converter = sinon.stub().returns('chart');
      let esResp = { hits: { total: 1 } };
      let tables = [new Table(), new Table(), new Table(), new Table()];

      let renderbot = {
        vis: {
          isHierarchical: _.constant(false),
          type: {
            responseConverter: converter
          }
        }
      };

      let tabify = sinon.stub(aggResponse, 'tabify').returns({
        tables: [
          {
            aggConfig: { params: { row: true } },
            tables: [
              {
                aggConfig: { params: { row: false } },
                tables: [ tables[0] ]
              },
              {
                aggConfig: { params: { row: false } },
                tables: [ tables[1] ]
              }
            ]
          },
          {
            aggConfig: { params: { row: true } },
            tables: [
              {
                aggConfig: { params: { row: false } },
                tables: [ tables[2] ]
              },
              {
                aggConfig: { params: { row: false } },
                tables: [ tables[3] ]
              }
            ]
          }
        ]
      });

      let chartData = buildChartData.call(renderbot, esResp);

      // verify tables were converted
      expect(converter).to.have.property('callCount', 4);
      expect(converter.args[0][1]).to.be(tables[0]);
      expect(converter.args[1][1]).to.be(tables[1]);
      expect(converter.args[2][1]).to.be(tables[2]);
      expect(converter.args[3][1]).to.be(tables[3]);

      expect(chartData).to.have.property('rows');
      expect(chartData.rows).to.have.length(2);
      chartData.rows.forEach(function (row) {
        expect(row).to.have.property('columns');
        expect(row.columns).to.eql([ 'chart', 'chart' ]);
      });
    });
  });
});
