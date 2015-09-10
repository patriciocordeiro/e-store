'use strict'
angular.module('myApp').service('userService', function(httpUserService) {

    this.userDadosCadastrais = 'usuario';
    this.userPedidos = '';

    this.updateUserData = function(acao, query, callback) {
        httpUserService.save({
            acao: acao
            //                tipo_filtro: 'filtro_comum'
        }, query).$promise.then(
            function(data) {
                data.abc = true;
                return callback(data);
            },

            function(error) {
                console.log(error);
                return callback(error);
            });
    };


});