'use strict';

var path    = require('path');
var webpack = require('webpack');

module.exports = function (grunt) {
    grunt.registerMultiTask('webpack', function () {
        var done = this.async();

        this.files.forEach(function (fileGroup) {
            webpack({
                entry: fileGroup.src,

                output: {
                    path    : path.dirname(fileGroup.dest),
                    filename: path.basename(fileGroup.dest)
                }
            }, done);
        });
    });
};
