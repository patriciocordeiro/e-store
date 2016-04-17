(function() {
    'use strict';
    angular.module('myApp').service('userSrcv', userSrcv);

    function userSrcv($rootScope, httpUserService, userService, authentication, $state, $cookies, $q, $mdDialog) {
        var _this = this;

        this.usr = {
            isloggedIn: false,
            loggedUserName: '',
            resetPassToken: undefined, //save the password reset token
            login: {

                /*All user returned data*/
                data: [],
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
                            //                            console.log(res);
                            if (res.local) {
                                console.log(res.local);
                                if (res.local.email === user.email) {
                                    return $q.when(_this.usr.login.data = res)
                                        .then(function(data) {
                                            //Set the loggedin to true
                                            _this.usr.isloggedIn = true;
                                            $rootScope.isloggedIn = true;
                                            //get the logged user name to display on navbar
                                            $rootScope.loggedUserName = data.local.nome;
                                            //Login sucess message
                                            msg = _this.usr.login.successMsg();

                                            //                                                console.log(_this.usr.login.isloggedIn)
                                            return $q.when($rootScope.isloggedIn = true);
                                        }).then(function(data) {
                                            console.log(data);
                                            if (data)
                                            //Redirect to user page
                                                _this.usr.login.redirToUsrPage();

                                        })
                                };
                                //Save cookies to keep user logged in if box checked
                                setTimeout(function() {
                                    if (saveSection == true) {
                                        _this.usr.login.cookies.put(res);
                                    }
                                }, 0)


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
                    $state.go($rootScope.toState || 'app.user.dashboard.dados');
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
                            destinatario: newUser.destinatario,
                            principal: true, //endereco principal
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
            /*functions for password recover*/
            //forgotPass: This function is fired (page: Esqueci minha senha) when user type email for instructions f or password reset
            forgotPass: function(email) {
                var query = {};
                var msg = {};
                query.email = email;
                authentication.forgotPass(query, function(res) {
                    console.log(res.user);


                    if (res.user == false) {
                        //if email not found
                        msg = {
                            title: '<md-icon class="material-icons md-48 md-warn">error</md-icon> Operação Falhou!',
                            text: '<p>Não encontramos o e-mail digitado nos registros</p> <p>Verifique o e-mail digitado e tente novamente ou realize o seu cadastro é fácil e rápido</p> ',
                            action1: 'Cadastro',
                            link1: 'ui-sref="app.user.signup"',
                            action2: 'Tente novamente',
                            //                            link2: 'ui-sref="app"',
                        }

                    } else {
                        //If email found
                        msg = {

                            title: '<md-icon class="material-icons md-48 md-primary">done_all</md-icon>Operaçao realizada com sucesso',
                            text: '<p>Enviamos um email para o e-mail fornecido com as instruçoes para alteração da sua senha</p>' +
                                '<p>ATENÇAO: O link enviado tem validade de 1 hora</p>',
                            action1: 'Continuar compras',
                            link1: 'ui-sref="app.user.signup"',
                            action2: '',
                            //                            link2: 'ui-sref="app"',
                        }

                    }
                    //Show dialog to user with the message of found or not found
                    _this.usr.dialog(msg);

                })
            },

            //checkResetPassToken: checks if the entered token is  valid 
            checkResetPassToken: function() {
                console.log('executado');
                var query = {};
                if ($state.params.token) {
                    //get the token from the url params
                    query.token = $state.params.token;
                    _this.usr.resetPassToken = $state.params.token;
                    //send query to server
                    authentication.checkResetPassToken(query, function(res) {
                        var msg = {}
                        //                        console.log(res.user);
                        if (res.token == 'ok') {
                            //for sucess
                            //redirect to password reset page
                            $state.go('app.user.resetPassword');

                        } else {
                            //dialog message: for fail
                            msg = {
                                title: '<md-icon class="material-icons md-warn md-48">error</md-icon>O PROCESSO FALHOU!',
                                text: '<p>O link a qual está tentando acessar é inválido ou expirou<p>' +
                                    '<p>Click no link para recomeçar o processo de alteração de senha ou para ir para a página principal<p>',
                                action1: 'Esqueci minha senha',
                                link1: 'ui-sref="app.user.forgetPassword"',
                                action2: 'Home',
                                link2: 'ui-sref="app"',
                            }
                            //Show dialog to user
                            _this.usr.dialog(msg);
                        }
                    })
                }
            },

            //resetPass: Reset the pass 
            resetPass: function(newPassword) {
                var query = {};
                var msg;
                query.password = newPassword;
                query.token = _this.usr.resetPassToken;
                authentication.resetPass(query, function(res) {
                    console.log(res);
                    if (res.user == 'ok') {
                        msg = {
                            title: '<md-icon class="material-icons md-48 md-primary">done_all</md-icon>Senha alterada com sucesso',
                            text: '<p>Realize o seu login e aproveite as nossas ofertas.</p>',
                            action1: 'Login',
                            link1: 'ui-sref="app.user.login"',
                            action2: 'Continuar compras',
                            link2: 'ui-sref="app.produtos.section"',
                        }

                    } else {
                        msg = {
                            title: '<md-icon class="material-icons md-48">error</md-icon>O PROCESSO FALHOU!',
                            text: '<p>O link a qual está tentando acessar é inválido ou expirou<p>' +
                                '<p>Click no link abaixo para recomeçar o processo de alteração de senha ou para ir para a página principal<p>',
                            action1: 'Esqueci minha senha',
                            link1: 'ui-sref="app.user.forgetPassword"',
                            action2: 'Home',
                            link2: 'ui-sref="app"',
                        }

                    }

                    //Show dialog to user
                    _this.usr.dialog(msg);
                })
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

            removeAddress: function(addressId, userEmail, callback) {
                var resData;
                var myData;
                var query = {
                    addressId: addressId,
                    email: userEmail
                };
                userService.updateUserData('removeAddress', query, function(data) {
                    console.log(data);
                    _this.usr.login.data.endereco = data.local.endereco;
                    console.log(_this.usr.login.data);
                    resData = data;

                    //					console.log(_this.usr.login.data.endereco);
                    //                    if (data) {
                    //                        if (data.nModified === 1) {
                    //                            var msg = 'Endereço de entrega excluído com sucesso';
                    //                            //update data
                    //                            console.log(data);
                    //                          
                    //
                    //                        } else {
                    //                            var msg = 'Nada foi alterado';
                    //                        }
                    //						 return true;
                    //                    } else {
                    //                        var msg = 'ups! Dados não atualizados. Tente novamente';
                    //						return false;
                    //                    }
                    return callback(resData)
                })
                //                console.log(res);
                //				return callback(res);	
                //                return $q.when(!myData);

            },

            updateDialog: function(msg) {
                var alert = $mdDialog.alert()
                    .title('Olá, ' + _this.usr.login.data.local.nome)
                    .content(msg)
                    .ok('Ok');
                $mdDialog
                    .show(alert)
                    .finally(function() {
                        alert = undefined;
                    });
            },
            httpCom: function(acao, query) {
                var defer = $q.defer();
                httpUserService.save({
                    acao: acao
                }, query).$promise.then(
                    function(data) {
                        data.abc = true;
                        defer.resolve(data);
                    },
                    function(error) {
                        console.log(error);
                        defer.reject(error);
                    });
                return defer.promise;
            },

            addNewAddress: {
                createNew: function(newAddress, callback) {
                    var message = {};
                    var query = {};
                    query.email = _this.usr.login.data.local.email;
                    query.addNewAddress = newAddress;
                    _this.usr.httpCom('addNewAddress', query).then(
                        function(data) {
                            if (data.local) {
                                console.log(data);
                                //pass the received data to service data
                                _this.usr.login.data = data;
                                console.log(_this.usr.login.data);
                                message.title = 'O novo endereço foi cadastrado com sucesso.'
                                message.sucess = 1; //newAddress
                              
                            } else {
                                message.sucess = 0; //fail
                                message.title = 'Operacao não realizada. Tente novamente mais tarde.'
                            }
                            _this.usr.dialog(message);
							  return callback(data);

                        }, function(err) {
                            console.log('falhou', err);
                        });



                },
                dialog: function(ev) {
                    $mdDialog.show({
                        controller: 'userDashboardCtrl as vm',
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
                }
            },
            //recover  already loggedin user    
            recoverUser: function() {
                console.info('RECOVERING USER');
                var defer = $q.defer();
                //check if user is already loggedin
                //                if ($cookies.get('email')) {
                //                    console.log('usuário existe');
                authentication.isloggedin(function(res) {
                    console.log(res);

                    if (res.local.email) {
                        console.info('USER EXISTS');
                        console.log('resposta', res.local.nome)
                        //set isloggedIn to true
                        _this.usr.login.data = res;
                        _this.usr.isloggedIn = true;
                        $rootScope.isloggedIn = true;
                        $rootScope.loggedUserName = res.local.nome;
                        defer.resolve(true)
                        //                        var lastState = $cookies.get('lastState');

                        //                        $state.go(lastState || "app.dashboard");
                        //
                        //                            if (lastState === "app.produtosDetail" || lastState === "app.avaliacao") {
                        //                                    $state.go(lastState || "app.dashboard");
                        //										, {
                        //                                    id: localStorageService.get('idProdutoDetalhe')
                        //                                });
                        //                            } else {
                        //                                $state.go(lastState || "app.dashboard");
                        //                            }


                    } else {
                        console.log('Usuário não existe');
                        _this.usr.isloggedIn = false;
                        defer.resolve(false)

                    }

                });
                return defer.promise;

                //                }
            },
            closeDialog: function() {
                console.log('closing dialog');
                $mdDialog.hide();
            },
            cancelDialog: function() {
                $mdDialog.cancel();
            },
            dialog: function(message) {
                var ev;
                var isShowSucessIcon = false; //show icons sucess if true and icon fail if false
                var isShowButtonLink1 = true //show/hide button link1
                var isShowButtonLink2 = true //show/hide button link2
                var isShowActions = true //show/hide actions div
                var isShowMsgText = true // show/hide msg div
                var isShowTitle = true // show/hide title div

                if (!message.title) {
                    //hide title div
                    isShowTitle = false;
                }
                if (!message.text) {
                    //hide message text div
                    isShowMsgText = false;
                }
                //Show sucess icon or fail icon
                if (message.sucess == 1) {
                    isShowSucessIcon = true;
                    var icon = 'done'
                    var iconClass = 'my-md-sucess-icon-box'

                } else {
                    isShowSucessIcon = false;
                    var iconClass = 'my-md-error-icon-box'
                    var icon = 'error'
                }
                //show or hide action buttons
                if (!message.action1) {
                    isShowButtonLink1 = false;
                }
                if (!message.action2) {
                    isShowButtonLink2 = false;
                }
                if (!message.action1 && !message.action2) {
                    //hide actions div
                    isShowActions = false;
                }

                $mdDialog.show({
                    targetEvent: ev,
                    clickOutsideToClose: false,
                    parent: angular.element(document.body),
                    controller: 'DialogCtrl as vm',
                    template: '<md-dialog aria-label="alteracao de senha" ng-cloak>' +
                        '<div  layout="row" layout-align="end center">' +
                        '<md-button class="md-icon-button" ng-click="vm.closeDialog()"> ' +
                        '<md-icon class="material-icons">close</md-icon>' +
                        '</md-button>' +
                        '</div>' +
                        '<md-dialog-content>' +
                        '<div class="md-dialog-content">' +
                        '<div layout="row" layout-align="center center">' +
                        '<md-icon class="material-icons md-60 my-md-circle"' +
                        'ng-class="' + "'" + iconClass + "'" + '">' + icon + '</md-icon>' +
                        '</div>' +
                        '<h2 ng-show="' + isShowTitle + '"class="md-title my-md-smooth-title" role="alert">' + message.title + '</h2>' +
                        '<div ng-show="' + isShowMsgText + '">' +
                        message.text +
                        '</div>' +
                        '</md-dialog-content>' +
                        '<md-dialog-actions ng-show="' + isShowActions + '">' +
                        '<md-button ng-show="' + isShowButtonLink1 + '"class="md-primary md-raised" ng-click="vm.closeDialog()" ' + message.link1 + ' >' + message.action1 + '</md-button>' +
                        '<md-button ng-show="' + isShowButtonLink2 + '"class="md-primary" ng-click="vm.closeDialog()" ' + message.link2 + ' >' + message.action2 + '</md-button>' +
                        '</md-dialog-actions>' +
                        '<div>' +
                        '</md-dialog>',
                });
            },
        }
    }
})();