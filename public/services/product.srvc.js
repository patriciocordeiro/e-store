//(function() {
//    'use strict';
angular.module('myApp').service('productSrvc', ['$rootScope', '$q', 'httpService', '$cookies', '$mdDialog',
    function($rootScope, $q, httpService, $cookies, $mdDialog) {
        console.log(httpService);
        console.log('sou lido primeiro, hehehehe');
        //create this variable to pass all functions
        //This will allow to use this service function inside of this service
        _this = this;
        //This one uses ng-model and share data bettwen controllers
        this.category = '';
        this.section = '';
        /*initialize product section and category on load*/
        if ($cookies.get('category')) {
            this.category = $cookies.get('category');
            this.section = $cookies.get('section');
        }

        this.prd = {
            qty: [],
            data: [],
            newData: false,
            cookies: {
                put: function() {
                    $cookies.put('section', _this.section);
                    $cookies.put('category', _this.category);
                }
            },
            /*update some signaling variables if prd data change
			search or new category or something else*/
            update: function() {
                //change the status to sinalize new incoming data
                //this will be used in the watch of prd controller
                _this.prd.newData = !_this.prd.newData;
                //------------------------------------------------
                /*True if data is from search, false otherwise
                            	this is used on prd controller to watch 
								where data is coming from*/
                _this.prd.search.isDataFrom = false;
                //------------------------------------------------
            },
            /*Get the clicked section and category */
            getCatg: function(section, category) {
                //get the category
                _this.category = category;
                //get  the section
                _this.section = section;
                //-------------------------------------------
                //save the cookies
                _this.prd.cookies.put();
            },
            /*Get a single product details */
            getDetails: function(prdData, prdId) {
                var i = 0;
                var prdSingleData;
                for (i = 0; i < prdData.length - 1; i++) {
                    if (prdData[i]._id == prdId) {
                        return prdSingleData = prdData[i];
                        break;
                    }
                }
                return prdSingleData;
            },

            checkForIdExist: function(data, id) {
                var i = 0;
                if (data.length > 0) {
                    for (i = 0; i < data.length; i++) {
                        if (id == data[i]._id) {
                            return $q.when(true);
                        }
                    }
                }
                return $q.when(false);
            },
            /*create an array of a specific key of an array of objects*/
            objKeyToArray: function(data, objKeyName) {
                var myArray = [];
                var i = 0;
                for (i = 0; i < data.length; i++) {
                    myArray.push(data[i][objKeyName]);
                }
                return myArray;
            },
            //Services that interact with the server
            http: {
                /*Get all data of a selected product category*/
                getDataByCatg: function(query, category, callback) {

                    httpService.prd.save({
                        //categoria: category
                        categoria: 'tv' //apenas para teste. remover e colocar o acima
                    }, query).$promise.then(
                        /*sucesso*/
                        function(res) {
                            //                            data.abc = true;
                            //Pass data to service
                            _this.prd.data = res.data;
                            //sinalize that data has change (execute update operations)
                            _this.prd.newData = !_this.prd.newData;
                            //--------------------------------------------
                            /*True if data is from search, false otherwise
                            	this is used on prd controller to watch 
								where data is coming from*/
                            _this.prd.search.isDataFrom = false;
                            //--------------------------------------------
                            console.info('category data', res.data);
                            //create the array of quantities with value 1
                            var i = 0
                            for (i = 0; i < res.data.length; i++) {
                                _this.prd.qty.push(1);
                            }
                            //------------------------------------------------
                            //for pagination: get the number of pages
                            //                            getNumOfPages()
                            //-------------------------------------------

                            return callback(res.data);
                        },
                        /*falha*/
                        function(error) {
                            console.log(error);
                            console.log(error.status);
                            console.log(error.statusText);
                            return callback(error);
                        });
                },
                /*Get products data by search*/
                getDatabySearch: function(query, callback) {
                    httpService.prd.save({
                        categoria: 'search',
                        acao: 'search'
                    }, query).$promise.then(function(data) {
                        data.abc = true;
                        //pass the data to the service variable
                        _this.prd.search.data = data;
                        //-------------------------------------------
                        //sinalize that data has change (execute update operations)
                        //change the status to sinalize new incoming data
                        //this will be used in the watch of prd controller
                        _this.prd.newData = !_this.prd.newData;
                        /*True if data is from search, false otherwise
                            	this is used on prd controller to watch 
								where data is coming from*/
                        _this.prd.search.isDataFrom = true;
                        //------------------------------------------------
                        return callback(data);
                    }, function(error) {
                        return callback(error);
                    });
                },
                /*Get filtered data*/
                getDataByFilter: function(query, tipoFiltro, category, callback) {
                    httpService.prd.save({
                        categoria: category,
                        tipo_filtro: tipoFiltro
                    }, query, function(data) {
                        data.abc = true;
                        return callback(data);
                    });
                },
            },
            kart: {
                data: [],
                ids: [],
                recvIds: [],
                recvQtys: [],
                qty: 1,
                qtys: [],
                subtotal: 0,
                total: 0,
                isEmpty: false,
                totalItems: 0,
                /*Get subtotal price of a single product item*/
                getSubPrice: function(unitPrice, qty) {
                    subPrice = unitPrice * qty;
                    return subPrice;
                },
                /*get the total price of the cart */
                getTotalPrice: function(subPrices) {
                    var i = 0;
                    var totalPrice = 0;
                    for (var i = 0; i < subPrices.length; i++) {
                        totalPrice += subPrices[i];
                    };
                    return totalPrice;
                },
                /*recover the kart  on page reload. Recover ids on cookies*/
                recover: function(callback) {
                    if ($cookies.get('kartIds')) {
                        _this.prd.kart.cookies.get();
                        _this.prd.kart.qtys = _this.prd.kart.recvQtys;
                        _this.prd.kart.ids = _this.prd.kart.recvIds;
                        var query = {
                            ids: _this.prd.kart.recvIds
                        }

                        httpService.prd.save({
                            acao: 'myKart',
                            id: 'id'
                        }, query).$promise.then(function(data) {
                            _this.prd.kart.data = data;
                            var i = 0;
                            for (i = 0; i < data.length; i++) {
                                _this.prd.kart.data[i]['buyQty'] = _this.prd.kart.qtys[i];
                                _this.prd.kart.data[i]['priceSubTotal'] = _this.prd.kart.qtys[i] * data[i].preco

                            }
                            //update number of items in kart
                            var getSizePromisse = _this.prd.kart.getSize()
                            getSizePromisse.then(function(data) {
                                console.log('obj');
                                console.log('Kartsize', data);
                                _this.prd.kart.totalItems = data;
                            })


                            //                            });

                            //sinalize kartEmpty
                            _this.prd.kart.isEmpty = false;
                            return callback(data);
                        });
                    } else {
                        _this.prd.kart.isEmpty = true;
                        console.log('Kart is empty', _this.prd.kart.isEmpty);
                        return callback([]);
                    }
                },
                /*Function to handle puting product on the kart*/
                addItem: function(id, qty) {
                    var checkForIdExistPromisse = _this.prd.checkForIdExist(_this.prd.kart.data, id);
                    checkForIdExistPromisse.then(function(idExists) {
                        console.log('promisseresult', idExists)
                        if (idExists == true) {
                            _this.prd.kart.idExistsDialg();
                        } else {
                            var dataTemp = _this.prd.getDetails(_this.prd.data, id);
                            //Include the field quantity
                            dataTemp['buyQty'] = qty;
                            //Include the field priceSubTotal
                            dataTemp['priceSubTotal'] = dataTemp.preco * qty;
                            //push the data to the array of datas
                            _this.prd.kart.data.push(dataTemp);
                            //push the id
                            _this.prd.kart.ids.push(id);
                            //push the qty
                            _this.prd.kart.qtys.push(qty)
                            //store cookies
                            _this.prd.kart.cookies.put();
                        }
                    })
                },
                /*Remove an item from the kart*/
                remItem: function(index) {
                    console.log('remove item');
                    _this.prd.kart.data.splice(index, 1);
                    _this.prd.kart.ids.splice(index, 1);
                    if (_this.prd.kart.ids.length == 0) {
                        _this.prd.kart.isEmpty = true;
                    }
                    //Trigger the datachange watch for kart total number of items
                    $rootScope.dataChange = !$rootScope.dataChange;
                    //remove the item in the subprice;
                    //            vm.prdSrvcSubPrice.splice(index, 1);
                    //update the kart subtotal
                    //            vm.prdSrvcKartSubTotalPrice = prdSrvc.prdSrvcGeneralSum(vm.prdSrvcSubPrice);
                    //update the number of item in the Kart
                    _this.prd.kart.cookies.put();
                },
                /*update kart when quantity is change*/
                update: function(index) {

                },
                /*Get the total number of items in the Kart*/
                getSize: function() {
                    var defer = $q.defer();
                    var size = _this.prd.kart.ids.length;
                    if (size > 0) {
                        defer.resolve(size);
                    } else {
                        defer.reject(0);
                    }
                    return defer.promise;
                },
                /*Get a single product ID*/
                getId: function(stateParams) {
                    return stateParams.id;
                },

                idExistsDialg: function() {
                    $mdDialog.show({
                        controller: 'jaNoCarrinhoDiag as vm',
                        templateUrl: 'components/kart/jaNoCarrinhoDiag.view.html',
                        parent: angular.element(document.body),
                        //                targetEvxent: ev,
                        clickOutsideToClose: false
                    }).then(function(answer) {
                        if (answer == true) {
                            console.log("Resposta verdadeira", tmpQty);
                        }
                    }, function() {
                        vm.status = 'You cancelled the dialog.';
                    });
                },
                generalSum: function(dataArray) {
                    var i = 0
                    var sumResult = 0;
                    for (i = 0; i < dataArray.length; i++) {
                        sumResult += dataArray[i];
                        console.log(sumResult);
                    }
                    return sumResult;
                },
                cookies: {
                    put: function() {
                        $cookies.put('kartIds', _this.prd.kart.ids);
                        $cookies.put('kartqtys', _this.prd.kart.qtys);
                    },
                    get: function() {
                        _this.prd.kart.recvIds = $cookies.get('kartIds').split(',');
                        var temp = $cookies.get('kartqtys').split(',');
                        // convert the qtys to Number
                        var i = 0;
                        for (i = 0; i < temp.length; i++) {
                            _this.prd.kart.recvQtys.push(Number(temp[i]))
                            console.log(_this.prd.kart.recvQtys);
                        }

                    },
                },

            },
            pagination: {
                /*Paginagination of the list table*/
                getNumOfPages: function(data) {
                    var NumOfPages = [];
                    var j = 1;
                    var i = 0;
                    for (i = 0; i < data.length; i++) {
                        if (i == 3 * j) {
                            NumOfPages.push(j);
                            j++;
                            console.log(j);
                            console.log(NumOfPages);
                        }
                    }
                    return NumOfPages;
                },
            },
            search: {
                //stores the searched data
                data: [],
                //controlls  if data is from search
                //true if data is from search
                isDataFrom: false,
            }
        }
    }
])

