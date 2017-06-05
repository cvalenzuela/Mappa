# P5Maps

The goal of this library is to create a simple interface to use maps and spatial data with p5.
While mixing other libraries (D3, leaflet, etc) with p5 is an option to achieve similar results, this add-on tries to simplify the workflow by managing only one common API.

# Possible Elements

  - Tile Maps as canvas background:
    - Drag
    - Resize (canvas)
  - Static Maps: google maps, mapbox
  - Different Projections:
    - Azimuthal
    - Conic
    - Cylindrical (Tangent and Secant versions)
      - Equivalant area projections: cylindrical equal area, sinusoidal projection, Goode's Homolosine Equal-Area
      - Conformal projections: Mercator and Gnomic
  - Multiple Maps
  - Cartograms?
  - [Render Queue](http://bl.ocks.org/syntagmatic/raw/3341641/)
  - [Hidden Canvas Lookups](https://bocoup.com/blog/2d-picking-in-canvas)
  - GeoPaths
  - Toggling between map and sketch
  - Loading data: TopoJSON, GeoJSON
  - Geocoder Support
  - Animations and transitions
  - Markers
  - Overlaying images into maps
  - Unfolding Maps as reference?
  - Workflow from creating maps in QGis and/or Mapbox Studio and adding them to p5 sketches.

# TODO

## Documentation

## Examples
  - Basic Static Map
  - Basic Tile Map
  - Loading data
  - GeoJSON and TopoJSON
  - Choropleth
  - Zip Codes (Ben Fry)
  - All streets (Ben Fry)

## Tutorials
  - Map Basics
  - Tile vs static maps
  - Map providers
  - Workflow
