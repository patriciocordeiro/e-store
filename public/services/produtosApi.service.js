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
        }

        this.getDatabYCatgory = function(query, category, callback) {
            httpService.save({
                categoria: category
                //                tipo_filtro: 'filtro_comum'
            }, query).$promise.then(function(data) {
                data.abc = true;
                return callback(data);
            });

        };

        this.getDataOnLoad = function(query, callback) {
            httpService.save({
                categoria: 'tv'
                //                tipo_filtro: 'filtro_comum'
            }, query).$promise.then(function(data) {
                data.abc = true;
                return callback(data);
            });

        };


        this.getDataByFilter = function(query, tipoFiltro, category, callback) {
            httpService.save({
                categoria: category,
                tipo_filtro: tipoFiltro
            }, query, function(data) {
                data.abc = true;
                return callback(data);
            });

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

        this.getProductDetails = function(query, callback) {
            httpService.save({
                categoria: 'tv',
                id: 'id'
            }, query, function(data) {
                return callback(data);
            });
        };

        this.getProductsKart = function(query, callback){
            httpService.save({
                acao: 'myKart',
                id: 'id'
            }, query, function(data) {
                //console.log(data);
                return callback(data);
            });
        }

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