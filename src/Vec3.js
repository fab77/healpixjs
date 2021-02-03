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
	
	/** Scale the vector by a given factor
    @param n the scale factor */
	scale(n){
		this.x*=n; 
		this.y*=n; 
		this.z*=n;
	};
	
	/** Vector cross product.
    @param v another vector
    @return the vector cross product between this vector and {@code v} */
	cross(v){
		return new Vec3(this.y*v.z - v.y*this.z, this.z*v.x - v.z*this.x, this.x*v.y - v.x*this.y);
	};
	
	/** Vector addition
	    * @param v the vector to be added
	    * @return addition result */
	add(v){ 
		return new Vec3(this.x+v.x, this.y+v.y, this.z+v.z); 
	};
	
	/** Normalize the vector */
	normalize(){
	    let d = 1./length();
	    this.x *= d; 
	    this.y *= d; 
	    this.z *= d;
	};
	
	/** Vector length
    @return the length of the vector. */
	length(){ 
		return Math.sqrt(this.lengthSquared()); 
	};

  /** Squared vector length
      @return the squared length of the vector. */
	lengthSquared(){ 
		return this.x*this.x + this.y*this.y + this.z*this.z; 
  	};
  	
  	/** Computes the dot product of the this vector and {@code v1}.
     * @param v1 another vector
     * @return dot product */
  	dot(v1){ 
	   return this.x*v1.x + this.y*v1.y + this.z*v1.z; 
   	};
   	
   	/** Vector subtraction
     * @param v the vector to be subtracted
     * @return subtraction result */
   	sub(v){ 
   		return new Vec3(this.x-v.x, this.y-v.y, this.z-v.z); 
   	};
	
   /** Vector cross product.
   @param v another vector
   @return the vector cross product between this vector and {@code v} */
   	cross(v){ 
   		return new Vec3(this.y*v.z - v.y*this.z, this.z*v.x - v.z*this.x, this.x*v.y - v.x*this.y); 
   	};
} 

export default Vec3;