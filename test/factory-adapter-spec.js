var mocha = require('mocha');
var describe = mocha.describe;
var it = mocha.it;
var beforeEach = mocha.beforeEach;

var chai = require('chai');
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
chai.should();

var should = require('should');

var sinon = require('sinon');

sinon.assert.expose(chai.assert, { prefix: "" });

const adapter = require('../lib/factory-girl-adapter.js');


describe('factory-girl-adapter', () => {

    it('can create entities', () => {
        'fred'.should.equal(false);
    })
})