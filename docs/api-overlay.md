---
id: api-overlay
sidebar_label: overlay
title: overlay Method
---

Mappa consists of only one class that has multiple methods and attributes. You first need to create a `Mappa` instance in order to use it.

## Constructor

```javascript
Mappa(provider, ?[key]);
```
> Constructor to initialize a new Mappa instance with a defined provider and key. Returns an object.

*provider*: A valid map provider.

*key*: Map provider API key.

### Definition

This is the constructor necessary to create a valid instance of Mappa. This will also add the necessary scripts and styles from the defined map provider.

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