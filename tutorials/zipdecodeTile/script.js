/*
An interpretation of Ben Fry’s zipdecode (http://benfry.com/zipdecode/)
with p5.js and tile maps with leaflet
*/

var zipcodes;

var options = {
    lat: 39.5,
    lng: -96.35,
    zoom: 4.2
}

var mappa = new Mappa('Leaflet');
var myMap;
var canvas;
var inputValue;

function preload() {
    zipcodes = loadStrings('zipcodes.tsv');
}

function setup() {
    canvas = createCanvas(800, 640);
    myMap = mappa.tileMap(options);
    myMap.overlay(canvas);
    myMap.onChange(drawZipcodes);
    noStroke();

    // Instructions paragraph
    var instructions = createP('type the digits of a zip code');
    instructions.position(50, 540);
    instructions.style('color', 'rgb(197,197,197)');
    instructions.style('font-family', 'Helvetica');
    instructions.style('z-index', '20');

    // Zipcode Input
    var inp = createInput('');
    inp.input(inputEvent);
    inp.position(50, 585);
    inp.style('font-family', 'Helvetica');
    inp.style('background-color', 'rgb(51,51,51)');
    inp.style('padding', '5px');
    inp.style('color', 'rgb(197,197,197');
    inp.style('border', '1px solid rgb(197,197,197)');
    inp.style('z-index', '20');

}

function inputEvent() {
    inputValue = this.value();
    drawZipcodes();
}

function drawZipcodes() {
    clear();
    background(51, 51, 51);

    var re = new RegExp('^' + inputValue);
    // Draw the zipcodes
    for (var i = 1; i < zipcodes.length; i++) {
        var zip = zipcodes[i].split(/	/);
        if (String(inputValue).length > 0) {
            if (zip[2].match(re)) {
                fill(255, 255, 255, 255);
            } else {
                fill(101, 102, 74, 255);
            }
        } else {
            fill(153, 153, 102, 255);
        }
        var size = myMap.zoom();
        size = map(size, 1, 18, 1, 4);
        var pos = myMap.latLngToPixel(zip[1], zip[0]);
        rect(pos.x, pos.y, size, size);
    }
}
