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

    L.canvasOverlay = L.Layer.extend({
      onAdd: () => {
        overlay.getPane().appendChild(this.canvas.elt);
      },
      drawLayer: () => {},
    })
    overlay = new L.canvasOverlay();

    map.addLayer(overlay);

    map.on('move', () => {
      let center = map.latLngToContainerPoint(map.getCenter());
      let offsetX = - Math.round(this.canvas.width / 2 - center.x);
      let offsetY = - Math.round(this.canvas.height / 2 - center.y);
      let _canvas = this.canvas.elt.getContext('2d');
      console.log(center, offsetX, offsetY)
      _canvas.canvas.style.transform = 'translate(' + offsetX + 'px,' + offsetY + 'px)';
    })


    return map;
  }

  fromLatLngtoPixel(position) {
    if(this.ready){
      position = new google.maps.LatLng(position)
      let topRight = this.map.getProjection().fromLatLngToPoint(this.map.getBounds().getNorthEast());
      let bottomLeft = this.map.getProjection().fromLatLngToPoint(this.map.getBounds().getSouthWest());
      let scale = Math.pow(2, this.map.getZoom());
      var worldPoint = this.map.getProjection().fromLatLngToPoint(position);
      return new google.maps.Point((worldPoint.x - bottomLeft.x) * scale, (worldPoint.y - topRight.y) * scale);
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
