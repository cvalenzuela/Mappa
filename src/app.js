'use strict';

console.log('%c p5.maps Loaded ', 'color:white; background:black;');
//require('./static/static');

var map = {
  lat: 0,
  lng: 0,
  zoom: 1,
  width: 1024,
  height: 512
};

p5.prototype.staticMap = function (vendor, token, lat, lng, zoom, width, height) {

  map.lat = lat;
  map.lng = lng;
  map.zoom = zoom;
  map.width = width;
  map.height = height;

  // Vendors
  if(vendor === 'mapbox'){
    vendor = 'https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/'
    return loadImage(vendor + map.lat + ',' + map.lng + ',' + map.zoom + '/' + width + 'x' + height + '?access_token=' + token )
  }
  else if (vendor === 'google'){
    vendor = 'https://maps.googleapis.com/maps/api/staticmap?center='
    return loadImage(vendor + map.lat + ',' + map.lng + '&zoom=' + map.zoom + '&scale=2' + '&size=' + width + 'x' + height + '&maptype=roadmap&format=png&visual_refresh=true')
  }
  // Load a static image from disk
};

p5.prototype.drawMap = function (img){
  translate(map.width/2, map.height/2);
  imageMode(CENTER);
  image(img, 0, 0);
};

p5.prototype.tileMap = function(lat, lng, zoom, width, height){
  // Using leaflet
  var canvas = window.getComputedStyle(document.querySelector("canvas"),null).getPropertyValue("height");
  translate(map.width/2, map.height/2);
  imageMode(CENTER);
  var div = document.createElement('div');
  document.body.appendChild(div)
  div.setAttribute('style', 'position:absolute;height:'+ height + 'px;width:' + width + 'px;top:0;left:0;z-index:-99')
  var leafletMap = L.map(div).setView([lat, lng], zoom);
  L.tileLayer("https://{s}.tiles.mapbox.com/v4/mapbox.dark/{z}/{x}/{y}@2x.png?access_token=pk.eyJ1IjoiZ2xlYWZsZXQiLCJhIjoiY2lxdWxoODl0MDA0M2h4bTNlZ2I1Z3gycyJ9.vrEWCC2nwsGfAYKZ7c4HZA")
  .addTo(leafletMap);
}

p5.prototype.latlngToPixels = function(lat, lng){
  // define projection
  return [mercatorLat(lat), mercatorLong(lng)];
};

p5.prototype.latToPixels = function(lat){
  return mercatorLat(lat) - mercatorLat(map.lat);
};

p5.prototype.lngToPixels = function(lng){
  return mercatorLong(lng) - mercatorLong(map.lng);
};

function mercatorLat(lat){
  return ((256 / PI) * pow(2, map.zoom)) * (PI - log(tan(PI / 4 + radians(lat) / 2)));
};

function mercatorLong(lng){
  return (256 / PI) * pow(2, map.zoom) * radians(lng) + PI;
}
