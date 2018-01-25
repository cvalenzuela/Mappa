const mappa = new Mappa('Leaflet');
const options = {
  lat: 0,
  lng: 0,
  zoom: 4,
  style: "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
};

// 01
const sketch01 = (p) => {
  p.setup = () => {
    p.createCanvas(340,340);
    p.background(100);
  };

};
let s01 = new p5(sketch01, '01');

// 02
const sketch02 = (p) => {
  let canvas;
  let myMap;

  p.setup = () => {
    canvas = p.createCanvas(340, 340);
    p.background(100);
    myMap = mappa.tileMap(0,0,4); 
    myMap.overlay(canvas);
  };
};
let s02 = new p5(sketch02, '02');

// 03
const sketch03 = (p) => {
  let canvas;
  let myMap;

  p.setup = () => {
    canvas = p.createCanvas(340,340);
    // p.background(100);
    myMap = mappa.tileMap(options); 
    myMap.overlay(canvas);
  };
};
let s03 = new p5(sketch03, '03');

// 04
const sketch04 = (p) => {
  let canvas;
  let myMap;

  p.setup = () => {
    canvas = p.createCanvas(340,340);
    // p.background(100);
    myMap = mappa.tileMap(options); 
    myMap.overlay(canvas);
    myMap.onChange(drawPoint);
    p.fill(200, 100, 100);
  };

  function drawPoint(){  
    const nigeria = myMap.latLngToPixel(11.396396, 5.076543); 
    p.ellipse(nigeria.x, nigeria.y, 20, 20);
  }
};
let s04 = new p5(sketch04, '04');

// 05
const sketch05 = (p) => {
  let canvas;
  let myMap;

  p.setup = () => {
    canvas = p.createCanvas(340,340);
    // p.background(100);
    myMap = mappa.tileMap(options); 
    myMap.overlay(canvas);
    myMap.onChange(drawPoint);
    p.fill(200, 100, 100);
  };

  function drawPoint(){  
    p.clear();
    const nigeria = myMap.latLngToPixel(11.396396, 5.076543); 
    p.ellipse(nigeria.x, nigeria.y, 20, 20);
  }
};
let s05 = new p5(sketch05, '05');
let s06 = new p5(sketch05, '06');
