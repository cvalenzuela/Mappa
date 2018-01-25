const mappa = new Mappa('Leaflet');
// 01
const sketch01 = (p) => {
  let canvas;
  let myMap;
  const options = {
    lat: 0,
    lng: 0,
    zoom: 4,
    style: "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
  };  

  p.setup = () => {
    canvas = p.createCanvas(340,340);
    // p.background(100);
    myMap = mappa.tileMap(options); 
    myMap.overlay(canvas);
    myMap.onChange(drawPoint);
    p.fill(200, 100, 100);
  };

  function drawPoint(){  
    p.clear();
    const nigeria = myMap.latLngToPixel(11.396396, 5.076543); 
    p.ellipse(nigeria.x, nigeria.y, 20, 20);
  }
};
let s01 = new p5(sketch01, '01');

// 02
const sketch02 = (p) => {
  let canvas;
  let myMap;
  const options = {
    lat: 0,
    lng: 0,
    zoom: 4,
    style: "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
  };

  p.setup = () => {
    canvas = p.createCanvas(340, 340);
    // p.background(100);
    myMap = mappa.tileMap(options); 
    myMap.overlay(canvas);
    meteorites = p.loadTable('assets/data/Meteorite_Landings.csv', 'csv', 'header');
    myMap.onChange(drawMeteorites);
    p.fill(200, 100, 100);
  };

// Draw the meteorites
function drawMeteorites() {
  // Clear the canvas
  p.clear();

  for (let i = 0; i < meteorites.getRowCount(); i++) {
    // Get the lat/lng of each meteorite 
    const latitude = Number(meteorites.getString(i, 'reclat'));
    const longitude = Number(meteorites.getString(i, 'reclong'));

    // Only draw them if the position is inside the current map bounds. We use a
    // Leaflet method to check if the lat and lng are contain inside the current
    // map. This way we draw just what we are going to see and not everything. See
    // getBounds() in http://leafletjs.com/reference-1.1.0.html
    if (myMap.map.getBounds().contains({lat: latitude, lng: longitude})) {
      // Transform lat/lng to pixel position
      const pos = myMap.latLngToPixel(latitude, longitude);
      // Get the size of the meteorite and map it. 60000000 is the mass of the largest
      // meteorite (https://en.wikipedia.org/wiki/Hoba_meteorite)
      let size = meteorites.getString(i, 'mass (g)');
      size = p.map(size, 558, 60000000, 1, 25) + myMap.zoom();
      p.ellipse(pos.x, pos.y, size, size);
    }
  }
}
};
let s02 = new p5(sketch02, '02');