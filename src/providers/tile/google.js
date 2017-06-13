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
    this.init();
  }

  createMap () {
    !this.options.key && Google.messages().key();

    let map = new google.maps.Map(document.getElementById('mappa'), {
      center: {lat: this.options.lat, lng: this.options.lng},
      zoom: this.options.zoom || 6,
    });

    let overlay = new google.maps.OverlayView();
    overlay.draw = function(){}
    overlay.setMap(map);
    overlay.onAdd = () => {
      overlay.getPanes().overlayLayer.appendChild(this.canvas.elt);
    }

    google.maps.event.addListener(map, 'bounds_changed', () => {
      let center = overlay.getProjection().fromLatLngToDivPixel(map.getCenter());
      let offsetX = - Math.round(this.canvas.width / 2 - center.x);
      let offsetY = - Math.round(this.canvas.height / 2 - center.y);
      let _canvas = this.canvas.elt.getContext('2d')
      console.log(center, offsetX, offsetY)
      _canvas.canvas.style.transform = 'translate(' + offsetX + 'px,' + offsetY + 'px)';
    })

    google.maps.event.addListenerOnce(map, 'tilesloaded', () => { this.ready = true; });

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




export { Google };
