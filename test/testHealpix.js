
import { Point } from '../../wcslight/src/model/Point.js';
import { CoordsType } from '../../wcslight/src/model/CoordsType.js';
import { NumberType } from '../../wcslight/src/model/NumberType.js';
import { Healpix } from '../lib-esm/Healpix.js';
import { Pointing } from '../lib-esm/Pointing.js';


// const center = new Point(CoordsType.ASTRO, NumberType.DEGREES, 277.8877690, -1.9759278); // equatorial
const center = new Point(CoordsType.ASTRO, NumberType.DEGREES, 28.8999684, 3.5179829); // equatorial


const radiusDeg = 1;
const pxsize = 0.005; // degrees

const RES_ORDER_0 = 58.6/512;

const order = Math.round(Math.log2(RES_ORDER_0/pxsize));
const nside = 2 ** order;
const hp = new Healpix(nside);
const ptg = new Pointing(null, false, center.spherical.thetaRad, center.spherical.phiRad);
const radius_rad = (radiusDeg / 180.) * Math.PI;
const rangeset = hp.queryDiscInclusive(ptg, radius_rad, 4); // <= check it 
console.log(rangeset);
// expected { [4461;4462[,[4463;4464[,[4472;4473[,[4474;4475[ }
