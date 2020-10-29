/**
 * Partial porting to Javascript of Vec3.java from Healpix3.30  
 */

"use strict";
class Vec3{
	constructor(x, y, z){
		this.x = x;
		this.y = y;
		this.z = z;
	}
	getX(){
		  return this.x;
	};
		
	getY(){
	  return this.y;
	};
	
	getZ(){
	  return this.z;
	};
} 

export default Vec3;