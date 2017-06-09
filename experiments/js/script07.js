var mappa;
var mapboxKey = 'pk.eyJ1IjoiZW5qYWxvdCIsImEiOiJjaWhtdmxhNTIwb25zdHBsejk0NGdhODJhIn0.2-F2hS_oTZenAWc0BMf_uw'
var canvas;
var myMap;

var options = {
  lat: 40.7828647,
  lng: -73.9675438,
  zoom: 14,
  style: 'mapbox://styles/mapbox/satellite-streets-v10'
}

function preload(){
  mappa = new Mappa('mapboxgl', mapboxKey); // creates an emtpy object
  myMap = mappa.tileMap(options); // create an actual tile map
}

function setup(){
  canvas = createCanvas(800, 900);

  myMap.append(canvas); // Append the tile map to the current canvas

  // pos = myMap.position(-30, 72);
  // ellipse(pos.x, pos.y, 10, 10);
  //
  // tile = myMap.append(canvas); // create a varialbe and then append the tile map to the current canvas
  // pos = tile.position(-30, 75);
  // ellipse(pos.x, pos.y, 20, 20);

}

// function render() {
//   clear();
//
//   var p = project(nyc);
//   // var size = map(mapa.getZoom(), 1, 9, 1, 30);
//   fill(0, random(0, 255), random(0, 255));
//   ellipse(p.x, p.y, 100, 100);
//
// }
//
// function create() {
//   // re-render whenever the view changes
//   tileMap.on('viewreset', function () {
//     render();
//   });
//
//   tileMap.on('move', function () {
//     render();
//   });
// }
//
// function project(d) {
//   return tileMap.project(getLL(d));
// }
// function getLL(d) {
//   return new mapboxgl.LngLat(d[1], d[0]);
// }

// function draw(){
//   clear();
//   fill(255,0,0);
//   ellipse(100,100,100,100)
//   ellipse(mouseX,mouseY,100,100);
//
// }
