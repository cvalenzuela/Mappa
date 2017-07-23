// -----------
// Tiled Map
// -----------

import { parseGeoJSON } from '../../utils/parseGeoJSON';

class TileMap {
  constructor(options){
    this.options = options;
    this.scriptTag;
  }

  init() {
    if(!document.getElementById(this.options.provider)) {
      this.scriptTag = document.createElement('script');
      this.scriptTag.type = 'text/javascript';
      this.scriptTag.src = this.script;
      this.scriptTag.id = this.options.provider;
      document.head.appendChild(this.scriptTag);
      if(this.style) {
        let styleTag = document.createElement('link');
        styleTag.rel = 'stylesheet';
        styleTag.href = this.style;
        document.head.appendChild(styleTag);
      }
    }
  }

  overlay(canvas){
    this.scriptTag.onload = () => {
      let div = document.createElement('div');
      document.body.appendChild(div);
      div.setAttribute('style', 'position:relative;width:'+ canvas.width + 'px;height:' + canvas.height + 'px;top:0;left:0;z-index:10');
      div.setAttribute('id', 'mappa');
      this.canvas = canvas;
      this.createMap();
    };
  }

  latLngToPixel(...args){
    let pos;
    (typeof args[0] == 'object') ? pos = args[0] : pos = {lat: Number(args[0]), lng: Number(args[1])};
    return this.fromLatLngtoPixel(pos);
  }

  pixelToLatLng(...args){
    return this.fromPointToLatLng(...args);
  }

  geoJSON(...args){
    return parseGeoJSON(args[0], args[1]);
  }

  zoom(){
    return Math.floor(this.getZoom());
  }

}

export { TileMap };
