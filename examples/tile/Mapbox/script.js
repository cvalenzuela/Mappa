// -----------
// Mapbox Demo
// -----------

var key = 'pk.eyJ1IjoiY3ZhbGVuenVlbGEiLCJhIjoiY2l2ZzkweTQ3MDFuODJ5cDM2NmRnaG4wdyJ9.P_0JJXX6sD1oX2D0RQeWFA'

var options = {
  lat: 40.7828647,
  lng: -73.9675438,
  zoom: 4,
  studio: false,
  style: 'mapbox.satellite' //streets, outdoors, light, dark, satellite (for nonstudio)
  //style: 'mapbox://styles/cvalenzuela/cj3optaml001z2qpfe064z5hb'
}

var mappa = new Mappa('Mapbox', key);
var myMap;

var canvas;
var dots;

function setup(){
  canvas = createCanvas(800, 700);
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);
  dots = loadStrings('../../data/dots.csv');
  myMap.onChange(circles);
}

function draw(){

}

function circles(){
  clear();
  var size = myMap.zoom()*2;
  for (var i = 1; i < dots.length; i++) {
    var data = dots[i].split(/,/);
    var pos = myMap.latLngToPixel(data[9], data[8]);
    ellipse(pos.x, pos.y, size, size);
  }
}
