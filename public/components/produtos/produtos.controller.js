(function() {

    'use strict';

    angular.module('myApp').controller('ProdutosCtrl', ['$scope', '$rootScope', '$cookies',
        'httpService', 'produtosApi', 'productCategory', 'httpServiceAvaliacao', 'modalService', 'myFilters', 'ratingService', 
        'localStorageService', ProdutosCtrl
    ]);

    function ProdutosCtrl($scope, $rootScope, $cookies, httpService, produtosApi, productCategory, httpServiceAvaliacao, modalService, myFilters, ratingService, localStorageService) {
        //        console.log('queryqueryquery', query.categoria)
        //initialization------------------------------------------------------------------------------------------ 
        var vm = this;

        var query = {};

        $scope.productsCategory = productCategory;

        vm.lastprodutoState = $cookies.get('produtos');
        if (vm.lastprodutoState) {
            var produtosDataOnCookies = vm.lastprodutoState.split(',');

            var cookiesQuery = {
                categoria: produtosDataOnCookies[0],
                maxShowItem: produtosDataOnCookies[1],
                orderBy: produtosDataOnCookies[2]

            }

            console.log('cookieQuery', vm.lastprodutoState)
            produtosApi.getDataOnLoad([{
                categoria: cookiesQuery.categoria
            }, {
                maxShowItem: cookiesQuery
            }, {
                orderBy: cookiesQuery
            }], function(data) {
                vm.productsByCategory = data;
                //            console.log('On load/refresh: Get products');
                vm.myfiltersMarca = myFilters.revomeDuplicates(vm.productsByCategory, "marca")
                vm.myfiltersTela = myFilters.revomeDuplicates(vm.productsByCategory, "tamanho_tela")


            })

            vm.products = {
                maxShowItem: cookiesQuery.maxShowItem, //itens by page
                orderBy: cookiesQuery.orderBy //products ordering
            }


        } else {
            vm.products = {
                maxShowItem: '20', //itens by page
                orderBy: 'lancamento' //products ordering
            }
            var display = {
                maxShowItem: vm.products.maxShowItem,
                orderBy: vm.products.orderBy
            }
            query.categoria = $scope.productsCategory.category;
            console.log(query.categoria)

            //This is loaded on page load
            produtosApi.getDatabYCatgory([query, display], query.categoria, function(data) {
                console.log('getDatabYCatgory function loaded on page load')
                vm.productsByCategory = data;
                vm.myfiltersMarca = myFilters.revomeDuplicates(vm.productsByCategory, "marca")
                vm.myfiltersTela = myFilters.revomeDuplicates(vm.productsByCategory, "tamanho_tela")
                $cookies.put('produtos', [query.categoria, display.maxShowItem, display.orderBy]);
            });
        }



        //Get the selected category
        //                $scope.productsCategory = productCategory;
        //build the query
        //        console.log('categoria', $scope.productsCategory.category)

        //        var query = {
        //                    categoria: $scope.productsCategory.category,
        //                };
        //        
        //    console.log(cookiesQuery.categoria)
        //           query.categoria = cookiesQuery.categoria || query.categoria;

        var display = {
            maxShowItem: vm.products.maxShowItem,
            orderBy: vm.products.orderBy
        }



        //This is loaded on page load
        //                        produtosApi.getDatabYCatgory([query, display], query.categoria, function(data) {
        //                                console.log('getDatabYCatgory function loaded on page load')
        //                    vm.productsByCategory = data;
        //                    vm.myfiltersMarca = returnUniqueMarca(vm.productsByCategory);
        //                    vm.myfiltersTela = returnUniqueTela(vm.productsByCategory);
        //                });
        //        

        console.log('Produtos Controller executado')
        $rootScope.getCategory = function(categoria) {
            console.log('executa que uma beleza', categoria)
            //            query.categoria = categoria
            //            console.log('My Categoria query', query)
            //            produtosApi.getDatabYCatgory([query, display], query.categoria, function(data) {
            //                vm.productsByCategory = data;
            //                console.log('categoria controller greeting', $scope.productsByCategory);
            //                vm.myfiltersMarca = returnUniqueMarca(vm.productsByCategory);
            //                vm.myfiltersTela = returnUniqueTela(vm.productsByCategory);


            //            })
            $rootScope.category = categoria;
            //Salve os parametros nos cookies
            console.log('query do watch', display.orderBy)
            $cookies.put('produtos', [query.categoria, display.maxShowItem, display.orderBy]);
        };

        $scope.$watch("productCategory.category", function(newValue, oldValue) {
            console.log('hold:', oldValue);
            console.log('new:', newValue);
            if (newValue != oldValue) {
                query.categoria = newValue
                console.log('My Categoria query', query)
                produtosApi.getDatabYCatgory([query, display], query.categoria, function(data) {
                    vm.productsByCategory = data;
                    console.log('categoria controller greeting', $scope.productsByCategory);
                    vm.myfiltersMarca = myFilters.revomeDuplicates(vm.productsByCategory, "marca")
                    vm.myfiltersTela = myFilters.revomeDuplicates(vm.productsByCategory, "tamanho_tela")

                })
                //Salve os parametros nos cookies
                console.log('query do watch', display.orderBy)
                $cookies.put('produtos', [query.categoria, display.maxShowItem, display.orderBy]);


            }
        });


        //get maxShow item per page
        vm.getMaxShowItems = function(maxShowItem) {
            display.maxShowItem = maxShowItem;
            produtosApi.getDatabYCatgory([query, display], query.categoria, function(data) {
                vm.productsByCategory = data;
                vm.myfiltersMarca = myFilters.revomeDuplicates(vm.productsByCategory, "marca")
                vm.myfiltersTela = myFilters.revomeDuplicates(vm.productsByCategory, "tamanho_tela")

                console.log('returned', vm.productsByCategory)
            });
            $cookies.put('produtos', [query.categoria, display.maxShowItem, display.orderBy]);
        };

        //get the ordering of products on the page
        vm.getOrdering = function(orderBy) {
            display.orderBy = orderBy;
            produtosApi.getDatabYCatgory([query, display], query.categoria, function(data) {
                vm.productsByCategory = data;
                vm.myfiltersMarca = myFilters.revomeDuplicates(vm.productsByCategory, "marca")
                vm.myfiltersTela = myFilters.revomeDuplicates(vm.productsByCategory, "tamanho_tela")

                console.log('returned', vm.productsByCategory)
            })
            $cookies.put('produtos', [query.categoria, display.maxShowItem, display.orderBy]);

        }


        //Filters
        var acumFilters = [];
        var filtroComumQuery;
        vm.filterBy = {
            marca: '', //initialize the filter
            preco: '', //initialize the filter
            tamanho_tela: '' //initialize the filter
        };


        vm.filtroComum = function(filterBy) {
            var filterBy = filterBy.split(",");
            /*if the filter already exist*/
            if (filterBy[0] == 'null') {
                delete query[filterBy[1]]; /*remove the existing filter from the query*/
            } else {

                acumFilters.push(filterBy); /*add one more filter to query*/
                //Construct the query object
                var queryValorFiltro = {};
                for (var i = 0; i < acumFilters.length; i++) {
                    query[acumFilters[i][1]] = acumFilters[i][2];
                }

            }
            query.categoria = cookiesQuery.categoria || query.categoria;

            console.log('CATEGORIA', query.categoria)
            produtosApi.getDataByFilter([query, display], 'filtro_comum', query.categoria, function(data) {
                vm.productsByCategory = data;
                vm.myfiltersMarca = myFilters.revomeDuplicates(vm.productsByCategory, "marca")
                vm.myfiltersTela = myFilters.revomeDuplicates(vm.productsByCategory, "tamanho_tela")

            })

            console.log('my', query)
        }


        //        produtosApi.getDatabYCatgory([query, display], query.categoria, function(data) {
        //            //            console.log('hello')
        //            vm.productsByCategory = data;
        //            vm.myfiltersMarca = returnUniqueMarca(vm.productsByCategory);
        //            vm.myfiltersTela = returnUniqueTela(vm.productsByCategory);
        //        });
        //        console.log(vm.productsByCategory);
        //        console.log('categoria controller greeting', query)

        // Aqui são as funções relacionadas a avaliação de produtos

        // previamente seta o campo de avaliação como vazio
        /*vm.semAvaliacao = "Campo de avaliação vazio";
        vm.modalStyle = {color:'red'};
        vm.checked = false;
        
        vm.getIdProduto = function(id, categoria){
            ratingService.setId(id);
            ratingService.setCategoria(categoria);
        };

        vm.getAvaliacao = function(avaliacao) {
            vm.semAvaliacao = "";
            ratingService.setAvaliacao(avaliacao);
        };
        vm.enviarAvaliacaoProduto = function(){
            console.log("Eu avaliei o produtoId: ", ratingService.getId());
            console.log("Categoria: ", ratingService.getCategoria());
            console.log("Avaliacao: ", ratingService.getAvaliacao());

            if(ratingService.getAvaliacao() === undefined){
                vm.semAvaliacao = "Campo de avaliação vazio";
            }else{
                var queryAvaliacao = {
                    'id': ratingService.getId(),
                    'avaliacao': parseInt(ratingService.getAvaliacao())
                };

                produtosApi.getRatingProduct(queryAvaliacao, function(data){
                    console.log("Dado retornado da minha avaliacao: ", data);
                    vm.semAvaliacao = "Sua avaliacao foi enviada com sucesso";
                    vm.modalStyle = {color:'blue'};
                    //vm.checked = false;
                });
            }
        }

        vm.closeModal = function(){
            vm.semAvaliacao = "Campo de avaliação vazio";
            //vm.checked = false;
            vm.modalStyle = {color:'red'};
        }*/

        // Função de armazenamento do id do produto para visualização dos detalhes
        vm.storeIdProductDetail = function(id){
            console.log("Meu id ", id);
            localStorageService.set('idProdutoDetalhe',id);
        }

        vm.getProdutoVisualizacao = function(produtoVis){
            console.log("Produto visualizado: ", produtoVis);
            var queryProduct = {};
            queryProduct.id = produtoVis._id;
            produtosApi.showRatingProduct(queryProduct, function(data){
                console.log("Dado retornada da minha visualizacao: ", data[0].avaliacao);
                //console.log("Number of ocurrences: ", _.sortedIndex(data[0].avaliacao, 5));
                vm.produtoVisualizado = {};
                vm.produtoVisualizado.maxAvaliacoes = data[0].avaliacao.length;
                vm.produtoVisualizado.cinco = 0;
                vm.produtoVisualizado.quatro = 0;
                vm.produtoVisualizado.tres = 0;
                vm.produtoVisualizado.dois = 0;
                vm.produtoVisualizado.um = 0;
                for(var i = 0; i < data[0].avaliacao.length; i++){
                    switch(data[0].avaliacao[i]){
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
                vm.produtoVisualizado.cincoP = 100*vm.produtoVisualizado.cinco/vm.produtoVisualizado.maxAvaliacoes;
                vm.produtoVisualizado.quatroP = 100*vm.produtoVisualizado.quatro/vm.produtoVisualizado.maxAvaliacoes;
                vm.produtoVisualizado.tresP = 100*vm.produtoVisualizado.tres/vm.produtoVisualizado.maxAvaliacoes;
                vm.produtoVisualizado.doisP = 100*vm.produtoVisualizado.dois/vm.produtoVisualizado.maxAvaliacoes;
                vm.produtoVisualizado.umP = 100*vm.produtoVisualizado.um/vm.produtoVisualizado.maxAvaliacoes;
                console.log("Caracteristicas do meu produto visualizado: ", vm.produtoVisualizado);
            });
        }

        /*vm.getIdProduto = function(produtoId, categoria) {
            modalService.id = produtoId;
            modalService.categoria = categoria;
            console.log("Produto a ser avaliado", modalService.id);
            console.log("Categoria do produto", modalService.categoria);
        };
        vm.getAvaliacao = function(avaliacao) {
            modalService.avaliacao = avaliacao;
            console.log("Minha avaliacao: ", avaliacao);
        };
        vm.enviarAvaliacaoProduto = function() {
            console.log("Id: ", modalService.id);
            console.log("Avaliacao ", modalService.avaliacao);
            console.log("Categoria ", modalService.categoria);
            var queryAvaliacao = {
                'id': modalService.id,
                'avaliacao': modalService.avaliacao,
                'categoria': modalService.categoria
            };

            httpServiceAvaliacao.save({
                categoria: modalService.categoria,
                avaliacao: modalService.avaliacao
            }, queryAvaliacao, function() {
                console.log("Os dados da avaliacao sao: ", queryAvaliacao);
            });
        };

        vm.getProdutoVisualizacao = function(produtoVis) {
            vm.produtosParaVisualizar = produtoVis;
            if (typeof produtoVis.avaliacao !== "undefined") {
                vm.maxAvaliacoes = parseInt(produtoVis.avaliacao.um || 0) + parseInt(produtoVis.avaliacao.dois || 0) +
                    parseInt(produtoVis.avaliacao.tres || 0) + parseInt(produtoVis.avaliacao.quatro || 0) + parseInt(produtoVis.avaliacao.cinco || 0);
            } else {
                vm.maxAvaliacoes = 0;
            }
        };*/

        //create a srting array with list of price ranges for filtroFaixa
        // Foram criados mais alguns intervalos para cobrir a maior parte dos produtos
        // Isso pode ser otimizado pegando o maior valor e subtraindo pelo menor e dividindo pelo numero de faixas
        // Assim pode ter faixas mais precisas
        vm.faixaPreco = ['0-1000', '1000-1500', '1500-2000', '2000-3000', '3000-4000', '4000-5000', '6000-8000', '8000-11000'];
        vm.filtro_faixa = function(faixa) {
            faixa = faixa.split(",");
            console.log(faixa);
            // Como os valor vêm dividos por traço, basta fazer um split considerando o traço
            var valoresFaixa = faixa[2].split("-");
            console.log(valoresFaixa);
            // A query é construída a partir da categoria selecionada e da faixa de valores

            query.menorPreco = Number(valoresFaixa[0]);
            query.maiorPreco = Number(valoresFaixa[1]);


            produtosApi.getDataByFilter([query, display], 'filtro_faixa', query.categoria, function(data) {
                vm.productsByCategory = data;
                vm.myfiltersMarca = myFilters.revomeDuplicates(vm.productsByCategory, "marca")
                vm.myfiltersTela = myFilters.revomeDuplicates(vm.productsByCategory, "tamanho_tela")

                console.log('returned', vm.productsByCategory)
            })

        };

        //set all cookiest

        //        $cookies.put('usuario',response.firstName + ' ' + response.lastName);
    }

})();