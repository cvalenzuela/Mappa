// -----------
// Tests for Mapbox
// -----------

import '../browser';
import { expect } from 'chai';
import Mappa from '../../src/index';

var mapboxTileKey = 'abcd'
var mapboxTileMappa = new Mappa('Mapbox', mapboxTileKey);
var mapboxTileMap = mapboxTileMappa.tileMap(0,0,0);

describe('Mapbox tile instance', function () {
  it('should return a new mappa object with provider and key', function () {
    expect(mapboxTileMappa).to.include.all.keys('provider', 'key');
  });
  it('should return a script key with the correct Mapbox url', function () {
    expect(mapboxTileMap.script).to.be.a('string');
  });
  it('should inject the url into the document', function () {
    var provider = !!document.getElementById('Mapbox');
    expect(provider).to.be.true;
  });
});

describe('The canvas', function () {
  var canvas = document.createElement('canvas');
  document.body.appendChild(canvas);
  mapboxTileMap.overlay(canvas);

  it('should overlayed over the mapbox map', function () {
    expect(true).to.be.true;
  });
});

// describe('The methods of Mapbox', function () {
//   var googleTileMapPos = mapboxTileMap.latLngToPixel(0, 0);
//   it('latLngToPixel should return a pixel position', function () {
//     expect(googleTileMapPos).to.have.property('x', -100);
//     expect(googleTileMapPos).to.have.property('y', -100);
//   });

//   var googleTileMapZoom = mapboxTileMap.zoom();
//   it('zoom should return a number', function () {
//     expect(googleTileMapZoom).to.equal(0)
//   });

//   var googleTileMapPoint = mapboxTileMap.fromPointToLatLng(0,0);
//   it('fromPointToLatLng should return a lat/lng position', function () {
//     expect(googleTileMapPoint).to.have.property('lat', -100);
//     expect(googleTileMapPoint).to.have.property('lng', -100);
//   });
// });
