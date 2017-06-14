// -----------
// Mapbox v3.1.1
// Reference: https://www.mapbox.com/mapbox.js/api/v3.1.1/
// -----------

import { TileMap } from './TileMap';

class Mapbox extends TileMap {
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

    let map = L.mapbox.map('mappa').setView([this.options.lat, this.options.lng], this.options.zoom);
    let tiles = L.mapbox.tileLayer(this.options.style || 'mapbox.streets').addTo(map);

    tiles.on('ready', () => {
      this.ready = true;
    });

    tiles.options.opacity = this.options.opacity;
    document.getElementsByClassName('leaflet-container')[0].style.background = this.options.backgroundColor;

    L.mapbox.overlay = L.Layer.extend({
      onAdd: () => {
        let overlayPane = overlay.getPane();
        let _container = L.DomUtil.create('div', 'mapbox-layer');
        _container.appendChild(this.canvas.elt);
        overlayPane.appendChild(_container);
      },
      drawLayer: () => {},
    })

    let overlay = new L.mapbox.overlay();
    map.addLayer(overlay);

    map.on('move', () => {
      var d = map.dragging._draggable;
      let _canvas = this.canvas.elt.getContext('webgl') || this.canvas.elt.getContext('2d');
      _canvas.canvas.style.transform = 'translate(' + -d._newPos.x + 'px,' + -d._newPos.y + 'px)';
    })

    return map;
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
      key: () => {console.warn('Please provide a Mapbox API key. Get one here: https://www.mapbox.com/mapbox.js/api/v3.1.1')}
    }
  }
}

export { Mapbox };
