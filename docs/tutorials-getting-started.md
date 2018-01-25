---
id: getting-started
title: Getting Started
---

Mappa.js allows you to overlay a `<canvas>` on top of a tile map. It also provides a set of tools for working with static maps, interactive tile maps and geo-data among other tools useful when building geolocation-based visual representations. 

Mappa was originally designed for <a href="https://github.com/processing/p5.js"><img src="assets/img/p5js.svg" class="p5logo"/></a>, but it can be used with plain javascript or with other libraries that use the canvas element as the render object.

## Usage

Download the [full](dist/mappa.js), [minified](dist/mappa.min.js) or use the online version and add it to the head section of your HTML document. Mappa will automatically load the required map libraries when necessary.

```html
<script src="mappa.min.js" type="text/javascript"></script>
```
or
```html
<script src="https://unpkg.com/mappa-mundi/dist/mappa.min.js" type="text/javascript"></script>
```

If you are using npm:
```bash
npm install mappa-mundi
```

Then create a `new Mappa` instance with your preferred map provider.

```javascript
// API key for map provider.
var key = 'abcd'

// Create a new Mappa instance.
var mappa = new Mappa('Map-Provider', key);
```

If you are new to web maps, check out the [Introduction to Web Maps](tutorials-introduction-to-web-maps.md) and the [Simple Map Tutorial](tutorials-simple-map.md).

For tile maps you can use [Google Maps](https://developers.google.com/maps/documentation/javascript/), [Mapbox](https://www.mapbox.com/mapbox.js/api/v3.1.1/), [Mapbox GL](https://www.mapbox.com/mapbox-gl-js/api/) and [Leaflet](http://leafletjs.com/) with any set of custom tiles.

For static maps, [Google Maps Static API](https://developers.google.com/maps/documentation/static-maps/), [Mapbox Static API](https://www.mapbox.com/help/define-static-api/) and [Mapquest Static API](https://developer.mapquest.com/documentation/static-map-api/v5/) are supported.