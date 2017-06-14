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
    if(!this.options.style){
      Leaflet.messages().tiles();
      return
    }

    this.map = L.map('mappa').setView(
      [this.options.lat, this.options.lng],
      this.options.zoom
    );
    this.tiles = L.tileLayer(this.options.style).addTo(map);
    this.tiles.on('tileload', () => { this.ready = true; });

    this.canvasOverlay();
  }

  canvasOverlay () {
    if(this.tiles){
      this.tiles.options.opacity = this.options.opacity;
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

  fromZoomtoPixel() {
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
      tiles: () => {console.warn('You need to include a style for your Leaflet map.')}
    }
  }
}

export { Leaflet };
