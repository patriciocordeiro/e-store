(function() {
    "use strict";
    angular.module('myApp').controller('myCartToastCtrl',  ['$mdToast', myCartToastCtrl])

    function myCartToastCtrl($mdToast) {
        var vm = this;
        vm.closeToast = function(){
            $mdToast.hide();
            console.log("carrinho toast fechado");
        }
    }

}());