// -----------
// Google Maps JavaScript v3.28
// Reference: https://developers.google.com/maps/documentation/javascript/
// -----------

import { google as message } from './../messages';

// Library
let script = (key) => {
  return 'https://maps.googleapis.com/maps/api/js?key=' + key;
}
let style = null;

let map;
let overlay;
let overlayProjection;

// Create the map
let createMap = (canvas, options) => {
  map = new google.maps.Map(document.getElementById('mappa'), {
    center: {lat: options.lat, lng: options.lng},
    zoom: options.zoom
  });

  overlay = new google.maps.OverlayView();
  overlay.setMap(map);
  overlay.onAdd = () => {
    canvas.elt.style.position = 'absolute';
    let div = canvas.elt;
    overlay.getPanes().overlayLayer.appendChild(div);
    overlayProjection = overlay.getProjection();
  }
  overlay.draw = () => {
    overlayProjection = overlay.getProjection();
  }

  return map;
}

// Get LatLng
let latLng = (position) => {
  if(overlayProjection){
    return overlayProjection.fromLatLngToContainerPixel(new google.maps.LatLng(position.lat, position.lng));
  } else{
    return {x:0, y:0};
  }

}

// Get Zoom
let zoom = () => {
}

export { script, style, createMap, latLng };
