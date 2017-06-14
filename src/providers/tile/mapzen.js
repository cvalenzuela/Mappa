// -----------
// Mapzen v0.12.5
// Reference: https://mapzen.com/documentation/mapzen-js/
// -----------

import { Leaflet } from './Leaflet';

class Mapzen extends Leaflet {
  constructor(options){
    super(options);
    this.script = 'https://mapzen.com/js/mapzen.min.js';
    this.style = 'https://mapzen.com/js/mapzen.css';
    this.init();
  }

  createMap () {
    if(this.options.key){
      L.Mapzen.apiKey = this.options.key;
    } else {
      Mapzen.messages().key();
      return
    }

    // Create a Mapzen Map
    this.map = L.Mapzen.map('mappa', {
      center: [this.options.lat, this.options.lng],
      zoom: this.options.zoom,
      tangramOptions: {
        scene: (this.options.BasemapStyles) ? L.Mapzen.BasemapStyles[this.options.scene] : this.options.scene,
      }
    });

    this.map.on('tangramloaded', () =>{ this.ready = true; });

    this.canvasOverlay();
  }

  static messages(){
    return {
      key: () => {console.warn('Please provide a API key for your Mapzen map.')}
    }
  }
}

export { Mapzen };
