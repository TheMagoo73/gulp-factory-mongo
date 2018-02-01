# gulp-factory-mongo
>A factory-girl oriented gulp task for seeding MongoDB collections

[![Build Status](https://travis-ci.org/TheMagoo73/gulp-factory-mongo.svg?branch=master)](https://travis-ci.org/TheMagoo73/gulp-factory-mongo) [![Coverage Status](https://coveralls.io/repos/github/TheMagoo73/gulp-factory-mongo/badge.svg?branch=master)](https://coveralls.io/github/TheMagoo73/gulp-factory-mongo?branch=master)

## Installation

Install the package with NPM and add it to your dev dependancies:

`npm install --save-dev gulp-factory-mongo`

## Test

The package uses the Mocha and Chai frameworks to provide tests, along with NYC to provide test coverage:

`npm test`

## Usage

```javascript
var gulp = require('gulp');
var seed = require('gulp-factory-mongo');

gulp.task('seed', (cb) => {
    seed({
        connectionString: "mongo:some-mongo-server",
        database: "testdb",
        entity: "user",
        factoryDefinition: {
            email: "user@some-domain.com",
            password: "somepassword"
        },
        count: 10
    })
});
```
### Options 

#### connectionString
**Mandatory**

#### database
**Mandatory**

#### createDatabase
**Optional**
Default: false

#### collection
**Optional**
If supplied, will provide the name of the collection to seed. If not supplied, the entity name will be pluralized and used.
Default: entity (pluralized)

#### createCollection
**Optional**
If true, the collection is created if it doesn't exist. If false, the collection is not created and the seed process will fail if the collection does not already exist.
Default: true

#### appendCollection
**Optional**
If true, created entities are added to any already in the collection. If false, the collection is cleared before any entities are added. Handle with care!
Default: true

#### entity
The name of the entity being defined by the factoryDefinition
**Required**

#### factoryDefinition
**Mandatory**
A factory-girl definition of the entity to be created. For more information see the [factory-girl project](https://github.com/aexmachina/factory-girl).

#### count
**Optional**
The number of entities to be stamped out in the collection
Default: 1


