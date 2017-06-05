
var mappa;
var token = '99999';
var img;
var mapboxKey = 'pk.eyJ1IjoiY3ZhbGVuenVlbGEiLCJhIjoiY2l2ZzkweTQ3MDFuODJ5cDM2NmRnaG4wdyJ9.P_0JJXX6sD1oX2D0RQeWFA'

var gmapsOptions = {
  lat: 40.70,
  lng: -73.99,
  zoom: 14,
  width: 600,
  height: 400,
  scale: 1,
  maptype: 'satellite',
}

var mapboxOptions = {
  style: 'satellite-v9',
  lat: 40.70,
  lng: -73.99,
  zoom: 14,
  width: 600,
  height: 400,
  bearing: 0,
  pitch: 0,
}

function preload() {
  mappa = new Mappa();
  mapOne = mappa.staticMap(gmapsOptions);
  //mapOne = mappa.staticMap(-122.4241, 37.78, 14.25, 600, 600, 0, 60, 'streets-v10');
  img = loadImage(mapOne);
}

function setup() {
  createCanvas(600,600);
  background(100,100,100);
  fill(255,0,0);

}

function draw() {
  image(img, 0, 0)
  ellipse(mouseX,mouseY, 50,50);
}
