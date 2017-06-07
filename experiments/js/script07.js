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

function setup(){
  canvas = createCanvas(800, 900);

  mappa = new Mappa('mapbox', mapboxKey);

  myMap = mappa.tileMap(options);
  myMap.append(canvas);

}

function draw(){
  clear();
  fill(255,0,0);
  ellipse(100,100,100,100)
  ellipse(mouseX,mouseY,100,100);

}
