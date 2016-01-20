(function() {
    "use strict";
    angular.module('myApp').controller('myCartToastCtrl', ['$mdToast', 'productSrvc', myCartToastCtrl])

    function myCartToastCtrl($mdToast, productSrvc) {
        var vm = this
        var prd = productSrvc //productSrvc; pass all product services to variable prd

        vm.kartData = prd.prdKartData;
        vm.closeToast = function() {
            $mdToast.hide();
            console.log("carrinho toast fechado");
        }
    }

}());