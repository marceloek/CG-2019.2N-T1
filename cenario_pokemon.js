import * as THREE from './libs/three.js/build/three.module.js';
import { OrbitControls } from './libs/three.js/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from './libs/three.js/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from './libs/three.js/examples/jsm/loaders/RGBELoader.js';
import { PMREMGenerator } from './libs/three.js/examples/jsm/pmrem/PMREMGenerator.js';

var scene, camera;
var loader = new THREE.TextureLoader();
var renderer = new THREE.WebGLRenderer();
var loader_poke = new GLTFLoader();

init();
animate();

function init(){
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    // cena
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog( 0xadc8f0, 5, 18000 );

    // camera
    camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.set( -5000, 500, 10 );

    // luz
    scene.add( new THREE.AmbientLight( 0x666666 ) );

    var light = new THREE.DirectionalLight( 0xffffff, 1 );
    light.position.set( 50, 200, 100 );
    light.position.multiplyScalar( 1.3 );

    scene.add( light );

    // chao
    var groundTexture = loader.load( 'textures/terrain/grasslight-big.jpg' );
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
    new RGBELoader()
        .setDataType( THREE.UnsignedByteType )
        .setPath( 'textures/sky/' )
        .load( 'loc00184-22-8k.hdr', function ( texture ) {
            var options = {
                minFilter: texture.minFilter,
                magFilter: texture.magFilter
            };
            scene.background = new THREE.WebGLRenderTargetCube( 8096, 8096, options ).fromEquirectangularTexture( renderer, texture );

            var pmremGenerator = new PMREMGenerator( renderer );
            var envMap = pmremGenerator.fromEquirectangular( texture ).texture;
            pmremGenerator.dispose();
            // model
            var loader = new GLTFLoader().setPath( 'objects/rayquaza/' );
            loader.load( 'scene.gltf', function ( gltf ) {
                gltf.scene.traverse( function ( child ) {
                    if ( child.isMesh ) {
                        child.material.envMap = envMap;
                    }
                } );
                scene.add( gltf.scene );
            } );
    } );

}
            
function animate() {
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
};