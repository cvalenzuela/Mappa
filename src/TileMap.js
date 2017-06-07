// Tiled Maps


import { addLibrary, createMap } from './tileMapProviders';

class TileMap {
  constructor(PROVIDER, OPTIONS){
    this.mapProvider = PROVIDER
    this.options = OPTIONS;
    this.library = addLibrary(this.mapProvider, this.options.key);
  }

  append(canvas){
    let div = document.createElement('div');
    document.body.appendChild(div);
    div.setAttribute('style', 'position:absolute;width:'+ canvas.width + 'px;height:' + canvas.height + 'px;top:0;left:0;z-index:-99');
    div.setAttribute('id', 'mappa');
    createMap(canvas, div, this.mapProvider, this.options)
  }

}

export { TileMap };
