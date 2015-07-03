(function() {

    "use strict";

    angular.module('myApp').controller('produtoDetailCtrl', ['$rootScope', '$stateParams', 'produtosApi', 'localStorageService', '$cookies', produtoDetailCtrl]);

    function produtoDetailCtrl($rootScope, $stateParams, produtosApi, localStorageService, $cookies) {
        var vm = this;

        //Get the product id from the state params
        //The Id is passed via url
        vm.productId = $stateParams.id
        vm.idExists = false; //Exibe uma mensagem quando o produto já existe no carrinho
        var query = {}
        $rootScope.CarrinhoItens = [];
        $rootScope.CarrinhoProdutos = [];

        query.id = $stateParams.id
        //get the product data on the server db
        produtosApi.getProductDetails(query, function(response) {
            vm.selectedProduct = response[0];
        });

        //------------------------------------------------------------------------
        //Leitura de cookies
        //------------------------------------------------------------------------
        //verifique se os cookies com os Ids existem 
        if (localStorageService.get('carrinho')) {
            //Armazene os ids 
            $rootScope.CarrinhoItens = localStorageService.get('carrinho').split(',');
            console.log('Carinho no detalhe', $rootScope.CarrinhoItens)
        }
        //------------------------------------------------------------------------
        //------------------------------------------------------------------------

        //------------------------------------------------------------------------
        //funcçao para obter a compra
        //------------------------------------------------------------------------
        vm.getCompra = function() {
            //verifique se o ID já existe (Se o produto já está no carrinho) 
            vm.idExists = _.includes($rootScope.CarrinhoItens, vm.productId);
            if (vm.idExists == false) {
                //Se o id não existe:
                //Adicicione o novo ID no array de itens
                $rootScope.CarrinhoItens.push(vm.productId);
                $rootScope.CarrinhoProdutos.push(vm.selectedProduct);
                //verifique se os cookies com os Ids existem 
                if (!localStorageService.get('carrinho')) {
                    //Não existem: Adicione o primeiro ID
                    localStorageService.set('carrinho', $rootScope.CarrinhoProdutos[0]._id);
                } else {
                    //Existe: Adicione mais IDs aos existentes
                    localStorageService.set('carrinho', localStorageService.get('carrinho') + "," + $rootScope.CarrinhoProdutos[0]._id);
                }
                console.log("Variavel recupera id = ", localStorageService.get('carrinho'));
            } else {
                console.log('Produto já se encontra no carrinho')
            }
            
            //            console.log('Número de Itens no carrinho', $rootScope.CarrinhoItens.length);
            //            console.log('Itens no carrinho', $rootScope.CarrinhoProdutos[0]);
            //$cookies.meuCarrinho = $rootScope.CarrinhoProdutos._id;
            //localStorageService.set('carrinho', $rootScope.CarrinhoProdutos[0]._id);

            // recuperar o valor de localStorage (LS)
            // concatenar a medida que o usuário vai inserindo produto no carrinho

            //            if (localStorageService.get('carrinho') === null) {
            //                localStorageService.set('carrinho', $rootScope.CarrinhoProdutos[0]._id);
            //            } else {
            //                localStorageService.set('carrinho', localStorageService.get('carrinho') + "," + $rootScope.CarrinhoProdutos[0]._id);
            //            }
            //            console.log("Variavel recupera id = ", localStorageService.get('carrinho'));
        }

    // Função para armazenamento local da informação do id e nome do produto
    vm.armazenarInformacao = function(id, nome){
        //console.log("EU RECEBI ", id);
        //console.log("EU RECEBI ", nome);
        localStorageService.set('idProdutoAvaliado', id);
        localStorageService.set('nomeProdutoAvaliado', nome);
    }

    }
}());