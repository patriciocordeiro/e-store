(function() {
    'use strict';
    angular.module('myApp').service('userSrcv', userSrcv);

    function userSrcv($rootScope, httpUserService, userService, authentication, $state, $cookies, $q, $mdDialog) {
        var _this = this;

        this.usr = {
            isloggedIn: false,
            loggedUserName: '',
            login: {

                /*Local type login*/
                local: function(user, saveSection, callback) {
                    //user: object with login info
                    //saveSection: boolean  whatever to save user section
                    var msg; //  returned message of login state;
                    if ((typeof user) !== undefined) {
                        /*Get authentication from http server */
                        authentication.loginLocal({
                            email: user.email,
                            password: user.password
                        }, function(res) {
                            //TODO: server unreached
                            console.log(res);
                            if (res.local) {
                                console.log(res.local);
                                if (res.local.email === user.email) {
                                    //if entered emai equals the returned email. Reduntant? I know.
                                    $q.when()
                                        .then(function() {
                                            //pass all data to service variable
                                            var defer = $q.defer();
                                            setTimeout(function() {
                                                defer.resolve(
                                                    _this.usr.login.data = res
                                                );
                                                console.log(_this.usr.login.data);
                                            }, 0);
                                            return defer.promise;
                                        }).then(function(data) {
                                            console.log(data);
                                            //Set the loggedin to true
                                            $rootScope.isloggedIn = true;
                                            //get the logged user name to display on navbar
                                            $rootScope.loggedUserName = res.local.name;
                                            //                                            console.log(_this.usr.login.loggedUserName);
                                            //Login sucess message
                                            msg = _this.usr.login.successMsg();
                                            //Redirect to user page
                                            _this.usr.login.redirToUsrPage();
                                            console.log(_this.usr.login.isloggedIn)
                                        });

                                    //Save cookies to keep user logged in if box checked
                                    setTimeout(function() {
                                        if (saveSection == true) {
                                            _this.usr.login.cookies.put(res);
                                        }
                                    }, 0)

                                }
                            } else if ((typeof res.user) != undefined) {
                                console.log(res.user);
                                if (res.user === false) {
                                    //return login fail message
                                    msg = _this.usr.login.faillMsg();
                                    return callback(msg);
                                }
                            }
                            //clear login form before redirect
                            console.log(Object.keys(user));
                        });
                    } else {
                        console.log('no user data');
                    }
                    //                    console.log(msg);

                },
                facebook: function() {},
                googlePlus: function() {},
                redirToUsrPage: function() {
                    $state.go('app.user.dashboard.endereco');
                },
                faillMsg: function() {
                    return 'Sua tentativa de login não foi bem sucedida. Verifique os dados e tente novamente.';
                },
                successMsg: function() {
                    return 'Login com sucesso';
                },
                cookies: {
                    put: function(data) {
                        $cookies.put('email', data.local.email);
                        $cookies.put('usuario', data.local.fullName);
                        console.log('cookies saved');
                    },
                    get: function() {
                        $cookies.get('email');
                        $cookies.get('usuario');
                    },

                },
                clearForm: function(myObject, callback) {
                    var keys = [];
                    var i = 0;
                    keys = Object.keys(myObject);
                    for (i = 0; i < keys.length; i++) {
                        var key = keys[i]
                        console.log(key);
                        myObject[key.toString()] = '';
                    }
                    return callback(myObject);
                },

                /*All user returned data*/
                data: [],
            },
            logout: {
                execLogout: function() {
                    authentication.logOut(function(data) {
                        console.log(data);
                        //remove all cookies
                        _this.usr.logout.removeCokies();
                        //set login status to false
                        $rootScope.isloggedIn = false;
                        //go to home page
                        _this.usr.logout.redirectToHomePage();
                    });
                },
                removeCokies: function() {
                    $cookies.remove('email');
                    $cookies.remove('usuario');
                    $cookies.remove('produtos');
                    $cookies.remove('lastState');
                },
                redirectToHomePage: function() {
                    $state.go('app');
                }
            },
            signup: {
                createUsr: function(newUser) {
                    if (newUser) {
                        authentication.signup({
                            nome: newUser.nome,
                            sobrenome: newUser.sobrenome,
                            username: newUser.email,
                            sexo: newUser.sexo,
                            cpf: newUser.cpf,
                            birthDate: newUser.birthDate,
                            telefone: newUser.telefone,
                            celular: newUser.celular,
                            email: newUser.email,
                            password: newUser.password,
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
                            if (newUser) {
                                var ev;
                                $mdDialog.show({
                                    controller: 'SignupCtrl as vm',
                                    templateUrl: 'components/signup/usrSignupDiag.view.html',
                                    parent: angular.element(document.body),
                                    targetEvent: ev,
                                    clickOutsideToClose: true
                                })
                            }

                            console.log('usuário recebido', newUser) //retorno do servidor
                        });

                    };
                }


            },
            update: function(userData) {
                if (userData) {
                    console.log(userData);
                    console.log(_this.usr.login.data.local);
                    //                    if (userData === _this.usr.login.data.local) {

                    //                        console.log('Nada foi alterado')
                    //                    } else {
                    userService.updateUserData('updateDadosCadastrais', userData, function(res) {
                        if (res.status.ok == 1) {
                            var msg = 'Seus dados foram atualizados com sucesso';
                            _this.usr.updateDialog(msg);
                        } else if (res.status = 'fail') {
                            var msg = 'ups! Dados não atualizados. Tente novamente';
                            _this.usr.updateDialog(msg);
                        }
                        console.log(res);
                    });
                    //                    }
                } else {
                    console.log('do nothing');
                }
            },
            updateDialog: function(msg) {
                var alert = $mdDialog.alert()
                    .title('Olá, ' + _this.usr.login.loggedUserName)
                    .content(msg)
                    .ok('Ok');
                $mdDialog
                    .show(alert)
                    .finally(function() {
                        alert = undefined;
                    });
            },
            addNewAddress: function(ev) {
                $mdDialog.show({
                    controller: 'KartCtrl as vm',
                    templateUrl: 'components/dashboard/userNewAddress.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true
                })
                //                    .then(function(answer) {
                ////                        $scope.status = 'You said the information was "' + answer + '".';
                //                    }, function() {
                ////                        $scope.status = 'You cancelled the dialog.';
                //                    });

            },
            //recover  already loggedin user    
            recoverUser: function() {
                //check if user is already loggedin
                if ($cookies.get('email')) {
                    console.log('usuário existe');
                    authentication.isloggedin(function(res) {
                        console.log(res.user);
                        if (res.user !== false) {
                            console.log('resposta', res.local.fullName)
                            //set isloggedIn to true
                            _this.usr.login.data = res;
                            _this.usr.isloggedIn = true;
                            $rootScope.isloggedIn = true;
                            $rootScope.loggedUserName = res.local.fullName;
                            //
                            //                            if (lastState === "app.produtosDetail" || lastState === "app.avaliacao") {
                            //                                $state.go(lastState || "app.dashboard", {
                            //                                    id: localStorageService.get('idProdutoDetalhe')
                            //                                });
                            //                            } else {
                            //                                $state.go(lastState || "app.dashboard");
                            //                            }


                        } else {
                            console.log('Usuário não existe');
                        }
                    });
                }
            },
            closeDialog:function(){
            $mdDialog.hide();
        }
        }
    }


})();