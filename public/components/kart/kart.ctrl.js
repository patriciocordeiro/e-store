(function() {
    "use strict";
    angular.module('myApp').controller('KartCtrl', ['$scope', '$rootScope', '$q', '$cookies',
        '$mdDialog', 'productSrvc', 'httpUserService', 'userSrcv', KartCtrl
    ]);

    function KartCtrl($scope, $rootScope, $q, $cookies, $mdDialog, productSrvc, httpUserService, userSrcv) {
        /*Variables declaration*/
        var vm = this;
        var prdSrvc = productSrvc //pass all product services to variable prdSrvc
        /*fixed columns in product listing*/
        vm.prdFixedCols = ['Item', 'Informaçoes do produto', 'Qtd. pedido', 'Preço unit.', 'Subtotal', 'Remover'];
        vm.columnsSizes = [10, 30, 15, 15, 15, 15]
        vm.progressCircularMode = 'indeterminate'; // Progress circular
        vm.isKartEmpty = prdSrvc.prd.kart.isEmpty;
        vm.shipAddress = ''; //Ship address
        vm.newAddress = '';
        console.log(vm.isKartEmpty);
        vm.kartData = prdSrvc.prd.kart.data;
        //        console.log(vm.kartData);
        //------------------------------------------------------------
        /*Total do kart*/
        vm.kartTotal = prdSrvc.prd.kart.total;
        console.log(vm.kartTotal);
        //------------------------------------------------------------

        /*Total Items in the kart*/
        // Variable updated when remove itens
        vm.kartTotalItems = vm.kartData.length;
        /*---------------------------------- */
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
        //*Update Kart on changes*/

        vm.getKartUpdate = function(index, qty) {
            prdSrvc.prd.kart.updateItem(index, qty).then(function(updated) {
                //update the local kart Total
                vm.kartTotal = prdSrvc.prd.kart.total;
            })
        }
        //---------------------------------------------------------
        /*Remove item from chart*/
        vm.remItem = function(index, ev) {
            //TODO: Confirmation dialog
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.confirm()
                .title('Apagar item do carrinho')
                .textContent('Tem certeza de que deseja retirar este item do seu carrinho?')
                .ariaLabel('apagar item')
                .targetEvent(ev)
                .ok('Apagar!')
                .cancel('Cancelar');
            $mdDialog.show(confirm).then(function() {
                prdSrvc.prd.kart.remItem(index);
                //update the local kart Total
                vm.kartTotal = prdSrvc.prd.kart.total;
                vm.isKartEmpty = prdSrvc.prd.kart.isEmpty;
                //update kart total items
                vm.kartTotalItems = vm.kartData.length;;
            }, function() {});
        }
        //---------------------------------------------------------

        /*Finalizar compra*/
        //pass the user data to vm
        vm.userData = userSrcv.usr.login.data.local;
        console.log(vm.userData);
        var prevTab = 0;
        vm.selectedIndex = 0;

        vm.isNextTabEnable = [false, true, true];
        vm.enableNextTab = function(currTabIndex) {
            console.log(vm.selectedIndex);
            vm.selectedIndex = currTabIndex + 1;
            console.log(currTabIndex);
            vm.isNextTabEnable[currTabIndex + 1] = false;
        }

        /*Delivery options-----------------------------------*/
        //Initialize with the first element
        vm.selDeliveryOptions = 'SEDEX';
        vm.deliveryOptions = [{
            type: 'SEDEX',
            text: 'Entrega em até 2 dias úteis',
            cost: 100
        }, {
            type: 'PAC',
            text: 'Entrega em Até 7 dias úteis',
            cost: 35
        }, {
            type: 'NORMAL',
            text: 'Entrega em até 15 dias úteis',
            cost: 15
        }]

        //Put the selected delivery option in the kartData 
        //Initialize with the default at the controller load
        var i = 0;
        _(vm.kartData).forEach(function() {
            vm.kartData[i].selDelivery = vm.deliveryOptions[0];
            i++;
        })
        //check if kart is empty
        if (vm.isKartEmpty) {
            vm.buyTotal = 0;
        } else {
            vm.buyTotal = (vm.kartData[0].selDelivery.cost + vm.kartTotal);
        }


        //For each element in the array
        //Get the selected delivery option
        vm.getDeliveryType = function(index) {
            console.log(vm.selDeliveryOptions);
            //Pass only the selected delivery to a new variable
            //vm.kartData.selDelivery = vm.deliveryOptions[index]
            var i = 0;
            _(vm.kartData).forEach(function() {
                vm.kartData[i].selDelivery = vm.deliveryOptions[index];
                i++;
            })

            vm.buyTotal = vm.kartData[0].selDelivery.cost + vm.kartTotal;
            console.log(vm.kartData[0].selDelivery.cost + Number(vm.kartTotal));
        }
        /*-----------------------------------------------------------------*/
        //ADDRESS HANDLE
        /*-----------------------------------------------------------------*/
        /*New Address dialog*/
        vm.addNewAddressDialog = function(ev) {
            userSrcv.usr.address.dialog(ev, $scope);
        }
        //use Add new address to update Address
        vm.addNewAddress = function(newAddress) {
            console.log('atualizando endereco: ', newAddress);
            userSrcv.usr.address.update(newAddress, function(newData) {});
        };
        //Sets the selected ship address
        vm.selShipAddress = function(index) {
            vm.shipAddress = vm.userData.endereco[index];
            //Pass this to new address. If user choose update address
            vm.newAddress = vm.shipAddress;
            console.log('Endereco para ediçao', vm.addNewAddress);
        }
        //------------------------------------------------------------------------

        vm.payOption = ["Cartao de Crédito", "Transferência", "Boleto Bancário"];
        vm.creditCardType = [{
            name: "Visa",
            icon: "/../assets/icons/payment-icon-set/icons/visa-straight-32px.png",
            digits: 16
        }, {
            name: "Mastercard",
            icon: "/../assets/icons/payment-icon-set/icons/mastercard-straight-32px.png",
            digits: 16
        }, {
            name: "PayPal",
            icon: "/../assets/icons/payment-icon-set/icons/paypal-straight-32px.png",
            digits: 16
        }, {
            name: "American Express",
            icon: "/../assets/icons/payment-icon-set/icons/american-express-straight-32px.png",
            digits: 10,
        }];
        vm.getPayOption = function(idx) {
            vm.ccardMaxDigits = vm.creditCardType[idx].digits;
            console.log(vm.ccardMaxDigits);
        }

        //Show/hide kart in the payment page
        vm.isKartShow = false;
        vm.layout = "column";
        vm.btnText = 'Exibir produtos no carrinho';
        vm.icon = 'expand_more'
        vm.showHideKart = function() {
            vm.isKartShow = !vm.isKartShow;
            if (vm.isKartShow) {
                vm.layout = "row";
                vm.btnText = 'Ocultar produtos no carrinho'
                vm.icon = 'expand_less'

            } else {
                vm.layout = "column";
                vm.btnText = 'Exibir produtos no carrinho';
                vm.icon = 'expand_more'
            }
            console.log(vm.isKartShow)
            console.log(vm.layout)


        }

        vm.isEditBuyQty = -1;
        vm.enableItemEdit = function(index) {
            vm.isEditBuyQty = index;
        }
		vm.closeItemEdit = function(){
			vm.isEditBuyQty = -1;
		}
    }
}());