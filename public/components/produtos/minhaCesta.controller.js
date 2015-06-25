(function() {

    "use strict";

    angular.module('myApp').controller('minhaCestaCtrl', ['$rootScope', '$stateParams', 'produtosApi', 'localStorageService', '$cookies', minhaCestaCtrl]);

    function minhaCestaCtrl($rootScope, $stateParams, produtosApi, localStorageService, $cookies) {
        var vm = this;
        vm.meuCarrinho = [];
        vm.title = "Minha cesta de compras";

        console.log("Carrinho de produtos: ", $rootScope.CarrinhoProdutos);
        console.log("Foi posto no carrinho id: ", localStorageService.get('carrinho'));

        var query = {}
        query.id = localStorageService.get('carrinho');

        produtosApi.getProductDetails(query, function(response) {
        	console.log(response[0]);
            vm.meuCarrinho.push(response[0]);
        });
    }
}());