describe('addToSiri', function () {
  let expect = require('expect.js');
  let ngMock = require('ngMock');
  let addToSiri;

  beforeEach(ngMock.module('kibana'));
  beforeEach(ngMock.inject(function (Private) {
    addToSiri = Private(require('plugins/customTileMap/ui/agg_response/point_series/_add_to_siri'));
  }));

  it('creates a new series the first time it sees an id', function () {
    let series = new Map();
    let point = {};
    let id = 'id';
    addToSiri(series, point, id);

    expect(series.has(id)).to.be(true);
    expect(series.get(id)).to.be.an('object');
    expect(series.get(id).label).to.be(id);
    expect(series.get(id).values).to.have.length(1);
    expect(series.get(id).values[0]).to.be(point);
  });

  it('adds points to existing series if id has been seen', function () {
    let series = new Map();
    let id = 'id';

    let point = {};
    addToSiri(series, point, id);

    let point2 = {};
    addToSiri(series, point2, id);

    expect(series.has(id)).to.be(true);
    expect(series.get(id)).to.be.an('object');
    expect(series.get(id).label).to.be(id);
    expect(series.get(id).values).to.have.length(2);
    expect(series.get(id).values[0]).to.be(point);
    expect(series.get(id).values[1]).to.be(point2);
  });

  it('allows overriding the series label', function () {
    let series = new Map();
    let id = 'id';
    let label = 'label';
    let point = {};
    addToSiri(series, point, id, label);

    expect(series.has(id)).to.be(true);
    expect(series.get(id)).to.be.an('object');
    expect(series.get(id).label).to.be(label);
    expect(series.get(id).values).to.have.length(1);
    expect(series.get(id).values[0]).to.be(point);
  });
});
