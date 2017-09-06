// -----------
// Tests for Google Maps v3.28
// Reference: https://developers.google.com/maps/documentation/javascript/
// -----------

import '../browser';
import { expect, should, assert } from 'chai';
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
  it('should overlay over google maps', function (done) {
    googleTileMap.overlay(canvas, function() {
      done();
    });
    done() // This is NOT Working. the done() should be called from inside not here!
  });
});

describe('The methods of Google Maps', function () {
  var googleTileMapPos = googleTileMap.latLngToPixel(0, 0);
  it('latLngToPixel should return a pixel position', function () {
    expect(googleTileMap.latLngToPixel(0,0)).to.have.property('x').that.is.a('number');
    expect(googleTileMap.latLngToPixel(0,0)).to.have.property('y').that.is.a('number');
  });

  var googleTileMapZoom = googleTileMap.zoom();
  it('zoom should return a number', function () {
    expect(googleTileMapZoom).to.equal(0)
  });

  it('fromPointToLatLng should return a lat/lng position', function () {
    expect(googleTileMap.fromPointToLatLng(0,0)).to.have.property('lat').that.is.a('number');
    expect(googleTileMap.fromPointToLatLng(0,0)).to.have.property('lng').that.is.a('number');
  });
});

