// Module to add maps providers libraries and store static URL's

// Map Provider libraries
let addLibrary = (provider, key) => {
  let vendor;
  (!key) ? console.warn('Plase provide an API key for your map provider.') : null;

  if(provider === 'google'){
    vendor = 'https://maps.googleapis.com/maps/api/js';
    key && (vendor += '?key=' + key)
  }
  else if (provider === 'mapbox' && key != null){
    vendor = 'https://api.mapbox.com/mapbox.js/v3.1.1/mapbox.js'
  }
  else if (provider === 'osm'){
    vendor = null;
  }
  else if (provider === 'mapzen'){
    vendor = null;
  } else {
    vendor = null;
  }

  if(!document.getElementById(provider)) {
    let s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = vendor;
    s.id = provider;
    document.head.appendChild(s)
  }
}

// Static URL
let staticProviders = {
  google: {
    options: ['lat', 'lng', 'zoom', 'width', 'height', 'scale', 'format', 'maptype', 'language', 'region', 'path', 'style', 'signature'],
    parser: (OPTIONS) => {
      let url = 'https://maps.googleapis.com/maps/api/staticmap?';
      for(let option in OPTIONS)
        OPTIONS[option] != undefined && (url += '&' + option + '=' + OPTIONS[option])
      return url
    }
  },
  mapbox: {
    options: ['lat', 'lng', 'zoom', 'width', 'height', 'bearing', 'pitch', 'style', 'username', 'overlay', 'at', 'attribution', 'logo', 'before_layer', 'center', 'size'],
    parser: (OPTIONS) => {
      let url = 'https://api.mapbox.com/styles/v1/';
      let center = OPTIONS.center.split(',');
      (OPTIONS.username != undefined) ? url += OPTIONS.username + '/': url += 'mapbox/';
      (OPTIONS.style != undefined) ? url += OPTIONS.style + '/': url += 'streets-v10/';
      url += 'static/';
      (OPTIONS.overlay != undefined) && (url += OPTIONS.overlay + '/');
      url += center[1] + ',' + center[0] + ',';
      (OPTIONS.auto == false || OPTIONS.auto == undefined) ?
        ['zoom', 'bearing', 'pitch'].forEach((e,i) => {
          (OPTIONS[e] != undefined) ? url += OPTIONS[e] : url += 0;
          i < 2 && (url += ',');
        }) : url += 'auto';
      url += '/' + OPTIONS.size;
      (OPTIONS.scale != undefined) && (url += '@'+ OPTIONS.scale);
      url += '?access_token=' + OPTIONS.key;
      (!OPTIONS.attribution) && (url += '&attribution=false');
      (!OPTIONS.logo) && (url += '&logo=false');
      (!OPTIONS.before_layer) && (url += '&before_layer=' + OPTIONS.before_layer);
      return url ;
    }
  }
}

export { addLibrary, staticProviders }