//
//             var i = 0;
//                    var idExists = false;
//                    var isKartEmpty = false;
//                    if (prdIdsOnKart.length == 0) {
//                        //Se o carrinho está vazio adicione o primeiro
//                        isKartEmpty = true;
//                        prdIdsOnKart.push(prdId);
//                        //Get the single product data
//                        var dataTemp = {};
//                        dataTemp = _this.prd.getDetails(prdAllData, prdId);
//                        //Include the field quantity
//                        dataTemp['buyQty'] = qty;
//                        dataTemp['priceSubTotal'] = dataTemp.preco * qty;
//                        // subtotal
//                        _this.prd.kart.getSubPrice += dataTemp.preco;
//                        //push the data to the array of datas
//                        prdKartData.push(dataTemp); //this is shared in the prdServc
//                    } else {
//                        idExists = _this.prd.checkForIdExist(prdKartData, prdId);
//                    }
//                    if (idExists == true) {
//                        _this.prd.kart.idExists();
//                    } else if (!isKartEmpty) {
//                        //Kart is not empty and product not in the kart
//                        prdIdsOnKart.push(prdId);
//                        //Get the single product data
//                        var dataTemp = {};
//                        dataTemp = this.prdGetSingle(prdAllData, prdId);
//                        //push the data to the array of datas
//                        dataTemp['buyQty'] = qty; //include qantity field
//                        dataTemp['priceSubTotal'] = dataTemp.preco * qty; //include price subtotal field
//                        this.prdKartPriceSubTotal += dataTemp.preco;
//                        prdKartData.push(dataTemp);
//                    }
//                    //TODO: Set cookies
//                    console.log(prdIdsOnKart);
//                    var prdbuyQtyArray = this.prdFieldToArray(prdKartData, 'buyQty');
//                    $cookies.put('pm-prdIdsOnKart', prdIdsOnKart);
//                    $cookies.put('pm-prdKartPriceSubTotal', this.prdKartPriceSubTotal);
//                    $cookies.put('pm-prdbuyQtyArray', prdbuyQtyArray);
//
//                },