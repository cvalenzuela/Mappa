---
id: examples-mapbox-static
sidebar_label: Static Mapbox
title: Static Mapbox Example
---

Visualizing the 5000 largest recorded meteorite landings in the world using [Mappa](tutorials-getting-started.md), <a href="https://p5js.org/"><img src="assets/img/p5js.svg" class="p5logo"/></a> and [Mapbox](https://www.mapbox.com/mapbox.js/api/v3.1.1/).

*Data: [NASA Open Data Portal](https://data.nasa.gov/Space-Science/Meteorite-Landings/gh4g-9sfh).*

## Demo

<div class="example">
  <div id="canvasContainer"></div>
  <script src="assets/scripts/static-mapbox.js"></script>
</div>

## Code

Get it from [here](https://github.com/cvalenzuela/Mappa/tree/master/examples/static/Google)

```javascript
// API key for Mapbox. Get one here: https://www.mapbox.com/studio/account/tokens/
const key = 'xyz';

// Create an instance of Mapbox.
const mappa = new Mappa('Mapbox', key); 

// Options for map
const options = {
  lat: 0,
  lng: 0,
  zoom: 1,
  width: 640,
  height: 640,
  scale: 1,
  pitch: 0,
  style: 'dark-v9'
};

// Create the static map reference.
const myMap = mappa.staticMap(options);

let img;
let meteorites;

function preload() {
  // Load the image
  img = loadImage(myMap.imgUrl);
  // Load the data
  meteorites = loadTable('assets/data/Meteorite_Landings.csv', 'csv', 'header');
}

function setup() {
  createCanvas(640,500).parent('canvasContainer');
  noStroke();

  // Display the image
  image(img, 0, 0);

  // Show the Meteorites Landings
  for (let i = 0; i < meteorites.getRowCount(); i++) {
    // Get the lat/lng of each meteorite
    const pos = myMap.latLngToPixel(meteorites.getString(i, 'reclat'), meteorites.getString(i, 'reclong'));
    // Get the size of the meteorite and map it. 60000000 is the mass of the largest meteorite (https://en.wikipedia.org/wiki/Hoba_meteorite)
    let size = meteorites.getString(i, 'mass (g)');
    size = map(size, 0, 60000000, 3, 25);
    fill(random(0,255), random(0,255),random(0,255));
    ellipse(pos.x, pos.y, size, size);
  }
} 

```
