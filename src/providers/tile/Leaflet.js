// -----------
// Leaflet v1.0.3
// Reference: http://leafletjs.com/reference-1.0.3.html
// -----------

import { TileMap } from './TileMap';

class Leaflet extends TileMap {
  constructor(options){
    super(options);
    this.script = 'https://unpkg.com/leaflet@1.0.3/dist/leaflet.js';
    this.style = 'https://unpkg.com/leaflet@1.0.3/dist/leaflet.css';
    this.constructor.name == 'Leaflet' && this.init();
  }

  createMap () {
    // Check this when not using a map in the background
    if(!this.options.style){
      Leaflet.messages().tiles();
      return
    }

    this.map = L.map('mappa', {
      center: [this.options.lat, this.options.lng],
      zoom: this.options.zoom,
      inertia: false,
    });

    this.tiles = L.tileLayer(this.options.style).addTo(this.map);
    this.tiles.on('tileload', () => { this.ready = true; });

    this.canvasOverlay();
  }

  canvasOverlay () {
    if(this.tiles){
      this.tiles.options.opacity = this.options.opacity;
      // Add this to documentation -> background color of the map.
      document.getElementsByClassName('leaflet-container')[0].style.background = this.options.backgroundColor;
    }

    L.overlay = L.Layer.extend({
      onAdd: () => {
        let overlayPane = overlay.getPane();
        let _container = L.DomUtil.create('div', 'leaflet-layer');
        _container.appendChild(this.canvas.elt);
        overlayPane.appendChild(_container);
      },
      drawLayer: () => {},
    })

    let overlay = new L.overlay();
    this.map.addLayer(overlay);

    let _canvas = this.canvas.elt.getContext('webgl') || this.canvas.elt.getContext('2d');
    this.map.on('move', () => {
      var d = this.map.dragging._draggable;
      d._newPos && (_canvas.canvas.style.transform = 'translate(' + -d._newPos.x + 'px,' + -d._newPos.y + 'px)');
    })
  }

  fromLatLngtoPixel(position) {
    if(this.ready){
      let containerPoint = this.map.latLngToContainerPoint(position);
      return {x:containerPoint.x, y:containerPoint.y};
    } else{
      return {x:-100, y:-100};
    }
  }

  fromPointToLatLng(...args){
    if(this.ready){
      return this.map.containerPointToLatLng(args);
    } else{
      return {lat:-100, lng:-100};
    }
  }

  getZoom() {
    if(this.ready){
      return this.map.getZoom()
    } else {
      return 0
    }
  }

  onChange(callback) {
    if(this.ready){
      callback()
      this.map.on('move', () => {
        callback();
      })
    } else {
      setTimeout(() => {this.onChange(callback)}, 200);
    }
  }

  static messages(){
    return {
      tiles: () => {console.warn('You need to include a style for your Leaflet map. Try with: http://{s}.tile.osm.org/{z}/{x}/{y}.png')}
    }
  }
}

export { Leaflet };
