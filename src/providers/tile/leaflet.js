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
    this.init();
  }

  createMap () {


    let map = L.map('mappa').setView(
      [this.options.lat, this.options.lng],
      this.options.zoom
    );


    let tiles = L.tileLayer(this.options.style).addTo(map);

    tiles.on('tileload', () => { this.ready = true; });


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
      google.maps.event.addListener(this.map, 'bounds_changed', () => {
        callback();
      })
    } else {
      setTimeout(() => {this.onChange(callback)}, 200);
    }
  }

  static messages(){
    return {
      key: () => {console.warn('Please provide a Goolge Maps API Key. Get one here: https://developers.google.com/maps/documentation/javascript/ ')}
    }
  }
}

export { Leaflet };
