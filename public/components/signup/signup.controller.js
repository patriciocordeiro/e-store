(function() {
    'use strict';

    angular.module('myApp').controller('SignupCtrl', ['authentication', SignupCtrl]);

    function SignupCtrl(authentication) {
        var vm = this;
        vm.user = {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        };

        vm.save = function(user) {
            console.log('Signup está funcionando', user)
            if (user) {
                console.log(user)
                authentication.signup({
                    username:user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    password: user.password
                }, function(newUser) {
                    
                    console.log('usuário recebido', newUser) //retorno do servidor
                });

            };
        };
    };

})();