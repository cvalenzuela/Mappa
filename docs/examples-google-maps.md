---
id: examples-google-maps
sidebar_label: Google Maps
title: Google Maps Example
---

Visualizing the 5000 largest recorded meteorite landings in the world using [Mappa](tutorials-getting-started.md), <a href="https://p5js.org/"><img src="assets/img/p5js.svg" class="p5logo"/></a> and [Google Maps](https://developers.google.com/maps/documentation/javascript/).

*Data: [NASA Open Data Portal](https://data.nasa.gov/Space-Science/Meteorite-Landings/gh4g-9sfh).*

## Demo

<div class="example">
  <div id="canvasContainer"></div>
  <script src="assets/scripts/tile-google.js"></script>
</div>

## Code

Get it from [here](https://github.com/cvalenzuela/Mappa/tree/master/examples/tile/Google).

```javascript
// API Key for Google Maps. Get one here:
// https://developers.google.com/maps/web/
const key = 'xyz';

// Style for Google Maps. This is optional. More information here:
// https://mapstyle.withgoogle.com/
const style = [{
  elementType: 'geometry',
  stylers: [{
    color: '#242f3e',
  }],
}, {
  elementType: 'labels.text.fill',
  stylers: [{
    color: '#746855',
  }],
}, {
  elementType: 'labels.text.stroke',
  stylers: [{
    color: '#242f3e',
  }],
}, {
  'featureType': 'administrative.land_parcel',
  stylers: [{
    'visibility': 'off'
  }]
}, {
  'featureType': 'administrative.locality',
  elementType: 'labels.text.fill',
  stylers: [{
    color: '#d59563'
  }]
}, {
  'featureType': 'administrative.neighborhood',
  stylers: [{
    'visibility': 'off'
  }]
}, {
  'featureType': 'poi',
  elementType: 'labels.text',
  stylers: [{
    'visibility': 'off'
  }]
}, {
  'featureType': 'poi',
  elementType: 'labels.text.fill',
  stylers: [{
    color: '#d59563'
  }]
}, {
  'featureType': 'poi.park',
  elementType: 'geometry',
  stylers: [{
    color: '#263c3f'
  }]
}, {
  'featureType': 'poi.park',
  elementType: 'labels.text.fill',
  stylers: [{
    color: '#6b9a76'
  }]
}, {
  'featureType': 'road',
  stylers: [{
    'visibility': 'off'
  }]
}, {
  'featureType': 'road',
  elementType: 'geometry',
  stylers: [{
    color: '#38414e'
  }]
}, {
  'featureType': 'road',
  elementType: 'geometry.stroke',
  stylers: [{
    color: '#212a37'
  }]
}, {
  'featureType': 'road',
  elementType: 'labels',
  stylers: [{
    'visibility': 'off'
  }]
}, {
  'featureType': 'road',
  elementType: 'labels.text.fill',
  stylers: [{
    color: '#9ca5b3'
  }]
}, {
  'featureType': 'road.highway',
  elementType: 'geometry',
  stylers: [{
    color: '#746855'
  }]
}, {
  'featureType': 'road.highway',
  elementType: 'geometry.stroke',
  stylers: [{
    color: '#1f2835'
  }]
}, {
  'featureType': 'road.highway',
  elementType: 'labels.text.fill',
  stylers: [{
    color: '#f3d19c'
  }]
}, {
  'featureType': 'transit',
  elementType: 'geometry',
  stylers: [{
    color: '#2f3948'
  }]
}, {
  'featureType': 'transit.station',
  elementType: 'labels.text.fill',
  stylers: [{
    color: '#d59563'
  }]
}, {
  'featureType': 'water',
  elementType: 'geometry',
  stylers: [{
    color: '#17263c'
  }]
}, {
  'featureType': 'water',
  elementType: 'labels.text',
  stylers: [{
    'visibility': 'off'
  }]
}, {
  'featureType': 'water',
  elementType: 'labels.text.fill',
  stylers: [{
    color: '#515c6d'
  }]
}, {
  'featureType': 'water',
  elementType: 'labels.text.stroke',
  stylers: [{
    color: '#17263c'
  }]
}];

// Options for map
const options = {
  lat: -0.77176,
  lng: 11.689,
  zoom: 3,
  styles: style,
};

// Create an instance of Google
const mappa = new Mappa('Google', key);

let myMap;
let meteorites;

function setup() {
  canvas = createCanvas(640, 580).parent('canvasContainer');

  // Create a tile map and overlay the canvas on top.
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);

  // Load the data
  meteorites = loadTable('assets/data/Meteorite_Landings.csv', 'csv', 'header');

  // Only redraw the meteorites when the map change and not every frame.
  myMap.onChange(drawMeteorites);

  fill(207, 204, 0);
  noStroke();
}

// The draw loop is fully functional but we are not using it for now.
function draw() {}

function drawMeteorites() {
  // Clear the canvas
  clear();

  for (let i = 0; i < meteorites.getRowCount(); i += 1) {
    // Get the lat/lng of each meteorite 
    const latitude = Number(meteorites.getString(i, 'reclat'));
    const longitude = Number(meteorites.getString(i, 'reclong'));

    // Only draw them if the position is inside the current map bounds. We use a
    // Google Map method to check if the lat and lng are contain inside the current
    // map. This way we draw just what we are going to see and not everything. See
    // getBounds() in https://developers.google.com/maps/documentation/javascript/3.exp/reference
    if (myMap.map.getBounds().contains({ lat: latitude, lng: longitude })) {
      // Transform lat/lng to pixel position
      const pos = myMap.latLngToPixel(latitude, longitude);
      // Get the size of the meteorite and map it. 60000000 is the mass of the largest
      // meteorite (https://en.wikipedia.org/wiki/Hoba_meteorite)
      let size = meteorites.getString(i, 'mass (g)');
      size = map(size, 558, 60000000, 1, 25) + myMap.zoom();
      ellipse(pos.x, pos.y, size, size);
    }
  }
}
```
