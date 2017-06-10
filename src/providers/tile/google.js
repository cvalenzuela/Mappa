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

// Crate the map
let createMap = (canvas, options) => {

  return map;
}


// Get LatLng
let latLng = (position) => {
  return map.project(position);
}

// Get Zoom
let zoom = () => {
  return map.getZoom();
}


export { script, style, createMap, latLng, zoom };
