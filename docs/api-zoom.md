---
id: api-zoom
sidebar_label: zoom
title: zoom Method
---

This method allows to get a [`tileMap()`](#tilemapoptions) current zoom level.

## Usage

```javascript
Mappa(provider, ?[key]);
```
> Get the map current zoom level. Returns a number.

### Examples:
```javascript
// Get the pixel position for Central Park.
const zoom = myMap.zoom();
// Change the size of an ellipse depending on the map zoom.
ellipse(20, 20 , zoom, zoom);
```
