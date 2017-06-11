// -----------
// Tiled Map
// -----------

class TileMap {
  constructor(options){
    this.options = options;
    this.ready = false; // false by default
  }

  init() {
    let scriptTag;
    if(!document.getElementById(this.options.provider)) {
      scriptTag = document.createElement('script');
      scriptTag.type = 'text/javascript';
      scriptTag.src = this.script;
      scriptTag.id = this.options.provider;
      document.head.appendChild(scriptTag);
      if(this.style) {
        let styleTag = document.createElement('link');
        styleTag.rel = 'stylesheet';
        styleTag.href = this.style;
        document.head.appendChild(styleTag);
      }
    }
    scriptTag.onload = () => {
      this.ready = true;
    };
  }

  append(canvas){
    if(this.ready){
      let div = document.createElement('div');
      document.body.appendChild(div);
      div.setAttribute('style', 'position:absolute;width:'+ canvas.width + 'px;height:' + canvas.height + 'px;top:0;left:0;z-index:-99');
      div.setAttribute('id', 'mappa');
      this.canvas = canvas;
      this.map = this.createMap();
    } else {
      setTimeout(()=>{this.append(canvas)}, 300)
    }
  }

  latLng(...args){
    let pos = {lat: args[0], lng: args[1]};
    if(this.map){
      return this.fromLatLngtoPixel(pos);
    } else {
      return {x: 0, y: 0}
    }
  }

  zoom(){
    if(this.map){
      return Math.floor(this.fromZoomtoPixel());
    } else {
      return 0
    }
  }

}

export { TileMap };
