(function() {
    'use strict';

    angular.module('myApp').controller('SignupCtrl', ['authentication', SignupCtrl]);

    function SignupCtrl(authentication) {
        var vm = this;
        vm.newUser = {
            //            fullName: '',
            username: '',
            sexo: 'Selecione',
            //            cpf: '',
            //            birthDate: '',
            //            telefone: '',
            //            celular: '',
            email: '',
            password: '',
            //            retypePassword: '',
            tipoEndereco: 'Selecione',
            //            cep: '',
            //            endereco: '',
            //            numero: '',
            //            referencia: '',
            //            bairro: '',
            //            cidade: '',
            //            estado: '',
        };

        vm.createUser = function(newUser) {
            console.log('Signup está funcionando', newUser)
            if (newUser) {
                newUser.username = newUser.email
                console.log(newUser)
                  console.log(typeof newUser.birthDate);
                authentication.signup({
                    //                    username: newUser.email,
                    //                    fullName: newUser.fullName,
                    //                    email: newUser.email,
                    //                    password: newUser.password
                    //                    //                    vm.newUser:
                  
                    fullName: newUser.fullName,
                    username: newUser.email,
                    sexo: newUser.sexo,
                    cpf: newUser.cpf,
                    birthDate: newUser.birthDate,
                    telefone: newUser.telefone,
                    celular: newUser.celular,
                    email: newUser.email,
                    password: newUser.password,
//                    retypePassword: newUser.retypePassword,
                    tipoEndereco: newUser.tipoEndereco,
                    cep: newUser.cep,
                    endereco: newUser.endereco,
                    complemento: newUser.complemento,
                    numero: newUser.numero,
                    referencia: newUser.referencia,
                    bairro: newUser.bairro,
                    cidade: newUser.cidade,
                    estado: newUser.estado,

                }, function(newUser) {

                    console.log('usuário recebido', newUser) //retorno do servidor
                });

            };
        };
    };

})();