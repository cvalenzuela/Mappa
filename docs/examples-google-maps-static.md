---
id: examples-google-maps-static
sidebar_label: Static Google Maps
title: Static Google Maps Example
---

Visualizing the 5000 largest meteorite landings in the world. 

Data from [NASA's Open Data Portal.](https://data.nasa.gov/Space-Science/Meteorite-Landings/gh4g-9sfh)

## [Demo](https://cvalenzuela.github.io/Mappa/examples/static/Google/)

<div class="example">
  <div id="canvasContainer"></div>
</div>

## Code

Get it from [here](https://github.com/cvalenzuela/Mappa/tree/master/examples/static/Google)

```javascript
// API Key for Google Maps. Get one here: https://developers.google.com/maps/web/
var key = 'AIzaSyCdmGJ7JWNWkmmxSdvNiu1Qo6BMn56eTSE'

// Create an instance of Google.
var mappa = new Mappa('Google', key); 

// Options for map
var options = {
  lat: 0,
  lng: 0,
  zoom: 2,
  width: 640,
  height: 500,
  scale: 1,
  format: 'PNG',
  language: 'en',
  maptype: 'satellite'
}

// Create the static map reference.
var myMap = mappa.staticMap(options);

var img;
var meteorites;

function preload(){
  // Load the image
  img = loadImage(myMap.imgUrl);
  // Load the data
  meteorites = loadTable('../../data/Meteorite_Landings.csv', 'csv', 'header');
}

function setup(){
  createCanvas(640,500);
  noStroke();

  // Display the image
  image(img, 0, 0);

  // Show the Meteorites Landings
  for (var i = 0; i < meteorites.getRowCount(); i++) {
    // Get the lat/lng of each meteorite
    var pos = myMap.latLngToPixel(meteorites.getString(i, 'reclat'), meteorites.getString(i, 'reclong'));
    // Get the size of the meteorite and map it. 60000000 is the mass of the largest meteorite (https://en.wikipedia.org/wiki/Hoba_meteorite)
    var size = meteorites.getString(i, 'mass (g)');
    size = map(size, 0, 60000000, 3, 25);
    fill(random(0,255), random(0,255),random(0,255));
    ellipse(pos.x, pos.y, size, size);
  }
} 
```
