// -----------
// Google Static Maps API v2
// Reference: https://developers.google.com/maps/documentation/static-maps/
// -----------

import { StaticMap } from './StaticMap';

class Google extends StaticMap {
  constructor(options){
    super(options);
    this.url = 'https://maps.googleapis.com/maps/api/staticmap?';
    this.init();
    this.img = this.createImage();
  }

  init() {
    if(this.options.scale == 1 || this.options.scale == undefined) {
      this.options.pixels = 128
      this.options.scale = 1;
    } else if (this.options.scale == 2){
      this.options.pixels = 256;
    }
    if (this.options.width > 640){
      Google.messages().size('width', options.width);
      this.options.width = 640;
    }
    if (this.options.height > 640){
      Google.messages().size('height', options.height);
      this.options.height = 640;
    }
  }

  createImage() {
    !this.options.key && (Google.messages().key());

    this.options.size = this.options.width + 'x' + this.options.height;
    !this.options.center && (this.options.center = this.options.lat + ',' + this.options.lng);
    !this.options.scale && (this.options.scale = 1);

    for(let option in this.options)
      (options().valid.indexOf(this.options[option]) > -1) && (this.url += '&' + option + '=' + this.options[option])

    return this.url
  }

  static options(){
    return {
      valid: ['center', 'zoom', 'size', 'scale', 'format', 'maptype', 'language', 'region', 'markers', 'path', 'visible', 'style', 'signature', 'key', 'signature'],
      userInput: ['lat', 'lng', 'center', 'zoom', 'width', 'height', 'scale', 'format', 'maptype', 'language', 'region', 'markers', 'path', 'visible', 'style', 'key', 'signature']
    }
  }

  static messages(){
    return {
      size: (s, m) => {console.warn(`You requested an image with a ${s} of ${m}px. Google Maps Static API max ${s} value is 640px. For larger images, change the scale to 2 and keep the ${s} between 1-640px. i.e: if you want an image 800x800px, set the width and height to 400x400 and the scale to 2.`)},
      key: () => {console.warn('For large requests please provide an API key for your Google Maps Static API.')},
    }
  }
}

export { Google }
