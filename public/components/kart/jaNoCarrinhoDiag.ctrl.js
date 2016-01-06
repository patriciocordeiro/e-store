(function() {
    "use strict";
    angular.module('myApp').controller('jaNoCarrinhoDiag',  ['$mdDialog', jaNoCarrinhoDiag])

    function jaNoCarrinhoDiag($mdDialog) {
        var vm = this;
        vm.answer= function(answer){
            $mdDialog.hide(answer);
            console.log("Resposta", answer);
        }
    }

}());