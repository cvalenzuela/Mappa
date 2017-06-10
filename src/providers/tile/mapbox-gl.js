// -----------
// Mapbox-gl v0.37.0
// Reference: https://www.mapbox.com/mapbox-gl-js/api/
// -----------

import { mapboxgl as message } from './../messages';

// Library
let script = () =>{
  return 'https://api.mapbox.com/mapbox-gl-js/v0.37.0/mapbox-gl.js';
}
const style = 'https://api.mapbox.com/mapbox-gl-js/v0.37.0/mapbox-gl.css';

let map;

// Create a Map
let createMap = (canvas, options) => {
  mapboxgl.accessToken = options.key;

  map = new mapboxgl.Map({
    container: 'mappa',
    style: options.style,
    center: [options.lng, options.lat],
    zoom: options.zoom,
  });

  canvas.parent(map.getCanvasContainer());
  canvas.elt.style.position = 'absolute';

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
