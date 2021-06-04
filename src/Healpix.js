"use strict";
/**
 * Partial porting to Javascript of HealpixBase.java from Healpix3.30
 */

import Fxyf from './Fxyf';
import Hploc from './Hploc';
import Xyf from './Xyf';
import Vec3 from './Vec3';
import Pointing from './Pointing';
import CircleFinder from './CircleFinder';
import Zphi from './Zphi';
import pstack from './pstack';
import Constants from './Constants';
import RangeSet from './RangeSet';


class Healpix{
	
	order_max;
    inv_halfpi;
    twothird;
    ns_max;
    ctab;
    utab;
    xoffset;
    yoffset;
    facearray;
    swaparray;
	nside;
    npface;
    npix;
    order;
    nl2;
    nl3;
    nl4;
    fact2;
    fact1;
    ncap; // pixel
    bn;
    mpr;
    cmpr;
    smpr;
	
    constructor(nside_in){
        this.order_max=29;
        this.inv_halfpi = 2.0/Math.PI;
        this.twothird = 2.0/3.;
    // console.log("twothird "+this.twothird);
        // this.ns_max=1L<<order_max;
        this.ns_max=Math.pow(2, this.order_max);
        this.ctab=new Uint16Array([
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
        this.utab=new Uint16Array([0,1,4,5,16,17,20,21,64,65,68,69,80,81,84,85,256,257,260,261,272,273,276,277,
                  320,321,324,325,336,337,340,341,1024,1025,1028,1029,1040,1041,1044,1045,1088,
                  1089,1092,1093,1104,1105,1108,1109,1280,1281,1284,1285,1296,1297,1300,1301,
                  1344,1345,1348,1349,1360,1361,1364,1365,4096,4097,4100,4101,4112,4113,4116,
                  4117,4160,4161,4164,4165,4176,4177,4180,4181,4352,4353,4356,4357,4368,4369,
                  4372,4373,4416,4417,4420,4421,4432,4433,4436,4437,5120,5121,5124,5125,5136,
                  5137,5140,5141,5184,5185,5188,5189,5200,5201,5204,5205,5376,5377,5380,5381,
                  5392,5393,5396,5397,5440,5441,5444,5445,5456,5457,5460,5461,16384,16385,16388,
                  16389,16400,16401,16404,16405,16448,16449,16452,16453,16464,16465,16468,16469,
                  16640,16641,16644,16645,16656,16657,16660,16661,16704,16705,16708,16709,16720,
                  16721,16724,16725,17408,17409,17412,17413,17424,17425,17428,17429,17472,17473,
                  17476,17477,17488,17489,17492,17493,17664,17665,17668,17669,17680,17681,17684,
                  17685,17728,17729,17732,17733,17744,17745,17748,17749,20480,20481,20484,20485,
                  20496,20497,20500,20501,20544,20545,20548,20549,20560,20561,20564,20565,20736,
                  20737,20740,20741,20752,20753,20756,20757,20800,20801,20804,20805,20816,20817,
                  20820,20821,21504,21505,21508,21509,21520,21521,21524,21525,21568,21569,21572,
                  21573,21584,21585,21588,21589,21760,21761,21764,21765,21776,21777,21780,21781,
                  21824,21825,21828,21829,21840,21841,21844,21845 ]);
        
        this.jrll = new Int16Array([2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4]);
        this.jpll = new Int16Array([ 1, 3, 5, 7, 0, 2, 4, 6, 1, 3, 5, 7]);
        
        this.xoffset = new Int16Array([ -1,-1, 0, 1, 1, 1, 0,-1 ]);
        this.yoffset = new Int16Array([ 0, 1, 1, 1, 0,-1,-1,-1]);
        this.facearray = [
                        new Int16Array([8, 9,10,11,-1,-1,-1,-1,10,11, 8, 9]),// S
                        new Int16Array([5, 6, 7, 4, 8, 9,10,11, 9,10,11, 8]),// SE
                        new Int16Array([-1,-1,-1,-1, 5, 6, 7, 4,-1,-1,-1,-1]),// E
                        new Int16Array([4, 5, 6, 7,11, 8, 9,10,11, 8, 9,10]), // SW
                        new Int16Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11]),// center
                        new Int16Array([1, 2, 3, 0, 0, 1, 2, 3, 5, 6, 7, 4]),// NE
                        new Int16Array([-1,-1,-1,-1, 7, 4, 5, 6,-1,-1,-1,-1]),// W
                        new Int16Array([3, 0, 1, 2, 3, 0, 1, 2, 4, 5, 6, 7]),// NW
                        new Int16Array([2, 3, 0, 1,-1,-1,-1,-1, 0, 1, 2, 3])// N
                        ];
        // questo forse deve essere un UInt8Array. Viene usato da neighbours
          this.swaparray = [
                                      new Int16Array([ 0,0,3 ]),// S
                                    new Int16Array([ 0,0,6 ]),// SE
                                    new Int16Array([ 0,0,0 ]),// E
                                    new Int16Array([ 0,0,5 ]), // SW
                                    new Int16Array([ 0,0,0 ]),// center
                                    new Int16Array([ 5,0,0 ]),// NE
                                    new Int16Array([ 0,0,0 ]),// W
                                    new Int16Array([ 6,0,0 ]),// NW
                                    new Int16Array([ 3,0,0 ])// N
                                    ];
        if (nside_in<=this.ns_max && nside_in>0){
            this.nside=nside_in;
            this.npface = this.nside*this.nside;
            this.npix = 12*this.npface;
            this.order = this.nside2order(this.nside);
            this.nl2 = 2*this.nside;
            this.nl3 = 3*this.nside;
            this.nl4 = 4*this.nside;
            this.fact2 = 4.0/this.npix;
            this.fact1 = (this.nside<<1)*this.fact2;
            this.ncap = 2*this.nside*(this.nside-1); // pixels in each polar cap
    // console.log("order: "+this.order);
    // console.log("nside: "+this.nside);
            
        }
        
        this.bn = [];
        this.mpr = [];
        this.cmpr = [];
        this.smpr = [];
        
     // TODO INFINITE LOOP!!!!!! FIX ITTTTTTTTTT
     // TODO INFINITE LOOP!!!!!! FIX ITTTTTTTTTT
     // TODO INFINITE LOOP!!!!!! FIX ITTTTTTTTTT
     // TODO INFINITE LOOP!!!!!! FIX ITTTTTTTTTT
     // TODO INFINITE LOOP!!!!!! FIX ITTTTTTTTTT
     // TODO INFINITE LOOP!!!!!! FIX ITTTTTTTTTT
     // TODO INFINITE LOOP!!!!!! FIX ITTTTTTTTTT
    // Uncaught RangeError: Maximum call stack size exceeded
        // MOVED TO computeBn()
//        for (let i=0; i <= this.order_max; ++i) {
//        	this.bn[i]=new Healpix(1<<i);
//        	this.mpr[i]=bn[i].maxPixrad();
//        	this.cmpr[i]=Math.cos(mpr[i]);
//        	this.smpr[i]=Math.sin(mpr[i]);
//        }
        
    }
    
    
    computeBn(){
    	for (let i=0; i <= this.order_max; ++i) {
        	this.bn[i] = new Healpix(1<<i);
        	this.mpr[i] = this.bn[i].maxPixrad();
        	this.cmpr[i] = Hploc.cos(this.mpr[i]);
        	this.smpr[i] = Hploc.sin(this.mpr[i]);
        }
    }
    
