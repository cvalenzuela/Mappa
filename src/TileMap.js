// Tiled Maps

import * as tileProviders from './providers/tileProviders';

class TileMap {
  constructor(provider, options){
    this.provider = tileProviders[provider];
    this.options = options;
  }

  append(canvas){
    let div = document.createElement('div');
    document.body.appendChild(div);
    div.setAttribute('style', 'position:absolute;width:'+ canvas.width + 'px;height:' + canvas.height + 'px;top:0;left:0;z-index:-99');
    div.setAttribute('id', 'mappa');
    this.provider.createMap(canvas, div, this.options)
  }

}

export { TileMap };
