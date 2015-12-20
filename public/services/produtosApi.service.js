angular.module('myApp').service('produtosApi', ['httpService',
    function(httpService) {

        console.log('Serviço inicializado')
        this.getSelectedCategory = function(selectedCategoria) {
            console.log(selectedCategoria);
            return selectedCategoria;
        }

        this.getDatabYCatgory = function(query, category, callback) {
            httpService.save({
                //                categoria: category
                categoria: 'tv' //apenas para teste. remover e colodar o acima
                //                tipo_filtro: 'filtro_comum'
            }, query).$promise.then(
                function(data) {
                    data.abc = true;
                    return callback(data);
                },

                function(error) {
                    console.log(error);
                    return (error);
                });
        };

        this.getDataOnLoad = function(query, callback) {
            httpService.save({
                categoria: 'tv'
                //                tipo_filtro: 'filtro_comum'
            }, query).$promise.then(function(data) {
                //                data.abc = true;
                return callback(data);
            }, function(error) {
                console.log(error);
                return (error);
            });

        };
        //Get all products
        this.prdGetAll = function(query, callback) {
            httpService.save({}, query).$promise.then(function(data) {
                return callback(data);
            }, function(error) {
                console.log(error);
                return (error);
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

        };
        this.getProductDetails = function(query, callback) {
            httpService.save({
                categoria: 'tv',
                id: 'id'
            }, query, function(data) {
                return callback(data);
            });
        };
        this.getProductsKart = function(query, callback) {
            httpService.save({
                acao: 'myKart',
                id: 'id'
            }, query, function(data) {
                //console.log(data);
                return callback(data);
            });
        }

        this.getRatingProduct = function(query, callback) {
            httpService.save({
                acao: 'rateProduct',
                id: 'id'
            }, query, function(data) {
                return callback(data);
            });
        }
        this.showRatingProduct = function(query, callback) {
            httpService.save({
                acao: 'showRateProduct',
                id: 'id'
            }, query, function(data) {
                return callback(data);
            });
        }
        this.getLimit = function() {
            return 10;
        };

        this.teste = {

        }
    }
])