    getNPix(){
    	return this.npix;
    };
    
    
    getBoundaries(pix){
        var points = new Array(); 
        var xyf = this.nest2xyf(pix);
    // console.log("PIXEL: "+pix);
    // console.log("XYF "+xyf.ix+" "+xyf.iy+" "+xyf.face);
        var dc=0.5/this.nside;
        var xc=(xyf.ix+0.5)/this.nside; 
        var yc=(xyf.iy+0.5)/this.nside;
        var d = 1.0/(this.nside);
    // console.log("------------------------");
    // console.log("xc, yc, dc "+xc+","+ yc+","+ dc);
    // console.log("xc+dc-d, yc+dc, xyf.face, d "+(xc+dc) +","+ (yc+dc)+","+
	// xyf.face+","+ d);
        points[0]=new Fxyf(xc+dc, yc+dc, xyf.face).toVec3();
        points[1]=new Fxyf(xc-dc, yc+dc, xyf.face).toVec3();
        points[2]=new Fxyf(xc-dc, yc-dc, xyf.face).toVec3();
        points[3]=new Fxyf(xc+dc, yc-dc, xyf.face).toVec3();
    // console.log("Points for npix: "+pix);
    // console.log(points);
    // if (pix > 750){
    // console.log("pix: "+pix);
    // console.log("dc: "+dc);
    // console.log("xyf.ix: "+xyf.ix);
    // console.log("xyf.iy: "+xyf.iy);
    // console.log("xc: "+xc);
    // console.log("yc: "+yc);
    // console.log("d: "+d);
    // }
        return points;
    };
    
    
    /** Returns a set of points along the boundary of the given pixel.
     * Step 1 gives 4 points on the corners. The first point corresponds
     * to the northernmost corner, the subsequent points follow the pixel
     * boundary through west, south and east corners.
     *
     * @param pix pixel index number
     * @param step the number of returned points is 4*step
     * @return {@link Vec3} for each point
     */
    getBoundariesWithStep(pix, step){
        var points = new Array(); 
        var xyf = this.nest2xyf(pix);
        var dc=0.5/this.nside;
        var xc=(xyf.ix+0.5)/this.nside; 
        var yc=(xyf.iy+0.5)/this.nside;
        var d = 1.0/(this.nside * step);

        for(let i = 0; i < step; i++){
            points[i]=new Fxyf(xc+dc - i * d, yc+dc, xyf.face).toVec3();
            points[i + step]=new Fxyf(xc-dc, yc+dc - i * d, xyf.face).toVec3();
            points[i + 2 * step]=new Fxyf(xc-dc + i * d, yc-dc, xyf.face).toVec3();
            points[i + 3 * step]=new Fxyf(xc+dc, yc-dc + i * d, xyf.face).toVec3();
        }
        return points;
    };

