/*
An interpretation of Ben Fry’s zipdecode (http://benfry.com/zipdecode/)
with p5.js
*/

var zipcodes;
var mappa = new Mappa();

var options = {
    lat: 39.5,
    lng: -96.35,
    zoom: 3.2,
    width: 800,
    height: 640,
    scale: 1,
}
var myMap = mappa.staticMap(options);

function preload() {
    zipcodes = loadStrings('zipcodes.tsv');
}

function setup() {
    createCanvas(800, 640);
    noStroke();
    var instructions = createP('type the digits of a zip code');
    fill(255, 0, 0);
    instructions.position(50, 540);
    instructions.style('color', 'rgb(197,197,197)');
    instructions.style('font-family', 'Helvetica');

    var inp = createInput('');
    inp.input(inputEvent);
    inp.position(50, 585);
    inp.style('font-family', 'Helvetica');
    inp.style('background-color', 'rgb(51,51,51)');
    inp.style('padding', '5px');
    inp.style('color', 'rgb(197,197,197');
    inp.style('border', '1px solid rgb(197,197,197)');

    drawZipcodes();
}

function inputEvent() {
    drawZipcodes(this.value());
}

function drawZipcodes(code) {
    background(51, 51, 51);

    var re = new RegExp('^' + code);

    zipcodes.forEach(function (zipcode) {
        var zip = zipcode.split(/	/);
        if (zip[2].match(re) && code.length > 0) {
            fill(255, 255, 255, 255);
        } else {
            fill(153, 153, 102, 255);
        }
        pos = myMap.latLngToPixel(zip[1], zip[0]);
        ellipse(pos.x, pos.y, 1, );
    });


}