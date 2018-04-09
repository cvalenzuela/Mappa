// -----------
// Leaflet v1.3.1 (1.3.x)
// Reference: http://LeafletJS.com/reference-1.3.0.html
//-----------

import TileMap from './TileMap';

class Leaflet extends TileMap {
  constructor(options) {
    super(options);
    this.map = this.tiles = null;

    this.scriptSrc = 'https://unpkg.com/leaflet@1.3/dist/leaflet.js';
    this.styleSrc = 'https://unpkg.com/leaflet@1.3/dist/leaflet.css';
    this.ready = false;

    if (this.constructor.name === 'Leaflet')  this.loadSrc();
  }

  createMap() {
    const { lat, lng, zoom, style } = this.options;
    this.map = L.map(this.id, { center: [ lat, lng ], zoom, inertia: false });

    if (!style) {
      Leaflet.messages().tiles();
      this.ready = true;
    } else {
      this.tiles = L.tileLayer(style).addTo(this.map);
      this.tiles.on('tileload', () => this.ready = true);
    }

    return this.canvasOverlay();
  }

  canvasOverlay() {
    const { canvas } = this,
          ctx = canvas.getContext('webgl') || canvas.getContext('2d');

    if (this.tiles) this.tiles.options.opacity = this.options.opacity;

    L.Layer.Overlay = L.Layer.extend({
      onAdd(map) {
        this._container = L.DomUtil.create('div', 'leaflet-layer');
        this._container.appendChild(canvas);
        map.getPane(this.options.pane).appendChild(this._container);

        map.on('move', () => {
          const d = map.dragging._draggable._newPos;
          if (d) ctx.canvas.style.transform = `translate(${-d.x}px, ${-d.y}px)`;
        });
      },

      onRemove(map) {
        L.DomUtil.remove(this._container);
        map.off();
        delete this._container;
      },

      drawLayer() {}
    });

    L.overlay = () => new L.Layer.Overlay;
    this.map.addLayer(L.overlay());

    return this;
  }

  fromLatLngToPixel(position) {
    if (this.ready) {
      const { x, y } = this.map.latLngToContainerPoint(position);
      return { x, y };
    }
    return { x: -100, y: -100 };
  }

  fromPointToLatLng(...args) {
    if (this.ready) {
      const { lat, lng } = this.map.containerPointToLatLng(args);
      return { lat, lng };
    }
    return { lat: -100, lng: -100 };
  }

  getZoom() {
    if (this.ready)  return this.map.getZoom();
    return 0;
  }

  onChange(callback) {
    if (this.ready) {
      callback();
      this.map.on('move', callback);
    } else {
      setTimeout(() => this.onChange(callback), 200);
    }
    return this;
  }

  removeOnChange(callback) {
    this.map.on('move', callback);
    return this;
  }

  static messages() {
    return {
      tiles() {
        console.warn(
          'You are not using any tiles for your map.',
          'Try out with: http://{s}.tile.osm.org/{z}/' + '{x}/{y}.png'
        );
      }
    };
  }
}

export default Leaflet;
