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
        //variavel para controlar o que é exibido na página minha cesta
        // Se não existir nenhum item no carrinho esta variável será "false"
        // e será exibida na página "Sua cesta está vazia"
        var idsafterRemove = false;


        console.log("Carrinho de produtos: ", $rootScope.CarrinhoProdutos);
        console.log("Foi posto no carrinho id: ", typeof localStorageService.get('carrinho'));

        //query.id = localStorageService.get('carrinho');
        // recuperar ids e armazenar em vetor
        // fazer loop de requisição no banco
        // fazer push no meuCarrinho
        if (!localStorageService.get('carrinho')) {
            idsProdutos = null;
            //A cesta está vazia
            vm.basketEmpty = true
            console.log('Nenhum produto')
        } else {
            idsProdutos = (localStorageService.get('carrinho') || '').split(',');
            //        idsProdutos = (localStorageService.get('carrinho') || '');
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
            // Existe item na cesta
            vm.basketEmpty = false;
            query.ids = idsProdutos;
        }

        /*for(var i = 0; i < idsProdutos.length; i++){
        	//console.log(idsProdutos[i]);
        	query.id = idsProdutos[i];
        	console.log("Minha query ", query.id);
        	produtosApi.getProductDetails(query, function(response) {
	        	console.log(response);
	            vm.meuCarrinho.push(response[0]);
	        });
        }*/


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
        var precoSubTotalTemp = 0; // varialvel temporario para guardar o precoSubTotal
        vm.getQuantidade = function(index, value) {
            precoSubTotalTemp = 0;
            //previna valores de quantidade menores  que zero
//            if (vm.quantidade[index] == 0) {
//                vm.quantidade[index] = vm.quantidade[index];
//            } else {
                //soma a quantidade com 1 (botao +) ou -1 (botao -)
                vm.quantidade[index] = vm.quantidade[index] + value;
                console.log(vm.quantidade[0]);
                //O valor preco_total do carrinho recebe um novo valor
                vm.meuCarrinho[index].preco_total = precoUnitario[index] * vm.quantidade[index];
                //soma o valor de todos os produtos no carrinho
                for (var i = 0; i < precoUnitario.length; i++) {
                    precoSubTotalTemp += vm.meuCarrinho[i].preco_total;
                    vm.precoSubTotal = precoSubTotalTemp;
                };

                if(vm.quantidade[0] === 0){
                    vm.removeItendaCesta(index);
                }
//            };
        };
        //------------------------------------------------------------------
        //------------------------------------------------------------------

        //Função para remover item da cesta
        //------------------------------------------------------------------

        vm.removeItendaCesta = function(index) {
            precoSubTotalTemp = 0;
            //remove item da cesta
            //o argumento '1' no splice, remove o item na posicao index
            vm.meuCarrinho.splice(index, 1);
            for (var i = 0; i < vm.meuCarrinho.length; i++) {
                console.log('TAMANHO', precoSubTotalTemp)
                precoSubTotalTemp += vm.meuCarrinho[i].preco_total;
                vm.precoSubTotal = precoSubTotalTemp;
            }
            //remova o ID do produto
            idsProdutos.splice(index, 1)
            //cheque se a cesta está vazia
            if (!idsProdutos[0]) {
                console.log('Nenhum produto na cesta')
                //Remova o carrinho do localStorage
                localStorageService.remove('carrinho');
                //Existe item na cesta
                vm.basketEmpty = true;
            } else {
                //atualize os cookies
                localStorageService.set('carrinho', idsProdutos.toString())
            }
        }
    }
}());