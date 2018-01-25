---
id: examples-leaflet
sidebar_label: Leaflet
title: Leaflet Example
---

Visualizing the 5000 largest recorded meteorite landings in the world using [Mappa](tutorials-getting-started.md), <a href="https://p5js.org/"><img src="assets/img/p5js.svg" class="p5logo"/></a> and [Leaflet](http://leafletjs.com/).

Using tiles from [OSM](https://www.openstreetmap.org).

*Data: [NASA Open Data Portal](https://data.nasa.gov/Space-Science/Meteorite-Landings/gh4g-9sfh).*

## Demo

<div class="example">
  <div id="canvasContainer"></div>
  <script src="assets/scripts/tile-leaflet.js"></script>
</div>

## Code

Get it from [here](https://github.com/cvalenzuela/Mappa/tree/master/examples/tile/Leaflet)

```javascript
// Options for map
const options = {
  lat: 0,
  lng: 0,
  zoom: 4,
  style: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
}

// Create an instance of Leaflet
const mappa = new Mappa('Leaflet');
let myMap;

let canvas;
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

  fill(70, 203,31);	
  stroke(100);
}

// The draw loop is fully functional but we are not using it for now.
function draw() {}

function drawMeteorites() {
  // Clear the canvas
  clear();

  for (let i = 0; i < meteorites.getRowCount(); i++) {
    // Get the lat/lng of each meteorite 
    const latitude = Number(meteorites.getString(i, 'reclat'));
    const longitude = Number(meteorites.getString(i, 'reclong'));

    // Only draw them if the position is inside the current map bounds. We use a
    // Leaflet method to check if the lat and lng are contain inside the current
    // map. This way we draw just what we are going to see and not everything. See
    // getBounds() in http://leafletjs.com/reference-1.1.0.html
    if (myMap.map.getBounds().contains({lat: latitude, lng: longitude})) {
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

