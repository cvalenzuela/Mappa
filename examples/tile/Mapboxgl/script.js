// -----------
// Mapboxgl Demo
// -----------

var key = 'pk.eyJ1IjoiY3ZhbGVuenVlbGEiLCJhIjoiY2l2ZzkweTQ3MDFuODJ5cDM2NmRnaG4wdyJ9.P_0JJXX6sD1oX2D0RQeWFA';

var options = {
  lat: 0,
  lng: 0,
  zoom: 4,
  //style: 'mapbox://styles/cvalenzuela/cj3optaml001z2qpfe064z5hb'
}

var colors = ['#fff5f0','#fee0d2','#fcbba1','#fc9272','#fb6a4a','#ef3b2c','#cb181d','#a50f15','#67000d'];

var mappa = new Mappa('Mapboxgl', key);
var myMap;

var canvas;
var dots;

var ny;
var stgo;

function setup(){
  canvas = createCanvas(800, 700);
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);
  dots = loadStrings('../../data/dots.csv');
  myMap.onChange(circles);
  noFill();
}

function draw(){

}

function circles(){
  clear();
  var size = myMap.zoom()*2;
  for (var i = 1; i < dots.length; i++) {
    var data = dots[i].split(/,/);
    var pos = myMap.latLngToPixel(data[9], data[8]);
    fill(random(colors))
    ellipse(pos.x, pos.y, size, size);
  }
}
