/**
 * 
 */


"use strict";
class Pointing{
	constructor(vec3){
	    this.theta = Math.atan2(Math.sqrt(vec3.x*vec3.x+vec3.y*vec3.y),vec3.z);
	    this.phi = Math.atan2 (vec3.y,vec3.x);
	    if (this.phi<0.0){
	    	this.phi = this.phi + 2*Math.PI;
	    }
	    if (this.phi>=2*Math.PI){
	    	this.phi = this.phi - 2*Math.PI;
	    }
	}
}

export default Pointing;
//function Pointing( theta,  phi){
//	this.theta = theta; 
//	this.phi = phi; 
//}