// -----------
// Mapbox Static API Demo
// -----------

// Import API key
var key = 'pk.eyJ1IjoiY3ZhbGVuenVlbGEiLCJhIjoiY2l2ZzkweTQ3MDFuODJ5cDM2NmRnaG4wdyJ9.P_0JJXX6sD1oX2D0RQeWFA'

// Create a new instance of Mapbox
var mappa = new Mappa('Mapbox', key);

// Options for map
var options = {
  lat: 0,
  lng: 0,
  zoom: 1,
  width: 640,
  height: 640,
  scale: 1,
  pitch: 0,
  style: 'satellite-streets-v10'
}

// Create a Static Map
//var myMap = mappa.staticMap(40.782, -73.967, 10, 600, 600);
var myMap = mappa.staticMap(options);

var img;
var dots;

function preload(){
  // Load the image from the mappa instance
  img = loadImage(myMap.img);
  dots = loadStrings('../../data/dots.csv');
}

function setup(){
  createCanvas(640,640);
  noStroke();
  fill(255);

  image(img, 0, 0);

  for (var i = 1; i < dots.length; i++) {
    var data = dots[i].split(/,/);

    pos = myMap.latLng(data[9], data[8]);
    ellipse(pos.x, pos.y, 3, 3);
  }
}
