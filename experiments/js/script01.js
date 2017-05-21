/*
Switch between static maps and tiled maps with basic api
*/

var mapImg;
var dots;

var w = 1024;
var h = 512;
var zoom = 1;

var token = 'pk.eyJ1IjoiY3ZhbGVuenVlbGEiLCJhIjoiY2l2ZzkweTQ3MDFuODJ5cDM2NmRnaG4wdyJ9.P_0JJXX6sD1oX2D0RQeWFA'

function preload() {
  mapImg = staticMap('mapbox', token, 0, 0, zoom, w, h)
  dots = loadStrings('data/dots.csv');
}

function setup() {
  createCanvas(w, h);

  //drawMap(mapImg);
  tileMap(0,0,2, w, h)

  for (var i = 1; i < dots.length; i++) {
    var data = dots[i].split(/,/);

    var x = lngToPixels(data[8]);
    var y = latToPixels(data[9]);

    //var d = map(sqrt(pow(10, data[4])), 0, sqrt(pow(10, 10)), 0, 180);
    stroke(0, 255, 255, 50);
    fill(0, 255, 255, 255, 50);
    ellipse(x, y, 3, 3);
  }
}
