---
id: using-data
title: Using Data
---

This tutorial will go over the basics of building a simple web map to display some data using [Mappa](https://github.com/cvalenzuela/Mappa), [p5.js](https://github.com/processing/p5.js) and [Leaflet](http://leafletjs.com/). This picks up from the previous [Simple Map Tutorial](tutorials-simple-map.md).

## Setup

*In order to run this tutorial you will need a [local server](https://github.com/processing/p5.js/wiki/Local-server).* 

There are many different ways to create a [local server](https://github.com/processing/p5.js/wiki/Local-server). Here are some:

If you use node and npm you can install `live-server`: 
```zsh
npm install -g live-server
```
And then run from the root:
```
live-server
```
If you use python 2:
```zsh
python -m SimpleHTTPServer
```
In python 3
```
python3 -m http.server
```

## Simple Map

Picking up from the [previous tutorial](tutorials-simple-map.md), you can use this code to display a simple map:

```javascript
let myMap;
let canvas;
const mappa = new Mappa('Leaflet');
const options = {
  lat: 0,
  lng: 0,
  zoom: 4,
  style: "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
}

function setup(){
  canvas = createCanvas(640,640);
  myMap = mappa.tileMap(options); 
  myMap.overlay(canvas) 

  fill(200, 100, 100);
  
  // Only redraw the point when the map changes and not every frame.
  myMap.onChange(drawPoint);
}

function draw(){
}

function drawPoint(){
  clear();

  const nigeria = myMap.latLngToPixel(11.396396, 5.076543); 
  ellipse(nigeria.x, nigeria.y, 20, 20);
}
```

Move and zoom in/out:

<div id="01"></div>

## Loading Data

You can easily load data set and visualize it using p5.js and mappa.

Download the file [Meteorite_Landings.csv](https://raw.githubusercontent.com/cvalenzuela/Mappa/master/tutorials/basic/Meteorite_Landings.csv). This data contains the 5000 largest registered meteorite landings in the world. The data comes from [NASA Open Data Portal](https://data.nasa.gov/Space-Science/Meteorite-Landings/gh4g-9sfh).

The data is just a csv file containg the following points
```csv
name,id,nametype,recclass,mass (g),fall,year,reclat,reclong
Mbosi,15456,Valid,"Iron, ungrouped",16000000,Found,1/1/30 00:00,-9.11667,33.06667
Paragould,18101,Valid,LL5,408000,Fell,1/1/30 00:00,36.06667,-90.5
Bencubbin,5014,Valid,CBa,118000,Found,1/1/30 00:00,-30.75,117.78333
Uwharrie,24139,Valid,"Iron, IIIAB",72700,Found,1/1/30 00:00,35.51667,-79.96667
Landes,12457,Valid,"Iron, IAB-MG",69800,Found,1/1/30 00:00,38.9,-79.18333
Miami,16630,Valid,H5,57700,Found,1/1/30 00:00,35.66667,-100.6
(...)
```

For now, we are just interested in `reclat`, `reclong` and `mass`.

Building from the previous code snippet, you can load and display data like this:

```javascript
let myMap;
let canvas;
const mappa = new Mappa('Leaflet');

// Lets change the map tiles to something with more contrast
const options = {
  lat: 0,
  lng: 0,
  zoom: 4,
  style: "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
}

function setup(){
  canvas = createCanvas(640,640);
  myMap = mappa.tileMap(options); 
  myMap.overlay(canvas) 

  // Load the data
  meteorites = loadTable('Meteorite_Landings.csv', 'csv', 'header');

  // Only redraw the meteorites when the map change and not every frame.
  myMap.onChange(drawMeteorites);

  fill(70, 203,31);	
  stroke(100);
}

function draw(){
}

// Draw the meteorites
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
<div id="02"></div>

<script src="assets/scripts/tutorials-using-data.js"></script>

