// -----------
// Google Maps JavaScript v3.28
// Reference: https://developers.google.com/maps/documentation/javascript/
// -----------

import { TileMap } from './TileMap';

class Google extends TileMap {
  constructor(options){
    super(options);
    this.script = 'https://maps.googleapis.com/maps/api/js?key=' + this.options.key;
    (!this.options.key) ? console.log('nokey') : this.init();
  }

  createMap () {
    let map = new google.maps.Map(document.getElementById('mappa'), {
      center: {lat: this.options.lat, lng: this.options.lng},
      zoom: this.options.zoom
    });

    let overlay = new google.maps.OverlayView();
    overlay.setMap(map);
    overlay.onAdd = () => {
      let div = this.canvas.elt;
      overlay.getPanes().overlayLayer.appendChild(div);
    }
    overlay.draw = () => {}

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
}




export { Google };
