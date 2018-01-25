// Your Mapboxgl API Key
const key = 'pk.eyJ1IjoibWFwcGF1c2VyIiwiYSI6ImNqNXNrbXIyZDE2a2cyd3J4Ym53YWxieXgifQ.JENDJqKE1SLISxL3Q_T22w'

// Create a new Mappa instance using Mapboxgl.
const mappa = new Mappa('MapboxGL', key);
let myMap;
let canvas;

// Map options
const options = {
  lat: 40.782,
  lng: -73.967,
  zoom: 4,
  style: 'mapbox://styles/mapbox/dark-v9'
}

function setup(){
  canvas = createCanvas(640, 580).parent('example');
  // Create a tile map centered in New York with an initial zoom level of 4.
  myMap = mappa.tileMap(options);
  // Overlay the tile map to the p5 canvas. This will display the map.
  myMap.overlay(canvas);
}

function draw(){
  // Clear the background so the map is clearly seen at each frame.
  clear();
  ellipse(mouseX, mouseY, 40, 40);
}
