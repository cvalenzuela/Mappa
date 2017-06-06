/*
* Mappa: A library to work with maps and p5.js
* https://github.com/cvalenzuela/p5.maps
*
* Cristóbal Valenzuela
* Google Summer of Code 2017
*/

'use strict';

console.log('%c p5.maps Loaded ', 'color:white; background:black;');

import { addLibrary } from './staticMapProviders';
import { StaticMappa } from './StaticMappa';

class Mappa {
  constructor(provider, key) {
    this.provider = provider;
    this.key = key;
    this.provider && this.init();
  }

  init() {
    addLibrary(this.provider, this.key);
  }

  staticMap(...args) {
    let OPTIONS = {};

    if(typeof args[0] == 'object'){
      OPTIONS = Object.assign({}, args[0])
    } else {
      args.forEach((el, i) => {
        let option = PROVIDER.options[i];
        OPTIONS[option] = el;
      })
    };
    OPTIONS.key = this.key;

    return new StaticMappa(this.provider, OPTIONS);

  }
  // check amount of request ot prevent max amount of api's

}

module.exports = Mappa;
