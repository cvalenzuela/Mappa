// -----------
// Mapbox v3.1.1
// Reference: https://www.mapbox.com/mapbox.js/api/v3.1.1/
// -----------

import { Leaflet } from './Leaflet';

class Mapbox extends Leaflet {
  constructor(options){
    super(options);
    this.script = 'https://api.mapbox.com/mapbox.js/v3.1.1/mapbox.js';
    this.style = 'https://api.mapbox.com/mapbox.js/v3.1.1/mapbox.css';
    this.init();
  }

  createMap () {
    if(this.options.key){
      L.mapbox.accessToken = this.options.key
    } else {
      Mapbox.messages().key();
      return
    }

    // Create a Mapbox Map
    this.map = L.mapbox.map('mappa').setView(
      [this.options.lat, this.options.lng], this.options.zoom
    );

    (this.options.studio)? this.tiles = L.mapbox.styleLayer(this.options.style || 'mapbox://styles/mapbox/emerald-v8').addTo(this.map) : this.tiles = L.mapbox.tileLayer(this.options.style || 'mapbox.streets').addTo(this.map);

    this.tiles.on('ready', () => { this.ready = true; });

    this.canvasOverlay();
  }

  static messages(){
    return {
      key: () => {console.warn('Please provide a Mapbox API key. Get one here: https://www.mapbox.com/mapbox.js/api/v3.1.1')}
    }
  }
}

export { Mapbox };
