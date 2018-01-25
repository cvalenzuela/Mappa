/* eslint-disable */

const options = {
  lat: 40.73447,
  lng: -74.00232,
  zoom: 13,
  style: 'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'
}
const mappa = new Mappa('Leaflet');

// plainMap
const plainMap = (p) => {
  let canvas;

  p.setup = () => {
    canvas = p.createCanvas(640, 580);
    myMap = mappa.tileMap(options); 
    myMap.overlay(canvas); 
  };

};
let s01 = new p5(plainMap, 'plainMap');

// trail
const trail = (p) => {
  let canvas;
  let tripsCoordinates;
  let allCoordinates = [];
  let data;

  p.preload = () => {
    data = p.loadJSON('assets/data/taxiday1.geojson');
  }

  p.setup = () => {
    canvas = p.createCanvas(640, 580);
    myMap = mappa.tileMap(options); 
    myMap.overlay(canvas); 
    tripsCoordinates = myMap.geoJSON(data, "LineString");

    tripsCoordinates.forEach(function (trip) {
      trip.forEach(function (coordinate) {
          allCoordinates.push(coordinate)
        })
    });
    myMap.onChange(drawPoints)
  };

  function drawPoints(){
    p.clear() 
    p.noStroke();
    p.fill(255);
    for(let i = 0; i < allCoordinates.length; i++){
      let pos = myMap.latLngToPixel(allCoordinates[i][1], allCoordinates[i][0])
      p.ellipse(pos.x, pos.y, 5, 5);
    }
  }

};
let s02 = new p5(trail, 'trail');

// Moving
const Moving = (p) => {

  let canvas;
  let myMap;
  let tripsCoordinates;
  let allCoordinates = [];
  let data;

  let delta = 0;
  let coordinate = 0;

  let origin;
  let originVector;
  let destination;
  let destinationVector;

  let taxiPosition;

  let visitedRoutes = []; // A new array to hold all visited positions

  p.preload = () => {
    data = p.loadJSON('assets/data/taxiday1.geojson');
  }

  p.setup = () => {
    canvas = p.createCanvas(640, 580);
    myMap = mappa.tileMap(options);
    myMap.overlay(canvas);
    tripsCoordinates = myMap.geoJSON(data, "LineString");

    tripsCoordinates.forEach(function(trip) {
      trip.forEach(function(coordinate) {
        allCoordinates.push(coordinate)
      })
    });

  }

  p.draw = () => {
    p.clear();
    if (delta < 1) {
      delta += 0.2;
    } else {
      visitedRoutes.push(allCoordinates[coordinate])
      delta = 0;
      coordinate++;
    }

    origin = myMap.latLngToPixel(allCoordinates[coordinate][1], allCoordinates[coordinate][0]);
    originVector = p.createVector(origin.x, origin.y);
    destination = myMap.latLngToPixel(allCoordinates[coordinate + 1][1], allCoordinates[coordinate + 1][0]);
    destinationVector = p.createVector(destination.x, destination.y);

    taxiPosition = originVector.lerp(destinationVector, delta);

    p.noStroke();
    p.fill(255, 255, 0);
    p.ellipse(taxiPosition.x, taxiPosition.y, 7, 7);
  }
};

let move = new p5(Moving, 'moving');


// Final Sketch
const finalSketch = (p) => {

  let canvas;
  let myMap;
  let tripsCoordinates;
  let allCoordinates = [];
  let data;

  let delta = 0;
  let coordinate = 0;

  let origin;
  let originVector;
  let destination;
  let destinationVector;

  let taxiPosition;

  let visitedRoutes = []; // A new array to hold all visited positions

  p.preload = () => {
    data = p.loadJSON('assets/data/taxiday1.geojson');
  }

  p.setup = () => {
    canvas = p.createCanvas(640, 580);
    myMap = mappa.tileMap(options);
    myMap.overlay(canvas);
    tripsCoordinates = myMap.geoJSON(data, "LineString");

    tripsCoordinates.forEach(function(trip) {
      trip.forEach(function(coordinate) {
        allCoordinates.push(coordinate)
      })
    });

    myMap.onChange(drawRoute);
  }

  p.draw = () => {
    if (delta < 1) {
      delta += 0.2;
    } else {
      visitedRoutes.push(allCoordinates[coordinate])
      delta = 0;
      coordinate++;
      drawRoute();
    }

    origin = myMap.latLngToPixel(allCoordinates[coordinate][1], allCoordinates[coordinate][0]);
    originVector = p.createVector(origin.x, origin.y);
    destination = myMap.latLngToPixel(allCoordinates[coordinate + 1][1], allCoordinates[coordinate + 1][0]);
    destinationVector = p.createVector(destination.x, destination.y);

    taxiPosition = originVector.lerp(destinationVector, delta);

    p.noStroke();
    p.fill(255, 255, 0);
    p.ellipse(taxiPosition.x, taxiPosition.y, 7, 7);
  }

  function drawPoints() {
    p.clear()
    p.noStroke();
    p.fill(255);
    for (let i = 0; i < allCoordinates.length; i++) {
      const pos = myMap.latLngToPixel(allCoordinates[i][1], allCoordinates[i][0])
      p.ellipse(pos.x, pos.y, 5, 5);
    }
  }

  function drawRoute() {
    p.clear();
    p.stroke(255, 0, 0, 40);
    p.strokeWeight(5);
    if (visitedRoutes.length > 0) {
      p.noFill();
      p.beginShape();
      visitedRoutes.forEach(function(e) {
        const pos = myMap.latLngToPixel(e[1], e[0]);
        p.vertex(pos.x, pos.y);
      })
      p.endShape()
    }
  }
};

let finalIntro = new p5(finalSketch, 'finalIntro');
let final = new p5(finalSketch, 'final');