// -----------
// Static Map
// -----------

import { parseGeoJSON } from '../../utils/parseGeoJSON';

class StaticMap  {
  constructor(options){
    this.options = options;
  }

  latLngToPixel(lat, lng) {
    return {
      x: this.fromLngToPoint(lng) - this.fromLngToPoint(this.options.lng) + this.options.width/(2/this.options.scale),
      y: this.fromLatToPoint(lat) - this.fromLatToPoint(this.options.lat) + this.options.height/(2/this.options.scale)
    }
  };

  fromLatToPoint(l){
    return (((this.options.pixels) / PI) * pow(2, this.options.zoom)) * (PI - log(tan(PI / 4 + radians(l) / 2)));
  }

  fromLngToPoint(l){
    return (((this.options.pixels) / PI) * pow(2, this.options.zoom)) * (radians(l) + PI);
  }

  geoJSON(...args){
    return parseGeoJSON(args[0], args[1]);
  }

}

export { StaticMap };
