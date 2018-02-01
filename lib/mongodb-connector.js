var MongoClient = require('mongodb').MongoClient;
var curry = require('lodash/fp/curry');

function connect(connectionString, database) {
    return new Promise((resolve, reject)=>{
        MongoClient.connect(connectionString)
        .then(
            client => { resolve({
                client: client,
                database: client.db(database
            )}); } 
        )
    })
}

module.exports = curry(connect);