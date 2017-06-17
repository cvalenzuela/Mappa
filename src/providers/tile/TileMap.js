// -----------
// Tiled Map
// -----------

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

  append(canvas){
    this.scriptTag.onload = () => {
      let div = document.createElement('div');
      document.body.appendChild(div);
      div.setAttribute('style', 'position:absolute;width:'+ canvas.width + 'px;height:' + canvas.height + 'px;top:0;left:0;z-index:-99');
      div.setAttribute('id', 'mappa');
      this.canvas = canvas;
      this.createMap();
    };
  }

  latLng(...args){
    let pos = {lat: Number(args[0]), lng: Number(args[1])};
    return this.fromLatLngtoPixel(pos);
  }

  zoom(){
    return Math.floor(this.getZoom());
  }

}

export { TileMap };
