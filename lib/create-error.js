var curry = require('lodash/fp/curry');
var GulpFactoryMongoError = require('./gulp-factory-mongo-error');

function createError(msg, cause) {
  var perr = new GulpFactoryMongoError(msg, cause);
  perr.plugin = 'gulp-factory-mongo';
  perr.showStack = false;
  return perr;
}

module.exports = curry(createError);