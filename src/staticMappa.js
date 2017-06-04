// Static Maps

import { staticProviders } from './mapProviders';

let staticMappa = (provider, key, args) => {
  let PROVIDER = staticProviders[provider],
  URL = PROVIDER.url, OPTIONS = {};

  if (Array.isArray(args)) {
    args.map((el, i) => {
      let option = PROVIDER.options[i];
      OPTIONS[option] = el;
    })
  } else {
    OPTIONS = args
  }
  OPTIONS.key = key;

  for(let option in OPTIONS){
    if(option == 'width' || option == 'height') {
      OPTIONS.size = OPTIONS.width + 'x' + OPTIONS.height;
      delete OPTIONS.width;
      delete OPTIONS.height;
    } else if (option == 'lat' || option == 'lng') {
      OPTIONS.center = OPTIONS.lat + ',' + OPTIONS.lng;
      delete OPTIONS.lat;
      delete OPTIONS.lng;
    }
  }

  for(let option in OPTIONS){
    (OPTIONS[option] != null) ? URL += '&' + option + '=' + OPTIONS[option] : null;
  }

  return URL;
}

export { staticMappa };
