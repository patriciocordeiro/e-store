(function() {

    "use strict";

    angular.module('myApp').controller('MinhaCestaCtrl', ['$rootScope', '$stateParams', 'produtosApi', 'localStorageService', '$cookies', '$state', MinhaCestaCtrl]);

    function MinhaCestaCtrl($rootScope, $stateParams, produtosApi, localStorageService, $cookies, $state) {
        var vm = this;
        vm.meuCarrinho = [];
        vm.title = "Minha cesta de compras";

        console.log("Carrinho de produtos: ", $rootScope.CarrinhoProdutos);
        console.log("Foi posto no carrinho id: ", localStorageService.get('carrinho'));

        var query = {}
        //query.id = localStorageService.get('carrinho');


        // recuperar ids e armazenar em vetor
        // fazer loop de requisição no banco
        // fazer push no meuCarrinho
        var idsProdutos = (localStorageService.get('carrinho') || '').split(',');

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

        produtosApi.getProductsKart(query, function(response){
        	//console.log(response);
        	for(var i = 0; i < response.length; i++){
        		vm.meuCarrinho.push(response[i]);
        	}
        });

        vm.finalizarCompra = function(){
            console.log("Finalizando compra");
            localStorageService.remove('carrinho');
            $state.go("app.home");
        }

        //console.log('Meu carrinho de produtos: ', vm.meuCarrinho);

        /*produtosApi.getProductDetails(query, function(response) {
        	console.log(response[0]);
            vm.meuCarrinho.push(response[0]);
        });*/
    }
}());