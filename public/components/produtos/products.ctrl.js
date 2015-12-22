(function() {
    'use strict';
    angular.module('myApp').controller('PrdCtrl', ['$scope', 'productSrvc', PrdCtrl]);

    function PrdCtrl($scope, productSrvc) {
        /*Variable declarion*/
        var vm = this;
        var prd = productSrvc;
        vm.prdCatg = prd.prdCatg; //pass all functions of this service to a simple variable
        vm.prdQty = prd.prdKartBuyQty; // initialize quantities with 1
        vm.prdData = [];;
        //Query to send to server
        var prdQuery = {
            prdCatg: 'tv',
            prdMaxPageItems: '20', //Max number of display items in the page
        }

        //----- ----------------------------------------------------
        /* watch for product category change and fireup a http request */
        $scope.$watch("vm.prdCatg", function(newValue, oldValue) {
            productSrvc.prdGetDataByCatg(prdQuery, vm.prdCatg, function(data) {
                vm.prdData = data;
                productSrvc.prdData = data;
            })
        });
        //---------------------------------------------------------
        vm.order = 'preco'
        vm.ordering = function(toOrderTo) {
            vm.order = toOrderTo;
            console.log(vm.order);
        }
        
//        vm.getBuy = 
//        prd.prdKartBuyQty
    }
}());