// -----------
// Mapbox v3.1.1
// Reference: https://www.mapbox.com/mapbox.js/api/v3.1.1/
// -----------

import Leaflet from './Leaflet';

class Mapbox extends Leaflet {
  constructor(options) {
    options.scriptSrc = 'https://api.mapbox.com/mapbox.js/v3.1.1/mapbox.js';
    options.styleSrc = 'https://api.mapbox.com/mapbox.js/v3.1.1/mapbox.css';
    super(options);
  }

  createMap() {
    if (this.options.key) {
      L.mapbox.accessToken = this.options.key;
    } else {
      Mapbox.messages().key();
    }
    this.map = L.mapbox.map(this.id).setView([this.options.lat, this.options.lng], this.options.zoom);

    if (this.options.studio) {
      this.tiles = L.mapbox.styleLayer(this.options.style || 'mapbox://styles/mapbox/emerald-v8').addTo(this.map);
    } else {
      this.tiles = L.mapbox.tileLayer(this.options.style || 'mapbox.streets').addTo(this.map);
    }

    this.tiles.on('ready', () => { this.ready = true; });
    this.canvasOverlay();
  }

  static messages() {
    return {
      key: () => { console.warn('Please provide a Mapbox API key. Get one here: https://www.mapbox.com/mapbox.js/api/v3.1.1'); },
    };
  }
}

export default Mapbox;
