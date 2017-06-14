// leaflet, mapbox and webgl

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
  width: 140,
  height: 140,
  backgroundColor: 'rgba(255,255,255,100)',
  opacity: 0.4,
  //style: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
}

var test;
var mapboxglKey = 'pk.eyJ1IjoiZW5qYWxvdCIsImEiOiJjaWhtdmxhNTIwb25zdHBsejk0NGdhODJhIn0.2-F2hS_oTZenAWc0BMf_uw'

var mapboxkey = 'pk.eyJ1IjoiY3ZhbGVuenVlbGEiLCJhIjoiY2l2ZzkweTQ3MDFuODJ5cDM2NmRnaG4wdyJ9.P_0JJXX6sD1oX2D0RQeWFA'

var mapzenkey = 'mapzen-u1JCMvx'

function preload(){
  mappa = new Mappa('Mapbox', mapboxkey);
  myMap = mappa.tileMap(options);
  dots = loadStrings('data/dots.csv');
}

function setup(){
  canvas = createCanvas(900, 650);
  background(100,100,100, 20);
  myMap.append(canvas);
  noStroke();
  //fill(255, 0, 0);
  myMap.onChange(circles);
}

function draw(){
  // pos = myMap.latLng(40.7828647, -73.9675438);
  // translate(-width/2,-height/2,0);
  // translate(pos.x, pos.y, 0);
  // rotateX(frameCount * 0.01);
  // rotateY(frameCount * 0.01);
  // var size = myMap.zoom()*5;
  // box(size);

  // translate(-width/2,-height/2,0);
  //
  // for (var i = 1; i < dots.length; i++) {
  //   var data = dots[i].split(/,/);
  //   pos = myMap.latLng(data[9], data[8]);
  //
  //   push();
  //   translate(pos.x, pos.y, 0);
  //   rotateX(frameCount * 0.01);
  //   rotateY(frameCount * 0.01);
  //   var size = myMap.zoom()*3;
  //   box(size);
  //   pop();
  //
  // }


  //clear();
  //background(255,100,100,40);
  // pos = myMap.latLng(40.7828647, -73.9675438);
  // //var size = myMap.zoom()*5;
  // ellipse(pos.x, pos.y, 40, 40);

  // for (var i = 1; i < dots.length; i++) {
  //   var data = dots[i].split(/,/);
  //
  //   pos = myMap.latLng(data[9], data[8]);
  //   ellipse(pos.x, pos.y, 10, 10);
  // }
}

function circles(){
  clear();
  fill(200,50,50);
  var size = myMap.zoom()*5;
  for (var i = 1; i < dots.length; i++) {
    var data = dots[i].split(/,/);

    var pos = myMap.latLng(data[9], data[8]);
    ellipse(pos.x, pos.y, size, size);
  }
}
