'use strict';

var path = require('path');

// -----------------------------------------------------------------------------

module.exports = function (grunt) {
    grunt.registerMultiTask('create_modules', function () {
        var options = this.options({
            numModules   : 100,
            depsPerModule: 10
        });

        function createModule(name, deps) {
            var code = [];

            // Import all deps.
            deps.forEach(function (dep) {
                code.push('import ' + dep + ' from "./' + dep + '.js";');
            });

            // Access all deps.
            code.push('export var deps = ' + deps.join(' + ') + ';');

            // Export module name.
            code.push('var name = "' + name + '";');
            code.push('export default name;\n');

            return code.join('\n');
        }

        function createDepsList(id) {
            var deps = [];

            function depExists(dep) {
                return deps.some(function (id) {
                    return id === dep;
                });
            }

            var dep;
            while (deps.length < options.depsPerModule) {
                dep = Math.round(Math.random() * (options.numModules - 1));
                if (dep === id || depExists(dep)) {
                    continue;
                }

                deps.push(dep);
            }

            return deps;
        }

        this.files.forEach(function (fileGroup) {
            var dest = fileGroup.dest;

            function writeModule(id) {
                var name = 'mod' + id;

                var deps = createDepsList(id).map(function (id) {
                    return 'mod' + id;
                });

                grunt.file.write(
                    path.join(dest, name + '.js'),
                    createModule(name, deps)
                );
            }

            for (var i = 0; i < options.numModules; i += 1) {
                writeModule(i);
            }

            grunt.log.ok('Generated ' + options.numModules + ' modules to: ' + dest);
        });
    });
};
