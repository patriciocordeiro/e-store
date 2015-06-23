angular.module('myApp').controller('mainController', ['$scope', 'httpService',
    function($scope, httpService) {
        $scope.selCategoria = {
            name: 'selecionar categoria' //initialize the category
        }
        //         $scope.categoria ="";
        //get products by category
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

        
       
        $scope.getCategoria = function(selectedCategoria) {
            console.log('executado')
            console.log(selectedCategoria)
            $scope.selectedCategoria = selectedCategoria;
            console.log($scope.selectedCategoria)
            httpService.get({
                categoria: $scope.selectedCategoria
            }, function(produtos) {
                //                console.log('hello')
                produtos.abc = false;
                //categoria.$save();
                $scope.produtos = produtos;
                //                console.log($scope.produtos.tamanho_tela);
                $scope.myfiltersMarca = returnUniqueMarca($scope.produtos);
                $scope.myfiltersTela = returnUniqueTela($scope.produtos);
                console.log('filtros', $scope.myfilters)
            });
        } 
        
          $scope.listaGategoria = 
        //filtro comum
        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        $scope.filtro_value = {
            marca: '', //initialize the filter
            preco: '', //initialize the filter
            tamanho_tela: '' //initialize the filter
        };

        var acumFilters = [];
        var filtroComumQuery;
        var filtroComumQuery;
        $scope.filtroComum = function(toFilter) {
            $scope.toFilter = toFilter.split(",");
            console.log($scope.toFilter);

            //Check if the attribute value of the object to filter should be a number (not string)     
            if ($scope.toFilter[0] == 'num') { //if the first array field is num then (check this in index.html )
                $scope.toFilter[2] = Number($scope.toFilter[2]); // convert the string to number
            }

            if ($scope.toFilter[0] == 'null') {
                delete filtroComumQuery[$scope.toFilter[1]];
            } else {

                acumFilters.push($scope.toFilter);
                //            console.log(acumFilters[0][2])
                //            var teste ={};
                //            console.log('acumulado', teste)
                //Construct the query object
                var queryValorFiltro = {};
                //            queryValorFiltro[$scope.toFilter[1]] = $scope.toFilter[2]; //property field
                //            
                for (var i = 0; i < acumFilters.length; i++) {
                    queryValorFiltro[acumFilters[i][1]] = acumFilters[i][2];
                }

                var queryCategoria = {
                    categoria: $scope.selectedCategoria,
                }
                //            join the two queries
                filtroComumQuery = angular.extend({}, queryCategoria, queryValorFiltro);
                //            console.log('Meu query', filtroComumQuery);
                //Uncomment this to see the object
                //console.log(filtroComumQuery)
                //            console.log('Categoria selecionada:', $scope.selectedCategoria)
            }

            //            console.log('Deletado', deleted);
            $scope.produtos = httpService.save({
                categoria: $scope.selectedCategoria,
                tipo_filtro: 'filtro_comum'
            }, filtroComumQuery, function() {
                console.log('o filtro eh', filtroComumQuery);
            });
            $scope.myfilters = $scope.produtos;
        }
        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        //create a srting array with list of price ranges for filtroFaixa
        // Foram criados mais alguns intervalos para cobrir a maior parte dos produtos
        // Isso pode ser otimizado pegando o maior valor e subtraindo pelo menor e dividindo pelo numero de faixas
        // Assim pode ter faixas mais precisas
        $scope.faixaPreco = ['0-1000', '1000-1500', '1500-2000', '2000-3000', '3000-4000', '4000-5000', '6000-8000', '8000-11000'];
        $scope.filtro_faixa = function(faixa) {
            faixa = faixa.split(",");
            console.log(faixa);
            // Como os valor vêm dividos por traço, basta fazer um split considerando o traço
            var valoresFaixa = faixa[2].split("-");
            console.log(valoresFaixa);
            // A query é construída a partir da categoria selecionada e da faixa de valores
            var query = {
                "categoria": $scope.selectedCategoria,
                "menorPreco": Number(valoresFaixa[0]),
                "maiorPreco": Number(valoresFaixa[1])
            };
            //console.log(query);

            $scope.produtos = httpService.save({
                categoria: $scope.selectedCategoria,
                tipo_filtro: 'filtro_faixa'
            }, query, function() {
                console.log("O filtro eh: ", query);
            });
        };

    }
])