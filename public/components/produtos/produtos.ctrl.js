(function() {
    'use strict';
    angular.module('myApp').controller('PrdCtrl', ['$scope', 'productSrvc', PrdCtrl]);

    function PrdCtrl($scope, productSrvc) {
        /*Variable declarion*/
        var vm = this;
        vm.prdCatg = productSrvc.prdCatg; //pass all functions of this service to a simple variable
        vm.prdData = [];;
        //Query to send to server
        var prdQuery = {
            prdCatg: 'tv',
            prdMaxPageItems: '20', //Max number of display items in the page
        }

        //---------------------------------------------------------
        /* watch for product category change and fireup a http request */
        $scope.$watch("vm.prdCatg", function(newValue, oldValue) {
            productSrvc.prdGetDataByCatg(prdQuery, vm.prdCatg, function(data) {
                vm.prdData = data;
                productSrvc.prdData = data;
            })
        });

        //---------------------------------------------------------
    }
}());