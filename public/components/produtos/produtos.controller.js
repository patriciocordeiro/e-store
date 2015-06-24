(function() {

    'use strict';

    angular.module('myApp').controller('ProdutosCtrl', ['$scope', 'httpService', 'produtosApi', 'productCategory', 'httpServiceAvaliacao', 'modalService', ProdutosCtrl]);

    function ProdutosCtrl($scope, httpService, produtosApi, productCategory, httpServiceAvaliacao, modalService) {

        //initialization------------------------------------------------------------------------------------------ 
        var vm = this;
        
        vm.products = {
            maxShowItem: '20', //itens by page
            orderBy: 'lancamento' //products ordering

        }
        
        //Get the selected category
        $scope.productsCategory = productCategory;
        //build the query
        console.log('categoria', $scope.productsCategory.category)
        
        var query = {
            categoria: $scope.productsCategory.category,
        }

        var display = {
            maxShowItem: vm.products.maxShowItem
        }
        // Essa função foi feita para que os valores da Marca não se repitam nos filtros disponíveis
        var returnUniqueMarca = function(objetos) {
            //console.log("Meus objetos ", objetos);
            var v = [];
            var exit = true;
            var j = 0;
            if (objetos.length != 0) { // Quando é clicado em "selecionar categoria", a função ng-click entende como uma ação e 
                // manda um vetor vazio para a função, então não deve-se fazer nada
                // Esse loop elimina os elementos iguais para serem mostrados no filtro
                for (var i = 0; i < objetos.length; i++) {
                    if (v.length != 0) {
                        while (exit) {
                            if (objetos[i].marca === v[j].marca) {
                                exit = false;
                            } else if ((objetos[i].marca !== v[j].marca) && (j == v.length - 1)) {
                                v.push(objetos[i]);
                            }
                            j++;
                        }
                        j = 0;
                        exit = true;
                    } else {
                        v.push(objetos[i]);
                    }
                }
            }
            console.log("Minhas marcas nesse vetor: ", v);
            return (v);
        }
        // Faz a mesma coisa que a primeira, porém agora para o tamanho da tela
        var returnUniqueTela = function(objetos) {
            //console.log("Meus objetos ", objetos);
            var v = [];
            var exit = true;
            var j = 0;
            if (objetos.length != 0) { // Quando é clicado em "selecionar categoria", a função ng-click entende como uma ação e 
                // manda um vetor vazio para a função, então não deve-se fazer nada
                // Esse loop elimina os elementos iguais para serem mostrados no filtro
                for (var i = 0; i < objetos.length; i++) {
                    if (v.length != 0) {
                        while (exit) {
                            if (objetos[i].tamanho_tela === v[j].tamanho_tela) {
                                exit = false;
                            } else if ((objetos[i].tamanho_tela !== v[j].tamanho_tela) && (j == v.length - 1)) {
                                v.push(objetos[i]);
                            }
                            j++;
                        }
                        j = 0;
                        exit = true;
                    } else {
                        v.push(objetos[i]);
                    }
                }
            }

            console.log("Meus tamanhos de telas nesse vetor: ", v);
            return (v);
        }

        $scope.$watch("productCategory.category", function(newValue, oldValue) {
            console.log('hold:', oldValue);
            console.log('new:', newValue);
            if (newValue != oldValue) {
                query.categoria = newValue
                console.log('My Categoria query', query)
                produtosApi.getDatabYCatgory([query, display], query.categoria, function(data) {
                    vm.productsByCategory = data;
                    console.log('categoria controller greeting', $scope.productsByCategory);
                    vm.myfiltersMarca = returnUniqueMarca(vm.productsByCategory);
                    vm.myfiltersTela = returnUniqueTela(vm.productsByCategory);


                })


            }
        });

        //get maxShow item per page
        vm.getMaxShowItems = function(maxShowItem) {
            display.maxShowItem = maxShowItem;
            produtosApi.getDatabYCatgory([query, display], query.categoria, function(data) {
                vm.productsByCategory = data;
                vm.myfiltersMarca = returnUniqueMarca(vm.productsByCategory);
                vm.myfiltersTela = returnUniqueTela(vm.productsByCategory);
                console.log('returned', vm.productsByCategory)
            });
        };

        //get the ordering of products on the page
        vm.getOrdering = function(orderBy) {
            display.orderBy = orderBy;
            produtosApi.getDatabYCatgory([query, display], query.categoria, function(data) {
                vm.productsByCategory = data;
                vm.myfiltersMarca = returnUniqueMarca(vm.productsByCategory);
                vm.myfiltersTela = returnUniqueTela(vm.productsByCategory);
                console.log('returned', vm.productsByCategory)
            })
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

            produtosApi.getDataByFilter([query, display], 'filtro_comum', query.categoria, function(data) {
                vm.productsByCategory = data;
                vm.myfiltersMarca = returnUniqueMarca(vm.productsByCategory);
                vm.myfiltersTela = returnUniqueTela(vm.productsByCategory);
//                console.log('returned', vm.productsByCategory)
            })

            console.log('my', query)
        }


        produtosApi.getDatabYCatgory([query, display], query.categoria, function(data) {
//            console.log('hello')
            vm.productsByCategory = data;
            vm.myfiltersMarca = returnUniqueMarca(vm.productsByCategory);
            vm.myfiltersTela = returnUniqueTela(vm.productsByCategory);
        });
        //        console.log(vm.productsByCategory);
        //        console.log('categoria controller greeting', query)

        // Aqui são as funções relacionadas a avaliação de produtos
        vm.getIdProduto = function(produtoId, categoria) {
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
        };

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
                vm.myfiltersMarca = returnUniqueMarca(vm.productsByCategory);
                vm.myfiltersTela = returnUniqueTela(vm.productsByCategory);
                console.log('returned', vm.productsByCategory)
            })

        };

    }

})();