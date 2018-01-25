---
id: api-pixelToLatlng
sidebar_label: pixelToLatlng
title: pixelToLatlng Method
---

This method returns the latitude and longitude of a point in the canvas in reference of a [`tileMap()`](#tilemapoptions).

## Usage

```javascript
pixelToLatlng(x, y)
```
> Get the latitude and longitude coordinates for a (x,y) pixel position. Returns an object with lat and lng.

*x*: x coordinate.

*y*: xycoordinate.

### Examples:
```javascript
if (mouseIsPressed) {
  // Store the current latitude and longitude of the mouse position
  const position = myMap.pixelToLatlng(mouseX, mouseY);
}
```

An interactive example can be built like this:

<div id="example"></div>

<script src="assets/scripts/api-pixelToLatLng.js"></script>