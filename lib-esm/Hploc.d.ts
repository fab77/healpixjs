import { Pointing } from './Pointing.js';
import { Vec3 } from './Vec3.js';
import { Zphi } from './Zphi.js';
export declare class Hploc {
    static PI4_A: number;
    static PI4_B: number;
    static PI4_C: number;
    static M_1_PI: number;
    sth: number;
    have_sth: boolean;
    z: number;
    _phi: number;
    constructor(ptg?: Pointing);
    setZ(z: number): void;
    get phi(): number;
    set phi(phi: number);
    setSth(sth: number): void;
    toPointing(mirror: boolean): Pointing;
    toVec3(): Vec3;
    toZphi(): Zphi;
    static sin(d: number): number;
    static cos(d: number): number;
    static sincoshelper(d: number): number;
    /** This method calculates the arc sine of x in radians. The return
    value is in the range [-pi/2, pi/2]. The results may have
    maximum error of 3 ulps. */
    static asin(d: number): number;
    /** This method calculates the arc cosine of x in radians. The
        return value is in the range [0, pi]. The results may have
        maximum error of 3 ulps. */
    static acos(d: number): number;
    static mulsign(x: number, y: number): number;
    static copySign(magnitude: number, sign: number): number;
    static atanhelper(s: number): number;
    static atan2k(y: number, x: number): number;
    /** This method calculates the arc tangent of y/x in radians, using
    the signs of the two arguments to determine the quadrant of the
    result. The results may have maximum error of 2 ulps. */
    static atan2(y: number, x: number): number;
    /** Checks if the argument is a NaN or not. */
    static isnan(d: number): boolean;
    /** Checks if the argument is either positive or negative infinity. */
    static isinf(d: number): boolean;
}
//# sourceMappingURL=Hploc.d.ts.map