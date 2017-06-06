
var mappa;
var token = '99999';
var img;
var mapboxKey = 'pk.eyJ1IjoiY3ZhbGVuenVlbGEiLCJhIjoiY2l2ZzkweTQ3MDFuODJ5cDM2NmRnaG4wdyJ9.P_0JJXX6sD1oX2D0RQeWFA'
var imgs = [];

var gmapsOptions = {
  lat: 40.70,
  lng: -73.99,
  //center: 'Santiago, Chile',
  zoom: 14,
  width: 600,
  height: 400,
  // scale: 1,
  maptype: 'satellite',
}

var gmapsOptions2 = {
  center: '444 W Main St Lock Haven PA',
  zoom: 15,
  size: '500x400',
  maptype: 'roadmap',
  style: [
    {
      feature: 'road',
      element: 'all',
      rules: {
        hue: '0x00ff00'
      }
    }
  ]
};


var mapboxOptions = {
  style: 'satellite-v9',
  lat: 40.70,
  lng: -73.99,
  zoom: 14,
  width: 600,
  height: 400,
  bearing: 0,
  pitch: 0,
}

function preload() {
  mappa = new Mappa('mapbox', mapboxKey);
  //mapOne = mappa.staticMap(mapboxOptions);
  mapOne = mappa.staticMap(40.70, -73.99, 14, 600, 400);
  //mapOne = mappa.staticMap(-122.4241, 37.78, 14.25, 600, 600, 0, 60, 'streets-v10');
  img = loadImage(mapOne.img);
  // for (var i = 0; i < 15; i++){
  //   gmapsOptions.zoom = i+1;
  //   imgs[i] = loadImage(mappa.staticMap(gmapsOptions));
  // }
}

function setup() {
  createCanvas(600,600);
  background(100,100,100);
  fill(255,0,0);
  image(img, 0, 0);
  ellipse(100,100, 50,50);
}

// function draw() {
//   var x1 = Math.floor(map(mouseX, 0, width, 0, 15));
//   x1 = Math.min(Math.max(parseInt(x1), 1), 14);
//   image(imgs[x1], 0, 0)
//   ellipse(mouseX,mouseY, 50,50);
// }
