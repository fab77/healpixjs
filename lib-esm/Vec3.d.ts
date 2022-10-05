/**
 * Partial porting to Javascript of Vec3.java from Healpix3.30
 */
import { Pointing } from './Pointing.js';
export declare class Vec3 {
    x: number;
    y: number;
    z: number;
    constructor(in_x: number | Pointing, in_y: number, in_z: number);
    getX(): number;
    getY(): number;
    getZ(): number;
    /** Scale the vector by a given factor
    @param n the scale factor */
    scale(n: number): void;
    /** Vector cross product.
    @param v another vector
    @return the vector cross product between this vector and {@code v} */
    cross(v: Vec3): Vec3;
    /** Vector addition
        * @param v the vector to be added
        * @return addition result */
    add(v: Vec3): Vec3;
    /** Normalize the vector */
    normalize(): void;
    /** Return normalized vector */
    norm(): Vec3;
    /** Vector length
    @return the length of the vector. */
    length(): number;
    /** Squared vector length
        @return the squared length of the vector. */
    lengthSquared(): number;
    /** Computes the dot product of the this vector and {@code v1}.
     * @param v1 another vector
     * @return dot product */
    dot(v1: Vec3): number;
    /** Vector subtraction
     * @param v the vector to be subtracted
     * @return subtraction result */
    sub(v: Vec3): Vec3;
    /** Angle between two vectors.
    @param v1 another vector
    @return the angle in radians between this vector and {@code v1};
      constrained to the range [0,PI]. */
    angle(v1: Vec3): number;
    /** Invert the signs of all components */
    flip(): void;
    static pointing2Vec3(pointing: Pointing): Vec3;
}
//# sourceMappingURL=Vec3.d.ts.map