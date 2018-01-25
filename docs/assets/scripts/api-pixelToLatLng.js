// Your Google Maps API Key
const key = 'AIzaSyCdmGJ7JWNWkmmxSdvNiu1Qo6BMn56eTSE'

const options = {
  lat: 36.964241,
  lng: -122.013963,
  zoom: 18,
}

// Create a new Mappa instance using Google.
const mappa = new Mappa('Google', key);
let myMap;

let canvas;
const points = []

function setup() {
  canvas = createCanvas(640, 580).parent('example');
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);
  noFill();
  stroke('#08306b');
}

function draw() {
  clear();

  // Draw a line using latLngToPixel() with all the points in the points array.
  beginShape();
  for (let i = 0; i < points.length; i++) {
    const pos = myMap.latLngToPixel(points[i])
    vertex(pos.x, pos.y);
  }
  endShape();

  // If the mouse right button is pressed, store the current mouse position in an array of points.
  if (mouseIsPressed) {
    if (mouseButton == RIGHT) {
      const point = myMap.pixelToLatLng(mouseX, mouseY);
      points.push(point)
    }
  }
}