/*
An interpretation of Ben Fry’s zipdecode (http://benfry.com/zipdecode/)
with p5.js and tile maps with leaflet or mapboxgl
*/

var key = 'pk.eyJ1IjoiY3ZhbGVuenVlbGEiLCJhIjoiY2l2ZzkweTQ3MDFuODJ5cDM2NmRnaG4wdyJ9.P_0JJXX6sD1oX2D0RQeWFA';
var mappa = new Mappa('Mapboxgl', key);

var options = {
    lat: 39.5,
    lng: -96.35,
    zoom: 3.2,
    style: 'mapbox://styles/cvalenzuela/cj5gesqlq369p2rpnbmpe41im'
}

var myMap;
var canvas;
var inputValue = '';
var zoom = false;
var zipcodes;

function preload() {
    zipcodes = loadTable('zipcodes.tsv', 'tsv', 'header');
}

function setup() {
    canvas = createCanvas(800, 640);
    myMap = mappa.tileMap(options);
    myMap.overlay(canvas);
    myMap.onChange(drawZipcodes);
    noStroke();
    frameRate(20);

    // Instructions paragraph
    var instructions = createP('type the digits of a zip code');
    instructions.position(50, 530);
    instructions.style('color', 'rgb(197,197,197)');
    instructions.style('font-family', 'Helvetica');
    instructions.style('z-index', '20');

    // Zipcode Input
    var inp = createInput('');
    inp.input(inputEvent);
    inp.position(50, 575);
    inp.style('font-family', 'Helvetica');
    inp.style('background-color', 'rgb(51,51,51)');
    inp.style('padding', '5px');
    inp.style('color', 'rgb(197,197,197');
    inp.style('border', '1px solid rgb(197,197,197)');
    inp.style('z-index', '20');

    // Zoom checkbox
    var zoomCheckbox = createCheckbox('zoom', false);
    zoomCheckbox.changed(zoomChecked)
    zoomCheckbox.style('color', 'rgb(197,197,197)');
    zoomCheckbox.position(50, 605);
    zoomCheckbox.style('z-index', '20');
}

function inputEvent() {
    inputValue = this.value();
    drawZipcodes();
}

function zoomChecked() {
    if (this.checked()) {
        zoom = true;
    } else {
        zoom = false;
    }
}

// Draw the zipcodes
function drawZipcodes() {
    clear();
    var re = new RegExp('^' + inputValue);

    for (var r = 0; r < zipcodes.getRowCount(); r++) {
        if (String(inputValue).length > 0) {
            if (zipcodes.getString(r, 'zip').match(re)) {
                fill(255, 255, 255, 255);
            } else {
                fill(101, 102, 74, 255);
            }
        } else {
            fill(153, 153, 102, 255);
        }
        var size = myMap.zoom();
        size = map(size, 1, 18, 1, 4);
        var pos = myMap.latLngToPixel(zipcodes.getString(r, 'lat'), zipcodes.getString(r, 'lon'));
        rect(pos.x, pos.y, size, size);
    }
}