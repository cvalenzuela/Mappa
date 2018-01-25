// -----------
// Leaflet v1.3.0
// Reference: http://leafletjs.com/reference-1.3.0.html
//-----------

import TileMap from './TileMap';

class Leaflet extends TileMap {
  constructor(options) {
    super(options);
    this.scriptSrc = 'https://unpkg.com/leaflet@1.3.0/dist/leaflet.js';
    this.styleSrc = 'https://unpkg.com/leaflet@1.3.0/dist/leaflet.css';
    this.ready = false;
    if (this.constructor.name === 'Leaflet') {
      this.loadSrc();
    }
  }

  createMap() {
    this.map = L.map(this.id, {
      center: [
        this.options.lat, this.options.lng,
      ],
      zoom: this.options.zoom,
      inertia: false,
    });

    if (!this.options.style) {
      Leaflet.messages().tiles();
      this.ready = true;
    } else {
      this.tiles = L.tileLayer(this.options.style).addTo(this.map);
      this.tiles.on('tileload', () => {
        this.ready = true;
      });
    }
    this.canvasOverlay();
  }

  canvasOverlay() {
    if (this.tiles) {
      this.tiles.options.opacity = this.options.opacity;
    }
    L.overlay = L.Layer.extend({
      onAdd: () => {
        const overlayPane = overlay.getPane();
        const container = L.DomUtil.create('div', 'leaflet-layer');
        container.appendChild(this.canvas);
        overlayPane.appendChild(container);
      },
      drawLayer: () => {},
    });
    const overlay = new L.overlay();
    this.map.addLayer(overlay);
    

    const cnvs = this.canvas.getContext('webgl') || this.canvas.getContext('2d');
    this.map.on('move', () => {
      const d = this.map.dragging._draggable;
      if (d._newPos) {
        cnvs.canvas.style.transform = `translate(${-d._newPos.x}px, ${-d._newPos.y}px)`;
      };
    })
  }

  fromLatLngToPixel(position) {
    if (this.ready) {
      const containerPoint = this.map.latLngToContainerPoint(position);
      return {
        x: containerPoint.x,
        y: containerPoint.y,
      };
    }
    return {
      x: -100,
      y: -100, 
    };
  }

  fromPointToLatLng(...args) {
    if (this.ready) {
      return this.map.containerPointToLatLng(args);
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
      this.map.on('move', callback);
    } else {
      setTimeout(() => {
        this.onChange(callback);
      }, 200);
    }
  }

  removeOnChange(callback) {
    this.map.on('move', callback);
  }

  static messages() {
    return {
      tiles: () => {
        console.warn('You are not using any tiles for your map. Try with: http://{s}.tile.osm.org/{z}/' +
          '{x}/{y}.png');
      },
    };
  }
}

export default Leaflet;
