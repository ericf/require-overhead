'use strict';

var fs = require('fs');
var vm = require('vm');
var context = vm.createContext({});

var file = fs.readFileSync('./build/webpack.js', 'utf8');

module.exports = function () {
    vm.runInContext(file, context);
};
