(function() {
    "use strict";
    angular.module('myApp').controller('PrdDetailCtrl', ['$rootScope', '$cookies', '$stateParams', '$mdDialog', 'productSrvc',
        PrdDetailCtrl
    ]);

    function PrdDetailCtrl($rootScope, $cookies, $stateParams, $mdDialog, productSrvc) {
        var vm = this;
        var prd = productSrvc;
        var prdId = $stateParams.id //product id

        vm.prdQty = 1;
        var prdIdsOnKart = {
            id: 0,
            qty: 0
        }
        vm.dataChange = {
            value: 'false'
        };

        $rootScope.dataChange = 'false';

        //-----------------------------------------------------------
        //Get the selected product data
        vm.prdData = prd.prdGetSingle(prd.prdData, prdId);

        //-----------------------------------------------------------

        //Get Compra
        vm.prdQty //store the quantity (uses ng-model)
        vm.prdGetBuy = function(prdQty) {
            prdPutonKart(prd.prdData, prd.prdKartData, prd.prdKartIds, prdId, prdQty);
            //Used to trigger the watch in navbar for Kart
            $rootScope.dataChange = !$rootScope.dataChange;
        }
        //-----------------------------------------------------------

        /*Function to handle puting product on the kart*/
        var prdPutonKart = function(prdAllData, prdKartData, prdIdsOnKart, prdId, prdQty) {
            var i = 0;
            var idExists = false;
            var isKartEmpty = false;
            if (prdIdsOnKart.length == 0) {
                //Se o carrinho está vazio adicione o primeiro
                isKartEmpty = true;
                console.log("Primeiro item no carrinho");
                prdIdsOnKart.push(prdId);
                //Get the single product data
                console.log("IDS:", prdIdsOnKart);
                var dataTemp = {};
                dataTemp = prd.prdGetSingle(prdAllData, prdId);
                //Include the field quantity 
                dataTemp['buyQty'] = prdQty;
                dataTemp['priceSubTotal'] = dataTemp.preco * prdQty;
                // subtotal
                prd.prdKartPriceSubTotal += dataTemp.preco;
                //push the data to the array of datas
                console.log(dataTemp);
                prdKartData.push(dataTemp); //this is shared in the prdServc
                console.log(prdKartData);
            } else {
                for (i = 0; i < prdIdsOnKart.length; i++) {

                    if (prdId == prdIdsOnKart[i]) {
                        idExists = true;
                        console.log("idExists");
                        break;

                    } else {
                        idExists = false; //redundant? i know that.
                        console.log("id does not Exists");
                    }
                }
            }
            if (idExists == true) {
                //Dialogo para quando o produto já estiver no carrinho
                vm.showJanoCarrinhoDiag = function(ev) {
                    $mdDialog.show({
                        controller: 'jaNoCarrinhoDiag as vm',
                        templateUrl: 'components/produtos/jaNoCarrinhoDiag.view.html',
                        parent: angular.element(document.body),
                        targetEvxent: ev,
                        clickOutsideToClose: false
                    }).then(function(answer) {
                        if (answer == true) {
                            //if user choose "Adicionar", inrease the prd qty
                            //                            console.log(vm.prdQty);
                            //                            var tmpQty = prdIdsOnKart[i].qty;
                            //                            tmpQty = tmpQty + vm.prdQty
                            //                            prdIdsOnKart[i].qty = tmpQty;
                            console.log("Resposta verdadeira", tmpQty);
                        }
                    }, function() {
                        vm.status = 'You cancelled the dialog.';
                    });
                };
            } else if (!isKartEmpty) {
                //Kart is not empty and product not in the kart
                prdIdsOnKart.push(prdId);
                //Get the single product data
                var dataTemp = {};
                dataTemp = prd.prdGetSingle(prdAllData, prdId);
                //push the data to the array of datas
                dataTemp['buyQty'] = prdQty; //include qantity field
                dataTemp['priceSubTotal'] = dataTemp.preco * prdQty; //include price subtotal field
                prd.prdKartPriceSubTotal += dataTemp.preco;
                prdKartData.push(dataTemp);
                console.log(prdKartData);
            }
            //TODO: Set cookies
            console.log(prdIdsOnKart);
            var prdbuyQtyArray = prd.prdFieldToArray(prdKartData, 'buyQty');
            $cookies.put('pm-prdIdsOnKart', prdIdsOnKart);
            $cookies.put('pm-prdKartPriceSubTotal', prd.prdKartPriceSubTotal);
            $cookies.put('pm-prdbuyQtyArray', prdbuyQtyArray);

        }
    }; //End of function PrdDetailCtrl
}());