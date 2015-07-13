(function() {

    'use strict';


    angular.module('myApp').controller('LoginCtrl', ['$rootScope', '$state', 'authentication', '$cookies', 'userService', LoginCtrl])

    function LoginCtrl($rootScope, $state, authentication, $cookies, userService) {
        var vm = this;

        //clear form after submite
        function clearForm() {
            vm.loginForm.$setPristine();
            vm.user = {
                email: '',
                password: ''
            };
        };

        //Inicialização dos dados cadastrais do usuário (através do userService)
        //A variavel está vinculada a página alterar dados cadastrais
        //Estou usando compartilhamente de dados entre este controlador
        // e o controlador DashboardCtrl
        vm.userDadosCadastrais = userService.userDadosCadastrais;

        //        vm.submitForm = function(isValid){
        //            alert(isValid)
        //            if(isValid){
        //                alert('Form valid')
        //            };
        //        };
        //
        vm.loginLocal = function(user) {
            if (user) {
                console.log('Login Funcionando', user)
                authentication.loginLocal({
                    email: user.email,
                    password: user.password
                }, function(response) {
                    console.log(response)

                    if (response.email == user.email) {
                        console.log('sucess');
                        console.log(response)

                        // armazenando nome de usuário em cookie
                        $cookies.put('usuario', response.fullName);
                        console.log("Login do usuario no cookie: ", $cookies.get('usuario'));
                        
                        //Paase os credencias do usuário para rootscope
                        $rootScope.loggedUser = $cookies.get('usuario');

                        console.log($rootScope.loggedUser)
                        
                        //Confirme que usuário está logado
                        $rootScope.loggedIn = true;
                        
                        //preencha os dados cadastrais com os dados do usuário
                        userService.userDadosCadastrais = response;
                        
                        //Vá para a página do usuário
                        $state.go('dashboard')

                    } else {
                        vm.loginFailMessage = 'Usuário e/ou senha incorretos. Tente novamente';
                        console.log('fail');
                        //                        $rootScope.loggedIn = false;
                        clearForm();
                    }
                });
            } else {
                console.log('Error: No user')
            }
        }


        vm.loginFacebook = function() {
            authentication.loginFacebook(function(response) {
                    console.log(response)
                    //                        if (response.email == user.email) {
                    //                            console.log('sucess')
                    //                            $rootScope.loggedUser = response.firstName + ' ' + response.lastName;
                    //                            console.log($rootScope.loggedUser)
                    //                            $rootScope.loggedIn = true;
                    //                            $state.go('app.dashboard')
                    //
                    //                        } else {
                    //                            vm.loginFailMessage = 'Usuário e/ou senha incorretos. Tente novamente';
                    //                            console.log('fail');
                    //                            //                        $rootScope.loggedIn = false;
                    //                            clearForm();
                    //                        }
                    //                    });
                }
                //                    else {
                //                console.log('Error: No user')
            )
        }
    }
})();