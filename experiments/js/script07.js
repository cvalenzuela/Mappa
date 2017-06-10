var mappa;
var mapboxKey = 'pk.eyJ1IjoiZW5qYWxvdCIsImEiOiJjaWhtdmxhNTIwb25zdHBsejk0NGdhODJhIn0.2-F2hS_oTZenAWc0BMf_uw'
var canvas;
var myMap;
var nyc = [40.7828647, -73.9675438];
var dots;

var options = {
  lat: 40.7828647,
  lng: -73.9675438,
  zoom: 14,
  style: 'mapbox://styles/mapbox/satellite-streets-v10'
}

function preload(){
  mappa = new Mappa('mapboxgl', mapboxKey);
  myMap = mappa.tileMap(options);
  dots = loadStrings('data/dots.csv');
}

function setup(){
  canvas = createCanvas(900, 650);
  myMap.append(canvas);
  noStroke();
}

function draw(){
  clear();
  var pos = myMap.latLng(40.7828647, -73.9675438);
  var size = myMap.zoom()*5;
  ellipse(pos.x, pos.y, size, size);

  // for (var i = 1; i < dots.length; i++) {
  //   var data = dots[i].split(/,/);
  //
  //   var pos = myMap.latLng(data[9], data[8]);
  //   fill(255, 0, 255);
  //
  //   ellipse(pos.x, pos.y, 6, 6);
  // }

}
