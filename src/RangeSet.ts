export class RangeSet{
	
	r: Int32Array;
	sz: number;
	/**
	 * @param int cap: initial capacity
	 */
	constructor(cap?: number){
		if (cap<0) console.error("capacity must be positive");
	    this.r = new Int32Array(cap<<1);
	    this.sz=0;
	};
	
	
	/** Append a single-value range to the object.
    @param val value to append */
	append (val: number): void { 
		this.append1(val,val+1); 
	};
	
	
	 /** Append a range to the object.
    @param a first long in range
    @param b one-after-last long in range */
	append1 (a: number, b: number): void {
		if (a>=b) return;
		if ((this.sz>0) && (a<=this.r[this.sz-1])) {
			if (a<this.r[this.sz-2]) console.error("bad append operation");
			if (b>this.r[this.sz-1]) this.r[this.sz-1]=b;
			return;
		}
		// this.ensureCapacity(this.sz+2);
		let cap = this.sz+2;
		if (this.r.length < cap) {
			let newsize = Math.max( 2 * this.r.length,cap);
			let rnew = new Int32Array(newsize);
			rnew.set(this.r);
			this.r = rnew;
		}
		
		this.r[this.sz] = a;
		this.r[this.sz+1] = b;
		this.sz+=2;
	};
	
	/** Make sure the object can hold at least the given number of entries. 
	 * @param cap int
	 * */
  	ensureCapacity(cap: number): void { 
  		if (this.r.length < cap) 
  			this.resize (Math.max( 2 * this.r.length,cap)); 
  	};
	
	/**
	 * @param newsize int
	 */
	resize(newsize: number): void {
		if (newsize<this.sz)  console.error("requested array size too small");
		if (newsize == this.r.length) return;
		let rnew = new Int32Array(newsize);
		let sliced = this.r.slice(0, this.sz + 1);
//		this.arrayCopy(this.r, 0, rnew, 0, this.sz);
		this.r = sliced;
    };
	
//	arrayCopy(src, srcIndex, dest, destIndex, length) {
//		dest.splice(destIndex, length, ...src.slice(srcIndex, srcIndex + length));
//	};

  
  
}

