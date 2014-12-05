'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        clean: {
            src  : 'src/',
            build: 'build/'
        },

        create_modules: {
            modules: {
                dest: 'src/',

                options: {
                    numModules   : 500,
                    depsPerModule: 10
                }
            }
        },

        broccoli_build: {
            modules: {
                dest: 'build/'
            }
        },

        browserify: {
            bundle: {
                src : 'build/commonjs/*.js',
                dest: 'build/browserify.js'
            }
        },

        webpack: {
            bundle: {
                src : './build/commonjs/*.js',
                dest: 'build/webpack.js'
            }
        },

        benchmark: {
            bundle: {
                src: 'tests/benchmark/bundle*.js'
            },

            browserify: {
                src: 'tests/benchmark/browserify*.js'
            },

            webpack: {
                src: 'tests/benchmark/webpack*.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-broccoli-build');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-benchmark');
    grunt.loadTasks('./tasks/');

    grunt.registerTask('build', [
        'clean', 'create_modules', 'broccoli_build', 'browserify', 'webpack'
    ]);

    grunt.registerTask('default', ['build', 'benchmark']);
};
