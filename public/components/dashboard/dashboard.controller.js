(function() {

    'use strict';

    angular.module('myApp').controller('Dashboard', ['userService', Dashboard])

    function Dashboard(userService, httpUserService) {
        var vm = this;
        vm.user = userService.userDadosCadastrais
        vm.user.birthDate = new Date(userService.userDadosCadastrais.birthDate)


        vm.updateEndereco = function(dados) {
            console.log('executado', dados)
            dados.username = dados.email
            userService.updateUserData('updateAddress', dados, function(data) {
                console.log(data)

            })

        }

        vm.updateDadosCadastrais = function(dados) {
            console.log('executado', dados)
            dados.username = dados.email
            userService.updateUserData('updateDadosCadastrais', dados, function(data) {
                console.log(data)

            })

        }

        vm.updatePassword = function(dados) {
            console.log('executado', dados)
//            dados.username = dados.email
//            userService.updateUserData('updatePassword', dados, function(data) {
//                console.log(data)
//
//            })

        }

        //
    };

})();