    getPointsForXyf(x, y, step, face){
        let nside = step * Math.pow(2, this.order);
        let points = new Array();
        let xyf = new Xyf(x , y , face);

        let dc = 0.5 / nside;
        let xc = (xyf.ix + 0.5) / nside;
        let yc = (xyf.iy + 0.5) / nside;

        points[0] = new Fxyf(xc + dc, yc + dc, xyf.face).toVec3();
        points[1] = new Fxyf(xc - dc, yc + dc, xyf.face).toVec3();
        points[2] = new Fxyf(xc - dc, yc - dc, xyf.face).toVec3();
        points[3] = new Fxyf(xc + dc, yc - dc, xyf.face).toVec3();

        return points;
    }

    /** Returns the neighboring pixels of ipix.
    This method works in both RING and NEST schemes, but is
    considerably faster in the NEST scheme.
    @param ipix the requested pixel number.
    @return array with indices of the neighboring pixels.
      The returned array contains (in this order)
      the pixel numbers of the SW, W, NW, N, NE, E, SE and S neighbor
      of ipix. If a neighbor does not exist (this can only happen
      for the W, N, E and S neighbors), its entry is set to -1. */
    neighbours(ipix){
        var result = new Int32Array(8);
        var xyf = this.nest2xyf(ipix);
        var ix = xyf.ix;
        var iy=xyf.iy;
        var face_num=xyf.face;
    
        var nsm1 = this.nside-1;
        if ((ix>0)&&(ix<nsm1)&&(iy>0)&&(iy<nsm1)){
            var fpix = Math.floor(face_num<<(2*this.order));
            var px0 = this.spread_bits(ix  );
            var py0 = this.spread_bits(iy  )<<1;
            var pxp = this.spread_bits(ix+1);
            var pyp = this.spread_bits(iy+1)<<1;
            var pxm = this.spread_bits(ix-1);
            var pym = this.spread_bits(iy-1)<<1;
    
            result[0] = fpix+pxm+py0; 
            result[1]=fpix+pxm+pyp;
            result[2]=fpix+px0+pyp; 
            result[3]=fpix+pxp+pyp;
            result[4]=fpix+pxp+py0; 
            result[5]=fpix+pxp+pym;
            result[6]=fpix+px0+pym; 
            result[7]=fpix+pxm+pym;
        }else{
            for (var i=0; i< 8; ++i){
                var x=ix+this.xoffset[i];
                var y=iy+this.yoffset[i];
                var nbnum=4;
                if (x<0){ 
                    x+=this.nside; 
                    nbnum-=1; 
                }else if (x>=this.nside){ 
                    x-=this.nside; 
                    nbnum+=1; 
                }
                if (y<0){ 
                    y+=this.nside; 
                    nbnum-=3; 
                }else if (y>=this.nside){ 
                    y-=this.nside; 
                    nbnum+=3; 
                }
                
                var f = this.facearray[nbnum][face_num];
    
                if (f>=0){
                    var bits = this.swaparray[nbnum][face_num>>>2];
                    if ((bits&1)>0){
                        x=Math.floor(this.nside-x-1);
                    }
                    if ((bits&2)>0) {
                        y=Math.floor(this.nside-y-1);
                    }
                    if ((bits&4)>0) { 
                        var tint=x; 
                        x=y; 
                        y=tint; 
                    }
                    result[i] = this.xyf2nest(x,y,f);
                }else{
                    result[i]=-1;
                }		      
            }
        }
        return result;
    };
    nside2order(nside) {
        return ((nside&(nside-1))!=0) ? -1 : Math.log2(nside);
    };
    
