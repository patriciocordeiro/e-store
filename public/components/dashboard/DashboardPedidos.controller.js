(function() {

    'use strict';

    angular.module('myApp').controller('DashboardPedidosCtrl', DashboardPedidos);

    function DashboardPedidos(userService) {
        var vm = this;
        vm.title = "Dashboard para pedidos";
        vm.pedidos = userService.userPedidos;

        console.log("Dados Cadastrais: ", vm.pedidos);
    };

})();