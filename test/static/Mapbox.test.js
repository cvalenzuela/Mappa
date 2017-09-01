// -----------
// Tests for Mapbox Static API v1
// Reference: https://www.mapbox.com/api-documentation/#static
// -----------

import { expect } from 'chai';
import Mappa from '../../src/index';

var mapboxStaticOptions = {
  lat: 0,
  lng: 0,
  zoom: 0,
  scale: 1,
  width: 650,
  height: 650
}
var mapboxStaticKey = 'abcd'
var mapboxStaticMappa = new Mappa('Mapbox', mapboxStaticKey);
var mapboxStaticMap = mapboxStaticMappa.staticMap(mapboxStaticOptions);

describe('Mapbox static instance', function () {
  it('should return a new mappa object with provider and key', function () {
    expect(mapboxStaticMappa).to.include.all.keys('provider', 'key');
  });
});

describe('Mapbox static options initialization', function () {
  it('should return a scale of 1 if scale is undefined', function () {
    expect(mapboxStaticMap.options).to.have.property('scale', 1);
  });
  it('should return a pixel option of 256 if scale is undefined', function () {
    expect(mapboxStaticMap.options).to.have.property('pixels', 256);
  });
  it('should return a pixel scale option of 2 if scale is 2', function () {
    var mapboxStaticOptions = {
      lat: 0,
      lng: 0,
      zoom: 0,
      scale: 2,
      width: 650,
      height: 650
    }
    var mapboxStaticMap = mapboxStaticMappa.staticMap(mapboxStaticOptions);
    expect(mapboxStaticMap.options).to.have.property('scale', 2);
  });
  it('should return a pixel option of 512 if scale is 2', function () {
    var mapboxStaticOptions = {
      lat: 0,
      lng: 0,
      zoom: 0,
      scale: 2,
      width: 650,
      height: 650
    }
    var mapboxStaticMap = mapboxStaticMappa.staticMap(mapboxStaticOptions);
    expect(mapboxStaticMap.options).to.have.property('pixels', 512);
  });
});

describe('Mapbox staticMap options', function () {
  it('should contain valid options', function () {
    expect(mapboxStaticMap.options).to.not.have.property('lat', undefined);
    expect(mapboxStaticMap.options).to.not.have.property('lng', undefined);
    expect(mapboxStaticMap.options).to.not.have.property('zoom', undefined);
    expect(mapboxStaticMap.options).to.not.have.property('width', undefined);
    expect(mapboxStaticMap.options).to.not.have.property('height', undefined);
    expect(mapboxStaticMap.options).to.not.have.property('key', undefined);
    expect(mapboxStaticMap.options).to.not.have.property('pixels', undefined);
    expect(mapboxStaticMap.options).to.not.have.property('scale', undefined);
    expect(mapboxStaticMap.options).to.not.have.property('size', undefined);
    expect(mapboxStaticMap.options).to.not.have.property('center', undefined);
  });
});

describe('Mapbox staticMap imgUrl', function () {
  it('should be a string', function () {
    expect(mapboxStaticMap.imgUrl).to.be.a('string');
  });
  it('should be a valid Mapbox Maps url', function () {
    expect(mapboxStaticMap.imgUrl).to.not.include('undefined');
    expect(mapboxStaticMap.imgUrl).to.not.include('null');
    expect(mapboxStaticMap.imgUrl).to.include('https://api.mapbox.com/styles/v1/');
    expect(mapboxStaticMap.imgUrl).to.include('access_token=' + mapboxStaticKey);
  });
});
