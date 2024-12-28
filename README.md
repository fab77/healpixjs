# HEALPix porting to Javascript

Porting of HEALPix C++ library to Vanilla Javascript. It only supports NEST pixelation of the sky.

# How to use the generated library available in Nodejs repository
Include the following dependency into package.json file in your project:
```
"dependencies": {
        "healpixjs": "^1.0.3",
    },
```
# Start using HEALPixjs in your project
```
import { Healpix } from "healpixjs"
import { Pointing } from "healpixjs"
import { Vec3 } from "healpixjs"

const nside = 8
const hpx = new Healpix(nside)

const thetaRadians = 0.73304
const phiRadians = 1.43117
const ptg = new Pointing(null, false, thetaRadians, phiRadians)
const pixelTileNumber = hpx.ang2pix(ptg)
const vec3 = hpx.pix2vec(pixelTileNumber)

```


## Instalation

- Prerequisites:
  [Node.js](https://nodejs.org) v<=16
  (see [installation instructions](https://nodejs.org/en/download/package-manager))

- Clone repo:
```
git clone https://github.com/fab77/healpixjs.git
```

- Move into the astrobrowser folder:
```
cd healpixjs
```

- Install the required `dev` modules:
```
npm i
```

- Compile the project:
```
npm run build:prod
```
