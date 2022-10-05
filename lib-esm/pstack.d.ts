export declare class pstack {
    p: number[];
    o: Int32Array;
    s: number;
    m: number;
    /** Creation from individual components */
    constructor(sz: number);
    /**
     * @param p long
     * @param o int
     */
    push(p_: number, o_: number): void;
    pop(): void;
    popToMark(): void;
    size(): number;
    mark(): void;
    otop(): number;
    ptop(): number;
}
//# sourceMappingURL=pstack.d.ts.map