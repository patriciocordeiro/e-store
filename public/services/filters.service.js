angular.module('myApp').service('myFilters', [

    function() {
        console.log('Filters')
        this.revomeDuplicates = function(myObject, type) {
            var result = _.chain(myObject)
            .unique(type) //remove duplicados 
            .sortBy(type) // Organizar em ordem alfabetica
            .value();
            return result
        }
    }
]);