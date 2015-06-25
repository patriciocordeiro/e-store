(function() {

    "use strict";

    angular.module('myApp').controller('produtoDetailCtrl', ['$rootScope', '$stateParams', 'produtosApi', 'localStorageService','$cookies', produtoDetailCtrl]);

    function produtoDetailCtrl($rootScope, $stateParams, produtosApi, localStorageService, $cookies) {
        var vm = this;

        //Get the product id from the state params
        //The Id is passed via url
        vm.productId = $stateParams.id
        var query = {}
        query.id = $stateParams.id
        //get the product data on the server db
        produtosApi.getProductDetails(query, function(response) {
            vm.selectedProduct = response[0];
        });
        $rootScope.CarrinhoItens = [];
        $rootScope.CarrinhoProdutos = [];

        //function to get compra
        vm.getCompra = function() {
            //            $rootscope.items = push()
            console.log(vm.productId)
            $rootScope.CarrinhoItens.push(vm.productId);
            $rootScope.CarrinhoProdutos.push(vm.selectedProduct)

            console.log('Número de Itens no carrinho', $rootScope.CarrinhoItens.length);
            console.log('Itens no carrinho', $rootScope.CarrinhoProdutos[0]);
            //$cookies.meuCarrinho = $rootScope.CarrinhoProdutos._id;
            //localStorageService.set('carrinho', $rootScope.CarrinhoProdutos[0]._id);

            // recuperar o valor de localStorage (LS)
            // concatenar a medida que o usuário vai inserindo produto no carrinho

            if(localStorageService.get('carrinho') === null){
                localStorageService.set('carrinho', $rootScope.CarrinhoProdutos[0]._id);
            }else{
                localStorageService.set('carrinho', localStorageService.get('carrinho') + "," + $rootScope.CarrinhoProdutos[0]._id);
            }
            console.log("Variavel recupera id = ", localStorageService.get('carrinho'));
        }

    }
}());