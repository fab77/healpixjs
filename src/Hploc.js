/**
 * 
 */



"use strict";

import Vec3 from './Vec3';

class Hploc{
	static PI4_A = 0.7853981554508209228515625;
	static PI4_B = 0.794662735614792836713604629039764404296875e-8;
	static PI4_C = 0.306161699786838294306516483068750264552437361480769e-16;
	static M_1_PI = 0.3183098861837906715377675267450287;
	
	constructor(ptg, mirror){
		this.PI4_A = 0.7853981554508209228515625;
		this.PI4_B = 0.794662735614792836713604629039764404296875e-8;
		this.PI4_C = 0.306161699786838294306516483068750264552437361480769e-16;
		this.M_1_PI = 0.3183098861837906715377675267450287;
		this.mirror = mirror;
		if (undefined != ptg ){
			if(  !( (ptg.theta>=0.0)&&(ptg.theta<=Math.PI))){
				console.log("Hploc invalid theta value");
			}
			this.sth = 0.0;
			this.have_sth=false;
			this.z = Hploc.cos(ptg.theta);
			this._phi = ptg.phi;
			if (Math.abs(this.z)>0.99){
				this.sth = Hploc.sin(ptg.theta);
				this.have_sth=true;
			}
		}
	}

	setZ(z){
		this.z = z;
	};
	
	get phi(){
		if(this.mirror){
			return -this._phi;
		} else {
			return this._phi;
		}
	};

	set phi(phi){
		this._phi = phi;
	};

	setSth(sth){
		this.sth = sth;
	};
	
	toVec3(){
		var st = this.have_sth ? this.sth : Math.sqrt((1.0-this.z)*(1.0+this.z));
		var vector = new Vec3(st*Hploc.cos(this.phi),st*Hploc.sin(this.phi),this.z);
	//	var vector = new Vec3(st*Math.cos(this.phi),st*Math.sin(this.phi),this.z);
		return vector;
	};
	
	static sin(d){
		
		let u = d * Hploc.M_1_PI;
		let q = Math.floor(u < 0 ? u - 0.5 : u + 0.5);
		let x = 4.0 * q;
		d -= x * Hploc.PI4_A;
		d -= x * Hploc.PI4_B;
		d -= x * Hploc.PI4_C;
		if ((q & 1) != 0) {
			d = -d;
		}
		return this.sincoshelper(d);
	};
	
	
	static cos(d){
		
//		let u = d * Hploc.M_1_PI - 0.5;
		let u = d * Hploc.M_1_PI;
		u -= 0.5;
		let q = 1 + 2 * Math.floor(u < 0 ? u - 0.5 : u + 0.5);
		let x = 2.0 * q;
		
		let t = x * Hploc.PI4_A;
		d = d - t;
		d -= x * Hploc.PI4_B;
		d -= x * Hploc.PI4_C;
		if ((q & 2) == 0){
			d = -d;
		}
		return Hploc.sincoshelper(d);
	};
	
	
	static sincoshelper(d){
		let s = d * d;
		let u = -7.97255955009037868891952e-18;
		u = u * s +2.81009972710863200091251e-15;
		u = u * s -7.64712219118158833288484e-13;
  		u = u * s +1.60590430605664501629054e-10;
  		u = u * s -2.50521083763502045810755e-08;
  		u = u * s +2.75573192239198747630416e-06;
  		u = u * s -0.000198412698412696162806809;
  		u = u * s +0.00833333333333332974823815;
  		u = u * s -0.166666666666666657414808;
		  return s*u*d + d;
	};
}



export default Hploc;