/// <reference path="../../typings/tsd.d.ts"/>

/*
Source file	name:       control.ts
Author’s name:	        George Savcheko
Last modified by:       George Savchenko
Date last modified:     2016-02-26
Program	description:    Using the Three.js JavaScript Library and TypeScript, create a web application that displays a fictitious solar system.	The	
                        solar system should have a central Sun object with at least 5 planets that orbit around it. One of the planets must have a 
                        moon that orbits around it. Include controls that allows the user to zoom the camera out to see the solar system and zoom in 
                        to view the planet with a moon.
Revision history:       final commit - commented code
*/

module objects {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    export class Control { 
        //PUBLIC INSTANCE VARIABLES +++++++++++++++++++++++++++
        // This class is used to allow the user to zoom in and out of the a section of the scene
        
        // Camera positions and direction that is being 'faced'
        public positionX:number;
        public positionY:number;
        public positionZ:number;
        public face:Vector3;
        public zoom:boolean = false;
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++
        constructor() {
           this.positionX = -85;
           this.positionY = 95;
           this.positionZ = 85;
           this.face = new Vector3(5, 0 ,0);
        }
        
        //PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++
       
       // This method sets the position and direction being faced of the camera (alternates between 2 settings controlled by zoom variable)
       public zoomInOut() : void {       
        if(!this.zoom)        {
            this.positionX = -40;
            this.positionY = 5;
            this.positionZ = -20;
            this.face = new Vector3(0, -1, 45);
            this.zoom = true;
            console.log(this.zoom);
        }
        else{
            this.positionX = -85;
            this.positionY = 95;
            this.positionZ = 85;
            this.face = new Vector3(5, 0, 0);
            this.zoom = false;
            console.log(this.zoom);
        }};
    }
}
