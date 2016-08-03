/**
 * 
 */
function Hploc(){
	this.PI4_A = .7853981554508209228515625;
	this.PI4_B = .794662735614792836713604629039764404296875e-8;
	this.PI4_C = .306161699786838294306516483068750264552437361480769e-16;
	this.M_1_PI = 0.3183098861837906715377675267450287;
}

Hploc.prototype.setZ = function(z){
	this.z = z;
};

Hploc.prototype.setPhi = function(phi){
	this.phi = phi;
};

Hploc.prototype.setSth = function(sth){
	this.sth = sth;
};

Hploc.prototype.toVec3 = function(){
	var st = this.have_sth ? this.sth : Math.sqrt((1.0-this.z)*(1.0+this.z));
//	var vector = new Vec3(st*this.cos(this.phi),st*this.sin(this.phi),this.z);
	var vector = new Vec3(st*Math.cos(this.phi),st*Math.sin(this.phi),this.z);
//	console.log("[Hploc.prototype.toVec3] "+this.phi+" "+this.z+" "+st );
//	console.log("[Hploc.prototype.toVec3] "+Math.cos(this.phi)+" "+Math.sin(this.phi));
//	console.log("[Hploc.prototype.toVec3] "+vector.x+" "+vector.y+" "+vector.z );
    return vector;
};

Hploc.prototype.sin = function(d){
	var u = d * this.M_1_PI;
	var q = (u < 0 ? u - 0.5 : u + 0.5);
	var x=4.*q;
    d -= x*this.PI4_A;
    d -= x*this.PI4_B;
    d -= x*this.PI4_C;
    if ((q&1) != 0) d = -d;
    return this.sincoshelper(d);
};


Hploc.prototype.cos = function(d){
	var u = d*this.M_1_PI - 0.5;
	var q = 1+2*(u < 0 ? u - 0.5 : u + 0.5);
	var x=2.*q;
    d -= x*this.PI4_A;
    d -= x*this.PI4_B;
    d -= x*this.PI4_C;
    if ((q&2) == 0) d = -d;
    return this.sincoshelper(d);
};


Hploc.prototype.sincoshelper = function(d){
	var s = d * d;
	var u = -7.97255955009037868891952e-18;
	  u = u*s +2.81009972710863200091251e-15;
	  u = u*s -7.64712219118158833288484e-13;
	  u = u*s +1.60590430605664501629054e-10;
	  u = u*s -2.50521083763502045810755e-08;
	  u = u*s +2.75573192239198747630416e-06;
	  u = u*s -0.000198412698412696162806809;
	  u = u*s +0.00833333333333332974823815;
	  u = u*s -0.166666666666666657414808;
	  return s*u*d + d;
};