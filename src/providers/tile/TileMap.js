// -----------
// Tile Map
// -----------

import parseGeoJSON from '../../utils/parseGeoJSON';
import GUID from './../../utils/GUID';

class TileMap {
  constructor(options) {
    this.options = options;
    this.mappaDiv = null;
    this.id = GUID();
    this.srcLoaded = false;
  }

  loadSrc() {
    const scriptPromise = new Promise((resolve, reject) => {
      this.scriptTag = document.createElement('script');
      document.body.appendChild(this.scriptTag);
      this.scriptTag.id = this.options.provider;
      this.scriptTag.onload = resolve;
      this.scriptTag.onerror = reject;
      this.scriptTag.async = true;
      this.scriptTag.src = this.scriptSrc;
      if (this.styleSrc) {
        const styleTag = document.createElement('link');
        document.head.appendChild(styleTag);
        styleTag.rel = 'stylesheet';
        styleTag.href = this.styleSrc;
      }
    });
    scriptPromise.then(() => { this.srcLoaded = true; });
  }

  overlay(canvas, callback) {
    if (canvas.elt !== undefined) {
      this.canvas = canvas.elt;
    } else {
      this.canvas = canvas;
    }
    this.scriptTag.onload = () => {
      this.mappaDiv = document.createElement('div');
      if (this.canvas.parentElement) {
        this.canvas.parentElement.appendChild(this.mappaDiv);
      } else {
        document.body.appendChild(this.mappaDiv);
      }
      this.mappaDiv.setAttribute('style', `width:${canvas.width}px;height:${canvas.height}px;`);
      this.mappaDiv.setAttribute('id', this.id);
      this.createMap();
      if (typeof callback === 'function') {
        callback();
      }
    };
  }

  latLngToPixel(...args) {
    let pos;
    if (typeof args[0] === 'object') {
      [pos] = args;
    } else {
      pos = {
        lat: Number(args[0]),
        lng: Number(args[1]),
      };
    }
    return this.fromLatLngToPixel(pos);
  }

  pixelToLatLng(...args) {
    return this.fromPointToLatLng(...args);
  }

  zoom() {
    return Math.floor(this.getZoom());
  }

  geoJSON(...args) {
    return parseGeoJSON(args[0], args[1]);
  }
}

export default TileMap;
