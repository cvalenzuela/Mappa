// Static Maps

import { staticProviders } from './mapProviders';

let staticMappa = (provider, key, args) => {
  let PROVIDER = staticProviders[provider],
  OPTIONS = {};

  if (Array.isArray(args)) {
    args.map((el, i) => {
      let option = PROVIDER.options[i];
      OPTIONS[option] = el;
    })
  } else {
    OPTIONS = args
  }

  OPTIONS.key = key;
  OPTIONS.size = OPTIONS.width + 'x' + OPTIONS.height;
  OPTIONS.center = OPTIONS.lat + ',' + OPTIONS.lng;
  ['width', 'height', 'lat', 'lng'].forEach (e => delete OPTIONS[e])
  
  return PROVIDER.parser(OPTIONS)
}

export { staticMappa };
