/// <reference path="_reference.ts"/>
/*
MAIN GAME FILE

Source file	name:       game.ts
Author’s name:	        George Savcheko
Last modified by:       George Savchenko
Date last modified:     2016-02-10
Program	description:    Using the Three.js JavaScript Library and TypeScript, create a web application that displays a fictitious solar system.	The
                        solar system should have a central Sun object with at least 5 planets that orbit around it. One of the planets must have a
                        moon that orbits around it. Include controls that allows the user to zoom the camera out to see the solar system and zoom in
                        to view the planet with a moon.
Revision history:       Initial Commit - File Setup

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
var texture = new THREE.MeshPhongMaterial({ map: THREE.ImageUtils.loadTexture('textures/texture.png') });
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
    plane = new gameObject(new PlaneGeometry(60, 40, 1, 1), new LambertMaterial({ color: 0x66cd00 }), 0, 0, 0);
    plane.rotation.x = -0.5 * Math.PI;
    scene.add(plane);
    console.log("Added Plane Primitive to scene...");
    //Add point light
    pointLight = new PointLight(0xffffff, 1000, 0);
    pointLight.position.set(0, 15, 0);
    pointLight.castShadow = true;
    scene.add(pointLight);
    // Add an AmbientLight to the scene
    ambientLight = new AmbientLight(0x090909);
    scene.add(ambientLight);
    console.log("Added an Ambient Light to Scene");
    // Add a SpotLight to the scene
    // spotLight = new SpotLight(0xffffff);
    // spotLight.position.set(-40, 60, 10);
    // spotLight.castShadow = true;
    // scene.add(spotLight);
    // console.log("Added a SpotLight Light to Scene");
    //Sun
    sphereGeometry = new SphereGeometry(10, 20, 20);
    sphereMaterial = new LambertMaterial({ color: 0xfd8813 });
    sun = new Mesh(sphereGeometry, sphereMaterial);
    scene.add(sun);
    // Add controls using DAT.GUI to allow user to rotate cube man
    gui = new GUI();
    control = new Control(0.00);
    addControl(control);
    // Add framerate stats
    addStatsObject();
    console.log("Added Stats to scene...");
    document.body.appendChild(renderer.domElement);
    gameLoop(); // render the scene	
    window.addEventListener('resize', onResize, false);
}
// Change camera view based on browser window size
function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
// Add controls to control object to allow user to rotate cube man on any axis
function addControl(controlObject) {
    gui.add(controlObject, 'rotationSpeedx', -0.5, 0.5); // Rotation on x
    gui.add(controlObject, 'rotationSpeedy', -0.5, 0.5); // Rotation on y
    gui.add(controlObject, 'rotationSpeedz', -0.5, 0.5); // Rotation on z
    gui.add(controlObject, 'changeColors'); // Change default colours
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
    renderer.setClearColor(0xEEEEEE, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    console.log("Finished setting up Renderer...");
}
// Setup main (perspective) camera for the scene
function setupCamera() {
    camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = -25;
    camera.position.y = 35;
    camera.position.z = 25;
    camera.lookAt(new Vector3(5, 0, 0));
    console.log("Finished setting up Camera...");
}
//# sourceMappingURL=game.js.map