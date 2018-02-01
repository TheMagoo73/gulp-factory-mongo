'use strict';

const mocha = require('mocha');
const describe = mocha.describe;
const it = mocha.it;

const chai = require('chai');
chai.should();

describe("pluralizer", ()=>{

    const pluralizer = require('../../lib/util/pluralizer').Pluralizer;

    it('can pluralize standard noun', () => {
        pluralizer.pluralize('test').should.equal('tests');
    })

    it('does not double pluralize a standard noun', () => {
        pluralizer.pluralize('tests').should.equal('tests');
    })

    it('can pluralize a non-standard noun', () => {
        pluralizer.pluralize('person', 'people').should.equal('people');
    })
})