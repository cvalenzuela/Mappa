
var mappa;
var img;
var world;

var mapboxKey = 'pk.eyJ1IjoiY3ZhbGVuenVlbGEiLCJhIjoiY2l2ZzkweTQ3MDFuODJ5cDM2NmRnaG4wdyJ9.P_0JJXX6sD1oX2D0RQeWFA'

// google is 640x640
// mapbox is 512x512

var options = {
  lat: 0,
  lng: 0,
  zoom: 1,
  width: 512,
  height: 512,
  scale: 2
}

function preload(){
  //mappa = new Mappa('google');
  mappa = new Mappa('mapbox', mapboxKey);
  //mapOne = mappa.staticMap(40.7828647, -73.9675438, 14, 600, 400);
  mapOne = mappa.staticMap(options);
  img = loadImage(mapOne.img);
}

function setup(){
  createCanvas(1324,1300);
  background(10,10,10);
  image(img, 0, 0);
  var center = mapOne.latLng(0,0)
  var newyork = mapOne.latLng(40.7294245,-73.9958957)
  var sudafrica = mapOne.latLng(-18.8876654,47.4424743)
  var santiago = mapOne.latLng(-33.448890,-70.669265)
  ellipse(512,512,10,10);
  console.log('center: ' , center);
  console.log('newyork: ' , newyork)
  fill(0,255,0);
  ellipse(center.x, center.y, 10, 10)
  fill(255,0,0);
  ellipse(newyork.x, newyork.y, 10, 10);
  ellipse(sudafrica.x, sudafrica.y, 10, 10);
  ellipse(santiago.x, santiago.y, 10, 10)
}

//
// getPixelPosition: function (marker) {
//      var scale = Math.pow(2, Maps.map.getZoom());
//      var nw = new google.maps.LatLng(
//          Maps.map.getBounds().getNorthEast().lat(),
//          Maps.map.getBounds().getSouthWest().lng()
//      );
//      var worldCoordinateNW = Maps.map.getProjection().fromLatLngToPoint(nw);
//      var worldCoordinate = Maps.map.getProjection().fromLatLngToPoint(marker.getPosition());
//      var pixelOffset = new google.maps.Point(
//          Math.floor((worldCoordinate.x - worldCoordinateNW.x) * scale),
//          Math.floor((worldCoordinate.y - worldCoordinateNW.y) * scale)
//      );
//
//      return pixelOffset;
//  }
