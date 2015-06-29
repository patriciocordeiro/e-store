(function() {

    "use strict";

    angular.module('myApp').controller('MinhaCestaCtrl', ['$rootScope', '$stateParams', 'produtosApi', 'localStorageService', '$cookies', '$state', MinhaCestaCtrl]);

    function MinhaCestaCtrl($rootScope, $stateParams, produtosApi, localStorageService, $cookies, $state) {
        var vm = this;
        vm.title = "Minha cesta"; // Tituolo da página
        vm.meuCarrinho = []; //Meu carrinho de compras
        var precoUnitario = []; //preco unitario de cada item no carrinho
        vm.quantidade = []; // Quantidade de cada item no carrinho
        vm.precoTotal = []; // Preco total de cada item no carrinho (preco*quantidade)
        vm.precoSubTotal = 0; //subtotal de todos os itens no carrinho
        var query = {};
        var idsProdutos = [];


        console.log("Carrinho de produtos: ", $rootScope.CarrinhoProdutos);
        console.log("Foi posto no carrinho id: ", localStorageService.get('carrinho'));

        //query.id = localStorageService.get('carrinho');
        // recuperar ids e armazenar em vetor
        // fazer loop de requisição no banco
        // fazer push no meuCarrinho
        idsProdutos = (localStorageService.get('carrinho') || '').split(',');

        console.log("Id split: ", idsProdutos);
        query.ids = idsProdutos;

        /*for(var i = 0; i < idsProdutos.length; i++){
        	//console.log(idsProdutos[i]);
        	query.id = idsProdutos[i];
        	console.log("Minha query ", query.id);
        	produtosApi.getProductDetails(query, function(response) {
	        	console.log(response);
	            vm.meuCarrinho.push(response[0]);
	        });
        }*/

        produtosApi.getProductsKart(query, function(response) {
            //console.log(response);
            for (var i = 0; i < response.length; i++) {
                vm.meuCarrinho.push(response[i]);
                //inicialize todas as quantidades com 1
                vm.quantidade.push(1)
                //inicialize o preco total com o preco unitario
                vm.precoTotal.push(vm.meuCarrinho[i].preco);
                //insira o campo preco_total no meuCarrinho (usamos o _.set do lodash)
                _.set(vm.meuCarrinho[i], "preco_total", vm.precoTotal[i])
                precoUnitario.push(Number(vm.precoTotal[i]));
                //inicialize o subtotal de precos com a soma dos precos unitarios de cada item o carrinho 
                vm.precoSubTotal += vm.meuCarrinho[i].preco;
            }
            console.log(vm.precoSubTotal)
        });

        vm.finalizarCompra = function() {
            console.log("Finalizando compra");
            localStorageService.remove('carrinho');
            $state.go("app.home");
        }

        //console.log('Meu carrinho de produtos: ', vm.meuCarrinho);

        /*produtosApi.getProductDetails(query, function(response) {
        	console.log(response[0]);
            vm.meuCarrinho.push(response[0]);
        });*/
        //            console.log(vm.quantidade)
        //        vm.quantidade = [1, 2, 3, 4, ];
        //-----------------------------------------------------
        //Função para obter a quantidade de cada produto
        //-------------------------------------------------------
        vm.getQuantidade = function(index, value) {
            //soma a quantidade com 1 (botao +) ou -1 (botao -)
            vm.quantidade[index] = vm.quantidade[index] + value;
            //O valor preco_total do carrinho recebe um novo valor
            vm.meuCarrinho[index].preco_total = precoUnitario[index] * vm.quantidade[index];
            //soma o valor de todos os produtos no carrinho
            for (var i = 0; i < precoUnitario.length; i++) {
                vm.precoSubTotal += vm.meuCarrinho[i].preco_total
            }
        };
        //------------------------------------------------------------------
    }
}());