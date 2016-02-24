/// <reference path="_reference.ts"/>
/*
MAIN GAME FILE

Source file	name:       game.ts
Author’s name:	        George Savcheko
Last modified by:       George Savchenko
Date last modified:     2016-02-24
Program	description:    Using the Three.js JavaScript Library and TypeScript, create a web application that displays a fictitious solar system.	The
                        solar system should have a central Sun object with at least 5 planets that orbit around it. One of the planets must have a
                        moon that orbits around it. Include controls that allows the user to zoom the camera out to see the solar system and zoom in
                        to view the planet with a moon.
Revision history:       Added zoom functionality, made universe darker

THREEJS Aliases
*/
var Scene = THREE.Scene;
var Renderer = THREE.WebGLRenderer;
var PerspectiveCamera = THREE.PerspectiveCamera;
var BoxGeometry = THREE.BoxGeometry;
var CubeGeometry = THREE.CubeGeometry;
var PlaneGeometry = THREE.PlaneGeometry;
var SphereGeometry = THREE.SphereGeometry;
var Geometry = THREE.Geometry;
var AxisHelper = THREE.AxisHelper;
var LambertMaterial = THREE.MeshLambertMaterial;
var MeshPhongMaterial = THREE.MeshPhongMaterial;
var MeshBasicMaterial = THREE.MeshBasicMaterial;
var Material = THREE.Material;
var Mesh = THREE.Mesh;
var Object3D = THREE.Object3D;
var SpotLight = THREE.SpotLight;
var PointLight = THREE.PointLight;
var AmbientLight = THREE.AmbientLight;
var Control = objects.Control;
var GUI = dat.GUI;
var Color = THREE.Color;
var Vector3 = THREE.Vector3;
var Face3 = THREE.Face3;
var Point = objects.Point;
//Custom Game Objects
var gameObject = objects.gameObject;
var scene;
var renderer;
var camera;
var axes;
var cube;
var head;
var cubeMaterial;
var cubeGeometry;
var sphereMaterial;
var sphereGeometry;
var sun;
var earth;
var leftLeg;
var rightLeg;
var lowerTorso;
var body;
var leftArm;
var rightArm;
var leftFoot;
var rightFoot;
var lamberMaterial;
var plane;
var sphere;
var ambientLight;
var spotLight;
var pointLight;
var control;
var gui;
var stats;
var step = 0;
//var spriteMaterial = THREE.SpriteMaterial;
var pivot1 = new THREE.Object3D();
var pivot2 = new THREE.Object3D();
var pivot3 = new THREE.Object3D();
var pivot4 = new THREE.Object3D();
var pivot5 = new THREE.Object3D();
var pivot6 = new THREE.Object3D();
var pivot7 = new THREE.Object3D();
var pivot8 = new THREE.Object3D();
var pivot9 = new THREE.Object3D();
var pivot10 = new THREE.Object3D();
// Initialize Scene Objects
function init() {
    // Instantiate a new Scene object
    scene = new Scene();
    setupRenderer(); // setup the default renderer	
    setupCamera(); // setup the camera
    // Add an axis helper to the scene
    axes = new AxisHelper(20);
    scene.add(axes);
    console.log("Added Axis Helper to scene...");
    // Add a Plane to the Scene (does not rotate with cube man)
    //  plane = new gameObject(
    //     new PlaneGeometry(60, 40, 1, 1),
    //    new LambertMaterial({ color: 0x66cd00 }),
    //    0, 0, 0);
    // plane.rotation.x = -0.5 * Math.PI;
    // scene.add(plane);
    // console.log("Added Plane Primitive to scene...");
    //Add point light
    pointLight = new PointLight(0xffffff, 1, 0);
    pointLight.position.set(0, 0, 0);
    pointLight.castShadow = true;
    scene.add(pointLight);
    // Add an AmbientLight to the scene
    ambientLight = new AmbientLight(0x090909);
    scene.add(ambientLight);
    console.log("Added an Ambient Light to Scene");
    // Add a SpotLight to the scene
    spotLight = new SpotLight(0xffffff);
    spotLight.position.set(0, 60, 0);
    // spotLight.castShadow = true;
    scene.add(spotLight);
    console.log("Added a SpotLight Light to Scene");
    // Add a SpotLight to the scene
    spotLight = new SpotLight(0xffffff);
    spotLight.position.set(-85, -60, 85);
    // spotLight.castShadow = true;
    scene.add(spotLight);
    console.log("Added a SpotLight Light to Scene");
    addPlanets();
    // Add controls using DAT.GUI to allow user to rotate cube man
    gui = new GUI();
    control = new Control();
    addControl(control);
    // Add framerate stats
    addStatsObject();
    console.log("Added Stats to scene...");
    document.body.appendChild(renderer.domElement);
    gameLoop(); // render the scene	
    window.addEventListener('resize', onResize, false);
}
function addPlanets() {
    //Sun Texture
    // sun = new THREE.Mesh(
    //    new SphereGeometry(10, 20, 20),
    //    new THREE.MeshPhongMaterial({
    //        map: THREE.ImageUtils.loadTexture('Content/Textures/sun.png'),
    //       shininess: 100,
    //   })
    // );
    // scene.add(sun);
    //Sun
    sphereGeometry = new SphereGeometry(10, 20, 20);
    sphereMaterial = new LambertMaterial({ color: 0xfd8813 });
    sun = new Mesh(sphereGeometry, sphereMaterial);
    scene.add(sun);
    //Earth
    sphereGeometry = new SphereGeometry(0.92, 20, 20);
    sphereMaterial = new LambertMaterial({ color: 0x0000a0 });
    earth = new Mesh(sphereGeometry, sphereMaterial);
    scene.add(earth);
    scene.updateMatrixWorld(true);
    pivot1.rotation.z = 0;
    pivot2.rotation.z = 2 * Math.PI / 3;
    pivot3.rotation.z = 4 * Math.PI / 3;
    pivot4.rotation.z = 6 * Math.PI / 3;
    pivot5.rotation.z = 8 * Math.PI / 3;
    pivot6.rotation.z = 10 * Math.PI / 3;
    pivot7.rotation.z = 12 * Math.PI / 3;
    pivot8.rotation.z = 14 * Math.PI / 3;
    pivot9.rotation.z = 16 * Math.PI / 3;
    pivot10.rotation.z = 0;
    sun.add(pivot1);
    sun.add(pivot2);
    sun.add(pivot3);
    sun.add(pivot4);
    sun.add(pivot5);
    sun.add(pivot6);
    sun.add(pivot7);
    sun.add(pivot8);
    sun.add(pivot9);
    earth.add(pivot10);
    //mesh
    sphereGeometry = new SphereGeometry(0.36, 20, 20);
    sphereMaterial = new LambertMaterial({ color: 0xe6e6e6 });
    var mercury = new Mesh(sphereGeometry, sphereMaterial);
    sphereGeometry = new SphereGeometry(0.88, 20, 20);
    sphereMaterial = new LambertMaterial({ color: 0xa57c1b });
    var venus = new Mesh(sphereGeometry, sphereMaterial);
    // sphereGeometry = new SphereGeometry(0.92, 20, 20);
    // sphereMaterial = new LambertMaterial({color: 0x0000a0});   
    // var earth = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphereGeometry = new SphereGeometry(0.2, 20, 20);
    sphereMaterial = new LambertMaterial({ color: 0xfefcd7 });
    var moon = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphereGeometry = new SphereGeometry(0.48, 20, 20);
    sphereMaterial = new LambertMaterial({ color: 0xa1251b });
    var mars = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphereGeometry = new SphereGeometry(1.03, 20, 20);
    sphereMaterial = new LambertMaterial({ color: 0xd8ca9d });
    var jupiter = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphereGeometry = new SphereGeometry(0.87, 20, 20);
    sphereMaterial = new LambertMaterial({ color: 0xa1251b });
    var saturn = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphereGeometry = new SphereGeometry(0.37, 20, 20);
    sphereMaterial = new LambertMaterial({ color: 0xa1251b });
    var uranus = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphereGeometry = new SphereGeometry(0.36, 20, 20);
    sphereMaterial = new LambertMaterial({ color: 0xa1251b });
    var neptune = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphereGeometry = new SphereGeometry(0.05, 20, 20);
    sphereMaterial = new LambertMaterial({ color: 0xa1251b });
    var notaPlanet = new THREE.Mesh(sphereGeometry, sphereMaterial);
    mercury.position.y = 0;
    venus.position.y = 0;
    earth.position.y = 0;
    moon.position.y = 0;
    mars.position.y = 0;
    jupiter.position.y = 0;
    saturn.position.y = 0;
    uranus.position.y = 0;
    neptune.position.y = 0;
    notaPlanet.position.y = 0;
    mercury.position.z = 11.7;
    venus.position.z = 13.2;
    earth.position.z = 15.4;
    moon.position.z = 3;
    mars.position.z = 17.8;
    jupiter.position.z = 20.7;
    saturn.position.z = 33.8;
    uranus.position.z = 63;
    neptune.position.z = 95.7;
    notaPlanet.position.z = 125;
    pivot1.add(mercury);
    pivot2.add(venus);
    pivot3.add(earth);
    pivot4.add(mars);
    pivot5.add(jupiter);
    pivot6.add(saturn);
    pivot7.add(uranus);
    pivot8.add(neptune);
    pivot9.add(notaPlanet);
    pivot10.add(moon);
    // var spriteMaterial = new THREE.SpriteMaterial({
    //     map: THREE.ImageUtils.loadTexture('textures/glow.png'),
    //     color: 0x0000ff, transparent: false, blending: THREE.AdditiveBlending
    //  });
    // var sprite = new THREE.Sprite(spriteMaterial);
    // sprite.scale.set(200, 200, 1.0);
    // sun.add(sprite);
}
// Change camera view based on browser window size
function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
// Add controls to control object to allow user to rotate cube man on any axis
function addControl(controlObject) {
    gui.add(controlObject, 'zoomInOut'); // Change default colours
}
// Add stats window for scene info
function addStatsObject() {
    stats = new Stats();
    stats.setMode(0);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    document.body.appendChild(stats.domElement);
}
// Setup main game loop
function gameLoop() {
    stats.update();
    pivot1.rotation.y += 0.025;
    pivot2.rotation.y += 0.022;
    pivot3.rotation.y += 0.02;
    pivot4.rotation.y += 0.019;
    pivot5.rotation.y += 0.016;
    pivot6.rotation.y += 0.013;
    pivot7.rotation.y += 0.01;
    pivot8.rotation.y += 0.015;
    pivot9.rotation.y += 0.001;
    pivot10.rotation.y += 0.03;
    camera.position.x = control.positionX;
    camera.position.y = control.positionY;
    camera.position.z = control.positionZ;
    camera.lookAt(control.face);
    //set body mesh to rotate based on control panel changes
    //  body.rotation.x += control.rotationSpeedx;
    // body.rotation.y += control.rotationSpeedy;
    // body.rotation.z += control.rotationSpeedz;
    // render using requestAnimationFrame
    requestAnimationFrame(gameLoop);
    // render the scene
    renderer.render(scene, camera);
}
// Setup default renderer
function setupRenderer() {
    renderer = new Renderer();
    renderer.setClearColor(0x090909, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    console.log("Finished setting up Renderer...");
}
// Setup main (perspective) camera for the scene
function setupCamera() {
    camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    // camera.position.x = -125;
    //camera.position.y = 135;
    //camera.position.z = 125;
    camera.lookAt(new Vector3(5, 0, 0));
    console.log("Finished setting up Camera...");
}
//# sourceMappingURL=game.js.map