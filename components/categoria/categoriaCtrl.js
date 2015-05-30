myApp.controller('categoriaCtrl', ['$scope', 'httpService', 'produtosApi', 'productCategory',
    function($scope, httpService, produtosApi, productCategory) {


        //itens by page
        $scope.numProductsItens = {
            limit: 20
        }

        $scope.orderingProductsBy = {
            order: 'lancamento'
        }
        //Get the selected category
        $scope.productCategory = productCategory;
        var query = {
            categoria: $scope.productCategory.category,
            limit: $scope.numProductsItens.limit
        }

        $scope.$watch("productCategory.category", function(newValue, oldValue) {

            console.log('hold:', oldValue);
            console.log('new:', newValue);
            if (newValue != oldValue) {
                query.categoria = newValue

                $scope.productsByCategory = produtosApi.getDatabYCatgory(query);
                console.log('categoria controller greeting', query)
            }

        });


        $scope.$watch('numProductsItens.limit', function(newValue, oldValue) {

            console.log('hold:', oldValue);
            console.log('new:', newValue);
            if (newValue != oldValue) {
                query.limit = newValue
                $scope.productsByCategory = produtosApi.getDatabYCatgory(query);
                console.log('categoria controller greeting', query)
            }

        });

        $scope.$watch('orderingProductsBy.order', function(newValue, oldValue) {

            console.log('hold:', oldValue);
            console.log('new:', newValue);
            if (newValue != oldValue) {
                query.order = newValue
                $scope.productsByCategory = produtosApi.getDatabYCatgory(query);
                console.log('categoria controller greeting', query)
            }

        });


        //Watch the limit value
        $scope.productsByCategory = produtosApi.getDatabYCatgory(query);
        console.log($scope.productsByCategory);
        console.log('categoria controller greeting', query)

    }




])