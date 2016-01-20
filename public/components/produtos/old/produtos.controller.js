(function() {

    'use strict';

    angular.module('myApp').controller('ProdutosCtrl', ['$scope', '$rootScope', '$cookies',
        'httpService', 'produtosApi', 'productCategory', 'httpServiceAvaliacao', 'modalService', 'myFilters', 'ratingService',
        'localStorageService', ProdutosCtrl
    ]);

    function ProdutosCtrl($scope, $rootScope, $cookies, httpService, produtosApi, productCategory, httpServiceAvaliacao, modalService, myFilters, ratingService, localStorageService) {
        //initialization----------------
        console.log("Inicializando o produtos controller");
        var vm = this;
        var filterRange; /*Total de filtros*/
        var maxNumOfItens; // Max number of retuned itens from the server
        var query = {};
        $scope.productsCategory = productCategory;
        /*
            Código de configuração da diretiva rating
            para exibir a avaliação dos produtos feita pelos usuários
        */
        vm.minhaAvaliacao = 0;
        vm.percent = 100 * (vm.minhaAvaliacao / 5);
        vm.isReadonly = true;

        vm.lastprodutoState = $cookies.get('produtos');
        if (vm.lastprodutoState) {
            var produtosDataOnCookies = vm.lastprodutoState.split(',');

            var cookiesQuery = {
                categoria: produtosDataOnCookies[0],
                maxShowItem: produtosDataOnCookies[1],
                orderBy: produtosDataOnCookies[2]

            }
            produtosApi.getDataOnLoad([{
                categoria: cookiesQuery.categoria
            }, {
                maxShowItem: cookiesQuery
            }, {
                orderBy: cookiesQuery
            }], function(data) {
                vm.productsByCategory = data;
                maxNumOfItens = vm.productsByCategory.length;
                vm.myFiltersMarca = myFilters.revomeDuplicates(vm.productsByCategory)
                filterRange = vm.myFiltersMarca[0].length;
            })

            vm.products = {
                maxShowItem: cookiesQuery.maxShowItem, //itens by page
                orderBy: cookiesQuery.orderBy //products ordering
            }

        } else {
            vm.products = {
                maxShowItem: '20', //itens by page
                orderBy: 'marca -1' //products ordering
            }
            var display = {
                maxShowItem: vm.products.maxShowItem,
                orderBy: vm.products.orderBy
            }
            query.categoria = $scope.productsCategory.category;

            /*=======================**This is loaded on*==============================*/
            produtosApi.getDatabYCatgory([query, display], query.categoria, function(data) {
                console.log("Entrei");
                vm.productsByCategory = data;
                maxNumOfItens = vm.productsByCategory.length;
                vm.myFiltersMarca = myFilters.revomeDuplicates(vm.productsByCategory)
                filterRange = vm.myFiltersMarca[0].length;
                $cookies.put('produtos', [query.categoria, display.maxShowItem, display.orderBy]);
            });
        }

        var display = {
            maxShowItem: vm.products.maxShowItem,
            orderBy: vm.products.orderBy
        }
        $rootScope.getCategory = function(categoria) {
            $rootScope.category = categoria;
            //Salve os parametros nos cookies
            $cookies.put('produtos', [query.categoria, display.maxShowItem, display.orderBy]);
        };

        produtosApi.prdGetAll({}, function(data) {
            console.log("obj");

            vm.prd = data;
            console.log(data);
        });
        //======================================================================================        
        /*
         ************************************************
          watch for product category change
         ************************************************
        */
        $scope.$watch("productCategory.category", function(newValue, oldValue) {
            if (newValue != oldValue) {
                query.categoria = newValue
                produtosApi.getDatabYCatgory([query, display], query.categoria, function(data) {
                    vm.productsByCategory = data;
                    maxNumOfItens = vm.productsByCategory.length;
                    vm.myFiltersMarca = myFilters.revomeDuplicates(vm.productsByCategory)
                    filterRange = vm.myFiltersMarca[0].length;
                })
                //Salve os parametros nos cookies
                $cookies.put('produtos', [query.categoria, display.maxShowItem, display.orderBy]);
            }
        });
        /*
         ************************************************
          get maxShow item per page
         ************************************************
        */
        vm.getMaxShowItems = function(maxShowItem) {
            display.maxShowItem = maxShowItem;
            produtosApi.getDatabYCatgory([query, display], query.categoria, function(data) {
                vm.productsByCategory = data;
                maxNumOfItens = vm.productsByCategory.length;
                vm.myFiltersMarca = myFilters.revomeDuplicates(vm.productsByCategory);
                filterRange = vm.myFiltersMarca[0].length;
            });
            $cookies.put('produtos', [query.categoria, display.maxShowItem, display.orderBy]);
        };
        /*
         ************************************************
          get the ordering of products on the page
         ************************************************
        */
        vm.getOrdering = function(orderBy) {
            display.orderBy = orderBy;
            produtosApi.getDatabYCatgory([query, display], query.categoria, function(data) {
                vm.productsByCategory = data;
                maxNumOfItens = vm.productsByCategory.length()
                vm.myFiltersMarca = myFilters.revomeDuplicates(vm.productsByCategory);
                filterRange = vm.myFiltersMarca[0].length;
            })
            $cookies.put('produtos', [query.categoria, display.maxShowItem, display.orderBy]);
        }
        /*+++++++++++++++++++++++++++++++++++++++++++
                    Common Filter 
        ++++++++++++++++++++++++++++++++++++++++++++*/
        vm.selected = [];
        vm.filtAllObj = [];
        vm.teste = [];
        vm.caract = {} //apagar
        var filtComQryObj = {};
        vm.filtCat = [];
        vm.filtVal = [];
        console.log(vm.filtCat);
        //check if filter was deselected
        vm.exists = function(item, filtros) {
            return filtros.indexOf(item) > -1;
        };

        vm.filtroComum = function(item, filtCat, filtros) {
            console.log('Executado filtroComum');
            vm.currFiltArray = [];
            var idx = filtros.indexOf(item);
            var filtQryIn = {};
            var filtObj = {};

            filtObj[filtCat] = item;


            if (idx > -1) {
                // if deselected remove 
                filtros.splice(idx, 1);
                vm.filtAllObj.splice(idx, 1);
                vm.filtCat.splice(idx, 1);
                console.log(filtComQryObj);
                console.log('removed', filtCat);
            } else {
                // if selected push selected
                filtros.push(item);
                vm.filtAllObj.push(filtObj);

                vm.filtCat.push(filtCat);
                vm.filtVal.push(item);
                console.log(vm.filtAllObj);
                console.log('caracteristica', vm.caract);
            }
            //crete the property $in for query in the server
            filtQryIn['$in'] = _.compact(new _.pluck(vm.filtAllObj, filtCat));
            if (filtQryIn['$in'].length == 0) {
                //if a propertey is empty, remove
                delete filtComQryObj[filtCat];
                console.log(filtComQryObj);

            } else {
                //insert current filter in his category
                filtComQryObj[filtCat] = filtQryIn;
            }

            /*This section formats the filt data to display*/
            //get all selected filter values
            var val = _.values(filtComQryObj);
            var filtArraysTemp = []; //array containing 
            for (var j = 0; j < val.length; j++) {
                //get the values for each filter property
                filtArraysTemp[j] = val[j].$in;
            }
            //join all values in an array
            vm.currFiltArray = _.flatten(filtArraysTemp);
            vm.teste = {};
            vm.teste.cat = vm.filtCat;
            vm.teste.value = vm.filtVal;
            console.log(vm.teste);


            /*This section send the query to server*/
            query.filtroComum = filtComQryObj;
            query.categoria = cookiesQuery.categoria || query.categoria;
            // send request to the server with filters
            produtosApi.getDataByFilter([query, display], 'filtro_comum',
                query.categoria, function(data) {
                    //put server response data in the vm
                    vm.productsByCategory = data;
                });
        }
        /*
         ************************************************
           Função de armazenamento do id do produto 
           para visualização dos detalhes
         ************************************************
        */
        vm.storeIdProductDetail = function(id) {
            localStorageService.set('idProdutoDetalhe', id);
        }

        vm.getProdutoVisualizacao = function(produtoVis) {
            var queryProduct = {};
            queryProduct.id = produtoVis._id;
            produtosApi.showRatingProduct(queryProduct, function(data) {
                vm.produtoVisualizado = {};
                vm.produtoVisualizado.maxAvaliacoes = data[0].avaliacao.length;
                vm.produtoVisualizado.cinco = 0;
                vm.produtoVisualizado.quatro = 0;
                vm.produtoVisualizado.tres = 0;
                vm.produtoVisualizado.dois = 0;
                vm.produtoVisualizado.um = 0;
                for (var i = 0; i < data[0].avaliacao.length; i++) {
                    switch (data[0].avaliacao[i]) {
                        case 5:
                            vm.produtoVisualizado.cinco = vm.produtoVisualizado.cinco + 1;
                            break;
                        case 4:
                            vm.produtoVisualizado.quatro = vm.produtoVisualizado.quatro + 1;
                            break;
                        case 3:
                            vm.produtoVisualizado.tres = vm.produtoVisualizado.tres + 1;
                            break;
                        case 2:
                            vm.produtoVisualizado.dois = vm.produtoVisualizado.dois + 1;
                            break;
                        case 1:
                            vm.produtoVisualizado.um = vm.produtoVisualizado.um + 1;
                            break;
                    }
                }
                vm.produtoVisualizado.cincoP = 100 * vm.produtoVisualizado.cinco / vm.produtoVisualizado.maxAvaliacoes;
                vm.produtoVisualizado.quatroP = 100 * vm.produtoVisualizado.quatro / vm.produtoVisualizado.maxAvaliacoes;
                vm.produtoVisualizado.tresP = 100 * vm.produtoVisualizado.tres / vm.produtoVisualizado.maxAvaliacoes;
                vm.produtoVisualizado.doisP = 100 * vm.produtoVisualizado.dois / vm.produtoVisualizado.maxAvaliacoes;
                vm.produtoVisualizado.umP = 100 * vm.produtoVisualizado.um / vm.produtoVisualizado.maxAvaliacoes;
            });
        }
        /*
         ************************************************
            Filtro faixa de valores
         ************************************************
        */
        //create a string array with filtros of price ranges for filtroFaixa
        // Foram criados mais alguns intervalos para cobrir a maior parte dos produtos
        // Isso pode ser otimizado pegando o maior valor e subtraindo pelo menor e dividindo pelo numero de faixas
        // Assim pode ter faixas mais precisas
        vm.faixaPreco = ['0-1000', '1000-1500', '1500-2000', '2000-3000', '3000-4000', '4000-5000', '6000-8000', '8000-11000'];
        vm.filtro_faixa = function(faixa) {
            faixa = faixa.split(",");
            // Como os valor vêm dividos por traço, basta fazer um split considerando o traço
            var valoresFaixa = faixa[2].split("-");
            // A query é construída a partir da categoria selecionada e da faixa de valores
            query.menorPreco = Number(valoresFaixa[0]);
            query.maiorPreco = Number(valoresFaixa[1]);
            produtosApi.getDataByFilter([query, display], 'filtro_faixa', query.categoria, function(data) {
                vm.productsByCategory = data;
            })
        };
        /*
         ************************************************
            Controle do left-navbar
         ************************************************
        */
        vm.isCollapsed = [];
        //Inicialize todos os filtros collapsed
        var isCollapsedtrue = _.range(7).map(function() {
            return true;
        })
        vm.isCollapsed = isCollapsedtrue;
        vm.getSelectedFiltersName = function(index, value) {
            vm.isCollapsed = isCollapsedtrue = _.range(7).map(function() {
                return true;
            });
            vm.isCollapsed[index] = !value;
        }

        /*
         ************************************************
            Show more pagination
         ************************************************
        */
        var pageItems = Number(vm.products.maxShowItem);
        vm.maxShowitens = pageItems;
        vm.nomoreToShow = true //triggered if there are no more itens to show
        vm.showMore = function() {
            vm.maxShowitens = vm.maxShowitens + pageItems / 2;
            if (vm.maxShowitens >= maxNumOfItens) {
                vm.nomoreToShow = false;
            }
        }
        vm.showLess = function() {
            vm.maxShowitens = vm.maxShowitens - pageItems / 2;
            if (vm.maxShowitens <= pageItems) {
                vm.nomoreToShow = true;
            }
        }

    }

})();