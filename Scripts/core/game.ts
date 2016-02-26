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
Revision history:       changed ambient light colour to make sun look illuminated

THREEJS Aliases
*/ 

import Scene = THREE.Scene;
import Renderer = THREE.WebGLRenderer;
import PerspectiveCamera = THREE.PerspectiveCamera;
import BoxGeometry = THREE.BoxGeometry;
import CubeGeometry = THREE.CubeGeometry;
import PlaneGeometry = THREE.PlaneGeometry;
import SphereGeometry = THREE.SphereGeometry;
import Geometry = THREE.Geometry;
import AxisHelper = THREE.AxisHelper;
import LambertMaterial = THREE.MeshLambertMaterial;
import MeshPhongMaterial = THREE.MeshPhongMaterial;
import MeshBasicMaterial = THREE.MeshBasicMaterial;
import Material = THREE.Material;
import Mesh = THREE.Mesh;
import Object3D = THREE.Object3D;
import SpotLight = THREE.SpotLight;
import PointLight = THREE.PointLight;
import AmbientLight = THREE.AmbientLight;
import Control = objects.Control;
import GUI = dat.GUI;
import Color = THREE.Color;
import Vector3 = THREE.Vector3;
import Face3 = THREE.Face3;
import Point = objects.Point;

//Custom Game Objects
import gameObject = objects.gameObject;

var scene: Scene;
var renderer: Renderer;
var camera: PerspectiveCamera;
var axes: AxisHelper;
var sphereMaterial;
var sphereGeometry;
var lamberMaterial;
var sphere: Mesh;
var ambientLight: AmbientLight;
var spotLight: SpotLight;
var pointLight: PointLight;
var control: Control;
var gui: GUI;
var stats: Stats;

var mercuryPivot = new THREE.Object3D();
var venusPivot = new THREE.Object3D();
var earthPivot = new THREE.Object3D();
var marsPivot = new THREE.Object3D();
var jupiterPivot = new THREE.Object3D();
var saturnPivot = new THREE.Object3D();
var uranusPivot = new THREE.Object3D();
var neptunePivot = new THREE.Object3D();
var notaPlanetPivot = new THREE.Object3D();
var moonPivot = new THREE.Object3D();

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
     
    //Add point light
    pointLight = new PointLight(0xffffff, 2, 0);
    pointLight.position.set(0,0,0);
    pointLight.castShadow = true;
    scene.add(pointLight);
    
    // Add an AmbientLight to the scene
    ambientLight = new AmbientLight(0xffffff);
    scene.add(ambientLight);
    console.log("Added an Ambient Light to Scene");
    
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

