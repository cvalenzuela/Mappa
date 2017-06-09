// Mapbox-gl v0.37.0
// Reference: https://www.mapbox.com/mapbox-gl-js/api/

import { mapboxgl as message } from './../messages';
// import { addLibrary } from './../addLibrary'

let script = 'https://api.mapbox.com/mapbox-gl-js/v0.37.0/mapbox-gl.js';
let style = 'https://api.mapbox.com/mapbox-gl-js/v0.37.0/mapbox-gl.css';

let createMap = (canvas, options) => {

  // if(!options.key){
  //   return message.noKey();
  // }
  //
  // const script = 'https://api.mapbox.com/mapbox-gl-js/v0.37.0/mapbox-gl.js';
  // const style = 'https://api.mapbox.com/mapbox-gl-js/v0.37.0/mapbox-gl.css';
  //
  // let lib = addLibrary(options.key, 'mapbox', script, style);
  // let map;
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
  //window.tileMap = map;
  // lib.onload = () => {
  //
  //
  // };

}


export { script, style, createMap };
