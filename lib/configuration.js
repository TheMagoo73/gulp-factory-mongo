var createError = require('./create-error');

function Configuration(config){
    if(!config.connectionString) throw new createError('connectionString must be specified');
    if(!config.database) throw new createError('database must be specified');
    if(!config.entity) throw new createError('entity must be specified');
    if(!config.factoryDefinition) throw new createError('factoryDefinition must be specified');

    this._config = config;

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