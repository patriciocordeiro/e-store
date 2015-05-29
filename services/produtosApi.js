myApp.service('produtosApi', ['httpService',
    function(httpService) {
        //    get products (all categories) from database

        //        $scope.produtos = function(selectedCategoria) {
        //            console.log('executado')
        //            console.log(selectedCategoria)
        //            $scope.selectedCategoria = selectedCategoria;
        //            console.log($scope.selectedCategoria)

//        var produtos = {};

        this.getSelectedCategory = function(selectedCategoria) {
            console.log(selectedCategoria);

            return selectedCategoria;
            
//            {
//                console.log('executado');
//                console.log(selectedCategoria);
//            }
        }

        this.getDatabYCatgory = function(query) {

            return httpService.save({
                categoria: 'tv',
                tipo_filtro: 'filtro_comum'
            }, query, function() {
                console.log("O filtro eh: ", query);
            });
            //            return categoryData;

        };


        this.getLimit = function() {
            return 10;
        };

        
        this.greeting = 'Hello Default'

//        return produtos;

        //        
        //            function getProductsShowLimit() {
        //
        //                produtosLimit: 10
        //                return produtosLimit;
        //
        //            };
        //            return {
        //                getProductsShowLimit: getProductsShowLimit()
        //            };
        //        };

        //
        //        function
        //        httpService.query({
        //            categoria: $scope.selectedCategoria
        //        }, function(produtos) {
        //            produtos.abc = false;
        //            //categoria.$save();
        //            $scope.produtos = produtos;
        //        });
    }
    // 
    //            return Apiprodutos;
])