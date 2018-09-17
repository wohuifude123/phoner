'use strict';

if (process.env.NODE_ENV === 'production') {
    module.exports = require('./cjs/phoner.development.js');
} else {
    module.exports = require('./cjs/phoner.development.js');
}