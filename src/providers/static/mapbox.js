// -----------
// Mapbox Static API v1
// Reference: https://www.mapbox.com/api-documentation/#static
// -----------

import { StaticMap } from './StaticMap';

class Mapbox extends StaticMap {
  constructor(options){
    super(options);
    this.url = 'https://api.mapbox.com/styles/v1/';
    this.init();
    this.img = this.createImage();
  }

  init() {
    this.options.pixels = 256;
    !this.options.scale && (this.options.scale = 1)
    if(this.options.scale == 2){
      this.options.pixels = 512
    } else{
      if (this.options.width > 1024){
        Mapbox.messages().size('width', this.options.width);
        this.options.width = 1024;
      }
      if (this.options.height > 1024){
        Mapbox.messages().size('height', this.options.width);
        this.options.height = 1024;
      }
    }
  };

  createImage() {
    if (!this.options.key){
      Mapbox.messages().key();
      return;
    }
    (this.options.username != undefined) ? this.url += this.options.username + '/': this.url += 'mapbox/';
    (this.options.style != undefined) ? this.url += this.options.style + '/': this.url += 'streets-v10/';
    this.url += 'static/';
    (this.options.overlay != undefined) && (this.url += this.options.overlay + '/');
    this.url += this.options.lng + ',' + this.options.lat + ',';
    (this.options.auto == false || this.options.auto == undefined) ?
    ['zoom', 'bearing', 'pitch'].forEach((e,i) => {
      (this.options[e] != undefined) ? this.url += this.options[e] : this.url += 0;
      i < 2 && (this.url += ',');
    }) : this.url += 'auto';
    this.url += '/' + this.options.width + 'x' + this.options.height;
    (this.options.scale == 2) && (this.url += '@2x');
    this.url += '?access_token=' + this.options.key;
    (this.options.attribution) ? this.url += '&attribution=' + this.options.attribution : this.url += '&attribution=false';
    (this.options.logo) ? this.url += '&logo=' + this.options.logo : this.url += '&logo=false';
    (this.options.before_layer) ? this.url += '&before_layer=' + this.options.before_layer : this.url += '&before_layer=false';
    return this.url
  };

  static options(){
    return ['lat', 'lng', 'zoom', 'width', 'height', 'scale', 'bearing', 'pitch', 'style', 'username', 'overlay', 'attribution', 'logo', 'before_layer', 'center', 'size'];
  }

  static messages(){
    return {
      size: (s, m) => console.warn(`You requested an image with a ${s} of ${m}px. Mapbox Static API max ${s} value is 1024px.`),
      key: () => {console.error('Mapbox need an API key to work. Please provide an API key for your map provider. To get a key visit: https://www.mapbox.com/api-documentation/#static')},
    }
  }
}

export { Mapbox }
