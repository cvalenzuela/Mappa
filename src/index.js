/*
* Mappa: A library to work with maps and p5.js
* https://github.com/cvalenzuela/p5.maps
*
* Cristóbal Valenzuela
* cv965@nyu.edu
* Google Summer of Code 2017
*/

'use strict';

console.log('%c p5.maps Loaded ✓', 'color:white; background:green;');

import * as tileMap from './tileMap';
import * as staticMap from './staticMap'

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
      let _options = staticMap[this.provider].options().userInput
      args.forEach((el, i) => {
        let option = _options[i];
        options[option] = el;
      })
    };
    options.key = this.key;
    return new staticMap[this.provider](options);
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
    options.provider = this.provider;
    return new tileMap[this.provider](options);
  }

}

module.exports = Mappa;
