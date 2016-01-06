(function() {
    'use strict'

    angular.module('myApp').controller('HomeCtrl', ['$scope', 'produtosApi', 'httpService', 'productCategory', HomeCtrl]);

    function HomeCtrl($scope, produtosApi, httpService, productCategory) {
        var vm = this;

        //        $scope.categories = ['Tv', 'Celular', 'Tablet'];

        //        $scope.category = produtosApi.getCategory();
        //        console.log($scope.category)
        //Get products (all categories) from database
        //Sort by ('Lançmento')

        //        $scope.getCategory = produtosApi.greeting;
        //        console.log($scope.getCategory)


        //        $scope.greeting = greeting;
        //        console.log($scope.greeting)


        //
        //        var produtosShowLimit = produtosApi.getLimit();
        //        var category = produtosApi.getSelectedCategory();
        //        console.log(category);



        //    console.log(produtosData)
        //        console.log('showlimit', produtosShowLimit)
        //        var query = {};
        //        query.ShowLimit = produtosShowLimit;
        //        query.orderBy = 'preco';
        //
        //        httpService.save(query, function(produtos) {
        //            produtos.abc = false;
        //            //categoria.$save();
        //            $scope.produtos = produtos;
        //        });
    }
})();