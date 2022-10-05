/**
 * Partial porting to Javascript of Vec3.java from Healpix3.30  
 */

import {Hploc} from './Hploc.js';
import {Pointing} from './Pointing.js';


export class Vec3{
	
	x: number;
	y: number;
	z: number;
	
	constructor(in_x: number | Pointing, in_y: number, in_z: number){

		if (in_x instanceof Pointing) {
			let ptg = in_x;
			let sth = Hploc.sin(ptg.theta);
			this.x=sth*Hploc.cos(ptg.phi);
			this.y=sth*Hploc.sin(ptg.phi);
			this.z=Hploc.cos(ptg.theta);
		}else{
			this.x = in_x;
			this.y = in_y;
			this.z = in_z;
		}
		
	}
	getX(): number{
		  return this.x;
	};
		
	getY(): number{
	  return this.y;
	};
	
	getZ(): number{
	  return this.z;
	};
	
	/** Scale the vector by a given factor
    @param n the scale factor */
	scale(n: number): void{
		this.x *= n; 
		this.y*=n; 
		this.z*=n;
	};
	
	/** Vector cross product.
    @param v another vector
    @return the vector cross product between this vector and {@code v} */
	cross(v: Vec3): Vec3 {
		return new Vec3(this.y*v.z - v.y*this.z, this.z*v.x - v.z*this.x, this.x*v.y - v.x*this.y);
	};
	
	/** Vector addition
	    * @param v the vector to be added
	    * @return addition result */
	add(v: Vec3): Vec3 {
		return new Vec3(this.x+v.x, this.y+v.y, this.z+v.z); 
	};
	
	/** Normalize the vector */
	normalize(): void{
	    let d = 1./this.length();
	    this.x *= d; 
	    this.y *= d; 
	    this.z *= d;
	};
	
	/** Return normalized vector */
	norm(): Vec3 {
		let d = 1./this.length();
		return new Vec3(this.x*d, this.y*d, this.z*d);
	};
	  
	/** Vector length
    @return the length of the vector. */
	length(): number{ 
		return Math.sqrt(this.lengthSquared()); 
	};

  /** Squared vector length
      @return the squared length of the vector. */
	lengthSquared(): number{ 
		return this.x*this.x + this.y*this.y + this.z*this.z; 
  	};
  	
  	/** Computes the dot product of the this vector and {@code v1}.
     * @param v1 another vector
     * @return dot product */
  	dot(v1: Vec3): number {
	   return this.x*v1.x + this.y*v1.y + this.z*v1.z; 
   	};
   	
   	/** Vector subtraction
     * @param v the vector to be subtracted
     * @return subtraction result */
   	sub(v: Vec3): Vec3 {
   		return new Vec3(this.x-v.x, this.y-v.y, this.z-v.z); 
   	};
	
   
   	
   	/** Angle between two vectors.
    @param v1 another vector
    @return the angle in radians between this vector and {@code v1};
      constrained to the range [0,PI]. */
   	angle(v1: Vec3): number { 
   		return Hploc.atan2(this.cross(v1).length(), this.dot(v1)); 
   	}
   	
   	/** Invert the signs of all components */
    flip(): void { 
    	this.x *= -1.0;
    	this.y *= -1.0;
    	this.z *= -1.0;
    }
   	
   	static pointing2Vec3(pointing: Pointing): Vec3{
   		let sth = Hploc.sin(pointing.theta);
   	    let x = sth * Hploc.cos(pointing.phi);
   	    let y = sth * Hploc.sin(pointing.phi);
   	    let z = Hploc.cos(pointing.theta);
   	    return new Vec3(x, y, z);
   	    
   	};
} 

