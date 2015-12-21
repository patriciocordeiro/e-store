(function() {
    "use strict";
    angular.module('myApp').controller('KartCtrl', ['$rootScope', '$q', '$cookies', 'productSrvc', KartCtrl]);

    function KartCtrl($rootScope, $q, $cookies, productSrvc) {
        /*Variables declaration*/
        var vm = this;
        var prd = productSrvc //productSrvc; pass all product services to variable prd
        vm.progressCircularMode = 'indeterminate'; // Progress circular
        vm.isKartEmpty = false; //set to true if kart is empty

        //---------------------------------------------------------
        /*Get all kart data using promise*/
        var getIdsFromCkies = function(data) {
            var defer = $q.defer();
            if (data.length > 0) {
                setTimeout(function() {
                    defer.resolve(data);
                }, 0);
            } else {
                defer.reject('Ids não existem')
            }
            return defer.promise;
        }

        var GetIdsPromise = getIdsFromCkies($cookies.get('pm-prdIdsOnKart').split(','));
        GetIdsPromise.then(function(data) {
            console.log('sucess', data);
            vm.prdIdsOnKart = data;
            if (vm.prdIdsOnKart.length > 0) {
                //if cookies with ids exists
                prd.prdKartIds = vm.prdIdsOnKart;
                console.log(prd.prdKartIds);
                //Query to take the ids
                var prdKarRecoverQuery = {};
                prdKarRecoverQuery.ids = prd.prdKartIds;
                //Recover prdKartData from the server
                setTimeout(function() {
                    prd.prdKartRecover(prdKarRecoverQuery, function(res) {
                        prd.prdKartData = res;
                        vm.kartData = prd.prdKartData;
                        vm.prdbuyQty = prd.prdFieldToArray(vm.kartData, 'buyQty');
                        vm.prdSubPrice = prd.prdFieldToArray(vm.kartData, 'priceSubTotal');
                        vm.prdKartSubTotalPrice = prd.prdKartPriceSubTotal;
                        prd.prdKartGetTotalPrice['priceTotal']
                        vm.progressCircularMode = '';
                        console.log('Server response: ', prd.prdKartData);
                    })
                }, 1000);
                console.log('ids recuperados do cookie', prd.prdKartIds);
            } else {
                //if cookies does not exists
                prd.prdKartIds = [];
                vm.isKartEmpty = true;
                console.log('Nao existem produtos');
            }


        }, function(error) {
            console.log('error', error);
            vm.teste = error;
        });

        //---------------------------------------------------------

        //*Update Kar on changes*/
        vm.prdGetKartUpdate = function(index) {
            vm.prdSubPrice[index] = vm.kartData[index].preco * vm.prdbuyQty[index];
            //TODO: rever se preciso atualizar esta variavel ou atualizar
            prd.prdKartData[index].buyQty = vm.prdbuyQty[index];
            //            vm.kartData[index].buyQty = vm.prdbuyQty[index];
            //            vm.kartData[index].priceSubTotal = vm.prdSubPrice[index];
            prd.prdKartData[index].priceSubTotal = vm.prdSubPrice[index];
            vm.prdKartSubTotalPrice = prd.prdGeneralSum(vm.prdSubPrice);
            prd.prdKartPriceSubTotal = prd.prdGeneralSum(vm.prdSubPrice);
        }
        //---------------------------------------------------------
        /*Remove item from chart*/
        vm.prdKartRemItem = function(index) {
            //remove the item in service variable
            prd.prdKartData.splice(index, 1);
            prd.prdKartIds.splice(index, 1);
            //Trigger the datachange watch for kart total number of items
            $rootScope.dataChange = !$rootScope.dataChange;
            //remove the item in the subprice;
            vm.prdSubPrice.splice(index, 1);
            //update the kart subtotal
            vm.prdKartSubTotalPrice = prd.prdGeneralSum(vm.prdSubPrice);
            //update the number of item in the Kart
        }
        //---------------------------------------------------------

        //save cookies

        /*Finalizar compra*/


    }
}());