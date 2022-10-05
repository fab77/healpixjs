
import {Vec3} from './Vec3.js';


export class CircleFinder{
	
	center;	// Vec3
	cosrad;	// double
	
/**
 * @param point: Vec3
 */
	constructor(point){
		
		let np = point.length;
	    //HealpixUtils.check(np>=2,"too few points");
	    if (!(np>=2)){
	    	console.log("too few points");
	    	return;
	    }
	    this.center = point[0].add(point[1]); 
	    this.center.normalize();
	    this.cosrad = point[0].dot(this.center);
	    for (let i=2; i<np; ++i){
	    	if (point[i].dot(this.center)<this.cosrad){ // point outside the current circle
		        this.getCircle(point,i);	
	    	}
	    }
	      
	};
	
	/**
	 * @parm point: Vec3
	 * @param q: int
	 */
	getCircle (point, q){
		this.center = point[0].add(point[q]); 
		this.center.normalize();
		this.cosrad = point[0].dot(this.center);
		for (let i=1; i<q; ++i){
			if (point[i].dot(this.center)<this.cosrad){ // point outside the current circle
				this.getCircle2(point,i,q);
			}
		}
    };
	
	/**
	 * @parm point: Vec3
	 * @param q1: int
	 * @param q2: int
	 */
	getCircle2 (point, q1, q2){
		this.center = point[q1].add(point[q2]); 
		this.center.normalize();
		this.cosrad = point[q1].dot(this.center);
		for (let i=0; i<q1; ++i){
			if (point[i].dot(this.center)<this.cosrad){// point outside the current circle
	        
				this.center=(point[q1].sub(point[i])).cross(point[q2].sub(point[i]));
				this.center.normalize();
				this.cosrad=point[i].dot(this.center);
				if (this.cosrad<0){ 
					this.center.flip(); 
					this.cosrad=-this.cosrad; 
				}
	        }
		}
    };
    
    getCenter() { 
    	return new Vec3(this.center.x, this.center.y, this.center.z); 
    }
    
    getCosrad() { 
    	return this.cosrad; 
    };
	
}

