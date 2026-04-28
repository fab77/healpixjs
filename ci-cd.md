# healpixjs Release Notes

This repository is part of the AstroViewer dependency family and now follows a
dual-license model.

Before a commercial-facing release is considered final, review:

- `LICENSE.md`
- `LICENSE-COMMERCIAL.md`
- `LICENSE-NONCOMMERCIAL.md`

## Current release policy

- keep the current package name `healpixjs` until the package-channel strategy
  is finalized across the full dependency family
- tag releases from `main` with `v<version>`
- use CI build success as the minimum release gate

## Suggested release flow

```bash
git checkout dev
git pull origin dev

git checkout -b release/2.0.0

npm version 2.0.0 --no-git-tag-version
npm install

git add package.json package-lock.json README.md LICENSE.md LICENSE-COMMERCIAL.md LICENSE-NONCOMMERCIAL.md ci-cd.md .github/workflows/ci.yml
git commit -m "Prepare release 2.0.0"

git push -u origin release/2.0.0
```
Open PR release/2.0.0 -> main in github and merge on main.

From main:
```bash
git checkout main
git pull origin main

node -p "require('./package.json').version"
npm ci
npm run build:prod
npm pack --dry-run
git tag -a v2.0.0 -m "Release v2.0.0"
git push origin v2.0.0
npm publish

```

After release, merge to dev:

```bash
git checkout dev
git pull origin dev
git merge main

npm version 2.1.0-snapshot --no-git-tag-version
npm install

git add package.json package-lock.json
git commit -m "Start 2.1.0-snapshot development"
git push origin dev

```
