// Mapbox Static API v1
// Reference: https://www.mapbox.com/api-documentation/#styles

import { mapbox as message } from './../messages';

// Query parameters
let options = ['lat', 'lng', 'zoom', 'width', 'height', 'scale', 'bearing', 'pitch', 'style', 'username', 'overlay', 'attribution', 'logo', 'before_layer', 'center', 'size'];

// Url builder
let urlParser = (OPTIONS) => {
  adjustScale(OPTIONS);
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
};

// Image/Screen scale adjustment
let adjustScale = (options) => {
  options.pixels = 256;
  !options.scale && (options.scale = 1)
  if(options.scale == 2){
    options.pixels = 512
  } else{
    if (options.width > 1024){
      message.staticSize('width', options.width);
      options.width = 1024;
    }
    if (options.height > 1024){
      message.staticSize('height', options.height);
      options.height = 1024;
    }
  }
};

export { options, urlParser }
