// -----------
// Leaflet with OSM Demo
// -----------

var options = {
  lat: 40.7828647,
  lng: -73.9675438,
  zoom: 4,
  style: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
}

var mappa = new Mappa('Leaflet');
var myMap;

var canvas;
var dots;

function setup(){
  canvas = createCanvas(800, 700);
  myMap = mappa.tileMap(options);
  myMap.append(canvas);
  dots = loadStrings('data/dots.csv');
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
