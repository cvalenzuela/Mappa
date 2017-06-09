// Mapbox-gl v0.37.0
// Reference: https://www.mapbox.com/mapbox-gl-js/api/

import { mapboxgl as message } from './../messages';
import { addLibrary } from './../addLibrary'

let createMap = (canvas, div, options) => {

  if(!options.key){
    return message.noKey();
  }

  const script = 'https://api.mapbox.com/mapbox-gl-js/v0.37.0/mapbox-gl.js';
  const style = 'https://api.mapbox.com/mapbox-gl-js/v0.37.0/mapbox-gl.css';

  let lib = addLibrary(options.key, 'mapbox', script, style);

  lib.onload = () => {

    mapboxgl.accessToken = options.key;

    let map = new mapboxgl.Map({
      container: 'mappa',
      style: options.style,
      center: [options.lng, options.lat],
      zoom: options.zoom,
    });

    canvas.parent(map.getCanvasContainer())
    canvas.elt.style.position = 'absolute'

    function project(d) {
      return map.project(getLL(d));
    }
    function getLL(d) {
      return new mapboxgl.LngLat(+d.lng, +d.lat);
    }

    window.tileMappa = map;

  };
  // function render() {
  //   //clear();
  // }
  //
  // // render for the first time
  // render();
  //
  // // re-render whenever the view changes
  // mappa.on('viewreset', function () {
  //   render();
  // });
  //
  // mappa.on('move', function () {
  //   render();
  // });
  // let url = "https://{s}.tiles.mapbox.com/v4/";
  // (OPTIONS.style) ? url += OPTIONS.style: url += 'mapbox.light';
  // url += '/{z}/{x}/{y}@2x.png?access_token='
  // url += OPTIONS.key
  // let leafletMap = L.map(div).setView([options.lat, options.lng], options.zoom);
  // L.tileLayer(url).addTo(leafletMap);

}


export { createMap };