    nest2xyf(ipix) {	
        var pix=Math.floor(ipix&(this.npface-1));
        var xyf = new Xyf  (this.compress_bits(pix), this.compress_bits(pix>>1),
                Math.floor((ipix>>(2*this.order))));
        return xyf;
    };
   
    
    xyf2nest(ix, iy, face_num) {

        return Math.floor(face_num<<(2*this.order)) 
        + this.spread_bits(ix) + (this.spread_bits(iy)<<1); 
    };
    
    loc2pix(hploc){
        var z=hploc.z;
        var phi=hploc.phi;
        
        var za = Math.abs(z);
        var tt = this.fmodulo((phi*this.inv_halfpi),4.0);// in [0,4)
        var pixNo;
        if (za<=this.twothird) {// Equatorial region
            var temp1 = this.nside*(0.5+tt);
            var temp2 = this.nside*(z*0.75);
            var jp = Math.floor(temp1-temp2); // index of ascending edge line
            var jm = Math.floor(temp1+temp2); // index of descending edge line
            var ifp = Math.floor(jp >>> this.order);  // in {0,4}
            var ifm = Math.floor(jm >>> this.order);
            var face_num = Math.floor((ifp==ifm) ? (ifp|4) : ((ifp<ifm) ? ifp : (ifm+8)));
            var ix = Math.floor(jm & (this.nside-1));
            var iy = Math.floor(this.nside - (jp & (this.nside-1)) - 1);
            pixNo = this.xyf2nest(ix, iy, face_num);
        }else { // polar region, za > 2/3
            var ntt = Math.min(3,Math.floor(tt));
            var tp = tt-ntt;
            var tmp = ((za<0.99)||(!hploc.have_sth)) ?
                         this.nside*Math.sqrt(3*(1-za)) :
                         this.nside*hploc.sth/Math.sqrt((1.0+za)/3.);
            var jp = Math.floor(tp*tmp); // increasing edge line index
            var jm = Math.floor((1.0-tp)*tmp); // decreasing edge line index
            if (jp>=this.nside){
                jp = this.nside-1; // for points too close to the boundary
            }
            if (jm>=this.nside){
                jm = this.nside-1;
            }

            if (z>=0){
                pixNo = this.xyf2nest(Math.floor(this.nside-jm -1),Math.floor(this.nside-jp-1),ntt);
            }else{
                pixNo = this.xyf2nest(Math.floor(jp), Math.floor(jm), ntt+8);
            }
            
        }
        return pixNo;
    };
    
    
    /** Returns the normalized 3-vector corresponding to the center of the
    supplied pixel.
    @param pix long the requested pixel number.
    @return the pixel's center coordinates. */
    pix2vec(pix) { 
    	return this.pix2loc(pix).toVec3(); 
    };

    
    /**
     * @param pix long
     * @return Hploc
     */
    pix2loc (pix){
    	let loc = new Hploc(undefined);


    	let xyf = this.nest2xyf(pix);

      	let jr = ((this.jrll[xyf.face])<<this.order) -xyf.ix - xyf.iy - 1;

      	let nr;
      	if (jr < this.nside) {
      		nr = jr;
      		let tmp = (nr*nr)*this.fact2;
      		loc.z = 1 - tmp;
      		if (loc.z > 0.99) { 
      			loc.sth = Math.sqrt(tmp * (2.-tmp)); 
      			loc.have_sth = true; 
      		}
        } else if (jr>this.nl3) {
        	nr = this.nl4 - jr;
        	let tmp = (nr * nr) * this.fact2;
        	loc.z = tmp - 1;
        	if (loc.z < -0.99) { 
        		loc.sth=Math.sqrt(tmp * (2. - tmp)); 
        		loc.have_sth = true; }
        	} else {
        		nr = this.nside;
        		loc.z = (this.nl2 - jr) * this.fact1;
        }

      	let tmp= (this.jpll[xyf.face]) * nr + xyf.ix - xyf.iy;
//      	assert(tmp<8*nr); // must not happen
      	if (tmp < 0) {
      		tmp += 8 * nr;
      	}
      	loc.phi = (nr == this.nside) ? 0.75 * Constants.halfpi * tmp * this.fact1 : (0.5 * Constants.halfpi * tmp)/nr;
      	// loc.setPhi((nr == this.nside) ? 0.75 * Constants.halfpi * tmp * this.fact1 : (0.5 * Constants.halfpi * tmp)/nr);
      	return loc;
    };
    

