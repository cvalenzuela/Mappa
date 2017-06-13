// leaflet

var mappa;
var canvas;
var myMap;
var nyc = [40.7828647, -73.9675438];
var dots;
var pos;
var options = {
  lat: 40.7828647,
  lng: -73.9675438,
  zoom: 4,
  width: 640,
  height: 640,
  style: 'https://api.mapbox.com/styles/v1/cvalenzuela/cj3optaml001z2qpfe064z5hb/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY3ZhbGVuenVlbGEiLCJhIjoiY2l2ZzkweTQ3MDFuODJ5cDM2NmRnaG4wdyJ9.P_0JJXX6sD1oX2D0RQeWFA'
}

var overlay;
function preload(){
  mappa = new Mappa('Leaflet');
  myMap = mappa.tileMap(options);
  //dots = loadStrings('data/dots.csv');
}

function setup(){
  canvas = createCanvas(900, 650);
  //background(100,100,100);
  myMap.append(canvas);
  noStroke();
  fill(255, 0, 0);
  //myMap.onChange(circles);
}

function draw(){

  ellipse(100,100,10,10);
  // clear();
  // pos = myMap.latLng(40.7828647, -73.9675438);
  // var size = myMap.zoom()*5;
  // ellipse(pos.x, pos.y, size, size);


  // for (var i = 1; i < dots.length; i++) {
  //   var data = dots[i].split(/,/);
  //
  //   var pos = myMap.latLng(data[9], data[8]);
  //   ellipse(pos.x, pos.y, 10, 10);
  // }


}

function circles(){
  clear();
  // pos = myMap.latLng(40.7828647, -73.9675438);
  var size = myMap.zoom()*5;
  // ellipse(pos.x, pos.y, size, size);
  for (var i = 1; i < dots.length; i++) {
    var data = dots[i].split(/,/);

    var pos = myMap.latLng(data[9], data[8]);
    ellipse(pos.x, pos.y, size, size);
  }
}
