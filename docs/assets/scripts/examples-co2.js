let data;
let pollutionMap;
const mappa = new Mappa();
let canvas;
let smokeInTheWorld;
const options = {
  lat: 0,
  lng: 0,
  zoom: 0.5,
  width: 640,
  height: 580,
}

function preload() {
  data = loadTable("assets/data/co2_emissions.csv", "csv", "headers");
}

function setup() {
  canvas = createCanvas(640, 580).parent('canvasHolder');
  pollutionMap = mappa.staticMap(options);

  smokeInTheWorld = smokemachine(canvas.elt.getContext('2d'), [54, 16.8, 18.2]);
  smokeInTheWorld.start();

  for (let country = 1; country < data.getRowCount(); country++) {
    const pos = pollutionMap.latLngToPixel(data.getString(country, 1), data.getString(country, 2));
    const co2 = map(data.getString(country, 3), 0.01, 10357, 0.1, 1);
    data.setNum(country, 1, pos.x);
    data.setNum(country, 2, pos.y);
    data.setNum(country, 3, co2);
  }
  noStroke();
  fill(54, 16.8, 18.2);
}

setInterval(() => {
  for (let country = 1; country < data.getRowCount(); country++) {
    const co2 = data.getNum(country, 3);
    smokeInTheWorld.addsmoke(data.getNum(country, 1), data.getNum(country, 2), 5 * co2, random(3000, 4000), co2);
  }
}, 100)