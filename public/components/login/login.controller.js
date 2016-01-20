(function() {

    'use strict';


    angular.module('myApp').controller('LoginCtrl', ['$rootScope', '$state', 'authentication', '$cookies', 'userService', 'localStorageService', LoginCtrl])

    function LoginCtrl($rootScope, $state, authentication, $cookies, userService, localStorageService) {
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
            if ((typeof user)!== undefined) {
                console.log('Login Funcionando', user)
                authentication.loginLocal({
                    email: user.email,
                    password: user.password
                }, function(response) {
                    console.log(response)
                    if ((typeof response.local) !== undefined) {
                        if (response.local.email == user.email) {
                            console.log('sucess');
                            console.log(response)

                            // armazenando nome de usuário em cookie
                            $cookies.put('email', response.local.email);
                            $cookies.put('usuario', response.local.fullName);
                            console.log("Login do usuario no cookie: ", $cookies.get('usuario'));

                            //Paase os credencias do usuário para rootscope
                            $rootScope.loggedUserName = $cookies.get('usuario');

                            console.log($rootScope.loggedUserName)

                            //Confirme que usuário está logado
                            $rootScope.isloggedIn = true;

                            //preencha os dados cadastrais com os dados do usuário
                            userService.userDadosCadastrais = response.local;
                            userService.userPedidos = response.pedidos;

                            //Vá para a página do usuário
                            $state.go('app.user.dashboard')

                        }

                    } else if ((typeof response.user) !== undefined) {
                        if (response.user == false) {
                            vm.loginFailMessage = 'Usuário e/ou senha incorretos. Tente novamente';
                            console.log('fail');
                            //                        $rootScope.isloggedIn = false;
                            clearForm();
                        }

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
                    //                            $rootScope.loggedUserName = response.firstName + ' ' + response.lastName;
                    //                            console.log($rootScope.loggedUserName)
                    //                            $rootScope.isloggedIn = true;
                    //                            $state.go('app.dashboard')
                    //
                    //                        } else {
                    //                            vm.loginFailMessage = 'Usuário e/ou senha incorretos. Tente novamente';
                    //                            console.log('fail');
                    //                            //                        $rootScope.isloggedIn = false;
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