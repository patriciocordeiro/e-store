(function() {

    "use strict";

    angular.module('myApp').controller('produtoDetailCtrl', ['$stateParams', 'produtosApi', produtoDetailCtrl]);

    function produtoDetailCtrl($stateParams, produtosApi) {
        var vm = this;

        vm.productId = $stateParams.id

//        console.log('Id do produto', vm.productId)
var query ={}
query.id  = $stateParams.id
//console.log(query)
        produtosApi.getProductDetails(query, function(response) {
            
            vm.selectedProduct = response[0];
//            console.log(response)
        });
        
    }
}());