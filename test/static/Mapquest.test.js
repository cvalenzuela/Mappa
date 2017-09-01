// -----------
// Tests for Mapquest v5
// Reference: https://developer.mapquest.com/documentation/static-map-api/v5/
// -----------

import { expect } from 'chai';
import Mappa from '../../src/index';

var mapquestStaticOptions = {
  lat: 0,
  lng: 0,
  zoom: 0,
  scale: 1,
  width: 650,
  height: 650
}
var mapquestStaticKey = 'abcd'
var mapquestStaticMappa = new Mappa('Mapquest', mapquestStaticKey);
var mapquestStaticMap = mapquestStaticMappa.staticMap(mapquestStaticOptions);

describe('Mapquest static instance', function () {
  it('should return a new mappa object with provider and key', function () {
    expect(mapquestStaticMappa).to.include.all.keys('provider', 'key');
  });
});

describe('Mapquest static options initialization', function () {
  it('should return a scale of 1 if scale is undefined', function () {
    expect(mapquestStaticMap.options).to.have.property('scale', 1);
  });
  it('should return a pixel option of 128 if scale is undefined', function () {
    expect(mapquestStaticMap.options).to.have.property('pixels', 128);
  });
  it('should return a pixel scale option of 2 if scale is 2', function () {
    var mapquestStaticOptions = {
      lat: 0,
      lng: 0,
      zoom: 0,
      scale: 2,
      width: 650,
      height: 650
    }
    var mapquestStaticMap = mapquestStaticMappa.staticMap(mapquestStaticOptions);
    expect(mapquestStaticMap.options).to.have.property('scale', 2);
  });
  it('should return a pixel option of 256 if scale is 2', function () {
    var mapquestStaticOptions = {
      lat: 0,
      lng: 0,
      zoom: 0,
      scale: 2,
      width: 650,
      height: 650
    }
    var mapquestStaticMap = mapquestStaticMappa.staticMap(mapquestStaticOptions);
    expect(mapquestStaticMap.options).to.have.property('pixels', 256);
  });
});

describe('Mapquest staticMap options', function () {
  it('should contain valid options', function () {
    expect(mapquestStaticMap.options).to.not.have.property('lat', undefined);
    expect(mapquestStaticMap.options).to.not.have.property('lng', undefined);
    expect(mapquestStaticMap.options).to.not.have.property('zoom', undefined);
    expect(mapquestStaticMap.options).to.not.have.property('width', undefined);
    expect(mapquestStaticMap.options).to.not.have.property('height', undefined);
    expect(mapquestStaticMap.options).to.not.have.property('key', undefined);
    expect(mapquestStaticMap.options).to.not.have.property('pixels', undefined);
    expect(mapquestStaticMap.options).to.not.have.property('scale', undefined);
    expect(mapquestStaticMap.options).to.not.have.property('size', undefined);
    expect(mapquestStaticMap.options).to.not.have.property('center', undefined);
  });
});

describe('Mapquest staticMap imgUrl', function () {
  it('should be a string', function () {
    expect(mapquestStaticMap.imgUrl).to.be.a('string');
  });
  it('should be a valid Mapquest Maps url', function () {
    expect(mapquestStaticMap.imgUrl).to.not.include('undefined');
    expect(mapquestStaticMap.imgUrl).to.not.include('null');
    expect(mapquestStaticMap.imgUrl).to.include('https://www.mapquestapi.com/staticmap/v5/');
    expect(mapquestStaticMap.imgUrl).to.include('key=' + mapquestStaticKey);
  });
});
