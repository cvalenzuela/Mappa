// -----------
// Mapquest v5
// Reference: https://developer.mapquest.com/documentation/static-map-api/v5/
// -----------

import StaticMap from './StaticMap';

class Mapquest extends StaticMap {
  constructor(options) {
    super(options);
    this.imgUrl = 'https://www.mapquestapi.com/staticmap/v5/map?';
    this.createImage();
  }

  init() {
    if (this.options.scale === 1 || this.options.scale === undefined) {
      this.options.pixels = 128;
      this.options.scale = 1;
    } else if (this.options.scale === 2) {
      this.options.pixels = 256;
    }
    if (this.options.width > 1920) {
      Mapquest.messages().size('width', this.options.width);
      this.options.width = 1920;
    }
    if (this.options.height > 1920) {
      Mapquest.messages().size('height', this.options.height);
      this.options.height = 1920;
    }
  }

  createImage() {
    if (!this.options.key) {
      Mapquest.messages().key();
      return null;
    }

    this.options.size = `${this.options.width},${this.options.height}`;
    if (this.options.scale === 2) {
      this.options.size += '@2x';
    }
    if (!this.options.center) {
      this.options.center = `${this.options.lat},${this.options.lng}`;
    }
    Object.keys(this.options).forEach((opt) => {
      if (Mapquest.options().valid.indexOf(opt) > -1) {
        this.imgUrl += `&${opt}=${this.options[opt]}`;
      }
    });
    return this.imgUrl;
  }

  static options() {
    return {
      valid: ['key', 'size', 'zoom', 'center', 'boundingBox', 'margin', 'format', 'type', 'scalebar', 'locations', 'declutter', 'defaultMarker', 'banner', 'traffic', 'key'],
      userInput: ['lat', 'lng', 'zoom', 'width', 'height', 'scale', 'boundingBox', 'margin', 'format', 'type', 'scalebar', 'locations', 'declutter', 'defaultMarker', 'banner', 'traffic', 'key'],
    };
  }

  static messages() {
    return {
      size: (s, m) => { console.warn(`You requested an image with a ${s} of ${m}px. Mapquest Static API max ${s} value is 1920px. For larger images, change the scale to 2 and keep the ${s} between 170x30px. i.e: if you want an 3840x3840px image, set the width and height to 1920x1920 and the scale to 2.`); },
      key: () => { console.warn('Please provide and API key to work with Mapquest Static API. Get one here: https://developer.mapquest.com/documentation/'); },
    };
  }
}

export default Mapquest;
