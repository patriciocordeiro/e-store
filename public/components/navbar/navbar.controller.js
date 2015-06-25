(function() {

    'use strict';

    angular.module('myApp').controller('NavbarCtrl', ['$rootScope','$scope', 'productCategory', 'SearchProducts', '$cookies', 'localStorageService', NavbarCtrl]);

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
        console.log('catgreeting', $scope.productCategory.category)
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
        console.log("Meu localStorageService: ", localStorageService.get('carrinho'))
        if(localStorageService.get('carrinho') === null){
            vm.numeroProdutosCarrinho = 0;
        }else{
            vm.numeroProdutosCarrinho = localStorageService.get('carrinho').split(',').length;
        }

   vm.selected = undefined;
        vm.states = {'marca':[{'samsung':['samsung tv', 'samsung celular', 'apple celular', 'nokia celular']}]}
            
            
        
//          vm.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
        
    };
})();