import { Hploc } from './Hploc.js';
export class Pointing {
    /**
     *
     * @param {*} vec3 Vec3.js
     * @param {*} mirror
     * @param {*} in_theta radians
     * @param {*} in_phi radians
     */
    constructor(vec3, mirror, in_theta, in_phi) {
        if (vec3 != null) {
            this.theta = Hploc.atan2(Math.sqrt(vec3.x * vec3.x + vec3.y * vec3.y), vec3.z);
            if (mirror) {
                this.phi = -Hploc.atan2(vec3.y, vec3.x);
            }
            else {
                this.phi = Hploc.atan2(vec3.y, vec3.x);
            }
            if (this.phi < 0.0) {
                this.phi = this.phi + 2 * Math.PI;
            }
            if (this.phi >= 2 * Math.PI) {
                this.phi = this.phi - 2 * Math.PI;
            }
        }
        else {
            this.theta = in_theta;
            this.phi = in_phi;
        }
    }
}
//# sourceMappingURL=Pointing.js.map