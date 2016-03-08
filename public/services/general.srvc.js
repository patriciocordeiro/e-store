(function() {
    'use strict';
    angular.module('myApp').service('generalSrvc', generalSrvc);

    function generalSrvc($q) {
        this.closeAll = function(length) {
            var temp = _.range(length).map(function() {
                return false
            })
            return $q.when(temp);
        }

        this.openAll = function(length) {
            var temp = _.range(length).map(function() {
                return true
            })
            return $q.when(temp);
        }
    }

})();