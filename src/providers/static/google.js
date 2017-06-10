// -----------
// Google Static Maps API v2
// Reference: https://developers.google.com/maps/documentation/static-maps/
// -----------

import { google as message } from './../messages';

// Query parameters
let options= ['lat', 'lng', 'zoom', 'width', 'height', 'scale', 'format', 'maptype', 'language', 'region', 'path', 'style', 'signature', 'center'];

// Url builder
let urlParser = (OPTIONS) => {
  adjustScale(OPTIONS);
  let url = 'https://maps.googleapis.com/maps/api/staticmap?';
  let _OPTIONS = Object.assign({}, OPTIONS);
  _OPTIONS.size = _OPTIONS.width + 'x' + _OPTIONS.height;
  !_OPTIONS.center && (_OPTIONS.center = _OPTIONS.lat + ',' + _OPTIONS.lng);
  !_OPTIONS.scale && (_OPTIONS.scale = 1);
  ['width', 'height', 'lat', 'lng', 'pixels'].forEach (e => delete _OPTIONS[e]);
  for(let option in _OPTIONS)
    _OPTIONS[option] != undefined && (url += '&' + option + '=' + _OPTIONS[option])
  return url
}

// Image/Screen scale adjustment
let adjustScale = (options) => {
  if(options.scale == 1 || options.scale == undefined) {
    options.pixels = 128
    options.scale = 1;
  } else if (options.scale == 2){
    options.pixels = 256;
  }
  if (options.width > 640){
    message.staticSize('width', options.width);
    options.width = 640;
  }
  if (options.height > 640){
    message.staticSize('height', options.height);
    options.height = 640;
  }
}

export { options, urlParser }
