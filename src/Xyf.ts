/**
 * Partial porting to Javascript of Xyf.java from Healpix3.30  
 */
export class Xyf{

	ix: number;
	iy: number;
	face: number;

	constructor(x: number, y: number, f: number){
		this.ix = x;
		this.iy = y;
		this.face = f;
	}
}


