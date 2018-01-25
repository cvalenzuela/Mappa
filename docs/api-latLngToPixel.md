---
id: api-latLngToPixel
sidebar_label: latLngToPixel
title: latLngToPixel Method
---

This method allows to get the pixel position of a latitude and longitude coordinates in relationship to a [`staticMap()`](#staticmapoptions) or a [`tileMap()`](#tilemapoptions).

## Usage

```javascript
latLngToPixel(lat, lng)
```
> Get pixel position (x,y) for latitude and longitude coordinates. Returns an object with x and y position.

*lat*: Latitude.

*lng*: Longitude.

### Examples:
```javascript
// Get the pixel position for Central Park.
const pos = myMap.latLngToPixel(40.782, -73.967);
// Draw an ellipse using pos
ellipse(pos.x, pos.y, 10, 10);
```