// Lealfet
// Reference

let url = "https://{s}.tiles.mapbox.com/v4/";
(OPTIONS.style) ? url += OPTIONS.style: url += 'mapbox.light';
url += '/{z}/{x}/{y}@2x.png?access_token='
url += OPTIONS.key
let leafletMap = L.map(div).setView([options.lat, options.lng], options.zoom);
L.tileLayer(url).addTo(leafletMap);
