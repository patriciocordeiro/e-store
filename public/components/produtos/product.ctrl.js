(function() {
    'use strict';
    angular.module('myApp').controller('PrdCtrl', ['$scope', '$q', '$rootScope', 'productSrvc', PrdCtrl]);

    function PrdCtrl($scope, $q, $rootScope, productSrvc) {
        /*Variable declarion*/
        var vm = this;
        var prdSrvc = productSrvc;
        vm.prdQty = prdSrvc.prd.qty; // products quantities
        vm.newData = prdSrvc.prd; //sinalization of new incoming data
        vm.caracLimit = 2 //Numbers of caracteristics to show (products)
        vm.keysToFilter = ['_id', 'ref_PM', 'ref_fabricante', 'imagens', 'disponibilidade', 'categoria', 'subcategoria'];


        var teste = [{
            name: 'capacitor',
            value: 10
        }, {
            name: 'capacitor',
            value: 20
        }, {
            name: 'indutor',
            value: 25
        }];
		var x = {}
		var y=[]
        console.log((_.groupBy(_.flatten(teste), 'name')))
        _.forEach(teste, function(key, value) {
            console.log(key);
            
            x[key.name] = key.value
			y.push(x)
        })
        console.log(y);


        function tic() {
            return new Date().getTime();
        }

        vm.prdFixedCols = ['Imagens', 'No P&M', 'No. Fabricante', 'Disp.', 'Preço', 'Qtd.'];


        function toc(startTime) {
            var now = new Date().getTime()
            var execTime = now - startTime;
            console.log('execution time', execTime, 'ms');
            return execTime;
        }
        //        /*check if data is comming from search*/
        //        if (prdSrvc.prd.search.data.total > 0) {
        //            //create an array taking only the _source field
        //            vm.prdData = _.pluck(productSrvc.prd.search.data.response, '_source')
        //            console.log('acao : busca');
        //            console.log(vm.prdData);
        //        } else {
        //            console.log('acao normal');
        //            vm.prdData = [];
        //        }

        function qtest() {
            return $q.when(1 + 2)
        }

        var pro = qtest();
        qtest().then(function(data) {
            return data;
        }).then(function(data) {
            'hello'
        })
        console.log('Teste q', qtest())
        //Query to send to server
        var prdQuery = {
            prdCatg: 'tv',
            prdMaxPageItems: '20', //Max number of display items in the page
        }
        console.log(prdSrvc.prd.http);
        //----- ----------------------------------------------------
        /* watch for product category change and fireup a http request */
        $scope.$watch("vm.newData.newData", function(newValue, oldValue) {
            if (productSrvc.prd.search.isDataFrom) {
                console.log('Dados da Busca');
                vm.prdData = _.map(productSrvc.prd.search.data.response, '_source');
                vm.searchTotal = productSrvc.prd.search.data.total;
                //Returned sections on search 
                vm.searchSections = productSrvc.prd.search.sections(vm.prdData);
                //total results used to show/hide search information on the page
                vm.isdataFromSearch = productSrvc.prd.search.isDataFrom;
            } else {
                console.log('Dados categoria');
                vm.prdData = productSrvc.prd.data;
            }
            /*Get only the product characteristics*/
            vm.caract = _.map(vm.prdData, 'caracteristicas') //producst caracteristics 
            console.log(vm.caract);
            /*Build data for filter orderBy*/
            vm.forFilter = (_.map(vm.caract[0], 'nome'))
            //			vm.forFilter = _.flatten(vm.forFilter)
            console.log(((_.reduce(((vm.caract))))));

            var res = _.chain(vm.caract)
                .flatten()
                .forEach(function(key, value) {
                    //					console.log(key);
                    _.map('nome')
                    _.uniq(key)
                }).value()
            //			console.log(res);
        });
        //---------------------------------------------------------
        vm.order = 'preco'
        vm.ordering = function(toOrderTo) {
            vm.order = toOrderTo.toString();
            console.log('Ordenar por :', vm.order);
        }

        //-------------------------------------------------------
        /* Get Compra*/
        vm.prdGetBuy = function(prdQty, prdId) {
            prdSrvc.prd.kart.addItem(prdId, prdQty);
            //Used to trigger the watch in navbar for Kart
            $rootScope.dataChange = !$rootScope.dataChange;
            //restart quantities
            vm.prdQty = prdSrvc.prd.qty;
            console.log(obj);
        }

        //-------------------------------------------------------
        /*Paginagination of the list table*/
        var getNumOfPages = function() {
            var NumOfPages = [];
            var j = 1;
            var i = 0;
            for (i = 0; i < prdSrvc.prd.data.length; i++) {
                if (i == 3 * j) {
                    NumOfPages.push(j);
                    j++;
                    console.log(j);
                    console.log(NumOfPages);
                }
            }
            return NumOfPages;
        }
        //        vm.pages = getNumOfPages();
        var getNum = function(data) {
            var defer = $q.defer();
            if (data > 0) {
                defer.resolve(11)
            } else {
                defer.resolve(10)
            }
            return defer.promise;
        }
        console.log(prdSrvc.prd.qty.length);
        var getNumPromise = getNum(prdSrvc.prd.qty.length);
        getNumPromise.then(function(data) {
            console.log(data);
        });
        //        vm.pages = prdSrvc.prd.qty;
        //        console.log(vm.pages);
        //        vm.lastPage = vm.pages.length;
        //        vm.start = 1;
        //        vm.currentPage = 1;
        //        vm.disablePrevBtn = true;
        //        vm.disableNextBtn = false;
        //        //        vm.isActive = 'md-raised';
        //        vm.isActive = function(page) {
        //            if (page == vm.currentPage) {
        //                return 'md-raised';
        //            }
        //
        //        }
        //        vm.changePage = function(page) {
        //            vm.currentPage = page;
        //            vm.start = (vm.currentPage - 1) * 5;
        //
        //            console.log('hello', vm.start);
        //            if (vm.currentPage > 1) {
        //                vm.disablePrevBtn = false;
        //            } else {
        //                vm.disablePrevBtn = true;
        //            }
        //            if (vm.currentPage == vm.lastPage) {
        //                vm.disableNextBtn = true;
        //            } else {
        //                vm.disableNextBtn = false;
        //            }
        //            vm.isActive(page);
        //        }
        //        vm.prevPage = function() {
        //            if (vm.currentPage > 1) {
        //                vm.currentPage--;
        //                vm.changePage(vm.currentPage);
        //            }
        //        }
        //        vm.nextPage = function() {
        //            console.log(vm.lastPage);
        //            if (vm.currentPage != vm.lastPage) {
        //                vm.currentPage++;
        //                vm.changePage(vm.currentPage);
        //            }
        //        }
        //        vm.goTolastPage = function() {
        //            vm.currentPage = vm.lastPage;
        //            vm.changePage(vm.currentPage)
        //        }
        //        vm.gotoFirstPage = function() {
        //            vm.currentPage = 1;
        //            vm.changePage(vm.currentPage)
        //        }
        //-------------------------------------------------------
    }
}());