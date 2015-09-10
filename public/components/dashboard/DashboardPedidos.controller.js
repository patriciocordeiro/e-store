(function() {

    'use strict';

    angular.module('myApp').controller('DashboardPedidosCtrl', DashboardPedidos);

    function DashboardPedidos(userService, produtosApi) {
        var vm = this;
        vm.title = "Dashboard para pedidos";
        vm.pedidos = userService.userPedidos;

        console.log("Dados Cadastrais: ", vm.pedidos);

        // vm.findProducts = function(compras){
        //     console.log("Compras feitas: ", compras);

        //     var query = {};
        //     query = {
        //         ids:[]
        //     };

        //     var tamanho = compras.length;

        //     for(var i = 0; i < tamanho; i++){
        //         query.ids.push(compras[i].id);
        //     }

        //     console.log("Minha query: ", query);

        //     produtosApi.getProductsKart(query, function(response){
        //         //minhasCompras = response;

        //         for(var i = 0; i < tamanho; i++){
        //             minhasCompras[i] = response[i];
        //             minhasCompras[i].quantidade = compras[i].quantidade;
        //             console.log(i);
        //         }

        //         console.log("Os produtos encontrados: ", minhasCompras);

        //         //minhasCompras = response;

        //     });

        //     return minhasCompras;
        // }

         /*  var query = {};
            query = {
                ids:[]
            };
 var tamanho = vm.pedidos[1].compras.length;
 for(var i = 0; i < tamanho; i++){
                query.ids.push(vm.pedidos[1].compras[i].id);
            }
        console.log("id dos pedidos",  query.ids);

             produtosApi.getProductsKart(query, function(response){
        console.log("minha resposta", response);
        vm.minhasCompras = response;
     });*/



        var nPedidos = vm.pedidos.length; // variável que captura o numero de pedidos feito pelo usuário
        var contador = 0;
        vm.minhasCompras = {};

        var query = {};
        query = {
            ids: []
        };

        // for para percorrer o número de compras feitas pelo usuário
        for(var i = 0; i < nPedidos; i++){

            // montar a query de pedido para inserir em minhas compras
            //var meuPedido = {};

            /*meuPedido = {
                data: vm.pedidos[i].data
            }*/

            // percorre o número de compras de um pedido
            var nCompras = vm.pedidos[i].compras.length;

            for(var j = 0; j < nCompras; j++){
                query.ids.push(vm.pedidos[i].compras[j].id);
            }

            /*produtosApi.getProductsKart(query, function(response){
                meuPedido.id = contador;
                meuPedido.compras = response;
                vm.minhasCompras.push(meuPedido);

                console.log("MEU PEDIDO FEITO: ", vm.minhasCompras);
            });*/
        }

        produtosApi.getProductsKart(query, function(response){
            //vm.minhasCompras = response;
            var todosPedidos = [];

            //console.log("MEU PEDIDO FEITO: ", vm.minhasCompras);
            var contador = 0;
            for(var i = 0; i < nPedidos; i++){
                // variavel para tamanho do numero de produtos
                var pedido = {};
                var nProdutos = vm.pedidos[i].compras.length;

                // o pedido deve primeiramente receber a data que identifica cada pedido
                pedido.data = vm.pedidos[i].data;
                pedido.id = vm.pedidos[i]._id;
                pedido.produtos = [];

                for(var j = 0; j < nProdutos; j++){
                    pedido.produtos.push(response[contador]);
                    contador++;
                }

                todosPedidos.push(pedido);
            }
            console.log("MEU PEDIDO FINAL: ", todosPedidos);

            vm.minhasCompras = todosPedidos;
        });
    };






})();