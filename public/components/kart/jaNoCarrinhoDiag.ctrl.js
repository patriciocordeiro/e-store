(function() {
    "use strict";
    angular.module('myApp').controller('jaNoCarrinhoDiag', ['$mdDialog', jaNoCarrinhoDiag])

    function jaNoCarrinhoDiag($mdDialog) {
        var vm = this;
        vm.confirm = function() {
            $mdDialog.hide();
        }

        vm.cancel = function() {
            $mdDialog.cancel()
        }
    }

}());