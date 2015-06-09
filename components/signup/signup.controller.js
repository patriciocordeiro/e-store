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
                    user
                }, function(data) {
                    console.log(data)
                });

            };
        };
    };

})();