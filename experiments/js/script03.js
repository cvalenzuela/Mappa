/*
Experiment using mapboxgl with p5 overlay with 100 dots and draw
*/

mapboxgl.accessToken = 'pk.eyJ1IjoiZW5qYWxvdCIsImEiOiJjaWhtdmxhNTIwb25zdHBsejk0NGdhODJhIn0.2-F2hS_oTZenAWc0BMf_uw';

var dots;
var visited = [];
var t = 0;
var o;
var d;
var origin;
var destination;
var distance;

//Setup mapbox-gl map
var mapa = new mapboxgl.Map({
  container: 'map', // container id
  style: 'mapbox://styles/enjalot/cihmvv7kg004v91kn22zjptsc',
  center: [33.1844, 1.1569],
  zoom: 2.5,
});

var bbox = document.body.getBoundingClientRect();
var container = mapa.getCanvasContainer();

function preload(){
  d3.csv('data/dots_shorter.csv', function (err, data) {
    dots = data;
  });
}

function setup() {
  var canvas = createCanvas(bbox.width, bbox.height);
  canvas.parent(container);
  noStroke();
  distance = createVector(0, 0);
}

function draw() {
  clear();
  //render();
  travel();
}

function travel() {
  if(dots != undefined){

    if(distance.x == 0 && distance.y == 0){
      o = project(dots[t]);
      d = project(dots[t+1]);
      origin = createVector(o.x, o.y);
      destination = createVector(d.x, d.y);
      if(t < dots.length){
        t++;
      }
      else{
        t = 0;
      }
    }

    distance = createVector(origin.x - destination.x, origin.y - destination.y);
    if(distance.x < 0){
      origin.x = origin.x + 3;
    }
    if(distance.x > 0){
      origin.x = origin.x - 3;
    }
    if(distance.y > 0){
      origin.y = origin.y - 3;
    }
    if(distance.y < 0){
      origin.y = origin.y + 3;
    }
    fill(255,0,0);
    ellipse(origin.x, origin.y, 10, 10);
    // for(var i = 0; i < 15; i++){
    //   fill(0,200,200, 7*i);
    //
    // };
    //var size = map(mapa.getZoom(), 1, 9, 1, 30)
    //ellipse(p.x, p.y, size, size);

  }

}

mapa.on('viewreset', function () {
  render();
});

mapa.on('move', function () {
  render();
});

function project(d) {
  return mapa.project(getLL(d));
}

function getLL(d) {
  return new mapboxgl.LngLat(+d.lng, +d.lat);
}

// function render() {
//   if (visited != undefined){
//     visited.forEach(function (d) {
//       var p = project(d);
//       var size = map(mapa.getZoom(), 1, 9, 1, 30)
//       fill(0, random(0, 255), random(0, 255));
//       ellipse(p.x, p.y, size, size);
//     });
//   }
// }
