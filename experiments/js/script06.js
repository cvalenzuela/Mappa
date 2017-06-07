// Static google maps and mapbox working


var mappa;
var img;
var world;
var dots;

var mapboxKey = 'pk.eyJ1IjoiY3ZhbGVuenVlbGEiLCJhIjoiY2l2ZzkweTQ3MDFuODJ5cDM2NmRnaG4wdyJ9.P_0JJXX6sD1oX2D0RQeWFA'

var options = {
  lat: 40.7828647,
  lng: -73.9675438,
  zoom: 2,
  width: 640,
  height: 640,
  scale: 1,
  //center: 'New York'
}

function preload(){
  mappa = new Mappa('google');
  //mappa = new Mappa('mapbox', mapboxKey);
  //mapOne = mappa.staticMap(40.7828647, -73.9675438, 7, 612, 512, 1);
  mapOne = mappa.staticMap(options);
  img = loadImage(mapOne.img);
  dots = loadStrings('data/dots.csv');
}

function setup(){
  createCanvas(1024,1024);
  background(10,10,10);
}

function draw() {
  //image(img, 0, 0);
  var size = map(mouseX, 0, 1024, 1, 5)
  for (var i = 1; i < dots.length; i++) {
    var data = dots[i].split(/,/);

    var pos = mapOne.latLng(data[9], data[8]);
    fill(255, 0, 0);
    ellipse(pos.x, pos.y, size, size);
  }


  // image(img, 0, 0);
  // var center = mapOne.latLng(0,0)
  // var newyork = mapOne.latLng(40.7294245, -73.9958957)
  // var sudafrica = mapOne.latLng(-18.8876654, 47.4424743)
  // var santiago = mapOne.latLng(-33.448890, -70.669265)
  //
  // fill(0,255,0);
  // ellipse(center.x, center.y, 10, 10)
  // fill(255,0,0);
  // ellipse(newyork.x, newyork.y, 10, 10);
  // ellipse(sudafrica.x, sudafrica.y, 10, 10);
  // ellipse(santiago.x, santiago.y, 10, 10)
}
