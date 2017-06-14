// -----------
// Tangram v0.12.5
// Reference: https://mapzen.com/documentation/tangram/
// -----------

import { Leaflet } from './Leaflet';

class Tangram extends Leaflet {
  constructor(options){
    super(options);
    this.options.provider = 'Leaflet';
    this.init();
    this.options.provider = 'Tangram';
    this.script = 'https://mapzen.com/tangram/tangram.min.js';
    this.init();
  }

  createMap () {

    // Create a Tangram Map
    this.map = L.map('mappa');
    this.tangramScene = window.Tangram.leafletLayer({
        scene: this.options.scene,
        attribution: '<a href="https://mapzen.com/tangram" target="_blank">Tangram</a> | &copy; OSM contributors | <a href="https://mapzen.com/" target="_blank">Mapzen</a>'
    });
    this.tangramScene.addTo(this.map);
    this.map.setView([this.options.lat, this.options.lng], this.options.zoom);

    this.tangramScene.scene.subscribe({ load: () => { this.ready = true }});

    this.canvasOverlay();
  }

  static messages(){
    return {
      key: () => {console.warn('Please provide a API key for your Mapzen map.')}
    }
  }
}

export { Tangram };
