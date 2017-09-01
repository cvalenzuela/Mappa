// -----------
// Tests for Google Static Maps API v2
// Reference: https://developers.google.com/maps/documentation/static-maps/
// -----------

import { expect } from 'chai';
import Mappa from '../../src/index';

var googleStaticOptions = {
  lat: 0,
  lng: 0,
  zoom: 0,
  scale: 1,
  width: 650,
  height: 650
}
var googleStaticKey = 'abcd'
var googleStaticMappa = new Mappa('Google', googleStaticKey);
var googleStaticMap = googleStaticMappa.staticMap(googleStaticOptions);

describe('Google static instance', function () {
  it('should return a new mappa object with provider and key', function () {
    expect(googleStaticMappa).to.include.all.keys('provider', 'key');
  });
});

describe('Google static options initialization', function () {
  it('should return a scale of 1 if scale is undefined', function () {
    expect(googleStaticMap.options).to.have.property('scale', 1);
  });
  it('should return a pixel option of 128 if scale is undefined', function () {
    expect(googleStaticMap.options).to.have.property('pixels', 128);
  });
  it('should return a pixel scale option of 2 if scale is 2', function () {
    var googleStaticOptions = {
      lat: 0,
      lng: 0,
      zoom: 0,
      scale: 2,
      width: 650,
      height: 650
    }
    var googleStaticMap = googleStaticMappa.staticMap(googleStaticOptions);
    expect(googleStaticMap.options).to.have.property('scale', 2);
  });
  it('should return a pixel option of 256 if scale is 2', function () {
    var googleStaticOptions = {
      lat: 0,
      lng: 0,
      zoom: 0,
      scale: 2,
      width: 650,
      height: 650
    }
    var googleStaticMap = googleStaticMappa.staticMap(googleStaticOptions);
    expect(googleStaticMap.options).to.have.property('pixels', 256);
  });
});

describe('Google staticMap options', function () {
  it('should contain valid options', function () {
    expect(googleStaticMap.options).to.not.have.property('lat', undefined);
    expect(googleStaticMap.options).to.not.have.property('lng', undefined);
    expect(googleStaticMap.options).to.not.have.property('zoom', undefined);
    expect(googleStaticMap.options).to.not.have.property('width', undefined);
    expect(googleStaticMap.options).to.not.have.property('height', undefined);
    expect(googleStaticMap.options).to.not.have.property('key', undefined);
    expect(googleStaticMap.options).to.not.have.property('pixels', undefined);
    expect(googleStaticMap.options).to.not.have.property('scale', undefined);
    expect(googleStaticMap.options).to.not.have.property('size', undefined);
    expect(googleStaticMap.options).to.not.have.property('center', undefined);
  });
});

describe('Google staticMap imgUrl', function () {
  it('should be a string', function () {
    expect(googleStaticMap.imgUrl).to.be.a('string');
  });
  it('should be a valid Google Maps url', function () {
    expect(googleStaticMap.imgUrl).to.not.include('undefined');
    expect(googleStaticMap.imgUrl).to.not.include('null');
    expect(googleStaticMap.imgUrl).to.include('https://maps.googleapis.com/maps/api/staticmap?');
    expect(googleStaticMap.imgUrl).to.include('key=' + googleStaticKey);
  });
});

describe('Static Methods', function () {
  it('should be a valid latlng', function () {
    expect(googleStaticMap.latLngToPixel(0,0)).to.have.property('x').that.is.a('number');
    expect(googleStaticMap.latLngToPixel(0,0)).to.have.property('y').that.is.a('number');
  });
});
