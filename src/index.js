import * as tileMap from './tileMap';
import * as staticMap from './staticMap';

class Mappa {
  constructor(provider, key) {
    this.provider = provider;
    this.key = key;
  }

  staticMap(...args) {
    let options = {};

    if (typeof args[0] === 'object') {
      options = Object.assign({}, args[0]);
    } else {
      const opts = staticMap[this.provider].options().userInput;
      args.forEach((el, i) => {
        const option = opts[i];
        options[option] = el;
      });
    }
    options.key = this.key;
    if (this.provider === undefined) {
      this.provider = 'StaticMap';
    }
    return new staticMap[this.provider](options);
  }

  tileMap(...args) {
    let options = {};

    if (typeof args[0] === 'object') {
      options = Object.assign({}, args[0]);
    } else {
      ['lat', 'lng', 'zoom'].forEach((el, i) => {
        options[el] = args[i];
      });
    }
    options.key = this.key;
    options.provider = this.provider;
    return new tileMap[this.provider](options);
  }
}

console.log('Mappa loaded!');
module.exports = Mappa;
