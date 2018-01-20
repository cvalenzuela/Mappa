---
id: examples-mapboxgl
sidebar_label: Mapboxgl
title: Mapboxgl Example
---

Visualizing the 5000 largest meteorite landings in the world. 

Data from [NASA's Open Data Portal.](https://data.nasa.gov/Space-Science/Meteorite-Landings/gh4g-9sfh)

## [Demo](https://cvalenzuela.github.io/Mappa/examples/tile/Mapboxgl/)

<div class="example">
  <div id="canvasContainer"></div>
</div>

## Code

Get it from [here](https://github.com/cvalenzuela/Mappa/tree/master/examples/tile/Mapboxgl)


```javascript
// API Key for Mapboxgl. Get one here:
// https://www.mapbox.com/studio/account/tokens/
var key = 'xyz';

// Options for map
var options = {
  lat: 0,
  lng: 0,
  zoom: 4,
  style: 'mapbox://styles/mapbox/traffic-night-v2',
  pitch: 50
}

// Create an instance of Mapboxgl
var mappa = new Mappa('Mapboxgl', key);
var myMap;

var canvas;
var meteorites;

function setup() {
  canvas = createCanvas(800, 700);

  // Create a tile map and overlay the canvas on top.
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);

  // Load the data
  meteorites = loadTable('../../data/Meteorite_Landings.csv', 'csv', 'header');

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

  for (var i = 0; i < meteorites.getRowCount(); i++) {
    // Get the lat/lng of each meteorite
    var latitude = Number(meteorites.getString(i, 'reclat'));
    var longitude = Number(meteorites.getString(i, 'reclong'));

    // Transform lat/lng to pixel position
    var pos = myMap.latLngToPixel(latitude, longitude);
    // Get the size of the meteorite and map it. 60000000 is the mass of the largest
    // meteorite (https://en.wikipedia.org/wiki/Hoba_meteorite)
    var size = meteorites.getString(i, 'mass (g)');
    size = map(size, 558, 60000000, 1, 25) + myMap.zoom();
    ellipse(pos.x, pos.y, size, size);

  }
}
```