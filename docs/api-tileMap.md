---
id: api-tileMap
sidebar_label: tileMap
title: tileMap Method
---

Mappa allows to overlay a canvas element on top of tile maps. This is useful for interactive geolocation-based visual sketches. It currently supports [Google Maps v3.28](https://developers.google.com/maps/documentation/javascript/), [Mapbox v3.1.1](https://www.mapbox.com/mapbox.js/api/v3.1.1/) and [Mapbox-GL v0.37.0](https://www.mapbox.com/mapbox-gl-js/api/) as map providers. It also supports [Leaflet v1.0.3](http://leafletjs.com/) with any custom set of tiles. 

## Usage

[`tileMap()`](api-tileMap.md) will only create the reference to a tile map. In order to visualize the map, [`overlay()`](api-overlay.md) must be used.

```javascript
.tileMap(lat, lng, zoom, ?options)
```
or
```javascript
.tileMap(options)
```
> Creates a tile map with the provided parameters. With p5.js, this method needs to be called inside [`setup()`](https://p5js.org/reference/#/p5/setup). It needs to be used together with [`overlay()`](api-overlay.md) to display a map.

Required parameters:
+ `lat`: latitude for the center of the image.
+ `lng`: longitude for the center of the image.
+ `zoom`: zoom of the image. Min 1. Max 16.

Optional:
+ Google:
  - `mapTypeId`: type of map. Defaults to `terrain`.
  - `styles`: custom map styles. See [Google Maps Style Reference](https://developers.google.com/maps/documentation/javascript/examples/style-array).

  For a complete reference visit [Google Maps Documentation](https://developers.google.com/maps/documentation/javascript/).

+ Mapbox:
  - `studio`: boolean to set if the custom style where made in [Mapbox Studio](https://www.mapbox.com/studio/styles/). Defaults to `false`.
  - `style`: map style. Defaults to `mapbox.satellite`. If `studio` is set to `true` you can use styles like this `'mapbox://styles/username/mapid'` to use [Mapbox Studio](https://www.mapbox.com/studio/styles/) styles.

  For a complete reference visit [Mapbox Documentation](https://www.mapbox.com/mapbox.js/api/v3.1.1/).

+ MapboxGL:
  - `style`: map style. Defaults to `mapbox://styles/mapbox/satellite-streets-v10`.
  - `minZoom`: map min zoom. Defaults to `0`.
  - `maxZoom`: map max zoom. Defaults to `22`.
  - `bearing`: rotation of the map around its center. Defaults to `0`.
  - `pitch`: tilts the map. Defaults to `0`.
  - `renderWorldCopies`: render multiple copies of the map. Defaults to `true`.
  - `maxBounds`: maps max bounds. Defaults to `undefined`.

  For a complete reference visit [Mapbox GL Documentation](https://www.mapbox.com/mapbox-gl-js/api/).

+ Leaflet:
  - `style`: tile style to be used. Defaults to `http://{s}.tile.osm.org/{z}/{x}/{y}.png`.

### Examples:
```javascript
let canvas;
let myMap;

function setup(){
  canvas = createCanvas(800, 700);
  // Create a tile map centered in
  // New York with an initial zoom level of 10.
  myMap = mappa.tileMap(40.782, -73.967, 10);
}
```

```javascript
let canvas;
let myMap;

const options = {
  lat: 40.782,
  lng: -73.967,
  zoom: 10,
}
function setup(){
  canvas = createCanvas(800, 700);
  // Create a tile map centered in
  // New York with an initial zoom level of 10.
  myMap = mappa.tileMap(options)
}
```