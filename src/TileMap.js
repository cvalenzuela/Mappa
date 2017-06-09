// Tiled Maps

import * as tileProviders from './providers/tileProviders';
import * as messages from './providers/messages';

class TileMap {
  constructor(provider, options){
    this.provider = tileProviders[provider];
    this.options = options;
    this.ready = false;
    (!this.options.key) ? messages[provider].noKey() : this.init(provider);
  }

  init(provider) {

    let scriptTag;
    if(!document.getElementById(provider)) {
      scriptTag = document.createElement('script');
      scriptTag.type = 'text/javascript';
      scriptTag.src = this.provider.script;
      scriptTag.id = provider;
      document.head.appendChild(scriptTag);
      if(this.provider.style) {
        let styleTag = document.createElement('link')
        styleTag.rel = 'stylesheet'
        styleTag.href = this.provider.style
        document.head.appendChild(styleTag)
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
      this.map = this.provider.createMap(canvas, this.options);
    } else {
      setTimeout(()=>{this.append(canvas)}, 300)
    }
  }

}

export { TileMap };
