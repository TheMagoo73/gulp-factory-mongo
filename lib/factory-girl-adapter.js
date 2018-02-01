var factory = require('factory-girl').factory;
var curry = require('lodash/fp/curry');

function adapter(entity, definition) {
    if(!factory.getFactory(entity, false)) {
        factory.define(entity, function(e){ Object.assign(this, e); }, definition);
    }
    return new Promise((resolve, reject) => {
        factory.build(entity)
        .then(
            e => {resolve(e)}
        )
    })
}

module.export = curry(adapter);