(function() {

    'use strict';

    angular.module('myApp').controller('NavbarCtrl', ['$rootScope', 'productCategory', 'SearchProducts', NavbarCtrl]);

    function NavbarCtrl($rootScope, productCategory, SearchProducts) {
        var vm = this;
        vm.user = $rootScope.user;
        console.log('rootscope captured user', $rootScope.user)

        vm.categories = ['tv', 'celular', 'tablet'];
        vm.SelectedCategory = {
            name: 'selecionar categoria' //initialize the category

        };

        vm.productCategory = productCategory;
        console.log('catgreeting', vm.productCategory.category)
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



    };
})();