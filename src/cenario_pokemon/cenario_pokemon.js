var scene, camera;
var loader = new THREE.TextureLoader();

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// cena
scene = new THREE.Scene();

// ceu
var skyTexture = loader.load( '../../textures/sky/cloud-21.jpg' );
scene.background = skyTexture;
scene.fog = new THREE.Fog( 0xadc8f0, 5, 12000 );

// camera
camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 1, 10000 );
camera.position.set( 1000, 250, 1500 );

// luz
scene.add( new THREE.AmbientLight( 0x666666 ) );

var light = new THREE.DirectionalLight( 0xffffff, 0.8 );
light.position.set( 50, 200, 100 );
light.position.multiplyScalar( 1.3 );

scene.add( light );

// chao
var groundTexture = loader.load( '../../textures/terrain/grasslight-big.jpg' );
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
var controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.minDistance = 1000;
controls.maxDistance = 5000;
            
var animate = function () {
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
};

animate();
