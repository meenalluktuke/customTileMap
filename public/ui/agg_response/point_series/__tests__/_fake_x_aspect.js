describe('makeFakeXAspect', function () {

  let makeFakeXAspect;
  let Vis;
  let AggType;
  let AggConfig;
  let indexPattern;
  let expect = require('expect.js');
  let ngMock = require('ngMock');

  beforeEach(ngMock.module('kibana'));
  beforeEach(ngMock.inject(function (Private) {
    Vis = Private(require('plugins/customTileMap/ui/Vis'));
    AggConfig = Private(require('plugins/customTileMap/ui/Vis/AggConfig'));
    AggType = Private(require('plugins/customTileMap/ui/agg_types/AggType'));
    indexPattern = Private(require('plugins/customTileMap/ui/Vis'));
    makeFakeXAspect = Private(require('plugins/customTileMap/ui/agg_response/point_series/_fake_x_aspect'));
  }));

  it('creates an object that looks like an aspect', function () {
    let vis = new Vis(indexPattern, { type: 'histogram' });
    let aspect = makeFakeXAspect(vis);

    expect(aspect)
      .to.have.property('i', -1)
      .and.have.property('agg')
      .and.have.property('col');

    expect(aspect.agg)
      .to.be.an(AggConfig)
      .and.to.have.property('type');

    expect(aspect.agg.type)
      .to.be.an(AggType)
      .and.to.have.property('name', 'all')
      .and.to.have.property('title', 'All docs')
      .and.to.have.property('hasNoDsl', true);

    expect(aspect.col)
      .to.be.an('object')
      .and.to.have.property('aggConfig', aspect.agg)
      .and.to.have.property('label', aspect.agg.makeLabel());
  });
});
