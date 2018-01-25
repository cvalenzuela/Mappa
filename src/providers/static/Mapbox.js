// -----------
// Mapbox Static API v1
// Reference: https://www.mapbox.com/api-documentation/#static
// -----------

import StaticMap from './StaticMap';

class Mapbox extends StaticMap {
  constructor(options) {
    super(options);
    this.imgUrl = 'https://api.mapbox.com/styles/v1/';
    this.createImage();
  }

  init() {
    this.options.pixels = 256;
    if (!this.options.scale) {
      this.options.scale = 1;
    }
    if (this.options.scale === 2) {
      this.options.pixels = 512;
    } else {
      if (this.options.width > 1280) {
        Mapbox.messages().size('width', this.options.width);
        this.options.width = 1280;
      }
      if (this.options.height > 1280) {
        Mapbox.messages().size('height', this.options.width);
        this.options.height = 1280;
      }
    }
  }

  createImage() {
    if (!this.options.key) {
      Mapbox.messages().key();
      return null;
    }
    if (this.options.username !== undefined) {
      this.imgUrl += `${this.options.username}/`;
    } else {
      this.imgUrl += 'mapbox/';
    }
    if (this.options.style !== undefined) {
      this.imgUrl += `${this.options.style}/`;
    } else {
      this.imgUrl += 'streets-v10/';
    }

    this.imgUrl += 'static/';

    if (this.options.overlay !== undefined) {
      this.imgUrl += `${this.options.overlay}/`;
    }

    this.imgUrl += `${this.options.lng},${this.options.lat},`;

    if (this.options.auto === false || this.options.auto === undefined) {
      ['zoom', 'bearing', 'pitch'].forEach((e, i) => {
        if (this.options[e] !== undefined) {
          this.imgUrl += this.options[e];
        } else {
          this.imgUrl += 0;
        }
        if (i < 2) {
          this.imgUrl += ',';
        }
      });
    } else {
      this.imgUrl += 'auto';
    }

    this.imgUrl += `/${this.options.width}x${this.options.height}`;

    if (this.options.scale === 2) {
      this.imgUrl += '@2x';
    }
    this.imgUrl += `?access_token=${this.options.key}`;
    if (this.options.attribution) {
      this.imgUrl += `&attribution=${this.options.attribution}`;
    } else {
      this.imgUrl += '&attribution=false';
    }
    if (this.options.logo) {
      this.imgUrl += `&logo=${this.options.logo}`;
    } else {
      this.imgUrl += '&logo=false';
    }
    if (this.options.before_layer) {
      this.imgUrl += `&before_layer=${this.options.before_layer}`;
    } else {
      this.imgUrl += '&before_layer=false';
    }
    return this.imgUrl;
  }

  static options() {
    return {
      valid: ['lat', 'lng', 'zoom', 'width', 'height', 'scale', 'bearing', 'pitch', 'style', 'username', 'overlay', 'attribution', 'logo', 'before_layer', 'center', 'size'],
      userInput: ['lat', 'lng', 'zoom', 'width', 'height', 'scale', 'bearing', 'pitch', 'style', 'username', 'overlay', 'attribution', 'logo', 'before_layer', 'center', 'size'],
    };
  }

  static messages() {
    return {
      size: (s, m) => console.warn(`You requested an image with a ${s} of ${m}px. Mapbox Static API max ${s} value is 1280px. If you want a large image change the scale to 2.`),
      key: () => { console.error('Mapbox Static API needs a key to work. To get a key visit: https://www.mapbox.com/api-documentation/#static'); },
    };
  }
}

export default Mapbox;
