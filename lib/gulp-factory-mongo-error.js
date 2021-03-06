var makeErrorCause = require('make-error-cause');

var gulpFactoryMongoError = makeErrorCause('GulpFactoryMongoError');
gulpFactoryMongoError.prototype.toString = function() {
  var cause = this.cause || {};

  return (
    makeErrorCause.BaseError.prototype.toString.call(this) +
    (this.fileName ? '\nFile: ' + this.fileName : '') +
    (cause.line ? '\nLine: ' + cause.line : '')
  );
};

module.exports = gulpFactoryMongoError;