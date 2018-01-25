---
id: api-onChange
sidebar_label: onChange
title: onChange Method
---

This method allows to trigger a function whenever a [`tileMap()`](#tilemapoptions) has been moved or scaled. This is useful to redraw things on the canvas only when it is necessary (the map has changed) and not every frame.

## Usage

```javascript
onChange(function);
```
> Executes a function only when the map changes (ie: zoom, panned, flyTo or moved). Useful when visualizing lots of data points.

`function`: A function to execute when the map is moved.

### Examples:
```javascript
function setup(){
  canvas = createCanvas(800, 700);
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);
  myMap.onChange(myCustomFunction);
}
```