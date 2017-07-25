// Mappa and Three.js 

// Scene Configurations
const WIDTH = 800;
const HEIGHT = 700;
const VIEW_ANGLE = 45;
const ASPECT = WIDTH / HEIGHT;
const NEAR = 0.1;
const FAR = 10000;

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
var canvas = document.getElementById("mapa");
var renderer = new THREE.WebGLRenderer({alpha: true, canvas: canvas});

camera.position.z = 300;
scene.add(camera);
renderer.setSize(WIDTH, HEIGHT);

// Mapa
var key = 'pk.eyJ1IjoiY3ZhbGVuenVlbGEiLCJhIjoiY2l2ZzkweTQ3MDFuODJ5cDM2NmRnaG4wdyJ9.P_0JJXX6sD1oX2D0RQeWFA'
var options = {
    lat: 36.964241,
    lng: -122.013963,
    zoom: 2,
    //style: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
}

var mappa = new Mappa('Mapboxgl', key);
var myMap = mappa.tileMap(options);
myMap.overlay(canvas);
myMap.onChange(update);

// Cube
// var geometry = new THREE.BoxGeometry(1, 1, 1);
// var material = new THREE.MeshBasicMaterial({color: 0x00ff00});
// var cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

// Torus
var geometry = new THREE.TorusGeometry( 10, 3, 16, 100 );
var material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
var torus = new THREE.Mesh( geometry, material );
scene.add( torus );

function update() {
    var pos = myMap.latLngToPixel(40.744738, -73.986867);

    var vector = new THREE.Vector3();
    vector.set((pos.x / WIDTH) * 2 - 1, -(pos.y / HEIGHT) * 2 + 1, 0.5);
    vector.unproject(camera);
    var dir = vector.sub(camera.position).normalize();
    var distance = -camera.position.z / dir.z;
    var newPos = camera.position.clone().add(dir.multiplyScalar(distance));
    var zoom = myMap.zoom() * 2;

    torus.rotation.x += 0.01;
    torus.position.set(newPos.x, newPos.y, newPos.z);
}

// Animate loop
var animate = function () {
    requestAnimationFrame(animate);
    // torus.rotation.x += 0.01;
    // torus.rotation.y += 0.01;
    renderer.render(scene, camera);
};

animate();
