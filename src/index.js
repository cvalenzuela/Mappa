/*
* Mappa: A library to work with maps and p5.js
* https://github.com/cvalenzuela/p5.maps
*
* Cristóbal Valenzuela
* Google Summer of Code 2017
*/

'use strict';

console.log('%c p5.maps Loaded ✓', 'color:white; background:green;');

import { StaticMap } from './StaticMap';
import { TileMap } from './TileMap';

import * as staticMapProviders from './providers/staticProviders';

class Mappa {
  constructor(provider, key) {
    this.provider = provider;
    this.key = key;
  }

  staticMap(...args) {
    let options = {};

    if(typeof args[0] == 'object'){
      options = Object.assign({}, args[0])
    } else {
      args.forEach((el, i) => {
        let option = staticMapProviders[this.provider].options[i];
        options[option] = el;
      })
    };
    options.key = this.key;

    return new StaticMap(this.provider, options);
  }

  tileMap(...args){
    let options;

    if(typeof args[0] == 'object'){
      options = Object.assign({}, args[0])
    } else {
      ['lat', 'lng', 'zoom'].forEach((el, i) => {
        options[el] = args[i];
      })
    };
    options.key = this.key;

    return new TileMap(this.provider, options);
  }

}

module.exports = Mappa;
