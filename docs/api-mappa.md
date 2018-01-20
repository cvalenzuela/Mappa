---
id: api-mappa
sidebar_label: Mappa
title: Mappa
---

This is the constructor necessary to create a valid instance of Mappa. This will also add the necessary scripts and styles from the defined map provider.

```javascript
Mappa(provider, ?[key])
```
> Constructor to initialize a new Mappa instance with a defined provider and key. Returns an object.

*provider*: A valid map provider.

*key*: Map provider API key. Optional.

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