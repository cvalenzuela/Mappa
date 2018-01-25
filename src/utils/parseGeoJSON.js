// -----------
// Parse a GeoJSON file.
// -----------

const eachFeature = (feature, type) => {
  if (feature.hasOwnProperty('geometry') && feature.geometry.type === type) {
    return feature.geometry.coordinates;
  } else if (feature.hasOwnProperty('geometries') && feature.geometries instanceof Array && feature.geometry.type === type) {
    feature.geometries.forEach((geometry) => {
      return feature.geometry.coordinates;
    });
  } else if (feature.hasOwnProperty('coordinates') && feature.geometry.type === type) {
    return feature.geometry.coordinates;
  } else {
    return null;
  }
};

const parseGeoJSON = (data, type) => {
  let result = [];

  if (data.type === 'FeatureCollection') {
    if (data.features instanceof Array) {
      data.features.forEach((feature) => {
        const f = eachFeature(feature, type);
        if (f != undefined) {
          result.push(f);
        }
      });
    }
  } else {
    result = eachFeature(data, type);
  }
  return result;
};

export default parseGeoJSON;