    ang2pix(ptg, mirror){
        return this.loc2pix(new Hploc(ptg, mirror));
    };
    
    fmodulo(v1, v2){
        if (v1>=0){
            return (v1<v2) ? v1 : v1%v2;
        }
        var tmp=v1%v2+v2;
        return (tmp===v2) ? 0.0 : tmp;
    };

    compress_bits(v){    
        var raw        = Math.floor((v & 0x5555)) | Math.floor(((v & 0x55550000) >>> 15));
        var compressed = this.ctab[raw & 0xff] | (this.	ctab[raw >>> 8] << 4);
        return compressed;
    };
    
    
    spread_bits(v){
        return Math.floor(this.utab[v & 0xff]) | Math.floor((this.utab[(v>>> 8)&0xff]<<16)) 
        | Math.floor((this.utab[(v>>>16)&0xff]<<32))| Math.floor((this.utab[(v>>>24)&0xff]<<48));
    };
    
    
    /**
	 * Returns a range set of pixels that overlap with the convex polygon
	 * defined by the {@code vertex} array.
	 * <p>
	 * This method is more efficient in the RING scheme.
	 * <p>
	 * This method may return some pixels which don't overlap with the polygon
	 * at all. The higher {@code fact} is chosen, the fewer false positives are
	 * returned, at the cost of increased run time.
	 * 
	 * @param vertex
	 *            an array containing the vertices of the requested convex
	 *            polygon.
	 * @param fact
	 *            The overlapping test will be done at the resolution
	 *            {@code fact*nside}. For NESTED ordering, {@code fact} must be
	 *            a power of 2, else it can be any positive integer. A typical
	 *            choice would be 4.
	 * @return the requested set of pixel number ranges
	 */
    queryPolygonInclusive(vertex, fact){
    	let inclusive = (fact!=0);
        let nv=vertex.length;
//        let ncirc = inclusive ? nv+1 : nv;

        if (!(nv>=3)){
    		console.log("not enough vertices in polygon");
    		return;
    	}
        let vv = [];
        for (let i=0; i<nv; ++i){
        	vv[i] = Vec3.pointing2Vec3(vertex[i]);
        } 
        
        
        let normal = [];
        let flip=0;
        let index = 0;
        let back = false;

        while (index < vv.length){
        	
        	let first = vv[index];
            let medium = null;
            let last = null;
            
			if (index == vv.length - 1) {
				last = vv[1];
				medium = vv[0];
			} else if (index == vv.length - 2) {
				last = vv[0];
				medium = vv[index + 1];
			} else {
				medium = vv[index + 1];
				last = vv[index + 2];
			}
			
			normal[index] = first.cross(medium).norm();
			let hnd = normal[index].dot(last);
        	
        	if (index == 0) {
				flip = (hnd < 0.) ? -1 : 1;

				let tmp = new Pointing(first);
				back = false;
			} else {
				let flipThnd = flip * hnd;
				if (flipThnd < 0) {
					let tmp = new Pointing(medium);
					vv.splice(index + 1, 1);
					normal.splice(index, 1);
					back = true;
					index -= 1;
					continue;
				} else {
					let tmp = new Pointing(first);
					back = false;
				}
			}


			normal[index].scale(flip);
			index += 1;
        	
        }
        nv=vv.length;
        let ncirc = inclusive ? nv+1 : nv;

        let rad = new Array(ncirc);
        rad = rad.fill(Constants.halfpi);
//        rad = rad.fill(1.5707963267948966);
//        let p = "1.5707963267948966";
//        rad = rad.fill(parseFloat(p));
        
        if (inclusive){
        	let cf = new CircleFinder(vv);
        	normal[nv] = cf.getCenter();
        	rad[nv] = Hploc.acos(cf.getCosrad());
        }
        return this.queryMultiDisc(normal, rad, fact);

    };
    
