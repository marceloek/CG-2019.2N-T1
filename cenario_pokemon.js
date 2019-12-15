import * as THREE from './libs/three.js/build/three.module.js';
import { OrbitControls } from './libs/three.js/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from './libs/three.js/examples/jsm/loaders/GLTFLoader.js';

var scene, camera, controls;
var renderer = new THREE.WebGLRenderer();
var loader_ground = new THREE.TextureLoader();
var loader_rayquaza = new GLTFLoader().setPath( 'objects/rayquaza/' );
var loader_tree1 = new GLTFLoader().setPath( 'objects/tree/1/' );
var loader_tree2 = new GLTFLoader().setPath( 'objects/tree/2/' );
var loader_tree3 = new GLTFLoader().setPath( 'objects/tree/3/' );
var loader_tree4 = new GLTFLoader().setPath( 'objects/tree/4/' );
var loader_tree5 = new GLTFLoader().setPath( 'objects/tree/5/' );
var ground_y_position = -250;

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
    camera.position.set( 0, 2500, 2500 );

    // luz
    scene.add( new THREE.AmbientLight( 0xaaaaaa ) );

    var light = new THREE.DirectionalLight( 0xdfebff, 2.5 );
    light.position.set(-1500,5000,-5000 );

    scene.add( light );

    // chao
    var groundTexture = loader_ground.load( 'textures/terrain/21.jpg' );
    groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
    groundTexture.repeat.set( 25, 25 );
    groundTexture.anisotropy = 16;
    groundTexture.encoding = THREE.sRGBEncoding;

    var groundMaterial = new THREE.MeshLambertMaterial( { map: groundTexture } );

    var ground = new THREE.Mesh( new THREE.PlaneBufferGeometry( 20000, 20000 ), groundMaterial );
    ground.position.y = ground_y_position;
    ground.rotation.x = - Math.PI / 2;
    scene.add( ground );

    // controles
    controls = new OrbitControls( camera, renderer.domElement );
    controls.minDistance = 1000;
    controls.maxDistance = 4000;
    controls.enableKeys = false;
    controls.enablePan = false;

    // sol
    var geo_sol = new THREE.SphereGeometry( 1000, 80, 80 );
    var mat_sol = new THREE.MeshBasicMaterial( {color: 0xffff00} );
    var sol = new THREE.Mesh( geo_sol, mat_sol );
    sol.position.set(-1500,5000,-5000 );
    scene.add( sol );

    // pokemon
    var rayquaza;
    loader_rayquaza.load('/scene.gltf',pokemon_load);

    function pokemon_load(gltf){
        rayquaza = gltf.scene.children[0];
        rayquaza.scale.set(0.7,0.7,0.7);
        rayquaza.position.set(0,ground_y_position+500,0);
        rayquaza.rotation.z = - Math.PI;
        scene.add(rayquaza);
    }

    // arvores
    var tree, tree_scale, y_position;
    for(var i = 0; i < 20; i++){
        tree_scale = 10;
        
        loader_tree1.load('/scene.gltf', function(gltf) {
            tree_load(gltf, this.scale);
        }.bind({scale: tree_scale}));

        tree_scale = 2;

        loader_tree2.load('/scene.gltf', function(gltf) {
            tree_load(gltf, this.scale);
        }.bind({scale: tree_scale}));

        tree_scale = 2;

        loader_tree3.load('/scene.gltf', function(gltf) {
            tree_load(gltf, this.scale);
        }.bind({scale: tree_scale}));

        tree_scale = 1.2;

        loader_tree4.load('/scene.gltf', function(gltf) {
            tree_load(gltf, this.scale);
        }.bind({scale: tree_scale}));

        tree_scale = 0.8;

        loader_tree5.load('/scene.gltf', function(gltf) {
            tree_load(gltf, this.scale);
        }.bind({scale: tree_scale}));
    } 
    
    function tree_load(gltf, scale){
        tree = gltf.scene.children[0];
        tree.scale.set(scale, scale, scale);
        tree.position.y = ground_y_position;
        tree.position.z = (Math.random() > 0.5 ? -1 : 1) * (Math.random() * 5000);
        tree.position.x = (Math.random() > 0.5 ? -1 : 1) * (Math.random() * 5000);

        ajustaPosicao(tree); // ajusta posicao em caso de coordenadas muito proximas

        tree.rotation.z = Math.PI /(Math.random()) * 100; 
        scene.add(tree);
    }

    function ajustaPosicao(tree){
        var z = 2000;
        var x = 1500;
        if((tree.position.z > -z || tree.position.z < z) && (tree.position.x > -x || tree.position.x < x)){
            var p = Math.random() > 0.5 ? 'x' : 'z';
            tree.position[p] += (tree.position[p] > 0 ? 1 : -1) * (p == 'x' ? 1500 : 2000);
        }
    }

    // movimentacao pokemon
    function onKeyDown(event) {
        var keyCode = event.which;
        var velocidade = 100;
        if (keyCode == 87) {                   // w
            rayquaza.position.z -= velocidade; 
        } else if (keyCode == 83) {            // s
            rayquaza.position.z += velocidade;
        } else if (keyCode == 65) {            // a
            rayquaza.rotation.z += Math.PI / 32;
        } else if (keyCode == 68) {            // d
            rayquaza.rotation.z -= Math.PI / 32;;
        } else if (keyCode == 81) {            // q
            if(rayquaza.position.y >= ground_y_position+200)
                rayquaza.position.y -= velocidade;
        } else if (keyCode == 69) {            // e
            rayquaza.position.y += velocidade;
        } else if (keyCode == 32) {            // espaco
            rayquaza.position.set(50,500,100);
        }
    };
    document.addEventListener("keydown", onKeyDown, false);
}
            
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
};
