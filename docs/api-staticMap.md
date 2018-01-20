---
id: api-staticMap
sidebar_label: staticMap
title: staticMap Method
---

Mappa provides a simple interface when working with static maps. It currently supports [Google Maps Static API v2](https://developers.google.com/maps/documentation/static-maps/), [Mapbox Static API v1](https://www.mapbox.com/api-documentation/#styles) and [Mapquest Static API v5](https://developer.mapquest.com/documentation/static-map-api/v5/).

```javascript
.staticMap(options)
```
> Creates a static map image with the provided parameters. Returns an object.

*options*: An object 

*key*: Map provider API key.

### Options for providers:
  + Static Maps:
    - `Google`
    - `Mapbox`
    - `Mapquest`

  + Tile Maps:
    - `Google`
    - `Mapbox`
    - `Mapboxgl`
    - `Leaflet`

### Examples:
```javascript
// Google API key.
var key = 'abcd'

// Create a new Mappa instance using Google.
var mappa = new Mappa('Google', key);
```

```javascript
// Create a new Mappa instance with Leaflet. No key is required
var mappa = new Mappa('Leaflet');
```