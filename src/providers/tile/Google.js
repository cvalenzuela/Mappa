// -----------
// Google Maps JavaScript v3.28
// Reference: https://developers.google.com/maps/documentation/javascript/
// -----------

import TileMap from './TileMap';

class Google extends TileMap {
  constructor(options) {
    super(options);
    this.scriptSrc = 'https://maps.googleapis.com/maps/api/js';
    if (this.options.key) {
      this.scriptSrc += `?key=${this.options.key}`;
    }
    if (this.options.language) {
      this.scriptSrc += `&language=${this.options.language}`;
    }
    if (this.options.region) {
      this.scriptSrc += `&region=${this.options.region}`;
    }
    this.onChangeMethods = {};
    this.loadSrc();
  }

  createMap() {
    if (!this.options.key) {
      Google.messages().key();
    }

    this.map = new google.maps.Map(document.getElementById(this.id), {
      center: { lat: this.options.lat, lng: this.options.lng },
      zoom: this.options.zoom || 6,
      mapTypeId: this.options.maptype || 'terrain',
      styles: this.options.styles || '',
      minZoom: 1 || this.options.minZoom,
    });

    const overlay = new google.maps.OverlayView();
    overlay.onAdd = () => {
      overlay.getPanes().overlayLayer.appendChild(this.canvas);
    };
    overlay.draw = () => { };
    overlay.setMap(this.map);

    google.maps.event.addListener(this.map, 'bounds_changed', () => {
      const center = overlay.getProjection().fromLatLngToDivPixel(this.map.getCenter());
      let pixels = 2;
      if (window.devicePixelRatio >= 2) {
        pixels = 4;
      }
      const offsetX = -Math.round((this.canvas.width / pixels) - center.x);
      const offsetY = -Math.round((this.canvas.height / pixels) - center.y);
      const cvs = this.canvas.getContext('webgl') || this.canvas.getContext('2d');
      cvs.canvas.style.transform = `translate(${offsetX}px,${offsetY}px)`;
    });
    google.maps.event.addListenerOnce(this.map, 'tilesloaded', () => { this.ready = true; });
  }

  fromLatLngToPixel(inputPos) {
    if (this.ready) {
      const position = new google.maps.LatLng(inputPos);
      const topRight = this.map.getProjection().fromLatLngToPoint(this.map.getBounds().getNorthEast());
      const bottomLeft = this.map.getProjection().fromLatLngToPoint(this.map.getBounds().getSouthWest());
      const scale = Math.pow(2, this.map.getZoom());
      const point = this.map.getProjection().fromLatLngToPoint(position);
      return new google.maps.Point((point.x - bottomLeft.x) * scale, (point.y - topRight.y) * scale);
    }
    return {
      x: -100,
      y: -100,
    };
  }

  fromPointToLatLng(...args) {
    if (this.ready) {
      const topRight = this.map.getProjection().fromLatLngToPoint(this.map.getBounds().getNorthEast());
      const bottomLeft = this.map.getProjection().fromLatLngToPoint(this.map.getBounds().getSouthWest());
      const scale = Math.pow(2, this.map.getZoom());
      const point = new google.maps.Point(args[0] / scale + bottomLeft.x, args[1] / scale + topRight.y);
      const latlng = this.map.getProjection().fromPointToLatLng(point);
      return {
        lat: latlng.lat(),
        lng: latlng.lng(),
      };
    }
    return {
      lat: -100,
      lng: -100,
    };
  }

  getZoom() {
    if (this.ready) {
      return this.map.getZoom();
    }
    return 0;
  }

  onChange(callback) {
    if (this.ready) {
      callback();
      this.onChangeMethods[callback] = google.maps.event.addListener(this.map, 'bounds_changed', callback);
    } else {
      setTimeout(() => { this.onChange(callback); }, 200);
    }
  }

  removeOnChange(callback) {
    google.maps.event.removeListener(this.onChangeMethods[callback]);
  }

  static messages() {
    return {
      key: () => { console.warn('Please provide a Goolge Maps API Key. Get one here: https://developers.google.com/maps/documentation/javascript/ '); },
    };
  }
}

export default Google;
