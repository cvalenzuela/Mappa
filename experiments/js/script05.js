
var mappa;
var token = '99999';
var img;
var mapboxKey = 'pk.eyJ1IjoiY3ZhbGVuenVlbGEiLCJhIjoiY2l2ZzkweTQ3MDFuODJ5cDM2NmRnaG4wdyJ9.P_0JJXX6sD1oX2D0RQeWFA'

var options = {
  lat: 0,
  lng: 0,
  zoom: 2,
  width: 400,
  height: 400,
  scale: 2,
  maptype: 'satellite'
}

function preload() {
  mappa = new Mappa();
  mapOne = mappa.staticMap(options);
  img = loadImage(mapOne);
}

function setup() {
  createCanvas(500,500);
  background(100,100,100);
  image(img, 0, 0)
  fill(255,0,0);
  ellipse(100,100,50,50);

}

// function draw() {
//
// }
