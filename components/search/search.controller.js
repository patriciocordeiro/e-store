(function() {
    'use strict';

    angular.module('myApp').controller('SearchResultsCtrl', ['$scope', 'SearchProducts', 'produtosApi', SearchResultsCtrl]);

    function SearchResultsCtrl($scope, SearchProducts, produtosApi) {

        var vm = this;
        //initialization------------------------------------------------------------------------------------------ 
        vm.products = {
            maxShowItem: 20, //itens by page
            orderBy: 'lancamento' //products ordering
        }
        vm.SearchProducts = SearchProducts;
        //get serached data
        var query = {
            tags: vm.SearchProducts.value
        }

        $scope.$watch('vm.SearchProducts.value', function(newValue, oldValue) {
            console.log('hold:', oldValue);
            console.log('new:', newValue);
            //            if (newValue != oldValue) {
            //                newValue = newValue.toLowerCase();
            console.log('ola', newValue)
            //                
            //                var Cap = newValue[0].toUpperCase();
            //                newValue = newValue.replace(newValue[0], Cap)
            //                console.log(Cap)
            query.tags = newValue;

            console.log('search Query', vm.SearchProducts.value);
            produtosApi.getDatabySearch(query, function(data) {
                vm.productsBySearch = data;
                console.log(data);

            });
        });
    }
})();