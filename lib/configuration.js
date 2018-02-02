var createError = require('./create-error');
const pluralizer = require('./util/pluralizer').Pluralizer;

function Configuration(config){
    if(!config.connectionString) throw new createError('connectionString must be specified');
    if(!config.database) throw new createError('database must be specified');
    if(!config.entity) throw new createError('entity must be specified');
    if(!config.factoryDefinition) throw new createError('factoryDefinition must be specified');

    this._config = {}
    Object.assign(this._config, config);

    if(this._config.createDatabase === undefined)
        this._config.createDatabase = false;
    if(this._config.collection === undefined)
        this._config.collection = pluralizer.pluralize(config.entity);
    if(this._config.createCollection === undefined)
        this._config.createCollection = true;
    if(this._config.appendCollection === undefined)
        this._config.appendCollection = true;
    if(this._config.count === undefined)
        this._config.count = 1;

    return this;
}

Configuration.prototype.getFactoryDefinition = function(){
    return this._config.factoryDefinition;
}

Configuration.prototype.connectDb = function(connector){
    return new Promise((resolve,reject)=>{
        connector(this._config.connectionString, this._config.database)
        .then( database => { resolve(database); });
    })
}

Configuration.prototype.createEntity = function(factory){
    return new Promise((resolve, reject)=>{
        resolve(factory(this._config.entity, this._config.factoryDefinition));
    })
}

module.exports = Configuration;