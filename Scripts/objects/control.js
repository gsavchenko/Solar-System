/// <reference path="../../typings/tsd.d.ts"/>
/*
Source file	name:       control.ts
Author’s name:	        George Savcheko
Last modified by:       George Savchenko
Date last modified:     2016-02-24
Program	description:    Using the Three.js JavaScript Library and TypeScript, create a web application that displays a fictitious solar system.	The
                        solar system should have a central Sun object with at least 5 planets that orbit around it. One of the planets must have a
                        moon that orbits around it. Include controls that allows the user to zoom the camera out to see the solar system and zoom in
                        to view the planet with a moon.
Revision history:       Added zooming functionality
*/
var objects;
(function (objects) {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    var Control = (function () {
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++
        function Control() {
            this.zoom = false;
            this.positionX = -85;
            this.positionY = 95;
            this.positionZ = 85;
            this.face = new Vector3(5, 0, 0);
        }
        //PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++
        // This method uses a random number from 1 - 3 to set the shirtColour and pantsColour to a predetermind set of colors
        Control.prototype.zoomInOut = function () {
            if (!this.zoom) {
                this.positionX = -40;
                this.positionY = 5;
                this.positionZ = -20;
                this.face = new Vector3(0, -1, 45);
                this.zoom = false;
                console.log(this.zoom);
            }
            else {
                this.positionX = -85;
                this.positionY = 95;
                this.positionZ = 85;
                this.face = new Vector3(5, 0, 0);
                this.zoom = true;
                console.log(this.zoom);
            }
        };
        ;
        return Control;
    })();
    objects.Control = Control;
})(objects || (objects = {}));
//# sourceMappingURL=control.js.map