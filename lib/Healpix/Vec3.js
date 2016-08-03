/**
 * Partial porting to Javascript of Vec3.java from Healpix3.30  
 */
function Vec3(x, y, z){
	this.x = x;
	this.y = y;
	this.z = z;
} 
Vec3.prototype.getX = function(){
	  return this.x;
};
	
Vec3.prototype.getY = function(){
  return this.y;
};

Vec3.prototype.getZ = function(){
  return this.z;
};