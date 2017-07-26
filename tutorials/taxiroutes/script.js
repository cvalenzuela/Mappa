var canvas;
var myMap;
var tripsCoordinates;
var allCoordinates = [];
var data;

var delta = 0; 
var coordinate = 0; 

var origin; 
var originVector;  
var destination; 
var destinationVector;

var taxiPosition;

var visitedRoutes = []; // A new array to hold all visited positions

var options = {
  lat: 40.73447,
  lng: -74.00232,
  zoom: 13,
  style: 'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'
}
var mappa = new Mappa('Leaflet');

function preload() {
  data = loadJSON('./data/taxiday1.geojson');
}

function setup() {
  canvas = createCanvas(800, 700);
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas); 
  tripsCoordinates = myMap.geoJSON(data, "LineString");

  tripsCoordinates.forEach(function (trip) {
    trip.forEach(function (coordinate) {
        allCoordinates.push(coordinate)
      })
  });
  //myMap.onChange(drawPoints);
  myMap.onChange(drawRoute); // Everytime the map is zoomed or moved update the route
}

function draw(){
  //clear(); clear can be commented since drawRoute() will handle clearing the canvas
  if(delta < 1){
    delta += 0.2; 
  } else {
    visitedRoutes.push(allCoordinates[coordinate]) // Once it has arrived at its destination, add the origin as a visited location
    delta = 0; 
    coordinate ++;
    drawRoute(); // Call the drawRoute to update the route
  }

  origin = myMap.latLngToPixel(allCoordinates[coordinate][1], allCoordinates[coordinate][0]); 
  originVector = createVector(origin.x, origin.y); 
  destination = myMap.latLngToPixel(allCoordinates[coordinate + 1][1], allCoordinates[coordinate + 1][0]);  
  destinationVector = createVector(destination.x, destination.y);

  taxiPosition = originVector.lerp(destinationVector, delta);

  noStroke(); // remove the stroke from the route
  fill(255,255,0);
  ellipse(taxiPosition.x, taxiPosition.y, 7, 7);
}

function drawPoints(){
  clear() 
  noStroke();
  fill(255);
  for(var i = 0; i < allCoordinates.length; i++){
    var pos = myMap.latLngToPixel(allCoordinates[i][1], allCoordinates[i][0])
    ellipse(pos.x, pos.y, 5, 5);
  }
}

// This functions draws a line with n-vertices where n = visited routes;
function drawRoute(){
  clear();
  stroke(255,0,0, 40); // stroke color and width to see the route line
  strokeWeight(5);
  if(visitedRoutes.length > 0){
    noFill();
    beginShape();
    visitedRoutes.forEach(function (e) {
        var pos = myMap.latLngToPixel(e[1], e[0]);
        vertex(pos.x, pos.y);
    })
    endShape()
  }
}
