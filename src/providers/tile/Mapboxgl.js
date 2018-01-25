// -----------
// Mapbox-gl v0.43.0
// Reference: https://www.mapbox.com/mapbox-gl-js/api/
// -----------

import TileMap from './TileMap';

class MapboxGL extends TileMap {
  constructor(options) {
    super(options);
    this.scriptSrc = 'https://api.mapbox.com/mapbox-gl-js/v0.43.0/mapbox-gl.js';
    this.styleSrc = 'https://api.mapbox.com/mapbox-gl-js/v0.43.0/mapbox-gl.css';
    this.ready = false;
    if (!this.options.key) {
      MapboxGL.messages().key();
    } else {
      this.loadSrc();
    }
  }

  createMap() {
    mapboxgl.accessToken = this.options.key;
    this.map = new mapboxgl.Map({
      container: this.id,
      style: this.options.style || 'mapbox://styles/mapbox/satellite-streets-v10',
      center: [this.options.lng, this.options.lat],
      zoom: this.options.zoom,
      minZoom: this.options.minZoom || 0,
      maxZoom: this.options.maxZoom || 22,
      bearing: this.options.bearing || 0,
      pitch: this.options.pitch || 0,
      renderWorldCopies: true && this.options.renderWorldCopies,
      maxBounds: this.options.maxBounds || undefined,
    });

    this.map.getCanvasContainer().appendChild(this.canvas);
    this.canvas.style.position = 'relative';
    if (this.options.opacity) {
      document.getElementsByClassName('mapboxgl-canvas')[0].style.opacity = this.options.opacity;
    }
    this.map.on('load', () => { this.ready = true; });
  }

  fromLatLngToPixel(latLng) {
    if (this.ready) {
      return this.map.project(latLng);
    }
    return {
      x: -100,
      y: -100,
    };
  }

  fromPointToLatLng(...args) {
    if (this.ready) {
      return this.map.unproject(args);
    }
    return {
      lat: -100,
      lng: -100,
    };
  }

  getZoom() {
    if (this.ready) {
      return this.map.getZoom();
    }
    return 0;
  }

  onChange(callback) {
    if (this.ready) {
      callback();
      this.map.on('render', callback);
    } else {
      setTimeout(() => { this.onChange(callback); }, 200);
    }
  }

  removeOnChange(callback) {
    this.map.off('render', callback);
  }

  static messages() {
    return {
      key: () => { console.warn('Please provide a Mapbox-gl API key. Get one here: https://www.mapbox.com/mapbox-gl-js/api/'); },
    };
  }
}

export default MapboxGL;
