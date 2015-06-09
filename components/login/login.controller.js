(function() {

    'use strict';


    angular.module('myApp').controller('LoginCtrl', ['$rootScope', '$state', 'authentication', LoginCtrl])

    function LoginCtrl($rootScope, $state, authentication) {
        var vm = this;

        //clear form after submite
        function clearForm() {
            vm.loginForm.$setPristine();
            vm.user = {
                email: '',
                password: ''
            };
        };
        //        vm.submitForm = function(isValid){
        //            alert(isValid)
        //            if(isValid){
        //                alert('Form valid')
        //            };
        //        };
        //
        $rootScope.logedIn = false;
        vm.login = function(user) {
            if (user) {
                console.log('Login Funcionando', user.email)
                authentication.login({
                    user
                }, function(data) {
                    if (data.name != null && data.name == user.email) {
                        console.log('sucess')
                        $rootScope.user = data.name;
                        $rootScope.logedIn = true;
                        $state.go('app.dashboard')

                    } else {
                        vm.loginFailMessage = 'Usuário e/ou senha incorretos. Tente novamente';
                        console.log('fail');
                         $rootScope.logedIn = false;
                        clearForm();
                    }
                });
            } else {
                console.log('Error: No user')
            }
        }

    }
})();