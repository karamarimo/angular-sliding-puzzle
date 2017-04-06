# Angular Sliding Puzzle

This is a web application of sliding puzzle game using Angular.

## Set up

Run `npm install` to install all the modules the application depends on.

## How to build/run

### JIT(Just in time) mode

Run `npm start` to build and start the server, and navigate to `/` or `/index.html` to see the result. File changes get immediately reflected.

### AOT(Ahead of time) mode

Run `npm run build:aot` to compile and rollup. It will generate a bundled javascript file at `dist/bundle.js`. Deploy it with `src/index-aot.html`.
