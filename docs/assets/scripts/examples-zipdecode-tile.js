/* eslint-disable */
/*
An interpretation of Ben Fry’s zipdecode (http://benfry.com/zipdecode/)
with p5.js and tile maps with leaflet
*/

let zipcodes;

const options = {
  lat: 39.5,
  lng: -96.35,
  zoom: 4.2
}

const mappa = new Mappa('Leaflet');
let myMap;
let canvas;
let inputValue;

function preload() {
  zipcodes = loadTable('assets/data/zipcodes.tsv', 'tsv', 'header');
}

function setup() {
  canvas = createCanvas(640, 580).parent('canvasHolder');
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);
  myMap.onChange(drawZipcodes);
  noStroke();

  // Instructions paragraph
  const instructions = createP('type the digits of a zip code').parent('canvasHolder');
  instructions.position(100, 240);
  instructions.style('color', 'rgb(197,197,197)');
  instructions.style('font-family', 'Helvetica');
  instructions.style('z-index', '1000');

  // Zipcode Input
  const inp = createInput('').parent('canvasHolder');
  inp.input(inputEvent);
  inp.position(100, 285);
  inp.style('font-family', 'Helvetica');
  inp.style('background-color', 'rgb(51,51,51)');
  inp.style('padding', '5px');
  inp.style('color', 'rgb(197,197,197');
  inp.style('border', '1px solid rgb(197,197,197)');
  inp.style('z-index', '1000');

}

function inputEvent() {
  inputValue = this.value();
  drawZipcodes();
}

function drawZipcodes() {
  clear();
  background(51, 51, 51);

  const re = new RegExp('^' + inputValue);

  for (let r = 0; r < zipcodes.getRowCount(); r++) {
    if (String(inputValue).length > 0) {
      if (zipcodes.getString(r, 'zip').match(re)) {
        fill(255, 255, 255, 255);
      } else {
        fill(101, 102, 74, 255);
      }
    } else {
      fill(153, 153, 102, 255);
    }
    let size = myMap.zoom();
    size = map(size, 1, 18, 1, 4);
    const pos = myMap.latLngToPixel(zipcodes.getString(r, 'lat'), zipcodes.getString(r, 'lon'));
    rect(pos.x, pos.y, size, size);
  }
}