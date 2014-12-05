Require Overhead Test
=====================

Test the overhead of the ES6 Module bundle format vs Browserify's and Webpack's CommonJS format.

This repo generates a configurable number of ES6 modules with a configurable number of dependencies that each module will import. The ES6 modules are them compiled to both the bundle format and CommonJS format. The CommonJS modules are then further processed by Browserify and Webpack.

**To run the build:**

```
$ grunt build
```

This repo also contains a set of Benchmark.js tests which compare how long it takes to run the output of each bundling process via `vm.runInNewContext()`. This provides some insight into how much overhead the `require()` calls add in the Browserify and Webpack bundles.

**To run the benchmarks:**

```
$ grunt benchmark
```

----

If you have any ideas on how to improve these tests, please open an issue or PR.
