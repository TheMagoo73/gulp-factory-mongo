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
var factory = require('factory-girl').factory;

describe('factory-girl-adapter', () => {

    var defineStub, buildStub;
    var ent;

    beforeEach(()=>{
        defineStub = sinon.stub(factory, 'define')
            .withArgs('user').returns({name: 'a user'})
        buildStub = sinon.stub(factory, 'build').resolves({name: 'a user'});
    })

    afterEach(()=>{
        defineStub.resetBehavior();
        buildStub.resetBehavior();
    })

    it('can define and create entities', () => {
        return adapter('user', {name: 'a user'}).then(
            user => {
                user.should.deep.equal({name: 'a user'});
            }
        )
    })

})