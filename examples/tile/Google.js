// -----------
// Google Maps Demo
// -----------

var key = 'AIzaSyAGz9IlglBq-gWCSzCWVC11autdr1LLhbM'

var options = {
  lat: 40.7828647,
  lng: -73.9675438,
  zoom: 4,
  mapTypeId: 'satellite'
  //styles: style
}

var mappa = new Mappa('Google', key);
var myMap;

var canvas;
var dots;

function setup(){
  canvas = createCanvas(800, 700);
  myMap = mappa.tileMap(options);
  myMap.append(canvas);
  dots = loadStrings('data/dots.csv');
  myMap.onChange(circles);
}

function draw(){

}

function circles(){
  clear();
  var size = myMap.zoom()*2;
  for (var i = 1; i < dots.length; i++) {
    var data = dots[i].split(/,/);
    var pos = myMap.latLng(data[9], data[8]);
    ellipse(pos.x, pos.y, size, size);
  }
}


var style = [
  {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
  {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
  {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}]
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}]
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{color: '#263c3f'}]
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{color: '#6b9a76'}]
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{color: '#38414e'}]
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{color: '#212a37'}]
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{color: '#9ca5b3'}]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{color: '#746855'}]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{color: '#1f2835'}]
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{color: '#f3d19c'}]
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{color: '#2f3948'}]
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}]
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{color: '#17263c'}]
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{color: '#515c6d'}]
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{color: '#17263c'}]
  }
]
