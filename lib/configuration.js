var createError = require('./create-error');
const pluralizer = require('./util/pluralizer').Pluralizer;
const validate = require('validate');

function Configuration(config){

    var configSchema = validate({
        connectionString: {
            type: 'string',
            required: true,
            message: 'connectionString is required'
        },
        entity: {
            type: 'string',
            required: true,
            message: 'entity is required'
        },
        database: {
            type: 'string',
            required: true,
            message: 'database is required'
        },
        factoryDefinition: {
            required: true,
            message: 'factoryDefinition is required'
        }
    });

    var errors = configSchema.validate(config, {strip: false});
    if(errors.length > 0) throw new createError(errors[0].message);

    this._config = Object.assign({}, config);

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