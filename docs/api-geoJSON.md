---
id: api-geoJSON
sidebar_label: geoJSON
title: geoJSON Method
---

This method is useful when loading [GeoJSON files](glossary/#geojson). It will return an array with the specified GeoJSON features. It can be used with [staticMap()](#staticmapoptions) and [tileMap()](#tilemapoptions).

## Constructor

```javascript
geoJSON(data, featureType)
```
> Parses a geoJSON file and store all coordinates in an array. Returns an array.

*data*: A valid geoJSON file.

*featureType*: Feature type to get.

Types of Feature:
  + `Point`
  + `LineString`
  + `Polygon`
  + `MultiPoint`
  + `MultiLineString`
  + `MultiPolygon`
  + `GeometryCollection`

### Examples:
```javascript
let data;
let polygons;

function preload(){
  // Load a GeoJSON file using p5 loadJSON.
  data = loadJSON('world.geojson');
}

function setup(){
  createCanvas(640, 640);
  // Store all Polygons features in an array called polygons.
  polygons = myMap.geoJSON(data, 'Polygon')
}
```
