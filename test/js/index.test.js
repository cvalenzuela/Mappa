import { expect } from 'chai'
import Mappa from '../../src/index'

var key = 'abcd'
var mappa = new Mappa('Google', key);

describe('mappa', function () {
  it('should return a new mappa object', function () {
    expect(mappa.provider).to.be.equal('Google');
    expect(mappa.key).to.be.equal('abcd');
  });
});

describe('staticMap', function () {
  it('should be a valid url', function () {
    expect(mappa.staticMap(0,0,0,100,100).url).to.be.a('string');
  });
});
