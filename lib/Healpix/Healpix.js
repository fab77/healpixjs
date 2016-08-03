/**
 * Partial porting to Javascript of HealpixBase.java from Healpix3.30
 */


function Healpix(nside_in){
	this.order_max=29;
	//this.ns_max=1L<<order_max;
	this.ns_max=Math.pow(2, this.order_max);
	this.ctab=new Uint8Array([
  		  0,1,256,257,2,3,258,259,512,513,768,769,514,515,770,771,4,5,260,261,6,7,262,
		  263,516,517,772,773,518,519,774,775,1024,1025,1280,1281,1026,1027,1282,1283,
		  1536,1537,1792,1793,1538,1539,1794,1795,1028,1029,1284,1285,1030,1031,1286,
		  1287,1540,1541,1796,1797,1542,1543,1798,1799,8,9,264,265,10,11,266,267,520,
		  521,776,777,522,523,778,779,12,13,268,269,14,15,270,271,524,525,780,781,526,
		  527,782,783,1032,1033,1288,1289,1034,1035,1290,1291,1544,1545,1800,1801,1546,
		  1547,1802,1803,1036,1037,1292,1293,1038,1039,1294,1295,1548,1549,1804,1805,
		  1550,1551,1806,1807,2048,2049,2304,2305,2050,2051,2306,2307,2560,2561,2816,
		  2817,2562,2563,2818,2819,2052,2053,2308,2309,2054,2055,2310,2311,2564,2565,
		  2820,2821,2566,2567,2822,2823,3072,3073,3328,3329,3074,3075,3330,3331,3584,
		  3585,3840,3841,3586,3587,3842,3843,3076,3077,3332,3333,3078,3079,3334,3335,
		  3588,3589,3844,3845,3590,3591,3846,3847,2056,2057,2312,2313,2058,2059,2314,
		  2315,2568,2569,2824,2825,2570,2571,2826,2827,2060,2061,2316,2317,2062,2063,
		  2318,2319,2572,2573,2828,2829,2574,2575,2830,2831,3080,3081,3336,3337,3082,
		  3083,3338,3339,3592,3593,3848,3849,3594,3595,3850,3851,3084,3085,3340,3341,
		  3086,3087,3342,3343,3596,3597,3852,3853,3598,3599,3854,3855 ]);
	
	if (nside_in<=this.ns_max && nside_in>0){
		this.nside=nside_in;
		this.npface = this.nside*this.nside;
		this.npix = 12*this.npface;
		this.order = this.nside2order(this.nside);
	}
} 


Healpix.prototype.getNPix = function(){
	return this.npix;
};


Healpix.prototype.getBoundaries = function(pix){
	var points = new Array(); 
	var xyf = this.nest2xyf(pix);
//	console.log("XYF "+xyf.ix+" "+xyf.iy+" "+xyf.face);
	var dc=0.5/this.nside;
    var xc=(xyf.ix+0.5)/this.nside; 
    var yc=(xyf.iy+0.5)/this.nside;
    var d = 1./(this.nside);
//    console.log("------------------------");
//    console.log("xc, yc, dc "+xc+","+ yc+","+ dc);
//    console.log("xc+dc-d, yc+dc, xyf.face, d "+(xc+dc) +","+ (yc+dc)+","+ xyf.face+","+ d);
    points[0]=new Fxyf(xc+dc, yc+dc, xyf.face).toVec3();
	points[1]=new Fxyf(xc-dc, yc+dc, xyf.face).toVec3();
	points[2]=new Fxyf(xc-dc, yc-dc, xyf.face).toVec3();
	points[3]=new Fxyf(xc+dc, yc-dc, xyf.face).toVec3();
//	console.log("Points for npix: "+pix);
//	console.log(points);
	return points;
};

Healpix.prototype.nside2order = function(nside) {
	return ((nside&(nside-1))!=0) ? -1 : this.ilog2(nside);
};

Healpix.prototype.ilog2 = function(arg){
	return 63-this.numberOfLeadingZeros(Math.max(arg,1));
};

Healpix.prototype.numberOfLeadingZeros = function(i) {
    if (i == 0)
       return 64;
   var n = 1;
   var x = (i >>> 32);
   if (x == 0) { n += 32; x = i; }
   if (x >>> 16 == 0) { n += 16; x <<= 16; }
   if (x >>> 24 == 0) { n +=  8; x <<=  8; }
   if (x >>> 28 == 0) { n +=  4; x <<=  4; }
   if (x >>> 30 == 0) { n +=  2; x <<=  2; }
   n -= x >>> 31;
   return n;
};

Healpix.prototype.nest2xyf = function(ipix) {
	
	
	var pix=ipix&(this.npface-1);
//	console.log("pix: "+pix+" this.compress_bits(pix): "+this.compress_bits(pix));
	return new Xyf  (this.compress_bits(pix), this.compress_bits(pix>>1),
                (ipix>>(2*this.order)));
};

Healpix.prototype.compress_bits = function(v){    
    var raw        = (v & 0x5555) | ((v & 0x55550000) >> 15);
    var compressed = this.ctab[raw & 0xff] | (this.	ctab[raw >> 8] << 4);
//    console.log("raw "+raw);
//    console.log("compressed "+compressed);
    return compressed;
};