/*
An interpretation of Ben Fry’s zipdecode (http://benfry.com/zipdecode/)
with p5.js
*/

var zipcodes;
var zoom = false;
var options = {
    lat: 39.5,
    lng: -96.35,
    zoom: 3.2,
    width: 800,
    height: 640,
    scale: 1,
}

var mappa = new Mappa();

function preload() {
    zipcodes = loadTable('zipcodes.tsv', 'tsv', 'header');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    noStroke();

    // Instructions paragraph
    var instructions = createP('type the digits of a zip code');
    instructions.position(50, 540);
    instructions.style('color', 'rgb(197,197,197)');
    instructions.style('font-family', 'Helvetica');

    // Zipcode Input
    var inp = createInput('');
    inp.input(inputEvent);
    inp.position(50, 585);
    inp.style('font-family', 'Helvetica');
    inp.style('background-color', 'rgb(51,51,51)');
    inp.style('padding', '5px');
    inp.style('color', 'rgb(197,197,197');
    inp.style('border', '1px solid rgb(197,197,197)');

    // Zoom checkbox
    var zoomCheckbox = createCheckbox('zoom', false);
    zoomCheckbox.changed(zoomChecked)
    zoomCheckbox.style('color', 'rgb(197,197,197)');
    zoomCheckbox.position(50, 615);
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
    var re = new RegExp('^' + inputValue);

    // If zoom enable, get the new center and zoom
    if (String(inputValue).length > 0 && zoom) {
        var location = zipcodes.matchRow(re, 'zip');
        options.zoom = 4.2;
        options.lat = location.obj.lat;
        options.lng = location.obj.lon;
    } else {
        options.zoom = 3.2;
        options.lat = 39.5;
        options.lng = -96.35;
    }

    var myMap = mappa.staticMap(options);

    // Draw the zipcodes
    for (var r = 1; r < zipcodes.getRowCount(); r++) {
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