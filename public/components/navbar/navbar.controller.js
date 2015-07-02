(function() {

    'use strict';

    angular.module('myApp').controller('NavbarCtrl', ['$rootScope', '$scope', 'productCategory', 'SearchProducts', '$cookies', 'localStorageService', NavbarCtrl]);

    function NavbarCtrl($rootScope, $scope, productCategory, SearchProducts, $cookies, localStorageService) {
        var vm = this;
        vm.user = $rootScope.user;
        console.log('rootscope captured user', $rootScope.user)



        vm.categories = ['tv', 'celular', 'tablet'];
        vm.SelectedCategory = {
            name: 'selecionar categoria' //initialize the category

        };

        // Obtendo valor a partir do cookie
        // Utiliza-se esse tipo de estrutura para evitar que no local de usuário não apareça nada
        console.log('Usuario armazenado no cookie', $cookies.get('usuario'));
        /*if($cookies.get('usuario') === undefined){
            $scope.usuarioLogado = "visitante";
        }else{
            $scope.usuarioLogado = $cookies.get('usuario');
        }*/

        $scope.productCategory = productCategory;
        //        console.log('catgreeting', $scope.productCategory.category)
        //        var categoria;
        vm.getSelectedCategory = function(selectedCategory) {
            productCategory.category = selectedCategory;
            console.log('mudou para', productCategory.category)
        };

        vm.SearchProducts = SearchProducts;
        vm.getSearchValue = function(searchValue) {

            SearchProducts.value = searchValue;
            console.log(SearchProducts.value)
        };

        // conta o número de produtos que foram adicionados no carrinho de compra
        // Utiliza-se o watch para ele sempre ficar verificando a variável e atualizá-la automaticamente na página
        console.log("Meu localStorageService: ", localStorageService.get('carrinho'))
        $rootScope.$watch(
            function() {
                if (!localStorageService.get('carrinho')) {
                    vm.numeroProdutosCarrinho = 0;
                } else {
                    console.log(localStorageService.get('carrinho').split(','))
//                    vm.numeroProdutosCarrinho = localStorageService.get('carrinho').split(',').length;
                    vm.numeroProdutosCarrinho = localStorageService.get('carrinho').split(',').length;
//                    console.log()
                }
            }
        );

        vm.selected = undefined;
        vm.states = {
            'marca': [{
                'samsung': ['samsung tv', 'samsung celular', 'apple celular', 'nokia celular']
            }]
        }


    };
})();