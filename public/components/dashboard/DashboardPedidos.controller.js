(function() {

    'use strict';

    angular.module('myApp').controller('DashboardPedidosCtrl', DashboardPedidos);

    function DashboardPedidos(userService, produtosApi) {
        var vm = this;
        vm.title = "Dashboard para pedidos";
        vm.pedidos = userService.userPedidos;
        var minhasCompras = [];

        console.log("Dados Cadastrais: ", vm.pedidos);

        vm.findProducts = function(compras){
            console.log("Compras feitas: ", compras);

            var query = {};
            query = {
                ids:[]
            };

            var tamanho = compras.length;

            for(var i = 0; i < tamanho; i++){
                query.ids.push(compras[i].id);
            }

            console.log("Minha query: ", query);

            produtosApi.getProductsKart(query, function(response){
                //minhasCompras = response;

                for(var i = 0; i < tamanho; i++){
                    minhasCompras[i] = response[i];
                    minhasCompras[i].quantidade = compras[i].quantidade;
                    console.log(i);
                }

                console.log("Os produtos encontrados: ", minhasCompras);

                //minhasCompras = response;

            });

            return minhasCompras;
        }
    };

})();