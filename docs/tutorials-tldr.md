---
id: tldr-p5
title: tl;dr with p5.js
---

Quick reference:

```javascript

// Your Mapboxgl API Key
var key = 'abcd'

// Create a new Mappa instance using Mapboxgl.
var mappa = new Mappa('Mapboxgl', key);
var myMap;
var canvas;

function setup(){
  canvas = createCanvas(640,640);
  myMap = mappa.tileMap(0,0,4); // lat 0, lng 0, zoom 4
  myMap.overlay(canvas)
}

function draw(){
  ...
}

```