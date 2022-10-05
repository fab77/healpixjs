import { Vec3 } from './Vec3.js';
export declare class CircleFinder {
    center: any;
    cosrad: any;
    /**
     * @param point: Vec3
     */
    constructor(point: any);
    /**
     * @parm point: Vec3
     * @param q: int
     */
    getCircle(point: any, q: any): void;
    /**
     * @parm point: Vec3
     * @param q1: int
     * @param q2: int
     */
    getCircle2(point: any, q1: any, q2: any): void;
    getCenter(): Vec3;
    getCosrad(): any;
}
//# sourceMappingURL=CircleFinder.d.ts.map