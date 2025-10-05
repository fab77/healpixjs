import { Hploc } from "./Hploc.js";
import { Pointing } from "./Pointing.js";
import { pstack } from "./pstack.js";
import { RangeSet } from "./RangeSet.js";
import { Vec3 } from "./Vec3.js";
import { Xyf } from "./Xyf.js";
import { Zphi } from "./Zphi.js";
/**
 * Partial porting to Javascript of HealpixBase.java from Healpix3.30
 */
export declare class Healpix {
    order_max: number;
    inv_halfpi: number;
    twothird: number;
    ns_max: number;
    ctab: Uint16Array;
    utab: Uint16Array;
    xoffset: Int16Array;
    yoffset: Int16Array;
    jrll: Int16Array;
    jpll: Int16Array;
    facearray: Int16Array[];
    swaparray: Int16Array[];
    nside: number;
    npface: number;
    npix: number;
    order: number;
    nl2: number;
    nl3: number;
    nl4: number;
    fact2: number;
    fact1: number;
    ncap: number;
    bn: Healpix[];
    mpr: number[];
    cmpr: number[];
    smpr: number[];
    constructor(nside_in: number);
    computeBn(): void;
    getNPix(): number;
    getBoundaries(pix: number): Vec3[];
    /** Returns a set of points along the boundary of the given pixel.
     * Step 1 gives 4 points on the corners. The first point corresponds
     * to the northernmost corner, the subsequent points follow the pixel
     * boundary through west, south and east corners.
     *
     * @param pix pixel index number
     * @param step the number of returned points is 4*step
     * @return {@link Vec3} for each point
     */
    getBoundariesWithStep(pix: number, step: number): Vec3[];
    getPointsForXyfNoStep(x: number, y: number, face: number): Vec3[];
    getPointsForXyf(x: number, y: number, step: number, face: number): Vec3[];
    /** Returns the neighboring pixels of ipix.
    This method works in both RING and NEST schemes, but is
    considerably faster in the NEST scheme.
    @param ipix the requested pixel number.
    @return array with indices of the neighboring pixels.
      The returned array contains (in this order)
      the pixel numbers of the SW, W, NW, N, NE, E, SE and S neighbor
      of ipix. If a neighbor does not exist (this can only happen
      for the W, N, E and S neighbors), its entry is set to -1. */
    neighbours(ipix: number): Int32Array;
    nside2order(nside: number): number;
    nest2xyf(ipix: number): Xyf;
    xyf2nest(ix: number, iy: number, face_num: number): number;
    loc2pix(hploc: Hploc): number;
    /** Returns the normalized 3-vector corresponding to the center of the
    supplied pixel.
    @param pix long the requested pixel number.
    @return the pixel's center coordinates. */
    pix2vec(pix: number): Vec3;
    /** Returns the Zphi corresponding to the center of the supplied pixel.
     @param pix the requested pixel number.
     @return the pixel's center coordinates. */
    pix2zphi(pix: number): Zphi;
    pix2ang(pix: number, mirror?: boolean): Pointing;
    /**
     * @param pix long
     * @return Hploc
     */
    pix2loc(pix: number): Hploc;
    za2vec(z: number, a: number): Vec3;
    ang2vec(theta: number, phi: number): Vec3;
    vec2ang(v: Vec3): {
        theta: number;
        phi: number;
    };
    vec2za(X: number, Y: number, z: number): {
        z: number;
        a: number;
    };
    ang2pix(ptg: Pointing, mirror?: boolean): number;
    fmodulo(v1: number, v2: number): number;
    compress_bits(v: number): number;
    spread_bits(v: number): number;
    /**
     * Returns a range set of pixels that overlap with the convex polygon
     * defined by the {@code vertex} array.
     * <p>
     * This method is more efficient in the RING scheme.
     * <p>
     * This method may return some pixels which don't overlap with the polygon
     * at all. The higher {@code fact} is chosen, the fewer false positives are
     * returned, at the cost of increased run time.
     *
     * @param vertex
     *            an array containing the vertices of the requested convex
     *            polygon.
     * @param fact
     *            The overlapping test will be done at the resolution
     *            {@code fact*nside}. For NESTED ordering, {@code fact} must be
     *            a power of 2, else it can be any positive integer. A typical
     *            choice would be 4.
     * @return the requested set of pixel number ranges
     */
    queryPolygonInclusive(vertex: Pointing[], fact: number): RangeSet;
    /**
     * For NEST schema only
     *
     * @param normal:
     *            Vec3[]
     * @param rad:
     *            Float32Array
     * @param fact:
     *            The overlapping test will be done at the resolution
     *            {@code fact*nside}. For NESTED ordering, {@code fact} must be
     *            a power of 2, else it can be any positive integer. A typical
     *            choice would be 4.
     * @return RangeSet the requested set of pixel number ranges
     */
    queryMultiDisc(norm: Vec3[], rad: number[], fact: number): RangeSet;
    /** Integer base 2 logarithm.
    @param arg
    @return the largest integer {@code n} that fulfills {@code 2^n<=arg}.
    For negative arguments and zero, 0 is returned. */
    ilog2(arg: number): number;
    /** Computes the cosine of the angular distance between two z, phi positions
      on the unit sphere. */
    cosdist_zphi(z1: number, phi1: number, z2: number, phi2: number): number;
    /**
     * @param int o
     * @param int omax
     * @param int zone
     * @param RangeSet pixset
     * @param long pix
     * @param pstack stk
     * @param boolean inclusive
     */
    check_pixel(o: number, omax: number, zone: number, pixset: RangeSet, pix: number, stk: pstack, inclusive: boolean): void;
    /** Returns the maximum angular distance between a pixel center and its
    corners.
    @return maximum angular distance between a pixel center and its
      corners. */
    maxPixrad(): number;
    /**
     * this is a workaround replacing the Vec3(Zphi) constructor.
     */
    convertZphi2xyz(zphi: Zphi): [number, number, number];
    /** Returns a range set of pixels which overlap with a given disk. <p>
      This method is more efficient in the RING scheme. <p>
      This method may return some pixels which don't overlap with
      the polygon at all. The higher {@code fact} is chosen, the fewer false
      positives are returned, at the cost of increased run time.
      @param ptg the angular coordinates of the disk center
      @param radius the radius (in radians) of the disk
      @param fact The overlapping test will be done at the resolution
        {@code fact*nside}. For NESTED ordering, {@code fact} must be a power
        of 2, else it can be any positive integer. A typical choice would be 4.
      @return the requested set of pixel number ranges  */
    queryDiscInclusive(ptg: Pointing, radius: number, fact: number): RangeSet;
}
//# sourceMappingURL=Healpix.d.ts.map