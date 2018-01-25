---
id: simple-map
title: Simple Map
---

This tutorial will go over the basics of building a simple web map using [Mappa](https://github.com/cvalenzuela/Mappa), [p5.js](https://github.com/processing/p5.js) and [Leaflet](http://leafletjs.com/). 

If this is your first time working with web maps, you should check this [Introduction to Web Maps](tutorials-introduction-to-web-maps.md). 

## Setup

Open your favorite text editor and create a new html file, import p5.js and Mappa and create an empyt script tag in the body

```javascript
<!DOCTYPE html>
<html lang="en">

<head>
  <title>Basic Mappa Tutorial</title>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.16/p5.min.js" type="text/javascript"></script>
  <script src="https://unpkg.com/mappa-mundi/dist/mappa.min.js" type="text/javascript"></script>
</head>

<body>
  <script>
  
  </script>
</body>

</html>
```

Now all our work will be inside the `<script>` tag.

Then create some main variables and the p5.js basic structure: setup and loop.

```javascript
// Create a variable to hold our map
let myMap;
// Create a variable to hold our canvas
let canvas;
// Create a new Mappa instance using Leaflet.
const mappa = new Mappa('Leaflet');

// p5.js setup
function setup(){
  // Create a canvas 640x640
  canvas = createCanvas(640,640); 
  // Add a grey background
  background(100);
}

// p5.js draw
function draw(){

}
```

You should have something like this:

<div id="01"></div>

A grey rectangle. Not that exiting...

Now let's add 2 lines of code:

```javascript
let myMap;
let canvas;
const mappa = new Mappa('Leaflet');

function setup(){
  canvas = createCanvas(640,640); 
  background(100);

  // Create a tile map with lat 0, lng 0, zoom 4
  myMap = mappa.tileMap(0,0,4); 
  // Overlay the canvas over the tile map
  myMap.overlay(canvas);
}

function draw(){

}
```

And now you should see this:

<div id="02"></div>

A grey rectangle with zoom levels? Everything up to now is working, we just need to specify a set of tiles to use. Actually if you open your javascript console you should see a warning message:

![](assets/img/warning.png)

So, let's use those tiles and try it again:

```javascript
let myMap;
let canvas;
const mappa = new Mappa('Leaflet');

// Lets put all our map options in a single object
const options = {
  lat: 0,
  lng: 0,
  zoom: 4,
  style: "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
}

function setup(){
  canvas = createCanvas(640,640); 
  // background(100); let's uncomment this, we don't need it for now

  // Create a tile map with the options declared
  myMap = mappa.tileMap(options); 
  myMap.overlay(canvas);
}

function draw(){

}
```

Reload, and you should have an interactive map:

<div id="03"></div>

## Drawing

We can now draw on top of the map and bind locations to our canvas. Let's try that:

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

  // Add a color to our ellipse
  fill(200, 100, 100);
}

function draw(){
  // Every Frame, get the canvas position 
  // for the latitude and longitude of Nigeria
  const nigeria = myMap.latLngToPixel(11.396396, 5.076543); 
  // Using that position, draw an ellipse
  ellipse(nigeria.x, nigeria.y, 20, 20);
}
```

Now try moving the map:

<div id="04"></div>

We are not clearing the canvas every frame, that's why we get that effect. 

In order to clear the canvas every frame and not keep the previous position of the sphere just add a clear at the beginning of the loop: 

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
}

function draw(){
  // Clear the previous canvas on every frame
  clear();

  const nigeria = myMap.latLngToPixel(11.396396, 5.076543); 
  ellipse(nigeria.x, nigeria.y, 20, 20);
}
```

Try it now. Move the map:

<div id="05"></div>

One thing to notice is that we are calculating the position of Nigeria every frame (60fps) even if the map has not moved.

That is fine for one point, but if we had a lot more points that wouldn't be the case, it would not be efficient.

We can specify to only calculate the new dot position if the map is moved:

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

It should look the same, but now it works better!

<div id="06"></div>

<script src="assets/scripts/tutorials-simple-map.js"></script>

