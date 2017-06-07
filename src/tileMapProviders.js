// Tile Map Provider libraries

import { warnings } from './consoleMessages';

let script;

let addLibrary = (provider, key) => {
  let vendor;
  let style;
  !key && warnings.noKey();

  if(provider === 'google'){
    vendor = 'https://maps.googleapis.com/maps/api/js';
    key && (vendor += '?key=' + key)
  }
  else if (provider === 'mapbox' && key != null){
    vendor = 'https://api.mapbox.com/mapbox-gl-js/v0.37.0/mapbox-gl.js';
    style = 'https://api.mapbox.com/mapbox-gl-js/v0.37.0/mapbox-gl.css';
  }
  else if (provider === 'osm'){
    vendor = null;
  }
  else if (provider === 'mapzen'){
    vendor = null;
  }
  else if (provider === 'carto'){
    vendor = null;
  }
  else if (provider === 'mapquest'){
    vendor = null;
  } else {
    vendor = null;
  }

  // Add provider's library to DOM
  if(!document.getElementById(provider)) {
    script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = vendor;
    script.id = provider;
    document.head.appendChild(script);
    if(style) {
      let st = document.createElement('link')
      st.rel = 'stylesheet'
      st.href = style
      document.head.appendChild(st)
    }
  }

}

let createMap = (canvas, div, PROVIDER, OPTIONS) => {
  let map;
  script.onload = () => {
    if(PROVIDER == 'mapbox'){
      mapboxgl.accessToken = OPTIONS.key;

      map = new mapboxgl.Map({
        container: 'mappa',
        style: OPTIONS.style,
        center: [OPTIONS.lng, OPTIONS.lat],
        zoom: OPTIONS.zoom,
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
  };
}


export { addLibrary, createMap };
