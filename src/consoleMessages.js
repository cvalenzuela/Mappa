// Collection of console messages


let warnings = {
  staticSize: {
    google: (s, m) => {console.warn(`You requested an image with a ${s} of ${m}px. Google Maps Static API max ${s} value is 640px. For larger images, change the scale to 2 and keep the ${s} between 1-640px. i.e: if you want an image 800x800px, set the width and height to 400x400 and the scale to 2.`)},
    mapbox: (s, m) => {console.warn(`You requested an image with a ${s} of ${m}px. Mapbox Static API max ${s} value is 1024px.`)}
  },
  noKey: console.warn('Plase provide an API key for your map provider.'),
};

export { warnings };
