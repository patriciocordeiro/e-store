(function() {
    'use strict';
    angular.module('myApp').controller('PrdCtrl', ['$scope', '$q', '$filter', '$rootScope', 'productSrvc', PrdCtrl]);

    function PrdCtrl($scope, $q, $filter, $rootScope, productSrvc) {
        /*Variable declarion*/
        var vm = this;
        var prdSrvc = productSrvc;
		/*fixed columns in product listing*/
		vm.prdFixedCols = prdSrvc.prd.fixedCols;
//		    fixedCols: ['Imagens', 'No P&M', 'No. Fabricante', 'Desc.', 'Disp.', 'Preço', 'Qtd.'],
		vm.columnsSizes = [10, 10, 35, 10, 10 ,10]
		/*Recover data if no any*/
        prdSrvc.prd.recoverData();
        /*recover kart*/
        prdSrvc.prd.kart.recover();

        vm.prdQty = prdSrvc.prd.qty; // products quantities
		console.error(vm.prdQty);
        vm.newData = prdSrvc.prd; //sinalization of new incoming data
        vm.caracLimit = 2 //Numbers of caracteristics to show (products)
        vm.keysToFilter = ['_id', 'ref_PM', 'ref_fabricante', 'imagens', 'disponibilidade', 'categoria', 'subcategoria'];


        function tic() {
            return new Date().getTime();
        }

        function toc(startTime) {
            var now = new Date().getTime()
            var execTime = now - startTime;
            console.log('execution time', execTime, 'ms');
            return execTime;
        }

        //Query to send to server
        var prdQuery = {
            prdCatg: 'tv',
            prdMaxPageItems: '20', //Max number of display items in the page
        }
        console.log(prdSrvc.prd.search);
        //----- ----------------------------------------------------
        /* watch for product category change and fireup a http request */
        $scope.$watch("vm.newData.newData", function(newValue, oldValue) {
            if (productSrvc.prd.search.isDataFrom) {
                console.log('Dados da Busca');
                vm.prdData = _.map(productSrvc.prd.search.data.response, '_source');
                vm.searchTotal = productSrvc.prd.search.data.total;
                //Returned sections on search 
                vm.searchSections = productSrvc.prd.search.sections(vm.prdData);
                console.log('searchSubSections', vm.searchSubSections);
                console.log(vm.prdData);
                //total results used to show/hide search information on the page
                vm.isdataFromSearch = productSrvc.prd.search.isDataFrom;
            } else {
                console.log('Dados categoria');
                vm.prdData = productSrvc.prd.data;

            }
            //return subsections on search
            vm.searchSubSections = _.uniq(_.map(vm.prdData, 'subcategoria'))
            /*Get only the product characteristics*/
            vm.caract = _.map(vm.prdData, 'caracteristicas') //producst caracteristics 
            /*Build data for filter orderBy*/
            vm.forFilter = (_.map(vm.caract[0], 'nome'))
            //-            //			vm.forFilter = _.flatten(vm.forFilter)
            //-            console.log(((_.reduce(((vm.caract))))));
            //-
            //-            var res = _.chain(vm.caract)
            //-                .flatten()
            //-                .forEach(function(key, value) {
            //-                    //					console.log(key);
            //-                    _.map('nome')
            //-                    _.uniq(key)
            //-                }).value()
            //-            //			console.log(res);
            //+            vm.filterData = (_.groupBy(_.uniqBy(_.flatten(vm.caract), 'valor'), 'nome'));
            //+            vm.testeData = vm.prdData; //Apagar
            //         });
            //			
            vm.filterData = (_.groupBy(_.uniqBy(_.flatten(vm.caract), 'valor'), 'nome'));
            vm.testeData = vm.prdData; //Apagar
            //For pagination: get the total number of pages
            vm.pages = getNumOfPages(vm.prdData);

        });

        /*getSubSection*/
        vm.selected = [];
        var myobj = {};
        var a = [{
            subcategoria: 'resistores'
        }, {
            subcategoria: 'capacitores'
        }]
        vm.getSubSections = function(item, list) {
            var query = {}
            console.log('selected', item);
            query['subcategoria'] = item;

            var idx = _.findIndex(list, query)

            if (idx > -1) {
                //Item already in the array
                console.log('Removing');
                list.splice(idx, 1);
            } else {

                console.log('Adding');
                list.push(query);
            }
            prdFilter(list, vm.testeData).then(function(data) {
                console.log('filter', data);
                vm.prdData = data;
            })

        }

        vm.caracArrayToFilt = [];

        vm.temFilterData = vm.testeData;
        vm.comFilter = function(item, list) {
            console.log(item);
            //remove the $$hashKey
            var query = _.omit(item, '$$hashKey');
            var idx = _.findIndex(list, query)
            if (idx > -1) {
                //Item already in the array
                console.log('Removing');
                list.splice(idx, 1);
            } else {
                console.log('Adding');
                list.push(query);
            }
            var lisGrouped = _.groupBy(list, 'nome');
            var queryValues = _.values(lisGrouped);

            var mynewData = vm.testeData;
            filterExclusive(vm.testeData, queryValues, 'caracteristicas').then(function(filtereData) {
                vm.prdData = filtereData;
                console.log(filtereData);
                //For pagination: get the total number of pages
                vm.pages = getNumOfPages(vm.prdData);
            })
        }

        //----------------------------------------------------
        /*Exclusive filter*/
        function filterExclusive(dataToFiltArray, filtQueryArray, propertyTofilt) {
            var filtResult = [];
            _.forEach(filtQueryArray, function(queryVal) {
                _.forEach(queryVal, function(querySubVal) {
                    _.forEach(dataToFiltArray, function(dataToFilt) {
                        var flt = $filter('filter')(dataToFilt[propertyTofilt], querySubVal, true)
                        if (!(_.isEmpty(flt))) {
                            filtResult.push(dataToFilt);
                        }
                    });
                });
                console.log('cheguei aqui');
                console.log(filtResult);
                dataToFiltArray = filtResult
                filtResult = [];
            });
            return $q.when(dataToFiltArray)
        }
        //----------------------------------------------------
        /*Acumulator type filter*/
        function acumFilter() {
            var temp2 = [];
            _.forEach(list, function(query) {
                var i = 0;
                var temp1 = [];
                console.log(query);
                _.forEach(vm.testeData, function(val) {
                    var f = $filter('filter')(val.caracteristicas, query, true)
                    if (f.length > 0) {
                        console.log(i);
                        temp1.push(vm.testeData[i])
                        console.log(temp1);
                        vm.temFilterData = temp1;
                        vm.prdData = temp1;
                    }
                    i++
                    console.log(f);
                });

                temp2.push(temp1);
                console.log(temp2);
                console.log('intersec', _.intersectionBy([temp2, temp1[0]], 'disponibilidade'));

                vm.prdData = _.flatten(temp2);

            });
        }
        //----------------------------------------------------
        function prdFilter(query, dataTofilt) {
            console.log(query);
            var temp = []
            var filteredData = [];
            if (query.length > 0) {
                _.forEach(query, function(value) {
                    temp.push($filter('filter')(dataTofilt, value, true))
                    filteredData = _.flatten(temp);
                    //                        vm.totalLeft = vm.prdData.length;
                })
            } else {
                //return all data (no filter)
                filteredData = _.flatten(dataTofilt);
                //get the total components left
                //                    vm.totalLeft = vm.prdData.length;
            }
        }

        function prdCaractFilter(query, dataTofilt) {
            console.log(query);
            var temp = []
            var filteredData = [];
            console.log(query.length);
            if (query.length > 0) {
                _.forEach(query, function(value) {
                    temp.push($filter('filter')(dataTofilt.caracteristicas, value, true))
                    console.log(temp);
                    filteredData = _.flatten(temp);
                    //                        vm.totalLeft = vm.prdData.length;
                })
            } else {
                //return all data (no filter)
                filteredData = _.flatten(dataTofilt);
                //get the total components left
                //                    vm.totalLeft = vm.prdData.length;
            }
            console.log('filteredData', filteredData);
            return $q.when(filteredData);
        }
        //---------------------------------------------------------
        vm.order = 'preco'
        vm.ordering = function(toOrderTo) {
            vm.order = toOrderTo.toString();
            console.log('Ordenar por :', vm.order);
        }

        //-------------------------------------------------------
        /* Get Compra*/
        vm.prdGetBuy = function(prdQty, prdId) {
            console.log(prdId);
            prdSrvc.prd.kart.addItem(prdId, prdQty);
            //Used to trigger the watch in navbar for Kart
            $rootScope.dataChange = !$rootScope.dataChange;
            //restart Qty
            vm.prdQty = prdSrvc.prd.qty;
        }

        //-------------------------------------------------------
        /*Paginagination of the list table*/
		 vm.itemPerPage = 5;
		vm.itemPerPageArr = [5, 10, 25];
        var getNumOfPages = function(data) {
            var NumOfPages = [];
            var i = 0;
            for (i = 0; i < Math.ceil(data.length / vm.itemPerPage) + 1; i++) {
                NumOfPages.push(i);
                console.log(NumOfPages);
            }
            return NumOfPages;
        }

       
        vm.start = 0;
        vm.currentPage = 0;
        vm.disablePrevBtn = true;
        vm.disableNextBtn = false;
        //        vm.isActive = 'md-raised';
        vm.isActive = function(page) {
            if (page == vm.currentPage) {
                return 'md-raised';
            }

        }
        vm.changePage = function(page) {

            vm.lastPage = vm.pages.length - 1;

            if (isNaN(page) == false) {
                vm.currentPage = page;
            } else {
                console.log('nopage', _.size(isNaN(page)));
                vm.currentPage = vm.lastPage;
            }
            console.log('vm.currentPage', vm.currentPage);
            vm.start = (vm.currentPage - 1) * vm.itemPerPage

            console.log('hello', vm.start);
            if (vm.currentPage > 0) {
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
			 console.log(vm.prdQty);
        }
        vm.prevPage = function() {
            if (vm.currentPage > 0) {
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
            vm.currentPage = 0;
            vm.changePage(vm.currentPage)
        }
        //-------------------------------------------------------
        /*Show hide product filters*/
        vm.buttonText = 'Ocultar Filtros'
		vm.showFilters = true,
		vm.showFilterIcon = 'expand_more'
        vm.showHideFilters = function() {
			vm.showFilters = !vm.showFilters
			console.log(vm.showFilters);
            if (vm.showFilters) {
                vm.buttonText = 'Ocultar Filtros';
				vm.showFilterIcon = 'expand_less'
            } else {
                vm.buttonText = 'Mostrar Filtros';
				vm.showFilterIcon = 'expand_more'
            }
        }
    }
}());