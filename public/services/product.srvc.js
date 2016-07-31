//(function() {
//    'use strict';
angular.module('myApp').service('productSrvc', ['$rootScope', '$q', 'httpService', '$cookies', '$mdDialog', 'userSrcv',
    function($rootScope, $q, httpService, $cookies, $mdDialog, userSrcv) {
        //create this variable to pass all functions
        //This will allow to use this service function inside of this service
        self = this;
        //This one uses ng-model and share data bettwen controllers
        this.category = '';
        this.section = '';
        /*initialize product section and category on load*/
        if ($cookies.get('category')) {
            this.category = $cookies.get('category');
            this.section = $cookies.get('section');
        }


        this.prd = {
            fixedCols: ['Imagens', 'No P&M', 'Descrição', 'Disp.', 'Preço', 'Qtd.'],
            qty: [],
            data: [],
            newData: false,
            cookies: {
                put: function() {
                    $cookies.put('section', self.section);
                    $cookies.put('category', self.category);
                },
                get: function() {
                    this.category = $cookies.get('category');
                    this.section = $cookies.get('section');
                    var cookiesExist;
                    if (!(_.isEmpty(this.category && this.section))) {
                        cookiesExist = true;

                    } else {
                        cookiesExist = false;
                    }
                    return $q.when(cookiesExist);
                }

            },
            /*Rcover data on page reload*/
            recoverData: function() {
                if (_.isEmpty(self.prd.data)) {
                    console.log('Nenhum dado');
                    self.prd.cookies.get().then(function(isCookiesExist) {
                        if (isCookiesExist) {
                            var query = {};
                            query.category = self.category;
                            console.log(self.category);
                            self.prd.http.getDataByCatg(query, this.category, function() {})
                        }
                    });
                }

            },
            /*update some signaling variables if prd data change
            search or new category or something else*/
            update: function() {
                //change the status to sinalize new incoming data
                //this will be used in the watch of prd controller
                self.prd.newData = !self.prd.newData;
                //------------------------------------------------
                /*True if data is from search, false otherwise
                                this is used on prd controller to watch
                                where data is coming from*/
                self.prd.search.isDataFrom = false;
                //------------------------------------------------
            },
            /*Get the clicked section and category */
            getCatg: function(section, category) {
                //get the category
                self.category = category;
                //get  the section
                self.section = section;
                //-------------------------------------------
                //save the cookies
                self.prd.cookies.put();
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
                return $q.when(prdSingleData)
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
                            self.prd.data = res.data;
                            //sinalize that data has change (execute update operations)
                            self.prd.newData = !self.prd.newData;
                            //--------------------------------------------
                            /*True if data is from search, false otherwise
                                this is used on prd controller to watch
                                where data is coming from*/
                            self.prd.search.isDataFrom = false;
                            //--------------------------------------------
                            console.info('category data', res.data);
                            //create the array of quantities with value 1

                            var i = 0
                            for (i = 0; i < res.data.length; i++) {
                                self.prd.qty.push(1);
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
                        self.prd.search.data = data;
                        //-------------------------------------------
                        //sinalize that data has change (execute update operations)
                        //change the status to sinalize new incoming data
                        //this will be used in the watch of prd controller
                        self.prd.newData = !self.prd.newData;
                        /*True if data is from search, false otherwise
                                this is used on prd controller to watch
                                where data is coming from*/
                        self.prd.search.isDataFrom = true;
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

                reviewProduct: function(query, id, callback) {
                    httpService.prd.save({
                        acao: 'reviewProduct', //apenas para teste. remover e colocar o acima
                        id: id
                    }, query).$promise.then(
                        /*sucesso*/
                        function(res) {
                            var msg = {};
                            if (res) {
                                if (res.ok == 1 && res.nModified == 1) {
                                    msg = {
                                        title: 'Obrigado por Avaliar',
                                        text: 'Sua avaliação foi enviada com sucesso',
                                        sucess: 1
                                    };


                                }
                                console.log(res);

                            } else {
                                //TODO: error msg
                            }
                            userSrcv.usr.dialog(msg)
                            return callback(res);
                        },
                        /*falha*/
                        function(error) {
                            msg = {
                                title: 'Ocorreu um erro e sua avaliaçao nao foi processada.',
                                text: 'Por favor, tente novamente',
                                sucess: 0
                            };
                            userSrcv.usr.dialog(msg)
                            return callback(error);
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
                    self.prd.kart.cookies.get().then(function(res) {
                        console.log(res);
                        if (res) {
                            var query = {
                                ids: self.prd.kart.ids
                            }

                            httpService.prd.save({
                                acao: 'myKart',
                                id: 'id'
                            }, query).$promise.then(function(res) {
                                self.prd.kart.data = res.data;
                                var i = 0;
                                for (i = 0; i < res.data.length; i++) {
                                    self.prd.kart.data[i]['buyQty'] = self.prd.kart.qtys[i];
                                    self.prd.kart.data[i]['priceSubTotal'] = self.prd.kart.qtys[i] * res.data[i].preco

                                }
                                //update number of items in kart
                                self.prd.kart.getSize().then(function(kartSize, callback) {
                                    console.log('obj');
                                    console.log('Kartsize', kartSize);
                                    self.prd.kart.totalItems = kartSize;
                                    //sinalize kartEmpty
                                    if (kartSize > 0) {
                                        self.prd.kart.isEmpty = false;
                                    } else {
                                        self.prd.kart.isEmpty = true;
                                    }
                                    console.log(self.prd.kart.isEmpty);
                                })
                                //                                getSizePromisse.then(function(data) {
                                //                                        console.log('obj');
                                //                                        console.log('Kartsize', data);
                                //                                        self.prd.kart.totalItems = data;
                                return callback(res.data)
                            })

                            //                                    return callback(res.data);
                            //                                });
                        } else {
                            self.prd.kart.isEmpty = true;
                            console.log('Kart is empty', self.prd.kart.isEmpty);
                            return callback([]);
                        }
                    })
                },
                /*Function to handle puting product on the kart*/
                addItem: function(id, qty) {
                    var checkForIdExistPromisse = self.prd.checkForIdExist(self.prd.kart.data, id);
                    checkForIdExistPromisse.then(function(idExists) {
                        console.log('promisseresult', idExists)
                        if (idExists == true) {
                            self.prd.kart.idExistsDialg();
                        } else {
                            console.log(id);
                            var dataTemp = self.prd.getDetails(self.prd.data, id)
                            //Include the field quantity
                            dataTemp['buyQty'] = qty;
                            //Include the field priceSubTotal
                            dataTemp['priceSubTotal'] = dataTemp.preco * qty;
                            //calculate the kart total price
                            console.info(self.prd.kart.total);
                            self.prd.kart.total = self.prd.kart.total + dataTemp.preco * qty;
                            console.info(self.prd.kart.total);
                            //push the data to the array of datas
                            self.prd.kart.data.push(dataTemp);
                            //push the id
                            self.prd.kart.ids.push(id);
                            //push the qty
                            self.prd.kart.qtys.push(qty)
                            //store cookies
                            self.prd.kart.cookies.put();

                            self.prd.kart.isEmpty = false;

                        }
                    })
                },
                /*Remove an item from the kart*/
                remItem: function(index) {
                    console.log('remove item');
                    self.prd.kart.data.splice(index, 1);
                    self.prd.kart.ids.splice(index, 1);
                    if (self.prd.kart.ids.length == 0) {
                        self.prd.kart.isEmpty = true;
                    } else {
                        self.prd.kart.isEmpty = false;
                    }
                    //Trigger the datachange watch for kart total number of items
                    $rootScope.dataChange = !$rootScope.dataChange;
                    //update the kart total
                    self.prd.kart.total = _.sum(_.map(self.prd.kart.data, 'priceSubTotal'));

                    //update the number of items in the Kart
                    //Save the cookies
                    self.prd.kart.cookies.put();
                },
                /*update kart when quantity is change*/
                updateItem: function(index, qty) {
                    //update the quantyity in the array of qtys
                    self.prd.kart.qtys[index] = qty;
                    //update the product buy qty
                    self.prd.kart.data[index].buyQty = qty;
                    //update the product subtotal
                    self.prd.kart.data[index].priceSubTotal = self.prd.kart.data[index].preco * qty;
                    //update the kart total
                    self.prd.kart.total = _.sum(_.map(self.prd.kart.data, 'priceSubTotal'));
                    //Save the cookies
                    self.prd.kart.cookies.put();
                    //return a promisse
                    return $q.when(true);
                },
                /*Get the total number of items in the Kart*/
                getSize: function() {
                    console.log(self.prd.kart.ids.length);
                    return $q.when(self.prd.kart.ids.length);
                },
                /*Get a single product ID*/
                getId: function(stateParams) {
                    return stateParams.id;
                },

                idExistsDialg: function() {
                    console.log('Produto ja está no carrinho');
                    $mdDialog.show({
                        controller: 'jaNoCarrinhoDiag as vm',
                        templateUrl: 'components/kart/jaNoCarrinhoDiag.view.html',
                        parent: angular.element(document.body),
                        //                targetEvxent: ev,
                        clickOutsideToClose: false
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
                        $cookies.put('kartIds', self.prd.kart.ids);
                        $cookies.put('kartqtys', self.prd.kart.qtys);
                        $cookies.put('kartTotal', self.prd.kart.total);
                    },
                    get: function() {
                        var isCookiesExist;
                        this.category = $cookies.get('category');
                        this.section = $cookies.get('section');
                        var kartIds = $cookies.get('kartIds');
                        var kartqtys = $cookies.get('kartqtys');
                        var katTotal = $cookies.get('kartTotal')

                        if (!_.isEmpty(kartIds && kartqtys)) {
                            self.prd.kart.recvIds = kartIds.split(',');
                            self.prd.kart.ids = self.prd.kart.recvIds;
                            self.prd.kart.total = katTotal;

                            // convert the qtys to Number
                            var temp = kartqtys.split(',');

                            var i = 0;
                            for (i = 0; i < temp.length; i++) {
                                self.prd.kart.recvQtys.push(Number(temp[i]))
                                //                                console.log(self.prd.kart.recvQtys);
                            }
                            //return that cookies exists
                            self.prd.kart.qtys = self.prd.kart.recvQtys;

                            return $q.when(true);
                        }
                        //return that cookies does not exists
                        return $q.when(false);
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
                sections: function(data) {
                    var sect = _(data)
                        .uniqBy('categoria')
                        .map('categoria')
                        .value()
                    return sect;
                },
            }
        }
    }
])
