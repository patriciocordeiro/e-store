(function() {

    'use strict';

    angular.module('myApp').controller('Dashboard', ['userService', Dashboard])

    function Dashboard(userService, httpUserService) {
        var vm = this;
        vm.user = userService.userDadosCadastrais
        vm.user.birthDate = new Date(userService.userDadosCadastrais.birthDate)

        // Definições dos valores para alteração de dados
        vm.permicaoAlteracaoDados = {
            dadosCadastrais : true,
            enderecoEntrega : true
        }

        vm.updateEndereco = function(dados) {
            console.log('executado', dados)
            dados.username = dados.email
            userService.updateUserData('updateAddress', dados, function(data) {
                console.log(data)

            })

        }

        /*
            Update de dados cadastrais
            A ideia eh após o usuário ter habilitado a função de alterar dados
            O usuário pode alterar algum dado do cadastro e clicar no botão para os novos
            dados sejam atualizados no banco
        */
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