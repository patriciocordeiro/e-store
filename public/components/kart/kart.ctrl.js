(function() {
    "use strict";
    angular.module('myApp').controller('KartCtrl', ['$rootScope', '$q', '$cookies',
        '$mdDialog', 'productSrvc', 'userSrcv', KartCtrl
    ]);

    function KartCtrl($rootScope, $q, $cookies, $mdDialog, productSrvc, userSrcv) {
        /*Variables declaration*/
        var vm = this;
        var prdSrvc = productSrvc //productSrvc; pass all product services to variable prdSrvc
        vm.progressCircularMode = 'indeterminate'; // Progress circular
        vm.isKartEmpty = false; //set to true if kart is empty
        prdSrvc.prd.kart.recover(function(data) {
            vm.kartData = data;
            vm.prdbuyQty = prdSrvc.prd.kart.qtys;
            console.log( vm.kartData);
        });


        //        var recoverDataPromisse = prdSrvc.prd.kart.recover();
        ////        recoverDataPromisse.then(function(data) {
        ////            console.log(data);
        ////        })
        //vm.kartData = prdSrvc.prd.kart.data;

        //---------------------------------------------------------
        //        /*Get all kart data using promise*/
        //        var getIdsFromCkies = function(data) {
        //            var defer = $q.defer();
        //            if (data.length > 0) {
        //                setTimeout(function() {
        //                    defer.resolve(data);
        //                }, 0);
        //            } else {
        //                defer.reject('Ids não existem')
        //            }
        //            return defer.promise;
        //        }
        //
        //        var GetIdsPromise = getIdsFromCkies($cookies.get('pm-prdSrvcIdsOnKart').split(','));
        //        GetIdsPromise.then(function(data) {
        //            console.log('sucess', data);
        //            vm.prdSrvcIdsOnKart = data;
        //            if (vm.prdSrvcIdsOnKart.length > 0) {
        //                //if cookies with ids exists
        //                prdSrvc.prdSrvcKartIds = vm.prdSrvcIdsOnKart;
        //                console.log(prdSrvc.prdSrvcKartIds);
        //                //Query to take the ids
        //                var prdSrvcKartRecoverQuery = {};
        //                prdSrvcKartRecoverQuery.ids = prdSrvc.prdSrvcKartIds;
        //                //Recover prdSrvcKartData from the server
        //                setTimeout(function() {
        //                    prdSrvc.prdSrvcKartRecover(prdSrvcKartRecoverQuery, function(res) {
        //                        prdSrvc.prdSrvcKartData = res;
        //                        vm.kartData = prdSrvc.prdSrvcKartData;
        //                        vm.prdSrvcbuyQty = prdSrvc.prdSrvcFieldToArray(vm.kartData, 'buyQty');
        //                        //TODO Calcular quando for incluido
        //                        //Calcular no contoller prdSrvcDetail
        //                        vm.prdSrvcSubPrice = prdSrvc.prdSrvcFieldToArray(vm.kartData, 'priceSubTotal');
        //                        vm.prdSrvcKartSubTotalPrice = prdSrvc.prdSrvcKartPriceSubTotal;
        //                        prdSrvc.prdSrvcKartGetTotalPrice['priceTotal']
        //                        vm.progressCircularMode = '';
        //                        console.log('Server response: ', prdSrvc.prdSrvcKartData);
        //                    })
        //                }, 0);
        //                console.log('ids recuperados do cookie', prdSrvc.prdSrvcKartIds);
        //               prdSrvc.prdSrvcKartGetSize();
        //                $rootScope.dataChange = !$rootScope.dataChange;
        //
        //            } else {
        //                //if cookies does not exists
        //                prdSrvc.prdSrvcKartIds = [];
        //                vm.isKartEmpty = true;
        //                console.log('Nao existem produtos');
        //            }
        //
        //
        //        }, function(error) {
        //            console.log('error', error);
        //            vm.teste = error;
        //        });


        //---------------------------------------------------------

        //*Update Kar on changes*/
        vm.prdSrvcGetKartUpdate = function(index) {
            vm.prdSrvcSubPrice[index] = vm.kartData[index].preco * vm.prdSrvcbuyQty[index];
            //TODO: rever se preciso atualizar esta variavel ou atualizar
            prdSrvc.prdSrvcKartData[index].buyQty = vm.prdSrvcbuyQty[index];
            prdSrvc.prdSrvcKartData[index].priceSubTotal = vm.prdSrvcSubPrice[index];
            vm.prdSrvcKartSubTotalPrice = prdSrvc.prdSrvcGeneralSum(vm.prdSrvcSubPrice);
            prdSrvc.prdSrvcKartPriceSubTotal = prdSrvc.prdSrvcGeneralSum(vm.prdSrvcSubPrice);
        }
        //---------------------------------------------------------
        /*Remove item from chart*/
        vm.prdSrvcKartRemItem = function(index) {
            //remove the item in service variable
            prdSrvc.prdSrvcKartData.splice(index, 1);
            prdSrvc.prdSrvcKartIds.splice(index, 1);
            //Trigger the datachange watch for kart total number of items
            $rootScope.dataChange = !$rootScope.dataChange;
            //remove the item in the subprice;
            vm.prdSrvcSubPrice.splice(index, 1);
            //update the kart subtotal
            vm.prdSrvcKartSubTotalPrice = prdSrvc.prdSrvcGeneralSum(vm.prdSrvcSubPrice);
            //update the number of item in the Kart
        }
        //---------------------------------------------------------

        /*Finalizar compra*/
        //pass the user data to vm
        vm.user = userSrcv.usr.login.data.local
        var prevTab = 0;
        console.log(vm.user);
        vm.selectedIndex = 0;
        vm.isNextTabEnable = [false, true, true];
        vm.enableNextTab = function(currTabIndex) {
            console.log(vm.selectedIndex);
            vm.selectedIndex = currTabIndex + 1;
            console.log(currTabIndex);
            vm.isNextTabEnable[currTabIndex + 1] = false;
        }
        vm.selShipOption = 'Normal';
        vm.deliveryOptions = [{
            type: 'Normal',
            text: 'Standard Shipping (4-5 business days)',
            cost: 100
        }, {
            type: 'Sedex',
            text: 'FREE Shipping (5-8 business days)',
            cost: 25
        }]

        /*New Address*/
        vm.addNewAddressDialog = function(ev) {
            userSrcv.usr.addNewAddress(ev)

        }
        vm.addNewAddress = function(newAddress) {
            console.log(newAddress);
        }
        vm.closeDialog = function(answer) {
            $mdDialog.hide(answer)
            console.log(answer);
        };

        vm.cancelDialog = function() {
            $mdDialog.cancel();
        };

    }
}());