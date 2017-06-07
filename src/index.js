/*
* Mappa: A library to work with maps and p5.js
* https://github.com/cvalenzuela/p5.maps
*
* Cristóbal Valenzuela
* Google Summer of Code 2017
*/

'use strict';

console.log('%c p5.maps Loaded ✓', 'color:white; background:green;');

import { staticMapProviders } from './staticMapProviders';
import { StaticMappa } from './StaticMap';
// import { addLibrary } from './tileMapProviders';
import { TileMap } from './TileMap';

class Mappa {
  constructor(provider, key) {
    this.provider = provider;
    this.key = key;
  }

  staticMap(...args) {
    let OPTIONS = {};

    if(typeof args[0] == 'object'){
      OPTIONS = Object.assign({}, args[0])
    } else {
      args.forEach((el, i) => {
        let option = staticMapProviders[this.provider].options[i];
        OPTIONS[option] = el;
      })
    };
    OPTIONS.key = this.key;

    return new StaticMappa(this.provider, OPTIONS);
  }

  tileMap(...args){
    let OPTIONS;

    if(typeof args[0] == 'object'){
      OPTIONS = Object.assign({}, args[0])
    } else {
      ['lat', 'lng', 'zoom'].forEach((el, i) => {
        OPTIONS[el] = args[i];
      })
    };
    OPTIONS.key = this.key;

    return new TileMap(this.provider, OPTIONS);
  }

}

module.exports = Mappa;
