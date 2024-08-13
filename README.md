# vue-pouchdb

A quick example of [vue.js](https://vuejs.org/) and [pouchdb](https://pouchdb.com/) working together!

## Project Setup

```sh
bun install
```

### Compile and Hot-Reload for Development

```sh
bun dev
```

### Type-Check, Compile and Minify for Production

```sh
bun build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
bun test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
bun lint
```

---

## Recreate this example

### 1 - Quickstart Vue

https://vuejs.org/guide/quick-start

### 2 - Add pouchdb

```
bun add pouchdb
```

### 3 - Add polyfill

At the time of writing - there is a node dependency issue with vite that requires a polyfill. Read more about it in this [github issue](https://github.com/pouchdb/pouchdb/issues/8968).

To get pouchdb up and running run

`bun add events webpack-node-polyfill`

Then update your `vite.config.ts`

```
import { defineConfig } from 'vite';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';

export default defineConfig({
  plugins: [
    NodeGlobalsPolyfillPlugin({
      buffer: true,
    }),
  ],
  resolve: {
    alias: {
      events: 'events/',
    },
  },
});
```
