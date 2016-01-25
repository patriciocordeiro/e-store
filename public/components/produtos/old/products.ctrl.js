(function() {
    'use strict';
    angular.module('myApp').controller('PrdCtrl', ['$scope', '$rootScope', 'productSrvc', PrdCtrl]);

    function PrdCtrl($scope, $rootScope, productSrvc) {
        /*Variable declarion*/
        var vm = this;
        var prd = productSrvc;
        vm.prdCatg = prd.prdCatg;
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

        //Get Compra
        //        vm.prdQty = prd.prdKartBuyQty //store the quantity (uses ng-model)
        vm.prdGetBuy = function(prdQty, prdId) {
            prd.prdPutonKart(prd.prdData, prd.prdKartData, prd.prdKartIds, prdId, prdQty);
            //Used to trigger the watch in navbar for Kart
            $rootScope.dataChange = !$rootScope.dataChange;
        }




        //-------------------------------------------------------
        /*Paginagination of the list table*/
        var getNumOfPages = function() {
            var NumOfPages = [];
            var j = 1;
            var i = 0;
            for (i = 0; i < prd.prdData.length; i++) {
                if (i == 3 * j) {
                    NumOfPages.push(j);
                    j++;
                    console.log(j);
                    console.log(NumOfPages);
                }
            }
            return NumOfPages;
        }
        vm.pages = getNumOfPages();
        vm.lastPage = vm.pages.length;
        vm.start = 1;
        vm.currentPage = 1;
        vm.disablePrevBtn = true;
        vm.disableNextBtn = false;
        //        vm.isActive = 'md-raised';
        vm.isActive = function(page) {
            if (page == vm.currentPage) {
                return  'md-raised';
            }

        }
        vm.changePage = function(page) {
            vm.currentPage = page;
            vm.start = (vm.currentPage - 1) * 5;

            console.log('hello', vm.start);
            if (vm.currentPage > 1) {
                vm.disablePrevBtn = false;
            } else {
                vm.disablePrevBtn = true;
            }
            if (vm.currentPage == vm.lastPage) {
                vm.disableNextBtn = true;
            } else {
                vm.disableNextBtn = false;
            }
            vm.isActive(page);
        }
        vm.prevPage = function() {
            if (vm.currentPage > 1) {
                vm.currentPage--;
                vm.changePage(vm.currentPage);
            }
        }
        vm.nextPage = function() {
            console.log(vm.lastPage);
            if (vm.currentPage != vm.lastPage) {
                vm.currentPage++;
                vm.changePage(vm.currentPage);
            }
        }
        vm.goTolastPage = function() {
            vm.currentPage = vm.lastPage;
            vm.changePage(vm.currentPage)
        }
        vm.gotoFirstPage = function() {
            vm.currentPage = 1;
            vm.changePage(vm.currentPage)
        }
        //-------------------------------------------------------

    }
}());