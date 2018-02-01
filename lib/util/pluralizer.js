'use strict';

const pluralizer = {

    pluralize: function(single, plural) {
        if(plural != undefined) return plural;

        if(single.endsWith('s')){
            return single;
        }
        else {
            return single + 's';
        }
    }

};

exports.Pluralizer = pluralizer;