---
id: examples-raw-canvas
sidebar_label: Raw Canvas
title: Raw Canvas Example
---

Visualizing the 5000 largest recorded meteorite landings in the world using [Mappa](tutorials-getting-started.md) and and [Mapbox](https://www.mapbox.com/mapbox.js/api/v3.1.1/).

*Data: [NASA Open Data Portal](https://data.nasa.gov/Space-Science/Meteorite-Landings/gh4g-9sfh).*

## Demo

<div class="example">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/4.12.2/d3.min.js"></script>
  <canvas id="canvas" width='640' height='580'></canvas>
  <script src="assets/scripts/tile-raw-canvas.js"></script>
</div>

## Code

Get it from [here](https://github.com/cvalenzuela/Mappa/tree/master/examples/tile/raw_canvas)


```javascript
// API Key for MapboxGL. Get one here:
// https://www.mapbox.com/studio/account/tokens/
const key = 'pk.eyJ1IjoibWFwcGF1c2VyIiwiYSI6ImNqNXNrbXIyZDE2a2cyd3J4Ym53YWxieXgifQ.JENDJqKE1SLISxL3Q_T22w';
// Create an instance of Mapboxgl
const mappa = new Mappa('MapboxGL', key);

let meteorites = [];
let dataLoaded = false;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Options for map
const options = {
  lat: -26.001513,
  lng: -14.3507,
  zoom: 2.1,
  style: 'mapbox://styles/mapbox/traffic-night-v2',
  pitch: 50,
};

const myMap = mappa.tileMap(options);

// Make a circle
const circle = (x, y, s) => {
  ctx.beginPath();
  ctx.arc(x, y, s, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fillStyle = "#00ff1f";
  ctx.fill();
};

// Convert a range
const convertRange = (value, r1, r2) => {
  return (value - r1[0]) * (r2[1] - r2[0]) / (r1[1] - r1[0]) + r2[0];
};

// Draw the meteorites
const drawData = () => {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  meteorites.forEach((e) => {
    const mass = convertRange(e.size, [558, 60000000], [2, 15]);
    const pos = myMap.latLngToPixel(e.lat, e.lng);
    circle(pos.x, pos.y, mass);
  });
};

// Load the data using d3.js
d3.csv("assets/data/Meteorite_Landings.csv", d => {
  return {
    lat: Number(d.reclat),
    lng: Number(d.reclong),
    size: Number(d['mass (g)']),
  }
}, data => {
  meteorites = data;
  drawData();
});

myMap.overlay(canvas);
myMap.onChange(drawData);
```
