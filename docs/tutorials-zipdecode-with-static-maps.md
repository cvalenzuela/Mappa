---
id: zipdecode-with-static-maps
title: Zipdecode with Static Maps
---

An interpretation of Ben Fry’s [zipdecode](http://benfry.com/zipdecode/) with <a href="https://p5js.org/"><img src="assets/img/p5js.svg" class="p5logo"/></a>, Mappa.js.

## Final Result:

<div class="example">
  <div id="canvasHolder"></div>
  <script src="assets/scripts/examples-zipdecode-static.js"></script>
</div>

## Setup

TODO: [want to help?](https://github.com/cvalenzuela/mappa/issues)

## Code

```javascript
let zipcodes;
let zoom = false;
const options = {
  lat: 50.5,
  lng: -60.35,
  zoom: 2.2,
  width: 640,
  height: 580,
  scale: 1,
}

const mappa = new Mappa();
function preload() {
  zipcodes = loadTable('assets/data/zipcodes.tsv', 'tsv', 'header');
}

function setup() {
  createCanvas(640, 580).parent('canvasHolder');
  noStroke();

  // Instructions paragraph
  const instructions = createP('type the digits of a zip code').parent('canvasHolder');
  instructions.position(50, 240);
  instructions.style('color', 'rgb(197,197,197)');
  instructions.style('font-family', 'Helvetica');

  // Zipcode Input
  const inp = createInput('').parent('canvasHolder');
  inp.input(inputEvent);
  inp.position(50, 285);
  inp.style('font-family', 'Helvetica');
  inp.style('background-color', 'rgb(51,51,51)');
  inp.style('padding', '5px');
  inp.style('color', 'rgb(197,197,197');
  inp.style('border', '1px solid rgb(197,197,197)');

  // Zoom checkbox
  const zoomCheckbox = createCheckbox('zoom', false).parent('canvasHolder');
  zoomCheckbox.changed(zoomChecked)
  zoomCheckbox.style('color', 'rgb(197,197,197)');
  zoomCheckbox.position(50, 230);
  zoomCheckbox.style('font-family', 'Helvetica');

  drawZipcodes('');
}

function inputEvent() {
  drawZipcodes(this.value());
}

function zoomChecked() {
  if (this.checked()) {
    zoom = true;
  } else {
    zoom = false;
  }
}

function drawZipcodes(inputValue) {
  background(51, 51, 51);
  const re = new RegExp('^' + inputValue);

  // If zoom enable, get the new center and zoom
  if (String(inputValue).length > 0 && zoom) {
    var location = zipcodes.matchRow(re, 'zip');
    options.zoom = 4.2;
    options.lat = location.obj.lat;
    options.lng = location.obj.lon;
  } else {
    options.zoom = 2.8;
    options.lat = 39.5;
    options.lng = -96.35;
  }

  const myMap = mappa.staticMap(options);
  // Draw the zipcodes
  for (let r = 1; r < zipcodes.getRowCount(); r++) {
    if (String(inputValue).length > 0) {
      if (zipcodes.getString(r, 'zip').match(re)) {
        fill(255, 255, 255, 255);
      } else {
        fill(101, 102, 74, 255);
      }
    } else {
      fill(153, 153, 102, 255);
    }
    pos = myMap.latLngToPixel(zipcodes.getString(r, 'lat'), zipcodes.getString(r, 'lon'));
    rect(pos.x, pos.y, 1, 1)
  };

}

```