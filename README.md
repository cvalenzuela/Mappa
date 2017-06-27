# Mappa


Mappa is a library to facilitate working with existing map libraries and [p5.js](https://github.com/processing/p5.js). It provides a set of tools for displaying static and tile maps, geolocation, zoom and panning control, among other things useful when building geolocation-based visual representations.
Altought Mappa was originally designed for p5.js, it can be used with other libraries that use the canvas element as the render object.

# Usage

Just Add the library in your head tag. Mappa will automatically load any third-party map provider library when necessary.

```html
<head>
  <script src="p5.min.js"></script>
  <script src="p5maps.js"></script>
</head>
```
Then create a new Mappa instance with your prefered map provider.

```javascript
// Your API key for you map provider.
var key = 'abcdefghijklmnopqrstuvwxyz'

// Create a new Mappa instance.
var mappa = new Mappa('Your-Map-Provider', key);
```
In most cases an API is required. Check [this guide]() to learn how to get and set permission depending on your provider.

# Reference

## Static Maps
***

Mappa provides a simple interface when working with static maps. It currently supports [Google Maps Static API](https://developers.google.com/maps/documentation/static-maps/), [Mapbox Static API](https://www.mapbox.com/api-documentation/#styles) and [Mapquest Static API](https://developer.mapquest.com/documentation/static-map-api/v5/) as map providers.

Reference:

+ [staticMap()](#staticMap)

### staticMap(options)

Creates a new static map image with the provided specifications.

`staticMap(lat, lng, zoom, width, height, [optional])`

or

`staticMap(parameters)`

- Required parameters:
  + `lat`: latitude for the center of the image.
  + `lng`: longitude for the center of the image.
  + `zoom`: zoom of the image. Min 1. Max 16.
  + `width`: width in pixels.
  + `height`: height in pixels.


- Optional:
  + Google:
    + `scale`: number of pixels returned. Defaults to `1`.
    + `format`: gif, png or jpg. Defaults to .png.
    + `language`: language of the map. Defaults to english.
    + `maptype`: Type of map used. Defaults to roadmap.

      See [Google Maps Static API Documentation](https://developers.google.com/maps/documentation/static-maps/intro) for complete information.

  + Mapbox:
    + `scale`: number of pixels returned. Defaults to `1`.
    + `pitch`: tilts the map. Defaults to `0`.
    + `bearing`: rotates the map around its center. Defaults to `0`.
    + `style`: mapbox styles. default to `satellite-streets-v10`.
    + `attribution`:  boolean value to show map attribution. Defaults to `true`.
    + `logo`: boolean value to show mapbox logo on the image; defaults to `true`.

      See [Mapbox Static API Documentation](https://www.mapbox.com/api-documentation/#static) for complete information.

  + Mapquest:
    + `scale`: number of pixels returned. Defaults to `1`.
    + `type`: Type of map used. Defaults to `hyb`.
    + `scalebar`: boolean value to show a scale. Defaults to `false`.
    + `traffic`: boolena to show traffic flow. Defaults to `false`.
    + `banner`: add a custom banner.

      See [Mapquest Static API Documentation](https://developer.mapquest.com/documentation/static-map-api/v5/) for complete information.

### Example:

```javascript

// Your API key for you map provider.
var key = 'abcdefghijklmnopqrstuvwxyz'

// Create a new Mappa instance.
var mappa = new Mappa('Google', key);

// Map options
var options = {
  lat: 40.782,
  lng: -73.967,
  zoom: 10,
  width: 640,
  height: 640,
  scale: 1,
  format: 'PNG',
  language: 'en',
  maptype: 'hybrid'
}

// Create a Static Map:
var myMap = mappa.staticMap(options);
// Or you can also use:
var myMap = mappa.staticMap(40.782, -73.967, 10, 640, 640);

function preload(){
  // Load the image from the mappa instance as any other p5 image.
  img = loadImage(myMap.img);
}

function setup(){
  createCanvas(640,640);
  image(img, 0, 0);
}

```

Here are more complete examples when working with: [Google Maps](), [Mapbox]() and [Mapquest]().

## Tile Maps
***

Mappa allows to overlay p5.js canvas in top of a tile map. This is useful for interactive geolocation-based visual sketches. It currently supports [Google Maps](https://developers.google.com/maps/documentation/javascript/), [Mapbox](https://www.mapbox.com/mapbox.js/api/v3.1.1/), [Mapbox-GL](https://www.mapbox.com/mapbox-gl-js/api/) and [Mapzen](https://mapzen.com/documentation/mapzen-js/api-reference/), [Tangram](https://mapzen.com/documentation/tangram/Javascript-API/) as map providers. It also supports [Leaflet](http://leafletjs.com/) with any custom map.

Reference:
  + [tileMap()](#tileMap(options))
  + [append()]()
  + [onChange()]()
  + [latLng()]()
  + [zoom()]()
  + [pixelToLatlng()]()


### tileMap(options)

Creates a new tile map image with the provided specifications.

`tileMap(lat, lng, zoom, [optional])`

or

`tileMap(parameters)`

- Required parameters:
  + `lat`: latitude for the initial center of the map.
  + `lng`: longitude for the initial center of the map.
  + `zoom`: zoom of the image. Min 1. Max 16.

- Optional:
  + Google:

  + Mapbox:

  + Mapbox-GL:

  + Mapzen:

  + Tangram:

  + Leaflet:

### append()

Appends a canvas element to a tile map. This needs to be appended to p5 canvas.

`apennd(canvas)`

### onChange(function)

Executes a function only when the map changes(ie: zoom, panned, flyTo, moved). Useful when visualizing a lot of points to redraw the canvas.

`onChange(myFunction)`


### latLng(lat, lng)

Get pixel coordinate (x,y) for a latitude and longitude position.

`latLng(lat, lng)`

### zoom()

Get the map current zoom level.

`zoom()`

### pixelToLatlng()

Get the latitude and longitude coordinates for a (x,y) pixel position.

`pixelToLatlng(x, y)`

### Example:

```javascript
// Your API key for you map provider.
var key = 'abcdefghijklmnopqrstuvwxyz'

// Map options
var options = {
  lat: 0,
  lng: 0,
  zoom: 4
}

// Create a new Mappa instance using Mapboxgl
var mappa = new Mappa('Mapboxgl', key);
var myMap;

var canvas;

function setup(){
  canvas = createCanvas(800, 700);
  // Create a Tile Map
  myMap = mappa.tileMap(options);
  // Append the Map to the current Canvas.
  myMap.append(canvas);
}

function draw(){
  myMap.latLng(data[9], data[8]);
  ellipse(pos.x, pos.y, size, size);
}

```

## WEBGL

Mappa can be used with p5.js in WEBGL mode.
Here's a working example:

```javascript
var key = 'abcdefghijklmnopqrstuvwxyz'

var options = {
  lat: 0,
  lng: 0,
  zoom: 4,
}

// This can be any map provider.
var mappa = new Mappa('Mapboxgl', key);
var myMap;

var canvas;
var dots;

function setup(){
  canvas = createCanvas(800, 700, WEBGL);
  myMap = mappa.tileMap(options);
  myMap.append(canvas);
  dots = loadStrings('../../data/dots_shorter.csv');
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

```

## Working with GeoJSON Data

## Geocoding

## Tutorials
- Map Basics
- Tile vs static maps
- Map providers
- Workflow
- Basic Static Map
- Basic Tile Map
- Loading data
- GeoJSON and TopoJSON
- Choropleth
- Zip Codes (Ben Fry)
- All streets (Ben Fry)

# TODO
- Tests and coverage
- More examples
- Contributing guide
