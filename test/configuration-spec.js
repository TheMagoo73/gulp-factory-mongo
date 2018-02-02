var mocha = require('mocha');
var describe = mocha.describe;
var it = mocha.it;
var beforeEach = mocha.beforeEach;
var curry = require('lodash/fp/curry');

var chai = require('chai');
chai.should();

var should = require('should');

const Configuration = require('../lib/configuration.js');

describe('configuration', ()=>{
    describe('configuration can be parsed', ()=> {

        it('errors if mandatory fields are not present', ()=>{
            (()=>new Configuration({database: 'testdb', entity: 'user', factoryDefinition: {email:'name@domain.com', paswword:'what'}})).should.throw();
            (()=>new Configuration({connectionString: 'mongo:', entity: 'user', factoryDefinition: {email:'name@domain.com', paswword:'what'}})).should.throw();
            (()=>new Configuration({connectionString: 'mongo:', database: 'testdb', factoryDefinition: {email:'name@domain.com', paswword:'what'}})).should.throw();
            (()=>new Configuration({connectionString: 'mongo:', database: 'testdb', entity: 'user'})).should.throw();            
        })

        it('handles default values', () => {
            config = new Configuration({connectionString: 'mongo:', database: 'testdb', entity: 'user', factoryDefinition: {email:'name@domain.com', paswword:'what'}});
            config._config.createDatabase.should.be.false;
            config._config.collection.should.equal('users');
            config._config.createCollection.should.be.true;
            config._config.appendCollection.should.be.true;
            config._config.count.should.equal(1);
        })

        it('', () => {
            config = new Configuration({connectionString: 'mongo:', 
                                        database: 'testdb',
                                        entity: 'user',
                                        createDatabase: true,
                                        collection: 'people',
                                        createCollection: false,
                                        appendCollection: false,
                                        count: 10,
                                        factoryDefinition: {email:'name@domain.com', paswword:'what'}
                                        });

            config._config.createDatabase.should.be.true;
            config._config.collection.should.equal('people');
            config._config.createCollection.should.be.false;
            config._config.appendCollection.should.be.false;
            config._config.count.should.equal(10);            
        })

    })

    describe('accessors', ()=> {

        var config = null;

        beforeEach(() => {
            config = new Configuration({connectionString: 'mongo:', database: 'testdb', entity: 'user', factoryDefinition: {email:'name@domain.com', paswword:'what'}});
        })

        it('can return factoryDefinition', ()=>{
            config.getFactoryDefinition().should.deep.equal({email:'name@domain.com', paswword:'what'});
        })

    })

    describe('helpers', ()=> {

        var config = null;

        var fakeConnector = function(connString, database){
            return new Promise((resolve, reject)=>{
                resolve({connString: connString, database: database});
            })
        }

        var fakeFactory = function(entity, definition){
            return Object.assign({}, definition);
        }

        beforeEach(()=>{
            config = new Configuration({connectionString: 'mongo:', database: 'testdb', entity: 'user', factoryDefinition: {email:'name@domain.com', paswword:'what'}});
        })

        it(('can connect a database'), ()=>{
            return config.connectDb(curry(fakeConnector)).should.eventually.deep.equal({connString: 'mongo:', database: 'testdb'});
        })

        it(('can create entities'), ()=>{
            return config.createEntity(curry(fakeFactory)).should.eventually.deep.equal({email:'name@domain.com', paswword:'what'});
        })
    })
})