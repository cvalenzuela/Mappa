var data;
var pollutionMap;
var mappa = new Mappa();
var canvas;
var smokeInTheWorld;
var options = {
  lat: 0,
  lng: 0,
  zoom: 1,
  width: window.innerWidth,
  height: window.innerHeight
}

function preload() {
  data = loadTable("data/co2_emissions.csv", "csv", "headers");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  pollutionMap = mappa.staticMap(options);

  smokeInTheWorld = smokemachine(canvas.elt.getContext('2d'), [54, 16.8, 18.2]);
  smokeInTheWorld.start();

  for(var country = 1; country < data.getRowCount(); country++){
    var pos = pollutionMap.latLngToPixel(data.getString(country, 1), data.getString(country, 2));
    var co2 = map(data.getString(country, 3), 0.01 , 10357, 0.1, 1);
    data.setNum(country, 1, pos.x);
    data.setNum(country, 2, pos.y);
    data.setNum(country, 3, co2);
  }
  noStroke();
  fill(54, 16.8, 18.2);
}

setInterval(function(){
  for(var country = 1; country < data.getRowCount(); country++){
    var co2 = data.getNum(country, 3);
    smokeInTheWorld.addsmoke(data.getNum(country, 1), data.getNum(country, 2), 5*co2, random(3000,4000), co2);
  }
}, 20)
