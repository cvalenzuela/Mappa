---
id: api-mappa
sidebar_label: Mappa
title: Mappa
---

This is the constructor necessary to create a valid instance of Mappa. This will also add the necessary scripts and styles from the defined map provider.

## Usage

```javascript
Mappa(provider, ?[key])
```
> Constructor to initialize a new Mappa instance with a defined provider and key. Returns a mappa object.

`provider`: A valid map provider.

`key`: Map provider API key. Optional.

## Options for providers:
  + Static Maps:
    - `Google`
    - `Mapbox`
    - `Mapquest`

  + Tile Maps:
    - `Google`
    - `Mapbox`
    - `Mapboxgl`
    - `Leaflet`

## Examples:
```javascript
// Google API key.
const key = 'abcd'

// Create a new Mappa instance using Google.
const mappa = new Mappa('Google', key);
```

```javascript
// Create a new Mappa instance with Leaflet. No key is required
const mappa = new Mappa('Leaflet');
```

*You can add any maps provider libraries manually.* 

Just add an `id` with the name of the library to the script tag:
```html
  <script id="Leaflet" src="https://unpkg.com/leaflet@1.1.0/dist/leaflet.js"></script>
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.1.0/dist/leaflet.css">

  <script src="mappa.js"></script>
```