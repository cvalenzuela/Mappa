---
id: examples-mapboxGL
sidebar_label: MapboxGL
title: MapboxGL Example
---

Visualizing the 5000 largest recorded meteorite landings in the world using [Mappa](tutorials-getting-started.md), <a href="https://p5js.org/"><img src="assets/img/p5js.svg" class="p5logo"/></a> and [MapboxGL](https://www.mapbox.com/mapbox-gl-js/api/).

*Data: [NASA Open Data Portal](https://data.nasa.gov/Space-Science/Meteorite-Landings/gh4g-9sfh).*

## Demo

<div class="example">
  <div id="canvasContainer"></div>
  <script src="assets/scripts/tile-mapboxGL.js"></script>
</div>

## Code

Get it from [here](https://github.com/cvalenzuela/Mappa/tree/master/examples/tile/MapboxGL)

```javascript
// API Key for MapboxGL. Get one here:
// https://www.mapbox.com/studio/account/tokens/
const key = 'xyz';

// Options for map
const options = {
  lat: 0,
  lng: 0,
  zoom: 4,
  style: 'mapbox://styles/mapbox/traffic-night-v2',
  pitch: 50,
};

// Create an instance of MapboxGL
const mappa = new Mappa('MapboxGL', key);
let myMap;

let canvas;
let meteorites;

function setup() {
  canvas = createCanvas(800, 700).parent('canvasContainer');

  // Create a tile map and overlay the canvas on top.
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);

  // Load the data
  meteorites = loadTable('assets/data/Meteorite_Landings.csv', 'csv', 'header');

  // Only redraw the meteorites when the map change and not every frame.
  myMap.onChange(drawMeteorites);

  fill(109, 255, 0);
  stroke(100);
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

    // Transform lat/lng to pixel position
    const pos = myMap.latLngToPixel(latitude, longitude);
    // Get the size of the meteorite and map it. 60000000 is the mass of the largest
    // meteorite (https://en.wikipedia.org/wiki/Hoba_meteorite)
    let size = meteorites.getString(i, 'mass (g)');
    size = map(size, 558, 60000000, 1, 25) + myMap.zoom();
    ellipse(pos.x, pos.y, size, size);
  }
}
```