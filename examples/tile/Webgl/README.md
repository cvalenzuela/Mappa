## Using p5 in WEBGL mode

Mappa can be used with p5 in WEBGL mode. All the method's work as described, you just need to adjust the origin.

##### Complete Example:

```javascript
var key = 'abcdefghijklmnopqrstuvwxyz'

var options = {
  lat: 0,
  lng: 0,
  zoom: 4,
}

// This can be any map provider.
var mappa = new Mappa('Mapboxgl', key);
var myMap;

var canvas;
var dots;

function setup(){
  canvas = createCanvas(800, 700, WEBGL);
  myMap = mappa.tileMap(options);
  myMap.append(canvas);
  dots = loadStrings('../../data/dots_shorter.csv');
}

function draw(){
  translate(-width/2,-height/2,0);

  for (var i = 1; i < dots.length; i++) {
    var data = dots[i].split(/,/);
    pos = myMap.latLng(data[9], data[8]);

    push();
    translate(pos.x, pos.y, 0);
    rotateX(frameCount * 0.01);
    rotateY(frameCount * 0.01);
    var size = myMap.zoom()*3;
    box(size);
    pop();
  }
}
```

This will render the following sketch:

![google_tile_move](../../images/mapboxgl_webgl.gif)
