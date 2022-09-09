/**
 * Partial porting to Javascript of Fxyf.java from Healpix3.30
 */

import {Hploc} from './Hploc';
import {Vec3} from './Vec3';

export class Fxyf{ 
	
	fx: number;
	fy: number;
	face: number;
	jrll: Uint8Array;
	jpll: Uint8Array;
	halfpi: number;

	constructor(x: number, y: number, f: number){
		this.fx=x; 
		this.fy=y; 
		this.face=f; 
		// coordinate of the lowest corner of each face
		this.jrll = new Uint8Array([ 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4 ]);
		this.jpll = new Uint8Array([ 1, 3, 5, 7, 0, 2, 4, 6, 1, 3, 5, 7 ]);
		this.halfpi = Math.PI/2.;
	}

	toHploc(): Hploc{	
		let loc = new Hploc();
		
		let jr = this.jrll[this.face] - this.fx - this.fy;
		
		let nr: number;
	
		if (jr<1){
			  nr = jr;
			  let tmp = nr*nr/3.;
			  loc.z = 1 - tmp;
			  if (loc.z > 0.99) { 
				  loc.sth = Math.sqrt(tmp*(2.0-tmp)); 
				  loc.have_sth = true; 
			  }
		}else if (jr > 3){
			  nr = 4 - jr;
			  let tmp = nr*nr/3.;
			  loc.z = tmp - 1;
			  if (loc.z <- 0.99) { 
				  loc.sth = Math.sqrt(tmp*(2.0-tmp)); 
				  loc.have_sth = true; 
			  }
		}else{
			  nr = 1;
			  loc.z = (2 - jr)*2.0/3.;
		}
	
		let tmp = this.jpll[this.face]*nr+this.fx-this.fy;
		if (tmp < 0) {
			tmp += 8;
		}
		if (tmp >= 8) {
			tmp -= 8;
		}
		loc.phi = (nr<1e-15) ? 0 : (0.5*this.halfpi*tmp)/nr;
		return loc;
	};
	
	
	toVec3(): Vec3{ 
		return this.toHploc().toVec3(); 
	};
}


