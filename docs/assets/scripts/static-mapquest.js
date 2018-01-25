// // API Key for Mapquest. Get one here: https://developer.mapquest.com/user/me/apps
const key = "G1VfvZoE8T4g0U24bm7UbuozvS9YIGXt";

// Create an instance of Mapquest.
const mappa = new Mappa('Mapquest', key); 

// Options for map
const options = {
  lat: 0,
  lng: 0,
  zoom: 2,
  width: 640,
  height: 640,
  scale: 1,
  type: 'light',
};

// Create the static map reference.
const myMap = mappa.staticMap(options);

let img;
let meteorites;

function preload() {
  // Load the image
  img = loadImage(myMap.imgUrl);
  // Load the data
  meteorites = loadTable('assets/data/Meteorite_Landings.csv', 'csv', 'header');
}

function setup() {
  createCanvas(640,500).parent('canvasContainer');
  noStroke();

  // Display the image
  image(img, 0, 0);

  // Show the Meteorites Landings
  for (let i = 0; i < meteorites.getRowCount(); i++) {
    // Get the lat/lng of each meteorite
    const pos = myMap.latLngToPixel(meteorites.getString(i, 'reclat'), meteorites.getString(i, 'reclong'));
    // Get the size of the meteorite and map it. 60000000 is the mass of the largest meteorite (https://en.wikipedia.org/wiki/Hoba_meteorite)
    let size = meteorites.getString(i, 'mass (g)');
    size = map(size, 0, 60000000, 3, 25);
    fill(random(0,255), random(0,255),random(0,255));
    ellipse(pos.x, pos.y, size, size);
  }
} 
