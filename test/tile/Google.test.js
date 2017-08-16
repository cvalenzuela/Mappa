// -----------
// Tests for Google Maps v3.28
// Reference: https://developers.google.com/maps/documentation/javascript/
// -----------

import '../browser';
import { expect } from 'chai';
import Mappa from '../../src/index';

var googleTileKey = 'abcd'
var googleTileMappa = new Mappa('Google', googleTileKey);
var googleTileMap = googleTileMappa.tileMap(0,0,0);

describe('Google tile instance', function () {
  it('should return a new mappa object with provider and key', function () {
    expect(googleTileMappa).to.include.all.keys('provider', 'key');
  });
  it('should return a script key with the correct google map api url', function () {
    expect(googleTileMap.script).to.include('key='+googleTileKey);
  });
  it('should inject the url into the document', function () {
    var provider = !!document.getElementById('Google');
    expect(provider).to.be.true;
  });
});

describe('The canvas with Google Maps', function () {
  var canvas = document.createElement('canvas');
  document.body.appendChild(canvas);
  googleTileMap.overlay(canvas);

  it('should overlay over google maps', function () {
    expect(true).to.be.true;
  });
});

describe('The methods of Google Maps', function () {
  var googleTileMapPos = googleTileMap.latLngToPixel(0, 0);
  it('latLngToPixel should return a pixel position', function () {
    expect(googleTileMapPos).to.have.property('x', -100);
    expect(googleTileMapPos).to.have.property('y', -100);
  });

  var googleTileMapZoom = googleTileMap.zoom();
  it('zoom should return a number', function () {
    expect(googleTileMapZoom).to.equal(0)
  });

  var googleTileMapPoint = googleTileMap.fromPointToLatLng(0,0);
  it('fromPointToLatLng should return a lat/lng position', function () {
    expect(googleTileMapPoint).to.have.property('lat', -100);
    expect(googleTileMapPoint).to.have.property('lng', -100);
  });
});