    /**
	 * For NEST schema only
	 * 
	 * @param normal:
	 *            Vec3[]
	 * @param rad:
	 *            Float32Array
	 * @param fact:
	 *            The overlapping test will be done at the resolution
	 *            {@code fact*nside}. For NESTED ordering, {@code fact} must be
	 *            a power of 2, else it can be any positive integer. A typical
	 *            choice would be 4.
	 * @return RangeSet the requested set of pixel number ranges
	 */
    queryMultiDisc(norm, rad, fact) {
    	this.computeBn();
    	
    	let inclusive = (fact!=0);
        let nv=norm.length;
        // HealpixUtils.check(nv==rad.lengt0,"inconsistent input arrays");
        if (!(nv==rad.length)){
        	console.error("inconsistent input arrays");
        	return;
        }
        
        let res = new RangeSet(4<<1);
        // Removed code for Scheme.RING
        let oplus = 0;
        if (inclusive) {
			if (!(Math.pow(2, this.order_max-this.order)>=fact)){
				console.error("invalid oversampling factor");
			}
			if (!((fact&(fact-1))==0)){
				console.error("oversampling factor must be a power of 2");
			}

        	oplus = this.ilog2(fact);
        	
        }
        let omax = this.order + oplus; // the order up to which we test

        // TODO: ignore all disks with radius>=pi

//        let crlimit = new Float32Array[omax+1][nv][3];
        let crlimit = new Array(omax+1);
        var o;
        var i;
        for (o=0; o<=omax; ++o){ // prepare data at the required orders
        	crlimit[o] = new Array(nv);
        	let dr=this.bn[o].maxPixrad(); // safety distance
            for (i=0; i<nv; ++i){
            	
            	crlimit[o][i] = new Float64Array(3);
            	crlimit[o][i][0] = (rad[i]+dr>Math.PI) ? -1: Hploc.cos(rad[i]+dr);
            	crlimit[o][i][1] = (o==0) ? Hploc.cos(rad[i]) : crlimit[0][i][1];
            	crlimit[o][i][2] = (rad[i]-dr<0.) ?  1. : Hploc.cos(rad[i]-dr);
            }
        }

        let stk = new pstack(12 + 3 * omax);
        for (let i=0; i<12; i++){ // insert the 12 base pixels in reverse
									// order
        	stk.push(11-i, 0);
        }

    	while (stk.size() > 0) { // as long as there are pixels on the stack
            // pop current pixel number and order from the stack
            let pix = stk.ptop();
            let o = stk.otop();
            stk.pop();

            let pv = this.bn[o].pix2vec(pix);

            let zone = 3;
            for (let i=0; (i<nv)&&(zone>0); ++i) {
            	let crad = pv.dot(norm[i]);
            	for (let iz=0; iz<zone; ++iz){
            		if (crad < crlimit[o][i][iz]){
            			zone = iz;	
            		}
            	}
    		}

            if (zone>0) {
            	this.check_pixel (o, omax, zone, res, pix, stk, inclusive);
            }
        }
        return res;
    };
    
