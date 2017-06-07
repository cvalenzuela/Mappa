// Module to add maps providers libraries and store static URL's

import { warnings } from './consoleMessages';

// Static URL
let staticMapProviders = {
  google: {
    options: ['lat', 'lng', 'zoom', 'width', 'height', 'scale', 'format', 'maptype', 'language', 'region', 'path', 'style', 'signature', 'center'],
    urlParser: (OPTIONS) => {
      let url = 'https://maps.googleapis.com/maps/api/staticmap?';
      let _OPTIONS = Object.assign({}, OPTIONS);
      _OPTIONS.size = _OPTIONS.width + 'x' + _OPTIONS.height;
      !_OPTIONS.center && (_OPTIONS.center = _OPTIONS.lat + ',' + _OPTIONS.lng);
      !_OPTIONS.scale && (_OPTIONS.scale = 1);
      ['width', 'height', 'lat', 'lng'].forEach (e => delete _OPTIONS[e]);
      for(let option in _OPTIONS)
        _OPTIONS[option] != undefined && (url += '&' + option + '=' + _OPTIONS[option])
      return url
    }
  },
  mapbox: {
    options: ['lat', 'lng', 'zoom', 'width', 'height', 'scale', 'bearing', 'pitch', 'style', 'username', 'overlay', 'attribution', 'logo', 'before_layer', 'center', 'size'],
    urlParser: (OPTIONS) => {
      let url = 'https://api.mapbox.com/styles/v1/';
      (OPTIONS.username != undefined) ? url += OPTIONS.username + '/': url += 'mapbox/';
      (OPTIONS.style != undefined) ? url += OPTIONS.style + '/': url += 'streets-v10/';
      url += 'static/';
      (OPTIONS.overlay != undefined) && (url += OPTIONS.overlay + '/');
      url += OPTIONS.lng + ',' + OPTIONS.lat + ',';
      (OPTIONS.auto == false || OPTIONS.auto == undefined) ?
      ['zoom', 'bearing', 'pitch'].forEach((e,i) => {
        (OPTIONS[e] != undefined) ? url += OPTIONS[e] : url += 0;
        i < 2 && (url += ',');
      }) : url += 'auto';
      url += '/' + OPTIONS.width + 'x' + OPTIONS.height;
      (OPTIONS.scale == 2) && (url += '@2x');
      url += '?access_token=' + OPTIONS.key;
      (!OPTIONS.attribution) && (url += '&attribution=false');
      (!OPTIONS.logo) && (url += '&logo=false');
      (!OPTIONS.before_layer) && (url += '&before_layer=' + OPTIONS.before_layer);
      return url
    }
  }
}

// Check the size and scale and adjust output to match requirements from providers when necessary
let adjustSize = (provider, options) => {
  if(provider == 'google'){
    if(options.scale == 1 || options.scale == undefined) {
      options.pixels = 128
      options.scale = 1;
    } else if (options.scale == 2){
      options.pixels = 256;
    }
    if (options.width > 640){
      warnings.staticSize.google('width', options.width);
      options.width = 640;
    }
    if (options.height > 640){
      warnings.staticSize.google('height', options.height);
      options.height = 640;
    }
  }
  else if (provider == 'mapbox'){
    options.pixels = 256;
    !options.scale && (options.scale = 1)
    if(options.scale == 2){
      options.pixels = 512
    } else{
      if (options.width > 1024){
        warnings.staticSize.mapbox('width', options.width);
        options.width = 1024;
      }
      if (options.height > 1024){
        warnings.staticSize.mapbox('height', options.height);
        options.height = 1024;
      }
    }
  }
}

export { staticMapProviders, adjustSize }
