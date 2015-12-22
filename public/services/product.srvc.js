//(function() {
//    'use strict';
angular.module('myApp').service('productSrvc', ['httpService', '$cookies', '$mdDialog',
    function(httpService, $cookies, $mdDialog) {

        console.log('sou lido primeiro, hehehehe');
        ///*get the product categorie name
        //This one uses ng-model and share data bettwen controllers
        this.prdCatg = 'HELLO CATG';
        this.prdData = [];
        this.prdKartIds = [];
        this.prdKartBuyQty = 1;
        this.prdKartData = [];
        this.prdKartPriceSubTotal = 0;

        this.prdKart = {
            data: [],
            ids: [],
            buyQty: 1,
            subTotal: 0,
            Total: 0,
        }

        this.prdGetCatg = function(srvcVarTosend, prdCatg) {
            srvcVarTosend = prdCatg;
            return prdCatg;
        }
        /*Get data all data of a selected product category*/
        this.prdGetDataByCatg = function(query, category, callback) {
            httpService.save({
                //categoria: category
                categoria: 'tv' //apenas para teste. remover e colocar o acima
            }, query).$promise.then(
                /*sucesso*/
                function(data) {
                    data.abc = true;
                    return callback(data);
                },
                /*falha*/
                function(error) {
                    console.log(error);
                    console.log(error.status);
                    console.log(error.statusText);
                    return (error);
                });
        }
        //-----------------------------------------------------------
        /*Get products data by search*/
        this.prdGetDataBySearch = function(query, callback) {
            httpService.save({
                acao: 'search'
            }, query).$promise.success(function(data) {
                data.abc = true;
                return callback(data);
            }, function(error) {
                return (error);
            });
        };
        //-----------------------------------------------------------
        /*Get a single product ID*/
        this.prdGetId = function(stateParams) {
            return stateParams.id;
        }
        //-----------------------------------------------------------
        /*Get a single product details */
        this.prdGetSingle = function(prdData, prdId) {
            var i = 0;
            var prdSingleData;
            for (i = 0; i < prdData.length - 1; i++) {
                console.log(prdData[i]._id);
                if (prdData[i]._id == prdId) {
                    return prdSingleData = prdData[i];
                    break;
                }
            }
            return prdSingleData;
        }
        //-----------------------------------------------------------
        this.prdGetDataByFilter = function(query, tipoFiltro, category, callback) {
            httpService.save({
                categoria: category,
                tipo_filtro: tipoFiltro
            }, query, function(data) {
                data.abc = true;
                return callback(data);
            });
        };

        this.prdGeneralSum = function(dataArray) {
            var i = 0
            var sumResult = 0;
            for (i = 0; i < dataArray.length; i++) {
                sumResult += dataArray[i];
                console.log(sumResult);
            }
            return sumResult;
        }
        /*----------------------------------------------------*/
        /*The following functions are used in the Shopping Kart*/

        /*Remove an item in the Shopping Kart */
        this.prdKartRemItem = function() {

        }
        /*get quantity of a single product*/
        this.prdFieldToArray = function(kartData, qtyVarName) {
            var i = 0;
            var prdQty = [];
            for (i = 0; i < kartData.length; i++) {
                prdQty.push(kartData[i][qtyVarName]);
            }
            return prdQty;
        }
        /*Get subtotal price of a single product item*/
        this.prdKartGetSubPrice = function(prdUnitPrice, prdQty) {
            prdSubPrice = prdUnitPrice * prdQty;
            return prdSubPrice;
        }
        /*get the total price of the cart */
        this.prdKartGetTotalPrice = function(prdKartDataSubPrices) {
            var i = 0;
            var prdKartTotalPrice = 0;
            for (var i = 0; i < prdKartDataSubPrices.length; i++) {
                prdKartTotalPrice += prdKartDataSubPrices[i];
            };
            return prdKartTotalPrice;
        }
        /*checout the current Kart*/
        this.prdKartCheckout = function() {}

        /*Get the total number of items in the Kart*/
        this.prdKartGetSize = function(kartData) {
            var prdKartSize = kartData.length;
            return prdKartSize;
        }

        /*recover the kart  on page reload. Recover ids on cookies*/
        this.prdKartRecover = function(query, callback) {
            httpService.save({
                acao: 'myKart',
                id: 'id'
            }, query, function(data) {
                return callback(data);
            });
        }

        this.putKartCkies = function() {

        }

        this.showJanoCarrinhoDiag = function(ev) {
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

        /*Get product on page load*/
        this.prdOnLoad = function() {}
        /*Get the last saved kart on (cookies or local storage)*/
        //        this.prdGetKart = function(query, callback) {
        //            httpService.save({).acao: 'myKart',
        //                id: 'id'
        //            }).$promise, query,
        //        function(data) {
        //            return callback(data);
        //        });

        /*Function to handle puting product on the kart*/
        this.prdPutonKart = function(prdAllData, prdKartData, prdIdsOnKart, prdId, prdQty) {
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
                dataTemp = this.prdGetSingle(prdAllData, prdId);
                //Include the field quantity 
                dataTemp['buyQty'] = prdQty;
                dataTemp['priceSubTotal'] = dataTemp.preco * prdQty;
                // subtotal
                this.prdKartPriceSubTotal += dataTemp.preco;
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
                this.showJanoCarrinhoDiag (ev);
                //Dialogo para quando o produto já estiver no carrinho
                //                vm.showJanoCarrinhoDiag = function(ev) {
                //                    $mdDialog.show({
                //                        controller: 'jaNoCarrinhoDiag as vm',
                //                        templateUrl: 'components/produtos/jaNoCarrinhoDiag.view.html',
                //                        parent: angular.element(document.body),
                //                        targetEvxent: ev,
                //                        clickOutsideToClose: false
                //                    }).then(function(answer) {
                //                        if (answer == true) {
                //                            //if user choose "Adicionar", inrease the prd qty
                //                            //                            console.log(vm.prdQty);
                //                            //                            var tmpQty = prdIdsOnKart[i].qty;
                //                            //                            tmpQty = tmpQty + vm.prdQty
                //                            //                            prdIdsOnKart[i].qty = tmpQty;
                //                            console.log("Resposta verdadeira", tmpQty);
                //                        }
                //                    }, function() {
                //                        vm.status = 'You cancelled the dialog.';
                //                    });
                //                };
            } else if (!isKartEmpty) {
                //Kart is not empty and product not in the kart
                prdIdsOnKart.push(prdId);
                //Get the single product data
                var dataTemp = {};
                dataTemp = this.prdGetSingle(prdAllData, prdId);
                //push the data to the array of datas
                dataTemp['buyQty'] = prdQty; //include qantity field
                dataTemp['priceSubTotal'] = dataTemp.preco * prdQty; //include price subtotal field
                this.prdKartPriceSubTotal += dataTemp.preco;
                prdKartData.push(dataTemp);
                console.log(prdKartData);
            }
            //TODO: Set cookies
            console.log(prdIdsOnKart);
            var prdbuyQtyArray = this.prdFieldToArray(prdKartData, 'buyQty');
            $cookies.put('pm-prdIdsOnKart', prdIdsOnKart);
            $cookies.put('pm-prdKartPriceSubTotal', this.prdKartPriceSubTotal);
            $cookies.put('pm-prdbuyQtyArray', prdbuyQtyArray);

        }
    }
])
//}());