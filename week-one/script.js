'use strict';

const _ = require('lodash');

// never use var
//const or let preferred

// Ex. 1
console.log('Hello world');

// Ex. 2
let output = 'Just testing nodemon, using lodash to convert string to camel case';
console.log(output);
output = _.camelCase(output);
console.log(output);