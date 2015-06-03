myApp.controller('searchResultsCtrl', ['$scope', 'searchProducts', 'produtosApi',
    function($scope, searchProducts, produtosApi) {


        //initialization------------------------------------------------------------------------------------------ 
        $scope.products = {
            maxShowItem: 20, //itens by page
            orderBy: 'lancamento' //products ordering

        }
        $scope.searchProducts = searchProducts;

        //get serached data
        var query = {
            tags: $scope.searchProducts.value
        }

        $scope.$watch('searchProducts.value', function(newValue, oldValue) {
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

                console.log('search Query', $scope.searchProducts.value);
                produtosApi.getDatabySearch(query, function(data) {
                    $scope.productsBySearch = data;
                    console.log(data);

                });
//            };
        });
    }
])