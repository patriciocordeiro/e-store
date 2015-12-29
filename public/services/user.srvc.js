(function() {
    'use strict';
    angular.module('myApp').service('userSrcv', userSrcv);

    function userSrcv($rootScope, httpUserService, userService, authentication, $state, $cookies, $q, $mdDialog) {
        var _this = this;
        //        $rootScope.isloggedIn = false,


        this.usr = {
            login: {
                isloggedIn: false,
                loggedUserName: '',
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
                                            $rootScope.loggedUserName = res.local.fullName;
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
                    $cookies.remove('usuario');
                    $cookies.remove('produtos');
                    $cookies.remove('lastState');
                },
                redirectToHomePage: function() {
                    $state.go('app');
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
                    .ok('Fechar');
                $mdDialog
                    .show(alert)
                    .finally(function() {
                        alert = undefined;
                    });
            }
        }
    }

})();