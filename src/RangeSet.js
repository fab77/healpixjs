"use strict";

class RangeSet{
	
	/**
	 * @param int cap: initial capacity
	 */
	constructor(cap){
		if (cap<0) console.error("capacity must be positive");
	    this.r = new Int32Array[cap<<1];
	    this.sz=0;
	};
	
	
	/** Append a single-value range to the object.
    @param val value to append */
	append (val) { 
		append1(val,val+1); 
	};
	
	
	 /** Append a range to the object.
    @param a first long in range
    @param b one-after-last long in range */
	append1 (a, b) {
		if (a>=b) return;
		if ((this.sz>0) && (a<=r[this.sz-1])) {
			if (a<this.r[this.sz-2]) console.error("bad append operation");
			if (b>this.r[this.sz-1]) this.r[this.sz-1]=b;
			return;
		}
		this.ensureCapacity(this.sz+2);

		this.r[this.sz] = a;
		this.r[this.sz+1] = b;
		this.sz+=2;
	};
	
	/** Make sure the object can hold at least the given number of entries. 
	 * @param cap int
	 * */
  	ensureCapacity(cap) { 
  		if (this.r.length < cap) 
  			this.resize (Math.max( 2 * this.r.length,cap)); 
  	};
	
	/**
	 * @param newsize int
	 */
	resize(newsize) {
		if (newsize<sz)  console.error("requested array size too small");
		if (newsize == this.r.length) return;
		let rnew = new Int32Array[newsize];
		this.arraycopy(this.r, 0, rnew, 0, this.sz);
		this.r = rnew;
    };
	
	arrayCopy(src, srcIndex, dest, destIndex, length) {
		dest.splice(destIndex, length, ...src.slice(srcIndex, srcIndex + length));
	};

  
  
}

export default RangeSet;