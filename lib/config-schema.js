const validate = require('validate');
    
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

module.exports = configSchema;