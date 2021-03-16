/**
 * 
 */
import Hploc from './Hploc';


"use strict";
class Pointing{
	
	
	constructor(vec3, mirror, in_theta = undefined, in_phi = undefined){
		
		if (vec3 != null){
			this.theta = Hploc.atan2(Math.sqrt(vec3.x*vec3.x+vec3.y*vec3.y),vec3.z);
			if(mirror){
				this.phi = - Hploc.atan2 (vec3.y,vec3.x);
			} else {
				this.phi = Hploc.atan2 (vec3.y,vec3.x);
			}

		    if (this.phi<0.0){
		    	this.phi = this.phi + 2*Math.PI;
		    }
		    if (this.phi>=2*Math.PI){
		    	this.phi = this.phi - 2*Math.PI;
		    }
	
		}else{
			this.theta = in_theta;
			this.phi = in_phi;
		}
		
	}
}

export default Pointing;
//function Pointing( theta,  phi){
//	this.theta = theta; 
//	this.phi = phi; 
//}