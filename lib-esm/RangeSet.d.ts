export declare class RangeSet {
    r: Int32Array;
    sz: number;
    /**
     * @param int cap: initial capacity
     */
    constructor(cap?: number);
    /** Append a single-value range to the object.
    @param val value to append */
    append(val: number): void;
    /** Append a range to the object.
   @param a first long in range
   @param b one-after-last long in range */
    append1(a: number, b: number): void;
    /** Make sure the object can hold at least the given number of entries.
     * @param cap int
     * */
    ensureCapacity(cap: number): void;
    /**
     * @param newsize int
     */
    resize(newsize: number): void;
}
//# sourceMappingURL=RangeSet.d.ts.map