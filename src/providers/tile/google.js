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
    let mapCanvasProjection = overlay.getProjection();
    overlay.onAdd = () => {
      let div = this.canvas;
      overlay.getPanes().overlayLayer.appendChild(div);
    }

    return map;
  }

  fromLatLngtoPixel(position) {
    if(this.map.getProjection() != undefined){
      position = new google.maps.LatLng(position)
      var topRight = this.map.getProjection().fromLatLngToPoint(this.map.getBounds().getNorthEast());
      var bottomLeft = this.map.getProjection().fromLatLngToPoint(this.map.getBounds().getSouthWest());
      var scale = Math.pow(2, this.map.getZoom());
      var worldPoint = this.map.getProjection().fromLatLngToPoint(position);
      return new google.maps.Point((worldPoint.x - bottomLeft.x) * scale, (worldPoint.y - topRight.y) * scale);
    } else{
      return {x:0, y:0};
    }
  }

  fromZoomtoPixel () {
  }

  static messages(){
    return {
      key: () => {console.warn('Please provide a Goolge Maps API Key. Get one here: https://developers.google.com/maps/documentation/javascript/ ')}
    }
  }
}




export { Google };