function addPlanets(): void{
   
    // Sun
    sphereGeometry = new SphereGeometry(10, 20, 20);
    sphereMaterial = new LambertMaterial({color: 0xfd8813});    
    var sun = new Mesh(sphereGeometry, sphereMaterial);
    scene.add(sun);
    
    // Mercury 
    sphereGeometry = new SphereGeometry(0.36, 20, 20);
    sphereMaterial = new LambertMaterial({color: 0xe6e6e6});    
    var mercury = new Mesh(sphereGeometry, sphereMaterial);
    
    sun.add(mercuryPivot);
    mercuryPivot.rotation.z = 0;
    mercury.position.y = 0;
    mercury.position.z = 11.7;
    mercuryPivot.add(mercury);
    
    // Venus
    sphereGeometry = new SphereGeometry(0.88, 20, 20);
    sphereMaterial = new LambertMaterial({color: 0xa57c1b});    
    var venus = new Mesh(sphereGeometry, sphereMaterial);
    
    sun.add(venusPivot);
    venusPivot.rotation.z = 2 * Math.PI / 3;    
    venus.position.y = 0;
    venus.position.z = 13.2;
    venusPivot.add(venus);
    
    // Earth
    sphereGeometry = new SphereGeometry(0.92, 20, 20);
    sphereMaterial = new LambertMaterial({color: 0x0000a0});   
    var earth = new Mesh(sphereGeometry, sphereMaterial);
    scene.add(earth);
    
    sun.add(earthPivot);
    earthPivot.rotation.z = 4 * Math.PI / 3;
    earth.position.y = 0;
    earth.position.z = 15.4;
    earthPivot.add(earth);
    
    // Moon
    sphereGeometry = new SphereGeometry(0.2, 20, 20);
    sphereMaterial = new LambertMaterial({color: 0xfefcd7});   
    var moon = new THREE.Mesh(sphereGeometry, sphereMaterial);
    
    earth.add(moonPivot);
    moonPivot.rotation.z = 0;
    moon.position.y = 0;
    moon.position.z = 3;
    moonPivot.add(moon);
    
    // Mars
    sphereGeometry = new SphereGeometry(0.48, 20, 20);
    sphereMaterial = new LambertMaterial({color: 0xa1251b});   
    var mars = new THREE.Mesh(sphereGeometry, sphereMaterial);
    
    sun.add(marsPivot);
    marsPivot.rotation.z = 6 * Math.PI / 3;
    mars.position.y = 0;
    mars.position.z = 17.8;
    marsPivot.add(mars);
    
    // Jupiter
    sphereGeometry = new SphereGeometry(1.03, 20, 20);
    sphereMaterial = new LambertMaterial({color: 0xd8ca9d});   
    var jupiter = new THREE.Mesh(sphereGeometry, sphereMaterial);
    
    sun.add(jupiterPivot);
    jupiterPivot.rotation.z = 8 * Math.PI / 3;      
    jupiter.position.y = 0;
    jupiter.position.z = 20.7;
    jupiterPivot.add(jupiter);
    
    // Saturn
    sphereGeometry = new SphereGeometry(0.87, 20, 20);
    sphereMaterial = new LambertMaterial({color: 0xa1251b});   
    var saturn = new THREE.Mesh(sphereGeometry, sphereMaterial);
    
    sun.add(saturnPivot);
    saturnPivot.rotation.z = 10 * Math.PI / 3;
    saturn.position.y = 0;
    saturn.position.z = 33.8;
    saturnPivot.add(saturn);
    
    // Uranus
    sphereGeometry = new SphereGeometry(0.37, 20, 20);
    sphereMaterial = new LambertMaterial({color: 0xa1251b});   
    var uranus = new THREE.Mesh(sphereGeometry, sphereMaterial);
    
    sun.add(uranusPivot);
    uranusPivot.rotation.z = 12 * Math.PI / 3;
    uranus.position.y = 0;
    uranus.position.z = 63;
    uranusPivot.add(uranus);
    
    // Neptune
    sphereGeometry = new SphereGeometry(0.36, 20, 20);
    sphereMaterial = new LambertMaterial({color: 0xa1251b});   
    var neptune = new THREE.Mesh(sphereGeometry, sphereMaterial);
    
    sun.add(neptunePivot);
    neptunePivot.rotation.z = 14 * Math.PI / 3;
    neptune.position.y = 0;
    neptune.position.z = 95.7;
    neptunePivot.add(neptune);
    
    // Pluto
    sphereGeometry = new SphereGeometry(0.05, 20, 20);
    sphereMaterial = new LambertMaterial({color: 0xa1251b});   
    var notaPlanet = new THREE.Mesh(sphereGeometry, sphereMaterial);
    
    sun.add(notaPlanetPivot);
    notaPlanetPivot.rotation.z = 16 * Math.PI / 3;   
    notaPlanet.position.y = 0;
    notaPlanet.position.z = 125;
    notaPlanetPivot.add(notaPlanet);  

}

// Change camera view based on browser window size
function onResize(): void {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Add controls to control object to allow user to rotate cube man on any axis
function addControl(controlObject: Control): void {
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
function gameLoop(): void {
    stats.update();
    
    mercuryPivot.rotation.y += 0.025;
    venusPivot.rotation.y += 0.022;
    earthPivot.rotation.y += 0.02;
    marsPivot.rotation.y += 0.019;
    jupiterPivot.rotation.y += 0.016;
    saturnPivot.rotation.y += 0.013;
    uranusPivot.rotation.y += 0.01;
    neptunePivot.rotation.y += 0.015;
    notaPlanetPivot.rotation.y += 0.001;
    moonPivot.rotation.y += 0.03;
    
    camera.position.x = control.positionX;
    camera.position.y = control.positionY;
    camera.position.z = control.positionZ;
    camera.lookAt(control.face);
    
    // render using requestAnimationFrame
    requestAnimationFrame(gameLoop);
	
    // render the scene
    renderer.render(scene, camera);
}

// Setup default renderer
function setupRenderer(): void {
    renderer = new Renderer();
    renderer.setClearColor(0x090909, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    console.log("Finished setting up Renderer...");
}

// Setup main (perspective) camera for the scene
function setupCamera(): void {
    camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    camera.lookAt(new Vector3(5, 0, 0));
    console.log("Finished setting up Camera...");
}


