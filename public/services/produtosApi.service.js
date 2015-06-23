angular.module('myApp').service('produtosApi', ['httpService',
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

        this.getDatabYCatgory = function(query, category, callback) {

            httpService.save({
                categoria: category,
                tipo_filtro: 'filtro_comum'
            }, query, function(data) {
                data.abc = true;
//                console.log(data);
                return callback(data);
            });

            //            return categoryData;

        };


        this.getDatabySearch = function(query, callback) {

            httpService.save({
               acao: 'search'
            }, query, function(data) {
                data.abc = true;
                console.log(data);
                return callback(data);
            });

            //            return categoryData;

        };
        this.getLimit = function() {
            return 10;
        };


      

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