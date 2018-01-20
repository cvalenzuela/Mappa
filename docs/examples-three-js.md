---
id: examples-three-js
sidebar_label: Three.js
title: Three.js Example
---

Visualizing the 5000 largest meteorite landings in the world with Mappa + MapboxGl + p5 in WebGL.

Data from [NASA's Open Data Portal.](https://data.nasa.gov/Space-Science/Meteorite-Landings/gh4g-9sfh)

## [Demo](https://cvalenzuela.github.io/Mappa/examples/tile/Threejs/)

<div class="example">
  <div id="canvasContainer"></div>
</div>

## Code

Get it from [here](https://github.com/cvalenzuela/Mappa/tree/master/examples/tile/Threejs)

```javascript
// Load the CSV with d3-request
var dataLoaded = false;
var meteorites;
var meshes = [];
var material = new THREE.MeshLambertMaterial({color: 0xff0000, side: 2, shading: THREE.FlatShading});

d3.csv("../../data/Meteorite_Landings.csv", function(d) {
  return {
    lat: d.reclat,
    lng: d.reclong,
    size: d['mass (g)'] 
  };
}, function(data) {
    meteorites = data;
    for (var i = 0; i < 100; i++){
        var radius = convertRange(data[i].size, [558, 60000000], [2, 15]);
        var tube = convertRange(data[i].size, [558, 60000000], [0.4, 4]);
        var geometry = new THREE.TorusGeometry( radius, tube, 16, 100 );
        meshes.push(new THREE.Mesh(geometry, material));
    }
    dataLoaded = true;
});

function convertRange( value, r1, r2 ) { 
    return ( value - r1[ 0 ] ) * ( r2[ 1 ] - r2[ 0 ] ) / ( r1[ 1 ] - r1[ 0 ] ) + r2[ 0 ];
}

// Scene Configurations
const WIDTH = 800;
const HEIGHT = 700;
const VIEW_ANGLE = 45;
const ASPECT = WIDTH / HEIGHT;
const NEAR = 0.1;
const FAR = 10000;

// Scene, camera, canvas, renderer
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
var canvas = document.getElementById("mapa");
var renderer = new THREE.WebGLRenderer({alpha: true, canvas: canvas});

camera.position.z = 300;
scene.add(camera);
renderer.setSize(WIDTH, HEIGHT);

// Light
var light = new THREE.PointLight(0xffffff, 1.2);
light.position.set(0, 0, 6);
scene.add(light);

// API Key for Mapboxgl. Get one here:
// https://www.mapbox.com/studio/account/tokens/
var key = 'xyz'

var options = {
    lat: 0,
    lng: 0,
    zoom: 2,
    pitch: 50
    //style: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
}

var mappa = new Mappa('Mapboxgl', key);
var myMap = mappa.tileMap(options);
myMap.overlay(canvas);
myMap.onChange(update);

function update() {
    if(dataLoaded){
        meshes.forEach(function(mesh, item){
            var pos = myMap.latLngToPixel(meteorites[item].lat , meteorites[item].lng);
            var vector = new THREE.Vector3();
            vector.set((pos.x / WIDTH) * 2 - 1, -(pos.y / HEIGHT) * 2 + 1, 0.5);
            vector.unproject(camera);
            var dir = vector.sub(camera.position).normalize();
            var distance = -camera.position.z / dir.z;
            var newPos = camera.position.clone().add(dir.multiplyScalar(distance));

            mesh.position.set(newPos.x, newPos.y, newPos.z);
            scene.add(mesh);
        })
    }
}

// Animate loop
var animate = function () {
    requestAnimationFrame(animate);
    if(dataLoaded){
        meshes.forEach(function(mesh){
            mesh.rotation.x += 0.01;
            mesh.rotation.y += 0.01;
        })
    }
    renderer.render(scene, camera);
};

animate();
```
