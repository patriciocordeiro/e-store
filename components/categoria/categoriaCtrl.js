myApp.controller('categoriaCtrl', ['$scope', 'httpService', 'produtosApi', 'productCategory',
    function($scope, httpService, produtosApi, productCategory) {

        
        //itens by page
        $scope.numProductsItens ={
            limit: 20
        }
            
      
        //Get the selected category
        $scope.productCategory = productCategory;
        var tosend =[];
        var query = {

            categoria: $scope.productCategory.category,
//            limit: $scope.numProductsItens.limit
        }

        $scope.$watch("productCategory.category", function(newValue, oldValue) {

            console.log('hold:', oldValue);
            console.log('new:', newValue);
            if (newValue != oldValue) {
                query.categoria= newValue
                $scope.productsByCategory = produtosApi.getDatabYCatgory(query);
                console.log('categoria controller greeting', tosend)
            }

        });

        $scope.productsByCategory = produtosApi.getDatabYCatgory(query);
        console.log($scope.productsByCategory);
        console.log('categoria controller greeting', query)

    }
                                   
                                   

                                   
])