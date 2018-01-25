// -----------
// Static Map
// -----------

import parseGeoJSON from '../../utils/parseGeoJSON';

class StaticMap {
  constructor(options) {
    this.options = options;
    this.init();
  }

  init() {
    this.options.pixels = 256;
    if (!this.options.scale) {
      this.options.scale = 1;
    }
    if (this.options.scale === 2) {
      this.options.pixels = 512;
    }
  }

  latLngToPixel(lat, lng) {
    return {
      x: (this.fromLngToPoint(lng) - this.fromLngToPoint(this.options.lng)) + this.options.width/(2 / this.options.scale),
      y: (this.fromLatToPoint(lat) - this.fromLatToPoint(this.options.lat)) + this.options.height/(2 / this.options.scale),
    }
  }

  fromLatToPoint(l) {
    return (((this.options.pixels) / Math.PI) * Math.pow(2, this.options.zoom)) * (Math.PI - Math.log(Math.tan(Math.PI / 4 + (l* Math.PI / 180) / 2)));
  }

  fromLngToPoint(l) {
    return (((this.options.pixels) / Math.PI) * Math.pow(2, this.options.zoom)) * ((l* Math.PI / 180) + Math.PI);
  }

  static geoJSON(...args) {
    return parseGeoJSON(args[0], args[1]);
  }
}

export default StaticMap;
