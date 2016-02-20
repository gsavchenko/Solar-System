/// <reference path="../../typings/tsd.d.ts"/>
/*
Source file	name:       control.ts
Author’s name:	        George Savcheko
Last modified by:       George Savchenko
Date last modified:     2016-02-10
Program	description:    Using the Three.js JavaScript Library and TypeScript, create a web application that displays a fictitious solar system.	The
                        solar system should have a central Sun object with at least 5 planets that orbit around it. One of the planets must have a
                        moon that orbits around it. Include controls that allows the user to zoom the camera out to see the solar system and zoom in
                        to view the planet with a moon.
Revision history:       Initial Commit - File Setup
*/
var objects;
(function (objects) {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    var Control = (function () {
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++
        function Control(rotationSpeed) {
            this.rotationSpeedx = rotationSpeed;
            this.rotationSpeedy = rotationSpeed;
            this.rotationSpeedz = rotationSpeed;
            this.shirtColour = new THREE.Color("#ff4c4c"); // default colors
            this.pantsColour = new THREE.Color("#113572");
        }
        //PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++
        // This method uses a random number from 1 - 3 to set the shirtColour and pantsColour to a predetermind set of colors
        Control.prototype.changeColors = function () {
            var colourScheme = Math.floor(Math.random() * 3) + 1;
            switch (colourScheme) {
                case 1:
                    this.shirtColour = new THREE.Color("#a0d4a4");
                    this.pantsColour = new THREE.Color("#a5682a");
                    break;
                case 2:
                    this.shirtColour = new THREE.Color("#9999ff");
                    this.pantsColour = new THREE.Color("#4ca64c");
                    break;
                case 3:
                    this.shirtColour = new THREE.Color("#ffc966");
                    this.pantsColour = new THREE.Color("#bf7fbf");
                    break;
                default:
                    this.shirtColour = new THREE.Color("#ff4c4c"); // default colors
                    this.pantsColour = new THREE.Color("#113572");
                    break;
            }
        };
        ;
        return Control;
    })();
    objects.Control = Control;
})(objects || (objects = {}));
//# sourceMappingURL=control.js.map