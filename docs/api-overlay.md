---
id: api-overlay
sidebar_label: overlay
title: overlay Method
---

This method will actually create the tile map referenced in [`tileMap()`](#tilemapoptions) and overlay the selected canvas on top of it, allowing to control and move the map while maintaining the canvas position and relationship. The tile map generated is a separate DOM element that is displayed behind the canvas and is the same size of the canvas.

### In p5.js:

This method needs to be called inside [`setup()`](https://p5js.org/reference/#/p5/setup) .

Since this map has no relationship with the elements drawn on the canvas, no background color needs to be used in the sketch in order to see the map. Alternatively, using p5 [clear()](https://p5js.org/reference/#/p5/clear) function in the [`draw()`](https://p5js.org/reference/#/p5/draw) method will allow to clear the canvas each frame. This is useful when displaying geolocated elements and moving the map.

## Usage

```javascript
overlay(canvas, ?[callback])
```
> Overlays a canvas on top of a tile map. It needs to be used together with [`tileMap()`](#tilemapoptions) to display a map. A callback function can be passed that will run when the map and the canvas are ready. This is useful when you want to start listening to events from the map.

`canvas`: The canvas element to overlay.

`callback`: A callback to call once the overlay is done. Optional.

### Examples:
```javascript
let canvas;
let myMap;

function setup(){
  canvas = createCanvas(800, 700);
  // Create a tile map center in New York with an initial zoom level of 10.
  myMap = mappa.tileMap(40.782, -73.967, 10);
  // Overlay the canvas to the new tile map created.
  myMap.overlay(canvas);
}
```

Once `overlay()` is used, a complete access to the base map library and its original properties and methods can be found in the `map` method. This allows to call any of the maps original properties or methods.

For example, calling [flyTo](http://leafletjs.com/reference-1.0.0.html#flyToBounds) in a Leaflet Map:

```javascript
myMap.map.flyTo([-33.448890, -70.669265], 9)
```

A more complete example can be:

```javascript
// Your Mapboxgl API Key
const key = 'abcd'

// Create a new Mappa instance using Mapboxgl.
const mappa = new Mappa('Mapboxgl', key);
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
  canvas = createCanvas(800, 700);
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
```

Will render this:

<div id="example"></div>

<script src="assets/scripts/api-overlay.js"></script>