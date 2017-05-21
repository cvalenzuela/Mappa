/*
Experiment using mapboxgl with p5 overlay 6300 dots visualized
*/

mapboxgl.accessToken = 'pk.eyJ1IjoiZW5qYWxvdCIsImEiOiJjaWhtdmxhNTIwb25zdHBsejk0NGdhODJhIn0.2-F2hS_oTZenAWc0BMf_uw';

var data;

//Setup mapbox-gl map
var mapa = new mapboxgl.Map({
  container: 'map', // container id
  style: 'mapbox://styles/enjalot/cihmvv7kg004v91kn22zjptsc',
  center: [-96, 39],
  zoom: 3.5,
});

var bbox = document.body.getBoundingClientRect();
var container = mapa.getCanvasContainer();

function setup() {
  var canvas = createCanvas(bbox.width, bbox.height);
  canvas.parent(container);
  noStroke();

  d3.csv('data/dots.csv', function (err, data) {
    function render() {
      clear();
      data.forEach(function (d) {
        var p = project(d);
        var size = map(mapa.getZoom(), 1, 9, 1, 30)
        fill(0, random(0, 255), random(0, 255));
        ellipse(p.x, p.y, size, size);
      });
    }
    // render for the first time
    render();

    // re-render whenever the view changes
    mapa.on('viewreset', function () {
      render();
    });

    mapa.on('move', function () {
      render();
    });

  });
}

function project(d) {
  return mapa.project(getLL(d));
}

function getLL(d) {
  return new mapboxgl.LngLat(+d.lng, +d.lat);
}
