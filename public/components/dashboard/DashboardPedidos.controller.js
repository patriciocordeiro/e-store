(function() {

    'use strict';

    angular.module('myApp').controller('DashboardPedidosCtrl', DashboardPedidos);

    function DashboardPedidos(userService, produtosApi, $cookies) {
        var vm = this;
        vm.title = "Dashboard para pedidos";
        vm.pedidos = userService.userPedidos;

        console.log("Dados Cadastrais: ", vm.pedidos);

        if(vm.pedidos === ""){
            console.log("EXECUTEI");
            var query = {
                email: $cookies.get('email')
            }
            userService.recoverUserData('recoverUser', query, function(data) {
                //vm.user = data.local;
                vm.pedidos = data.pedidos;
                getUserServer();
            });
        }else{
            getUserServer();
        }

        function getUserServer(){
            var nPedidos = vm.pedidos.length; // variável que captura o numero de pedidos feito pelo usuário
            var contador = 0;
            vm.minhasCompras = {};
            var quantidades = [];

            var query = {};
            query = {
                ids: []
            };

            // for para percorrer o número de compras feitas pelo usuário
            for(var i = 0; i < nPedidos; i++){

                var nCompras = vm.pedidos[i].compras.length;

                for(var j = 0; j < nCompras; j++){
                    query.ids.push(vm.pedidos[i].compras[j].id);
                    quantidades.push(vm.pedidos[i].compras[j].quantidade);
                }
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
                        response[contador].quantidade = quantidades[contador];
                        pedido.produtos.push(response[contador]);
                        contador++;
                    }

                    todosPedidos.push(pedido);
                }
                console.log("MEU PEDIDO FINAL: ", todosPedidos);

                vm.minhasCompras = todosPedidos;
            });
        }

    };

})();