/* -----------
Mapbox Demo demo.
Visualizing 45,716 Meteorite Landings.
Data from NASA's Open Data Portal.(https://data.nasa.gov/Space-Science/Meteorite-Landings/gh4g-9sfh)
----------- */

// API Key for Mapbox. Get one here:
// https://www.mapbox.com/studio/account/tokens/
const key = 'pk.eyJ1IjoibWFwcGF1c2VyIiwiYSI6ImNqNXNrbXIyZDE2a2cyd3J4Ym53YWxieXgifQ.JENDJqKE1SLISxL3Q_T22w'

// Options for map
const options = {
  lat: 0,
  lng: 0,
  zoom: 4,
  studio: true, // false to use non studio styles
  //style: 'mapbox.dark' //streets, outdoors, light, dark, satellite (for nonstudio)
  style: 'mapbox://styles/mapbox/traffic-night-v2',
};

// Create an instance of Mapbox
const mappa = new Mappa('Mapbox', key);
let myMap;

let canvas;
let meteorites;

function setup() {
  canvas = createCanvas(640, 580).parent('canvasContainer');

  // Create a tile map and overlay the canvas on top.
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);

  // Load the data
  meteorites = loadTable('../../data/Meteorite_Landings.csv', 'csv', 'header');

  // Only redraw the meteorites when the map change and not every frame.
  myMap.onChange(drawMeteorites);

  fill(109, 255, 0);
  stroke(100);
}

// The draw loop is fully functional but we are not using it for now.
function draw() {}

function drawMeteorites() {
  // Clear the canvas
  clear();

  for (let i = 0; i < meteorites.getRowCount(); i += 1) {
    // Get the lat/lng of each meteorite
    const latitude = Number(meteorites.getString(i, 'reclat'));
    const longitude = Number(meteorites.getString(i, 'reclong'));

    // Only draw them if the position is inside the current map bounds. We use a
    // Mapbox method to check if the lat and lng are contain inside the current
    // map. This way we draw just what we are going to see and not everything. See
    // getBounds() in https://www.mapbox.com/mapbox.js/api/v3.1.1/l-latlngbounds/
    if (myMap.map.getBounds().contains([latitude, longitude])) {
      // Transform lat/lng to pixel position
      const pos = myMap.latLngToPixel(latitude, longitude);
      // Get the size of the meteorite and map it. 60000000 is the mass of the largest
      // meteorite (https://en.wikipedia.org/wiki/Hoba_meteorite)
      let size = meteorites.getString(i, 'mass (g)');
      size = map(size, 558, 60000000, 1, 25) + myMap.zoom();
      ellipse(pos.x, pos.y, size, size);
    }
  }
}
