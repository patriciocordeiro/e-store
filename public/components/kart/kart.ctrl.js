(function() {
    "use strict";
    angular.module('myApp').controller('KartCtrl', ['$rootScope', '$q', '$cookies',
        '$mdDialog', 'productSrvc', 'userSrcv', KartCtrl
    ]);

    function KartCtrl($rootScope, $q, $cookies, $mdDialog, productSrvc, userSrcv) {
        /*Variables declaration*/
        var vm = this;
        var prdSrvc = productSrvc //pass all product services to variable prdSrvc
        vm.progressCircularMode = 'indeterminate'; // Progress circular
        vm.isKartEmpty = 'false'; //set to true if kart is empty
        vm.kartData = prdSrvc.prd.kart.data;
//        console.log(vm.kartData);
        //------------------------------------------------------------

        /*Recover data on cookies if any*/
        //        prdSrvc.prd.kart.recover(function(data) {
        //            console.log('fireup recover');
        //            vm.kartData = data;
        //            vm.prdbuyQty = prdSrvc.prd.kart.qtys;
        //            vm.isKartEmpty = prdSrvc.prd.kart.isEmpty; //set to true if kart is empty
        //            console.log(vm.isKartEmpty);
        //            vm.progressCircularMode = '';
        //        });

        //---------------------------------------------------------
        //*Update Kar on changes*/
        vm.prdSrvcGetKartUpdate = function(index) {
            vm.prdSrvcSubPrice[index] = vm.kartData[index].preco * vm.prdSrvcbuyQty[index];
            //TODO: rever se preciso atualizar esta variavel ou atualizar
            prdSrvc.prd.kart.data[index].buyQty = vm.prdSrvcbuyQty[index];
            prdSrvc.prd.kart.data[index].priceSubTotal = vm.prdSrvcSubPrice[index];
            vm.prdSrvcKartSubTotalPrice = prdSrvc.prdSrvcGeneralSum(vm.prdSrvcSubPrice);
            prdSrvc.prd.kart.PriceSubTotal = prdSrvc.prdSrvcGeneralSum(vm.prdSrvcSubPrice);
        }
        //---------------------------------------------------------
        /*Remove item from chart*/
        vm.remItem = function(index) {
            prdSrvc.prd.kart.remItem(index);
            vm.isKartEmpty = prdSrvc.prd.kart.isEmpty;
        }
        //---------------------------------------------------------

        /*Finalizar compra*/
        //pass the user data to vm
        vm.user = userSrcv.usr.login.data.local;
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
        console.log(vm.isKartEmpty);

    }
}());