'use strict';

var compileModules = require('broccoli-es6-module-transpiler');
var mergeTrees     = require('broccoli-merge-trees');

module.exports = mergeTrees([
    compileModules('src/', {
        formatter: 'bundle',
        output   : 'bundle.js'
    }),

    compileModules('src/', {
        formatter: 'commonjs',
        output   : 'commonjs/'
    })
]);
