---
id: animated-meteorite-landings
title: Animated Meteorite Landings
---

This tutorial will go over the basics of building a simple web page using [Mappa](https://github.com/cvalenzuela/Mappa), [p5.js](https://github.com/processing/p5.js) and [Leaflet](http://leafletjs.com/) to visualize meteorite landings.

This tutorial uses [p5.js](https://github.com/processing/p5.js), but the same principles can be applied to any other graphics library. 

## Final Result:

<div class="example">
  <div id="canvasHolder"></div>
  <script src="assets/scripts/examples-animated-meteorite-landings.js"></script>
</div>

## Setup

TODO: [want to help?](https://github.com/cvalenzuela/mappa/issues)

## Code

```javascript
let canvas;
let myMap;
let data;
let meteorites;
let currentMeteorite = 0;
let white;
let orange;

const w = 600;
const h = 500;
const key = 'xyz';

const options = {
  lat: 0,
  lng: 0,
  zoom: 1.4,
  style: 'mapbox://styles/mapbox/dark-v9',
  pitch: 10,
};

const mappa = new Mappa('MapboxGL', key);

function preload() {
  data = loadTable('assets/data/Meteorite_Landings.csv', 'csv', 'header');
}

function setup() {
  canvas = createCanvas(w, h).parent('canvasHolder');
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas); 

  meteorites = new MeteoriteSystem();
  noStroke();
  white = color(255, 255, 255);
  orange = color(255, 170, 37, 170);
}

function draw() {
  clear();
  meteorites.destroyTheEarth();
  meteorites.showLanded();

  if (random() > 0.7) {
    meteorites.addMeteorite(data.getString(currentMeteorite, 'reclat'), data.getString(currentMeteorite, 'reclong'), data.getString(currentMeteorite, 'mass (g)'));
    currentMeteorite++;
  }
}

// Meteorite class
const Meteorite = function (lat, lng, size) {
  this.origin = createVector(random(0, w) , h + random(500,1000));
  this.destination =  createVector(0, 0);
  this.size = map(size, 558, 60000000, 3, 25);
  this.lat = lat;
  this.lng = lng;
  this.delta = 0;
  this.trail = [];
};

Meteorite.prototype.run = function() {
  this.update();
  this.showTrail();
  this.display();
};

Meteorite.prototype.update = function(){
  this.pixelPos = myMap.latLngToPixel(this.lat, this.lng);
  this.destination.x = this.pixelPos.x;
  this.destination.y = this.pixelPos.y;
  this.position = this.origin.lerp(this.destination, this.delta); 
  this.delta > 0.15 ? this.delta += 0.05 : this.delta += 0.001;
};

Meteorite.prototype.display = function() {
  strokeWeight(2);
  fill(orange);
  ellipse(this.position.x, this.position.y, this.size, this.size);
};

Meteorite.prototype.showTrail = function(){
  this.trail.push(this.position.copy())
  this.trail.length > 10 && (this.trail.splice(0, 1));
  for(var i = 0; i < this.trail.length; i++){
      var pos = this.trail[i];
      fill(255, 170, 37, 100);
      ellipse(pos.x, pos.y, this.size, this.size);
  }
}

Meteorite.prototype.landed = function(){
  if (this.delta > 1) {
    // Explossion
    for(var e = 11; e > 1; e--){
      fill(lerpColor(orange, white, e/11));
      ellipse(this.position.x, this.position.y, this.size + e/2 , this.size + e/2);
    }
    return true;
  } else {
    return false;
  }
};

var MeteoriteSystem = function() {
  this.meteorites = [];
  this.landedMeteorites = [];
};

MeteoriteSystem.prototype.addMeteorite = function(lat, lng, size) {
  this.meteorites.push(new Meteorite(lat, lng, size));
};

MeteoriteSystem.prototype.showLanded = function(lat, lng, size) {
  this.landedMeteorites.forEach(function(meteorite){
    var p = myMap.latLngToPixel(meteorite[0], meteorite[1]);
    fill(255, 170, 37, 100);
    ellipse(p.x, p.y, meteorite[2], meteorite[2]);
  })
};

MeteoriteSystem.prototype.destroyTheEarth = function() {
  for (var i = this.meteorites.length - 1; i >= 0; i--) {
    var m = this.meteorites[i];
    m.run();
    if (m.landed()) {
      this.landedMeteorites.push([m.lat, m.lng, m.size]);
      this.meteorites.splice(i, 1);
    }
  }
};
```