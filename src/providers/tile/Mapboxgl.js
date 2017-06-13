// -----------
// Mapbox-gl v0.37.0
// Reference: https://www.mapbox.com/mapbox-gl-js/api/
// -----------

import { TileMap } from './TileMap'

class Mapboxgl extends TileMap {
  constructor(options){
    super(options);
    this.script = 'https://api.mapbox.com/mapbox-gl-js/v0.37.0/mapbox-gl.js';
    this.style = 'https://api.mapbox.com/mapbox-gl-js/v0.37.0/mapbox-gl.css';
    (!this.options.key) ? Mapboxgl.messages().key() : this.init();
  }

  createMap () {
    mapboxgl.accessToken = this.options.key;
    let map = new mapboxgl.Map({
      container: 'mappa',
      style: this.options.style || 'mapbox://styles/mapbox/satellite-streets-v10',
      center: [this.options.lng, this.options.lat],
      zoom: this.options.zoom,
    });
    this.canvas.parent(map.getCanvasContainer());
    this.canvas.elt.style.position = 'absolute';

    map.on('load', () => { this.ready = true; });

    return map;
  }

  fromLatLngtoPixel (latLng) {
    if(this.ready){
      return this.map.project(latLng);
    } else {
      return {x:-100, y:-100};
    }
  }

  fromZoomtoPixel () {
    if(this.ready){
      return this.map.getZoom();
    } else {
      return 0
    }
  }

  onChange(callback) {
    if(this.ready){
      callback()
      this.map.on('render', () => {
        callback();
      })
    } else {
      setTimeout(() => {this.onChange(callback)}, 200);
    }
  }

  static messages(){
    return {
      key: () => {console.warn('Please provide a Mapbox-gl API key. Get one here: https://www.mapbox.com/mapbox-gl-js/api/')}
    }
  }

}

export { Mapboxgl };
