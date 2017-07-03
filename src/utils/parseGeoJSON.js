// -----------
// Parse a GeoJSON file.
// -----------

let parseGeoJSON = (data, type) => {
  let result = [];

  if (data.type === 'FeatureCollection') {
    if (data.features instanceof Array) {
      data.features.forEach(function(feature) {
        let f = eachFeature(feature, type);
        (f != undefined) && result.push(f);
      });
    }
  } else {
    result = eachFeature(data, type);
  }
  return result;
}

let eachFeature = (feature, type) => {
  if (feature.hasOwnProperty('geometry') && feature.geometry.type == type) {
    return feature.geometry.coordinates;
  } else if (feature.hasOwnProperty('geometries') && feature.geometries instanceof Array && feature.geometry.type == type) {
    feature.geometries.forEach((geometry) => {
      return feature.geometry.coordinates;
    });
  } else if (feature.hasOwnProperty('coordinates') && feature.geometry.type == type) {
    return feature.geometry.coordinates;
  }
}

export { parseGeoJSON };
