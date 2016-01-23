(function() {
    "use strict";
    angular.module('myApp').controller('myCartToastCtrl', ['$mdToast', 'productSrvc', myCartToastCtrl])

    function myCartToastCtrl($mdToast, productSrvc) {
        var vm = this
        var prdSrvc = productSrvc //productSrvc; pass all product services to variable prd

        vm.kartData = prdSrvc.prd.kart.data;
		console.log('Kart toast dados',  vm.kartData);
        vm.closeToast = function() {
            $mdToast.hide();
            console.log("carrinho toast fechado");
        }
    }

}());