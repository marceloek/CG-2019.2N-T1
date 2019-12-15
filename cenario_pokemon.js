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
var loader_rock1 = new GLTFLoader().setPath( 'objects/rock/1/' );
var loader_portal = new GLTFLoader().setPath( 'objects/rock/2/' );
var loader_pokeball = new GLTFLoader().setPath( 'objects/pokeball' );
var ground_y_position = -250;
var ground_x_rotation = - Math.PI / 2;
var rayquaza_y_position = ground_y_position + 500;
var rayquaza_z_rotation = - Math.PI;
var rayquaza;
var camera_z_rotation, camera_x_rotation;

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
    ground.rotation.x = ground_x_rotation;
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
    loader_rayquaza.load('/scene.gltf',pokemon_load);

    function pokemon_load(gltf){
        rayquaza = gltf.scene.children[0];
        rayquaza.scale.set(0.7,0.7,0.7);
        rayquaza.position.set(0,rayquaza_y_position,0);
        rayquaza.rotation.z = rayquaza_z_rotation;
        scene.add(rayquaza);
    }

    // portal
    var portal;
    loader_portal.load('/scene.gltf',portal_load);

    function portal_load(gltf){
        portal = gltf.scene.children[0];
        portal.scale.set(1,1,1);
        portal.position.y = ground_y_position + 100;
        scene.add(portal);
    }

    // uffs
    var rockPosition = [
        [1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
        [1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1],
        [0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
    ];

    var pedra_z_position = -3500, pedra_x_position;

    for(var i in rockPosition){
        pedra_z_position += 400;
        pedra_x_position = -4750;

        for(var j in rockPosition[i]){
            pedra_x_position += 400;

            if(rockPosition[i][j]){
                loader_rock1.load('/scene.gltf', function(gltf) {
                    rock_load(gltf, 150, this.pedra_z_position, this.pedra_x_position);
                }.bind({pedra_z_position: pedra_z_position, pedra_x_position: pedra_x_position}));
            }
        }
    }

    function rock_load(gltf, scale, pedra_z_position, pedra_x_position){
        var rock = gltf.scene.children[0];
        rock.scale.set(scale, scale, scale);
        rock.position.y = ground_y_position + 70;
        rock.position.z = pedra_z_position;
        rock.position.x = pedra_x_position;
        scene.add(rock);
    }

    // arvores
    var tree, tree_scale;
    for(var i = 0; i < 15; i++){
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

        ajustaPosicao(tree); // ajusta posicao em caso de coordenadas muito proximas do pokemon

        tree.rotation.z = Math.PI /(Math.random()) * 100; 
        scene.add(tree);
    }

    function ajustaPosicao(tree){
        var z = 4000;
        var x = 3000;
        if((tree.position.z > -z || tree.position.z < z) && (tree.position.x > -x || tree.position.x < x)){
            var p = Math.random() > 0.5 ? 'x' : 'z';
            tree.position[p] += (tree.position[p] > 0 ? 1 : -1) * (p == 'x' ? x : z);
        }
    }

}
             
function animate() {
    requestAnimationFrame(animate);

    controls.update();

    // camera.position.x = Math.cos( camera_x_rotation ) * 80;
    // camera.position.z = Math.sin( camera_z_rotation ) * 80;
    // camera.lookAt( scene.position );

    renderer.render( scene, camera );
};

// movimentacao pokemon
function onKeyDown(event) {
    // var timer = Date.now() * 0.001;
    // camera.position.x = Math.cos( timer ) * 800;
    // camera.position.z = Math.sin( timer ) * 800;

    var keyCode = event.which;
    var velocidade = 100;
    if (keyCode == 87) {                   // w
        rayquaza.position.z -= velocidade; 
    } else if (keyCode == 83) {            // s
        rayquaza.position.z += velocidade;
    } else if (keyCode == 65) {            // a
        rayquaza.rotation.z += Math.PI / 32;
        //camera_z_rotation -= 90 * Math.PI / 2;
    } else if (keyCode == 68) {            // d
        rayquaza.rotation.z -= Math.PI / 32;
        //camera_x_rotation -= Math.PI / 360;
    } else if (keyCode == 81) {            // q
        if(rayquaza.position.y >= ground_y_position+200)
            rayquaza.position.y -= velocidade;
    } else if (keyCode == 69) {            // e
        rayquaza.position.y += velocidade;
    } else if (keyCode == 32) {            // espaco
        rayquaza.position.set(0,rayquaza_y_position,0);
        rayquaza.rotation.x = rayquaza_z_rotation /2;
        rayquaza.rotation.y = 0;
        rayquaza.rotation.z = rayquaza_z_rotation;
    }
};
document.addEventListener("keydown", onKeyDown, false);