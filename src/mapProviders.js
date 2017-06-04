// Module to add maps providers libraries and store static URL's

// Map Provider libraries
let addLibrary = (provider, key) => {
  let vendor;
  (!key) ? console.warn('Plase provide an API key for your map provider.') : null;

  if(provider === 'google'){
    (key) ? vendor = 'https://maps.googleapis.com/maps/api/js?key=' + key : vendor = 'https://maps.googleapis.com/maps/api/js';
  }
  else if (provider === 'mapbox'){
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
    url: 'https://maps.googleapis.com/maps/api/staticmap?',
    options: ['lat', 'lng', 'zoom', 'width', 'height', 'scale', 'format', 'maptype', 'language', 'region', 'path', 'style', 'signature']
  },
  mapbox: {
    url: 'https://api.mapbox.com/v4/'
    options: 
  }
}

export { addLibrary, staticProviders }
