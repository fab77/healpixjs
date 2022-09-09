export class pstack{
	
	p: number[];
	o: Int32Array;
	s: number;
	m: number;
	
	/** Creation from individual components */
	constructor(sz: number){
    	this.p = new Array(sz); 
		this.o = new Int32Array(sz);
		this.s = 0;
		this.m = 0;
	};
	
	/**
	 * @param p long
	 * @param o int
	 */
	push (p_: number, o_: number){ 
		this.p[this.s]= p_; 
		this.o[this.s]= o_; 
		++this.s;
	};
	
  	pop (){ 
  		--this.s; 
  	};
  
  	popToMark (){ 
  		this.s=this.m; 
  	};
  
	size (){ 
		return this.s; 
	};
  

	mark (){ 
		this.m=this.s; 
	};
  
	otop (){ 
		return this.o[this.s-1]; 
	};
  
	ptop (){ 
		return this.p[this.s-1]; 
	};
	
}
