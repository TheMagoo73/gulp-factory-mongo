'use strict';

var mocha = require('mocha');
var createError = require('../lib/create-error');
var GulpFactoryMongoError = require('../lib/gulp-factory-mongo-error');

var describe = mocha.describe;
var it = mocha.it;
var beforeEach = mocha.beforeEach;

var chai = require('chai');
chai.should();

var should = require('should');

describe('createError', function() {
  
  it('should have expected error message', function() {
    var e = createError('error message text', null);

    e.should.be.instanceOf(Error);
    e.should.be.instanceOf(GulpFactoryMongoError);
    e.plugin.should.equal('gulp-factory-mongo');
    e.message.should.equal('error message text');
    should(e.cause).not.be.ok();
  });

  it('should wrap cause', function() {
    var cause = new Error('boom!');
    var e = createError('error message text', cause);

    e.should.be.instanceOf(Error);
    e.should.be.instanceOf(GulpFactoryMongoError);
    e.plugin.should.equal('gulp-factory-mongo');
    e.message.should.equal('error message text');
    e.cause.should.equal(cause);
  });
});