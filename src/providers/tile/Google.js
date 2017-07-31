// -----------
// Google Maps JavaScript v3.28
// Reference: https://developers.google.com/maps/documentation/javascript/
// -----------

import { TileMap } from './TileMap';

class Google extends TileMap {
  constructor(options){
    super(options);
    this.script = 'https://maps.googleapis.com/maps/api/js';
    this.options.key && (this.script += '?key=' + this.options.key);
    this.options.language && (this.script += '&language=' + this.options.language);
    this.options.region && (this.script += '&region=' + this.options.region);
    this.init();
  }

  createMap () {
    !this.options.key && Google.messages().key();

    this.map = new google.maps.Map(document.getElementById('mappa'), {
      center: {lat: this.options.lat, lng: this.options.lng},
      zoom: this.options.zoom || 6,
      mapTypeId: this.options.maptype || 'terrain',
      styles: this.options.styles || '',
    });

    let overlay = new google.maps.OverlayView();
    overlay.onAdd = () => {
      overlay.getPanes().overlayLayer.appendChild(this.canvas);
    }
    overlay.draw = function(){}
    overlay.setMap(this.map);
 
    google.maps.event.addListener(this.map, 'bounds_changed', () => {
      let center = overlay.getProjection().fromLatLngToDivPixel(this.map.getCenter());
      let offsetX = - Math.round(this.canvas.width / 2 - center.x);
      let offsetY = - Math.round(this.canvas.height / 2 - center.y);
      let _canvas = this.canvas.getContext('webgl') || this.canvas.getContext('2d');
      _canvas.canvas.style.transform = 'translate(' + offsetX + 'px,' + offsetY + 'px)';
    })

    google.maps.event.addListenerOnce(this.map, 'tilesloaded', () => { this.ready = true; });
  }

  fromLatLngtoPixel(position) {
    if(this.ready){
      position = new google.maps.LatLng(position)
      let topRight = this.map.getProjection().fromLatLngToPoint(this.map.getBounds().getNorthEast());
      let bottomLeft = this.map.getProjection().fromLatLngToPoint(this.map.getBounds().getSouthWest());
      let scale = Math.pow(2, this.map.getZoom());
      let point = this.map.getProjection().fromLatLngToPoint(position);
      return new google.maps.Point((point.x - bottomLeft.x) * scale, (point.y - topRight.y) * scale);
    } else{
      return {x:-100, y:-100};
    }
  }

  fromPointToLatLng(...args){
    if(this.ready){
      let topRight = this.map.getProjection().fromLatLngToPoint(this.map.getBounds().getNorthEast());
      let bottomLeft = this.map.getProjection().fromLatLngToPoint(this.map.getBounds().getSouthWest());
      let scale = Math.pow(2, this.map.getZoom());
      let point = new google.maps.Point(args[0] / scale + bottomLeft.x, args[1] / scale + topRight.y);
      let latlng = this.map.getProjection().fromPointToLatLng(point);
      return {lat: latlng.lat(), lng: latlng.lng()};
    } else {
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

export { Google };
