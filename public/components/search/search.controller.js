(function() {
    'use strict';

    angular.module('myApp').controller('SearchResultsCtrl', ['$scope', 'productSrvc', 'SearchProducts', 'produtosApi', SearchResultsCtrl]);

    function SearchResultsCtrl($scope, productSrvc, SearchProducts, produtosApi) {

        var vm = this;
        //initialization-----------------------------------------------------------------
				vm.searchResultsData = productSrvc.prd.search.data;

		
		console.log('resultado da busca', productSrvc.prd.search.data);
		
        vm.products = {
            maxShowItem: 20, //itens by page
            orderBy: 'lancamento' //products ordering
        }
        vm.SearchProducts = productSrvc.prd.search;
        //get serached data
        var query = {
            tags: vm.SearchProducts.value
        }

		
//		var defer = q.defer()
		
        $scope.$watch(' vm.SearchProducts.data', function(newValue, oldValue) {
            console.log('hold:', oldValue);
            console.log('new:', newValue);
			vm.searchResultsData =productSrvc.prd.search.data;
            console.log('ola', newValue)
        });
    }
})();