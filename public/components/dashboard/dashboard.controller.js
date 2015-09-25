(function() {

    'use strict';

    angular.module('myApp').controller('Dashboard', ['userService', 'httpUserService', '$rootScope', '$cookies', Dashboard])

    function Dashboard(userService, httpUserService, $rootScope, $cookies) {
        var vm = this;
        vm.user = userService.userDadosCadastrais;
        //vm.user.birthDate = new Date(userService.userDadosCadastrais.birthDate);
        /*
            Função que impede que os dados do usuário sejam perdidos caso a página seja atualiada
        */
        if(vm.user === "usuario"){
            var query = {
                email: $cookies.get('email')
            }
            userService.recoverUserData('recoverUser', query, function(data) {
                vm.user = data.local;
            });
        }


        //vm.user.birthDate = new Date(userService.userDadosCadastrais.birthDate)

        // Definições dos valores para alteração de dados
        vm.nothing = function(){}

        vm.permicaoAlteracaoDados = {
            dadosCadastrais : false,
            enderecoEntrega : false,
            email:false,
            senha: false
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
            });

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