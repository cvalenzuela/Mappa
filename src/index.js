/*
* Mappa: A library to work with maps and p5.js
* https://github.com/cvalenzuela/p5.maps
*
* Cristóbal Valenzuela
* Google Summer of Code 2017
*/

'use strict';

console.log('%c p5.maps Loaded ', 'color:white; background:black;');

import { addLibrary } from './mapProviders';
import { staticMappa } from './staticMappa';

class Mappa {
  constructor(provider, key) {
    this.provider = provider || 'google';
    this.key = key || undefined;
    this.staticMaps = [];
    this.init();
  }

  init() {
    addLibrary(this.provider, this.key);
  }

  staticMap(...args) {
    typeof args[0] == 'object' && (args = args[0]);
    let staticMap = staticMappa(this.provider, this.key, args)
    this.staticMaps.push(staticMap);
    return staticMap;
  }

  // check amount of request ot prevent max amount of api's

}

module.exports = Mappa;
