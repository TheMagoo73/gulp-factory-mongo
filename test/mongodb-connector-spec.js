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

var MongoClient = require('mongodb').MongoClient;

const connector = require('../lib/mongodb-connector.js');

describe('mongodb-connector', ()=>{

    var connectStub;

    before(() => {
        connectStub = sinon.stub(MongoClient, 'connect').resolves({db: function(db) {return {name: db}}});
    })

    after(() => {
        connectStub.resetBehavior();
    })

    it('can connect to a MongoDb', ()=>{
        return connector('fred', 'bob').then(
            (resp) => {
                connectStub.calledOnce.should.be.true;
                resp.database.name.should.equal('bob');
                resp.client.db.should.be.ok;
            }            
        );
    })
    
})