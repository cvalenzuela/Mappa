// -----------
// Mapzen v0.12.5
// Reference: https://mapzen.com/documentation/mapzen-js/
// -----------

import { TileMap } from './TileMap';

class Mapzen extends TileMap {
  constructor(options){
    super(options);
    this.script = 'https://mapzen.com/js/mapzen.min.js';
    this.style = 'https://mapzen.com/js/mapzen.css';
    this.init();
  }

  createMap () {
    if(!this.options.scene){
      Mapzen.messages().tiles();
      //return
    }

    L.Mapzen.apiKey = this.options.key;

    let map = L.Mapzen.map('mappa').setView(
      [this.options.lat, this.options.lng],
      this.options.zoom
    );

    // let tiles = L.tileLayer(this.options.style).addTo(map);
    //
    // tiles.on('tileload', () => { this.ready = true; });
    //
    // tiles.options.opacity = this.options.opacity;
    // document.getElementsByClassName('leaflet-container')[0].style.background = this.options.backgroundColor;
    //
    // L.overlay = L.Layer.extend({
    //   onAdd: () => {
    //     let overlayPane = overlay.getPane();
    //     let _container = L.DomUtil.create('div', 'leaflet-layer');
    //     _container.appendChild(this.canvas.elt);
    //     overlayPane.appendChild(_container);
    //   },
    //   drawLayer: () => {},
    // })
    //
    // let overlay = new L.overlay();
    // map.addLayer(overlay);
    //
    // map.on('move', () => {
    //   var d = map.dragging._draggable;
    //   let _canvas = this.canvas.elt.getContext('webgl') || this.canvas.elt.getContext('2d');
    //   _canvas.canvas.style.transform = 'translate(' + -d._newPos.x + 'px,' + -d._newPos.y + 'px)';
    // })

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
      tiles: () => {console.warn('You need to include a style for your Mapzen map.')}
    }
  }
}

export { Mapzen };
