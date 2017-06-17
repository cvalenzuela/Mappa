// -----------
// Mapboxgl Demo
// -----------

var key = 'pk.eyJ1IjoiY3ZhbGVuenVlbGEiLCJhIjoiY2l2ZzkweTQ3MDFuODJ5cDM2NmRnaG4wdyJ9.P_0JJXX6sD1oX2D0RQeWFA'

var options = {
  lat: 0,
  lng: 0,
  zoom: 4,
  //style: 'mapbox://styles/cvalenzuela/cj3optaml001z2qpfe064z5hb'
}

var mappa = new Mappa('Mapboxgl', key);
var myMap;

var canvas;
var dots;

var ny;
var stgo;

function setup(){
  canvas = createCanvas(800, 700);
  myMap = mappa.tileMap(options);
  myMap.append(canvas);
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
    var pos = myMap.latLng(data[9], data[8]);
    ellipse(pos.x, pos.y, size, size);
  }
}
