/**
 * Partial porting to Javascript of Fxyf.java from Healpix3.30
 */
import { Hploc } from './Hploc.js';
import { Vec3 } from './Vec3.js';
export declare class Fxyf {
    fx: number;
    fy: number;
    face: number;
    jrll: Uint8Array;
    jpll: Uint8Array;
    halfpi: number;
    constructor(x: number, y: number, f: number);
    toHploc(): Hploc;
    toVec3(): Vec3;
}
//# sourceMappingURL=Fxyf.d.ts.map