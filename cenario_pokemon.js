import * as THREE from './libs/three.js/build/three.module.js';
import { OrbitControls } from './libs/three.js/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from './libs/three.js/examples/jsm/loaders/GLTFLoader.js';

var scene, camera;
var renderer = new THREE.WebGLRenderer();
var loader = new THREE.TextureLoader();
var loader_rayquaza = new GLTFLoader().setPath( 'objects/rayquaza/' );

init();
animate();

function init(){
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    // cena
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog( 0xadc8f0, 15, 10000 );

    // ceu
    scene.background = new THREE.Color( 0x87CEEB );

    // camera
    camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 15000 );
    camera.position.set( 100, 500, 3500 );

    // luz
    scene.add( new THREE.AmbientLight( 0x666666 ) );

    var light = new THREE.DirectionalLight( 0xffffff, 1.2 );
    light.position.set( 50, 200, 100 );
    scene.add( light );

    // chao
    var groundTexture = loader.load( 'textures/terrain/21.jpg' );
    groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
    groundTexture.repeat.set( 25, 25 );
    groundTexture.anisotropy = 16;
    groundTexture.encoding = THREE.sRGBEncoding;

    var groundMaterial = new THREE.MeshLambertMaterial( { map: groundTexture } );

    var mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 20000, 20000 ), groundMaterial );
    mesh.position.y = - 150;
    mesh.rotation.x = - Math.PI / 2;
    mesh.receiveShadow = true;
    scene.add( mesh );

    // controles
    var controls = new OrbitControls( camera, renderer.domElement );
    controls.minDistance = 1000;
    controls.maxDistance = 5000;

    // pokemon
    var rayquaza;
    loader_rayquaza.load('/scene.gltf',pokemon_load);

    function pokemon_load(gltf){
        rayquaza = gltf.scene.children[0];
        scene.add(rayquaza);
    }
}
            
function animate() {
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
};