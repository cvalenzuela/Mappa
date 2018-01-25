---
id: taxi-routes
sidebar_label: Taxi Routes
title: "Tutorial: Taxi Routes"
---

This tutorial is based on the [taxitracker](https://github.com/chriswhong/nyctaxi) data visualization. The idea is to create a sketch that will show the route of a taxi during a day in New York. I will try to keep things as simple as possible in order to show how to use maps and p5.js to create visualizations.

The complete code is [here](https://github.com/cvalenzuela/Mappa/tree/master/tutorials/taxiroutes).

## Final Result

<div id="finalIntro"></div>

## Setup

- In a new folder create an `index.html` and `script.js` files.
- Download [`p5.js`](https://github.com/processing/p5.js/releases/download/0.5.11/p5.js) and  [`Mappa.js`](https://raw.githubusercontent.com/cvalenzuela/Mappa/master/dist/mappa.js) and save them in a folder called `libraries`
- Download the [data for one taxi for one day](https://raw.githubusercontent.com/cvalenzuela/Mappa/master/tutorials/taxiroutes/data/taxiday1.geojson) and save it in a folder called `data`.

Your folder structure should look like this:

```bash
root
├── index.html
├── script.js
├── libraries
│   └── p5.js
│   └── mappa.js
├── data
│   └── taxiday1.geojson
```

*In order to run this tutorial you will need a [local server](https://github.com/processing/p5.js/wiki/Local-server). There are many different ways to create a [local server](https://github.com/processing/p5.js/wiki/Local-server). Here are some:

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

## index.html

Open the `index.html` file in any text editor and add references to the libraries and to the `script.js` file. This are the only things needed in `index.html` file.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Taxi Routes</title>

    <!-- p5.js -->
    <script src="libraries/p5.js"></script>

    <!-- Mappa -->
    <script src="libraries/mappa.js"></script>

  </head>

  <body>
    <!-- Your script -->
    <script src="script.js"></script>
  </body>
</html>

```

## The Basics

Open `script.js` and create a basic p5.js sketch:

```javascript
let canvas;

function setup(){
  canvas = createCanvas(800,700);
}
```

Add a Mappa instance, with Leaflet as the only argument, at the top of the sketch:

```javascript
const mappa = new Mappa('Leaflet');
```
Create an object holding the origin, zoom and a reference to the basemap style. You can use any basemap you want. For now we will use CartoDB:

```javascript
const options = {
  lat: 40.73447,
  lng: -74.00232,
  zoom: 13,
  style: 'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'
}
```
Create a new variable called `myMap` and inside the `setup` function initialize that variable as an instance of  `mappa.tileMap` with `options` as the only argument:

```javascript
let myMap;

function setup(){
  canvas = createCanvas(800,700);
  // This will import the Leaflet library into your sketch
  // and create all necessary references
  myMap = mappa.tileMap(options); 
}
```
Then, overlay the canvas on to the Leaflet map:

```javascript
function setup(){
  canvas = createCanvas(800,700);
  myMap = mappa.tileMap(options); 
  myMap.overlay(canvas); // Overlay the canvas on top of the map.
}
```

By now you should have something like this:

```javascript
let canvas;
let myMap;

const options = {
  lat: 40.73447,
  lng: -74.00232,
  zoom: 13,
  style: 'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'
}

const mappa = new Mappa('Leaflet');

function setup(){
  canvas = createCanvas(800,700);
  myMap = mappa.tileMap(options); 
  myMap.overlay(canvas); 
}
```

If it is not already running, run your local server and open the page (something like `localhost:3000` or `localhost:8080`). You should see this:

<div id="plainMap"></div>

A black map centered in New York.


## The data

The data for this project is taken from the [2013 NYC Taxi Trip Data](https://github.com/andresmh/nyctaxitrips). This is the same data set used in the [taxitracker](https://github.com/chriswhong/nyctaxi) data visualization. It is in [GeoJson](http://geojson.org/) format. GeoJSON is a format for encoding a variety of geographic data structures. It looks like this:

```javascript
{
  "type": "Feature",
  "geometry": {
    "type": "Point",
    "coordinates": [125.6, 10.1]
  },
  "properties": {
    "name": "Dinagat Islands"
  }
}
```
From [geojson.org](http://geojson.org/): 
> GeoJSON supports the following geometry types: Point, LineString, Polygon, MultiPoint, MultiLineString, and MultiPolygon. Geometric objects with additional properties are Feature objects. Sets of features are contained by FeatureCollection objects.

The actual file for the taxi routes looks like this:

```javascript
{
  "type": "FeatureCollection",
  "features": [{ 
    "type": "Feature",
    "properties": {
      "medallion": "21B98CAC5B31414B9446D381D38EEC7F",
      "passengers": "3",
      "fare":"18",
      "paymenttype":"CSH",
      "surcharge":"0.5",
      "mtatax":"0.5",
      "tip":"0",
      "tolls":"0",
      "total":"19",
      "pickuptime":"5/30/13 0:01",
      "dropofftime":"5/30/13 0:18",
      "nextpickuptime":"5/30/13 1:45",
      "key":"0",
      "hasfare":true
      },
    "geometry": {
      "type": "LineString",
      "coordinates":[
        [-74.00232,40.73447], 
        [-74.0024,40.73433], 
        [-74.00278,40.7337], 
        (...) 
      ]
    }
  } 
  (...)
  ]
}

```
You can see it contains a lot of information about the trips a taxi makes in a day in New York. There is one object for every trip recorded with information about the fare, the number of passengers, pick-up time and location among other things. For now, we are just interested in using the coordinates of the taxi during its different trips. So for each trip in the `features` array we need the `geometry.coordinates` array. This contains a series of arrays with the latitude and longitude position we need.

Load the data add on p5.js's `preload` function (before your `setup`) and load the file as a JSON file:

```javascript
var data;

function preload(){
  data = loadJSON('./data/taxiday1.geojson');
}

// ...
```

Since we are interested in using the latitude and longitude of the file we can loop over the array of `features` and then loop again over the array of `coordinates` in the `geometry` object and then again over each array containing the latitude and longitude. Fortunately, there is a Mappa method to get all properties of a GeoJSON file and store them in an variable.

Create a variable called `tripsCoordinates` and initialized it to an array of all `LineString` types in your `setup`.

```javascript
let tripsCoordinates;

function setup(){
  // ...

  tripsCoordinates = myMap.geoJSON(data, "LineString");
}
```

This will create an array holding one array for each trip. Each trip is represented by an series of latitude and longitude coordinates.

```javascript
[Array(220), Array(188), Array(165), Array(178), Array(564), Array(225), Array(90), Array(114), Array(150), Array(9), Array(62), Array(5), Array(168), Array(37), Array(27), Array(211), Array(28), Array(159), Array(89), Array(3), Array(119), Array(9), Array(177), Array(11), Array(25), Array(26), Array(30), Array(4), Array(84), Array(6), Array(13), Array(26), Array(60), Array(6), Array(64), Array(7), Array(31), Array(4), Array(10), Array(4), Array(153), Array(17), Array(15), Array(13), Array(264), Array(8), Array(110), Array(9), Array(104), Array(144), Array(41), Array(39), Array(181), Array(55), Array(42), Array(10), Array(230), Array(43), Array(215), Array(2), Array(102), Array(19), Array(52), Array(2), Array(82), Array(42), Array(19), Array(17), Array(79), Array(13)]
```

For example, the 10th trip holds 9 tracked positions:

```javascript
[Array(2), Array(2), Array(2), Array(2), Array(2), Array(2), Array(2), Array(2), Array(2)]
```
Where each position is a latitude and longitude. Here's the first location for the 10th trip:

```javascript
[-73.98021, 40.74747]
```

There are many ways to loop over this array of locations. Here, we'll create a new variable holding just all locations together. 

Create a new empty array called `allCoordinates` and in your `setup` loop through every object in the `tripsCoordinates` array:

```javascript
let allCoordinates = [];

function setup(){
  // ...

  tripsCoordinates.forEach(function(trip){
    trip.forEach(function(coordinate){
      allCoordinates.push(coordinate)
    })
  });
}
```

Now `allCoordinates` holds 5530 pairs of latitudes and longitudes describing the taxi's whole route in one day. The first element is the longitude and the second is the latitude

```javascript
(5530) [[-74.00232, 40.73447], [-74.0024, 40.73433], (...) ]
```

Lets display the data! In your `draw` function draw a circle for every location in the `allCoordinates` array. Use the `latLngtoPixel` method to transform latitude and longitude positions into pixel positions.

```javascript
function draw(){
  clear() // Clear the canvas at every frame so we see the map when moved.
  noStroke();
  fill(255);
  for(let i = 0; i < allCoordinates.length; i++){
    // The first element is the latitude and the second the longitude
    let pos = myMap.latLngToPixel(allCoordinates[i][1], allCoordinates[i][0]) 
    ellipse(pos.x, pos.y, 5, 5);
  }
}
```

You should have something like this until now:

```javascript
let canvas;
let myMap;
let tripsCoordinates;
let allCoordinates = [];
let data;

const options = {
  lat: 40.73447,
  lng: -74.00232,
  zoom: 13,
  style: 'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'
}
const mappa = new Mappa('Leaflet');

function preload() {
  data = loadJSON('./data/taxiday1.geojson');
}

function setup() {
  canvas = createCanvas(800, 700);
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas); 
  tripsCoordinates = myMap.geoJSON(data, "LineString");

  tripsCoordinates.forEach(function (trip) {
    trip.forEach(function (coordinate) {
        allCoordinates.push(coordinate)
      })
  });
}

function draw(){
  clear() 
  noStroke();
  fill(255);
  for(let i = 0; i < allCoordinates.length; i++){
    let pos = myMap.latLngToPixel(allCoordinates[i][1], allCoordinates[i][0])
    ellipse(pos.x, pos.y, 5, 5);
  }
}
```

This will show a map where you can move and zoom and see all of the taxi's registered positions overlay on the map:

<div id="trail"></div>

One thing you can notice is that this may get a little bit slow after a while. This is because the sketch is computing 5530 arrays every frame, 60FPS. Since we still want to keep the dots synchronized to the map, we can just compute them every time the map moves and not every frame. For that we can use the `onChange` method.

Create a new function called `drawPoints` and move the loop to visualize the dots from `draw` to `drawPoints`:

```javascript
function drawPoints(){
  clear() 
  noStroke();
  fill(255);
  for(let i = 0; i < allCoordinates.length; i++){
    let pos = myMap.latLngToPixel(allCoordinates[i][1], allCoordinates[i][0])
    ellipse(pos.x, pos.y, 5, 5);
  }
}
```

And in the `setup` function, link it to the map:

```javascript
function setup(){
  // ...

  myMap.onChange(drawPoints)
}
```

Now it will run more smoothly.

## Moving the Taxi

We now have all we need to animate the taxi route. So far the sketch looks like this:

```javascript
let canvas;
let myMap;
let tripsCoordinates;
let allCoordinates = [];
let data;

const options = {
  lat: 40.73447,
  lng: -74.00232,
  zoom: 13,
  style: 'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'
}

const mappa = new Mappa('Leaflet');

function preload() {
  data = loadJSON('./data/taxiday1.geojson');
}

function setup() {
  canvas = createCanvas(800, 700);
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas); 
  tripsCoordinates = myMap.geoJSON(data, "LineString");

  tripsCoordinates.forEach(function (trip) {
    trip.forEach(function (coordinate) {
        allCoordinates.push(coordinate)
      })
  });
  myMap.onChange(drawPoints);
}

// We are not using the draw function for now
function draw(){
}

function drawPoints(){
  clear() 
  noStroke();
  fill(255);
  for(let i = 0; i < allCoordinates.length; i++){
    let pos = myMap.latLngToPixel(allCoordinates[i][1], allCoordinates[i][0])
    ellipse(pos.x, pos.y, 5, 5);
  }
}
```

In order to move the taxi over each position we need to create a couple of new variables. 

At the top of your sketch add the following:

```javascript
// This will allow to move from one position to another
let delta = 0;
// The current coordinate in the allCoordinates array 
// that will tell the origin and destination
let coordinate = 0;

// Pixel position of the origin
let origin;
// Vector representation of the origin
let originVector;
// Pixel position of the destination
let destination;
// Vector representation of the destination
let destinationVector;
// The current position of the taxi
let taxiPosition;

// ...

```

We are going to transform all origins and destinations of the taxi into a [Vector](https://p5js.org/reference/#/p5.Vector) and calculate the distance between the two with [lerp](https://p5js.org/reference/#/p5.Vector/lerp). The taxi will move from one position(origin with x1, y1) to the next position(destination with x2,y2) in the array. [Lerp](https://p5js.org/reference/#/p5.Vector/lerp) will return a linear interpolation between this two. Every destination, besides the first one, will become an origin for the next one. 

First, comment the line to visualize all the positions:

```javascript
function setup(){
  // ...
  
  //myMap.onChange(drawPoints);
}
```

Now, inside the `draw` loop add the following:

```javascript
function draw() {
  clear(); // Clear the canvas at every frame
  if(delta < 1){
    // Delta holds the current distance between the origin and the destination. 
    // 0 means is all the way in the origin and 1 that it's in the destination. 
    // We'll increase this value by 0.2 each frame.
    delta += 0.2; 
  } else {
    // Reset the value once it hits the destination
    delta = 0;
    // Move one coordinate in the allCoordinates array.
    coordinate ++;
  }

  // Get the Lat/Lng position of the origin and 
  // transform it into pixel position at every frame
  origin = myMap.latLngToPixel(allCoordinates[coordinate][1], allCoordinates[coordinate][0]); 

  // A vector representation of the origin. Holds x and y.
  originVector = createVector(origin.x, origin.y);

  // Get the Lat/Lng position of the destination and 
  // transform it into pixel position at every frame. 
  // The destination is one element in front of the current coordinate
  destination = myMap.latLngToPixel(allCoordinates[coordinate + 1][1], allCoordinates[coordinate + 1][0]); 

  // A vector representation of the destination.
  destinationVector = createVector(destination.x, destination.y);  Holds x and y

  // The current position of the taxi will be determined
  // by the distance between the origin and the 
  // destination that delta contains.
  position = originVector.lerp(destinationVector, delta); 
  
  fill(255,255,0);
  // Draw the taxi in the current position
  ellipse(position.x, position.y, 7, 7);
}

```

Your code should look like this:

```javascript
let canvas;
let myMap;
let tripsCoordinates;
let allCoordinates = [];
let data;

let delta = 0; 
let coordinate = 0; 

let origin; 
let originVector;  
let destination; 
let destinationVector;

let taxiPosition;

const options = {
  lat: 40.73447,
  lng: -74.00232,
  zoom: 13,
  style: 'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'
}
const mappa = new Mappa('Leaflet');

function preload() {
  data = loadJSON('./data/taxiday1.geojson');
}

function setup() {
  canvas = createCanvas(800, 700);
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas); 
  tripsCoordinates = myMap.geoJSON(data, "LineString");

  tripsCoordinates.forEach(function (trip) {
    trip.forEach(function (coordinate) {
        allCoordinates.push(coordinate)
      })
  });

  //myMap.onChange(drawPoints);
}

function draw(){
  clear();
  if(delta < 1){
    delta += 0.2; 
  } else {
    delta = 0; 
    coordinate ++; 
  }

  origin = myMap.latLngToPixel(allCoordinates[coordinate][1], allCoordinates[coordinate][0]); 
  originVector = createVector(origin.x, origin.y); 
  destination = myMap.latLngToPixel(allCoordinates[coordinate + 1][1], allCoordinates[coordinate + 1][0]);  
  destinationVector = createVector(destination.x, destination.y);

  taxiPosition = originVector.lerp(destinationVector, delta);
  fill(255,255,0);
  ellipse(taxiPosition.x, taxiPosition.y, 7, 7);
}

function drawPoints(){
  clear() 
  noStroke();
  fill(255);
  for(let i = 0; i < allCoordinates.length; i++){
    let pos = myMap.latLngToPixel(allCoordinates[i][1], allCoordinates[i][0])
    ellipse(pos.x, pos.y, 5, 5);
  }
}
```

And the output should look like this:

<div id="moving"></div>

Now lets add a trail for the taxi.

```javascript

let canvas;
let myMap;
let tripsCoordinates;
let allCoordinates = [];
let data;

let delta = 0; 
let coordinate = 0; 

let origin; 
let originVector;  
let destination; 
let destinationVector;

let taxiPosition;

let visitedRoutes = []; // A new array to hold all visited positions

const options = {
  lat: 40.73447,
  lng: -74.00232,
  zoom: 13,
  style: 'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'
}
const mappa = new Mappa('Leaflet');

function preload() {
  data = loadJSON('./data/taxiday1.geojson');
}

function setup() {
  canvas = createCanvas(800, 700);
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas); 
  tripsCoordinates = myMap.geoJSON(data, "LineString");

  tripsCoordinates.forEach(function (trip) {
    trip.forEach(function (coordinate) {
        allCoordinates.push(coordinate)
      })
  });
  //myMap.onChange(drawPoints);

  // Every time the map is zoomed or moved update the route
  myMap.onChange(drawRoute); 
}

function draw(){
  // clear() can be commented since drawRoute() will handle clearing the canvas
  // clear();

  if(delta < 1){
    delta += 0.2; 
  } else {
    // Once it has arrived at its destination, add the origin as a visited location
    visitedRoutes.push(allCoordinates[coordinate]) 
    delta = 0; 
    coordinate ++;
    // Call the drawRoute to update the route
    drawRoute(); 
  }

  origin = myMap.latLngToPixel(allCoordinates[coordinate][1], allCoordinates[coordinate][0]); 
  originVector = createVector(origin.x, origin.y); 
  destination = myMap.latLngToPixel(allCoordinates[coordinate + 1][1], allCoordinates[coordinate + 1][0]);  
  destinationVector = createVector(destination.x, destination.y);

  taxiPosition = originVector.lerp(destinationVector, delta);

  // remove the stroke from the route
  noStroke();
  fill(255,255,0);
  ellipse(taxiPosition.x, taxiPosition.y, 7, 7);
}

function drawPoints(){
  clear() 
  noStroke();
  fill(255);
  for(var i = 0; i < allCoordinates.length; i++){
    var pos = myMap.latLngToPixel(allCoordinates[i][1], allCoordinates[i][0])
    ellipse(pos.x, pos.y, 5, 5);
  }
}

// This functions draws a line with n-vertices where n = visited routes;
function drawRoute(){
  clear();
  // stroke color and width to see the route line
  stroke(255,0,0, 40);
  strokeWeight(5);
  if(visitedRoutes.length > 0){
    noFill();
    beginShape();
    visitedRoutes.forEach(function (e) {
        var pos = myMap.latLngToPixel(e[1], e[0]);
        vertex(pos.x, pos.y);
    })
    endShape()
  }
}

```

And you should get something like this:

<div id="final"></div>

<script src="assets/scripts/tutorials-taxi-routes.js"></script>