    /** Integer base 2 logarithm.
    @param arg
    @return the largest integer {@code n} that fulfills {@code 2^n<=arg}.
    For negative arguments and zero, 0 is returned. */
    ilog2(arg){
    	let max = Math.max(arg, 1);
    	return 31-Math.clz32(max);
    };
    
    
    /**
     * @param int o
     * @param int omax
     * @param int zone
     * @param RangeSet pixset
     * @param long pix
     * @param pstack stk
     * @param boolean inclusive
     */
    check_pixel (o, omax, zone, pixset, pix, stk, inclusive) {
    	    
    	if (zone==0) return;

	    if (o<this.order) {
	    	if (zone>=3) {// output all subpixels
	    		let sdist = 2 * (this.order-o); // the "bit-shift distance" between map orders
    	        pixset.append(pix<<sdist,((pix+1)<<sdist));
	    	}else {// (zone>=1)
    	        for (let i=0; i<4; ++i){
    	          stk.push(4*pix+3-i,o+1); // add children
    	        }
	    	}
	    } else if (o>this.order) {// this implies that inclusive==true
    	      
	    	if (zone>=2) {// pixel center in shape
    	        pixset.append(pix>>>(2*(o-this.order))); // output the parent pixel at order
    	        stk.popToMark(); // unwind the stack
	    	} else {// (zone>=1): pixel center in safety range
	    		if (o<omax) {// check sublevels
	    			for (let i=0; i<4; ++i){ // add children in reverse order
	    				stk.push(4*pix+3-i,o+1); // add children
	    			}
	    		}else {// at resolution limit
	    			pixset.append(pix>>>(2*(o-this.order)));// output the parent pixel at order
	    			stk.popToMark(); // unwind the stack
	    		}
	    	}
	    } else {// o==order
	    	if (zone>=2){
    	        pixset.append(pix);
	    	} else if (inclusive) {// and (zone>=1)
	    		if (this.order<omax) {// check sublevels
	    			stk.mark(); // remember current stack position
	    			for (let i=0; i<4; ++i){ // add children in reverse order
	    				stk.push(4*pix+3-i,o+1); // add children
	    			}
	    		} else {// at resolution limit
    	          pixset.append(pix); // output the pixel
	    		}
	    	}
	    }
    }
    
    /** Returns the maximum angular distance between a pixel center and its
    corners.
    @return maximum angular distance between a pixel center and its
      corners. */
    maxPixrad() {
    	
    	let zphia = new Zphi(2./3., Math.PI/this.nl4);
    	let xyz1 = this.convertZphi2xyz(zphia);
    	
    	let va = new Vec3(xyz1[0], xyz1[1], xyz1[2]);
    	let t1 = 1.-1./this.nside;
    	t1*=t1;
    	
    	
    	let zphib = new Zphi(1-t1/3, 0);
    	let xyz2 = this.convertZphi2xyz(zphib);
    	
    	let vb = new Vec3(xyz2[0], xyz2[1], xyz2[2]);
    	return va.angle(vb);
    };
    
    
    
    /**
     * this is a workaround replacing the Vec3(Zphi) constructor.
     */
    convertZphi2xyz(zphi){
    	
    	let sth = Math.sqrt((1.0-zphi.z)*(1.0+zphi.z));
        let x=sth*Hploc.cos(zphi.phi);
        let y=sth*Hploc.sin(zphi.phi);
        let z=zphi.z;
        return [x, y, z];
    	
    };
} 

export default Healpix;
export {Hploc, Vec3, Pointing};