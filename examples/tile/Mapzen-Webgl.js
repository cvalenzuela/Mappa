// -----------
// Mapzen with P5 in Webgl mode
// -----------

var key = 'mapzen-u1JCMvx'

var options = {
  lat: 0,
  lng: 0,
  zoom: 4,
  BasemapStyles: true,
  scene: 'Tron'
}

var mappa = new Mappa('Mapzen', key);
var myMap;

var canvas;
var dots;

function setup(){
  canvas = createCanvas(800, 700, WEBGL);
  myMap = mappa.tileMap(options);
  myMap.append(canvas);
  dots = loadStrings('data/dots_shorter.csv');
}

function draw(){
  translate(-width/2,-height/2,0);

  for (var i = 1; i < dots.length; i++) {
    var data = dots[i].split(/,/);
    pos = myMap.latLng(data[9], data[8]);

    push();
    translate(pos.x, pos.y, 0);
    rotateX(frameCount * 0.01);
    rotateY(frameCount * 0.01);
    var size = myMap.zoom()*3;
    box(size);
    pop();
  }
}
