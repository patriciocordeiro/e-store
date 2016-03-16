'use strict'
angular.module("myApp", ['ngResource', 'ui.router', 'ui.bootstrap', 'ngCookies', 'LocalStorageModule', 'validation.match', 'ui.mask', 'awesome-rating', 'ngMaterial', 'ncy-angular-breadcrumb', 'angularUtils.directives.uiBreadcrumbs', 'ngMessages'])
    .run(function($rootScope, $state, authentication, $cookies, userSrcv) {
        //Check if user is loggedin (cookies)
        var lastState = $cookies.get('lastState');

        //Recover the user on reload
        //        var isLoggedIn;

        //---------------------------------------------------------
        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState) {
            console.log('mudei de estado', toState);
            console.log("Esse eh o meu estado atual: ", toState.name);
            console.log("Esse o estado de onde venho: ", fromState.name);

            if (fromState !== toState) {
                $cookies.put('lastState', toState.name);

            }

            console.log(fromState.name.length);
            if (fromState.name.length === 0 && fromState.views === null) {
                userSrcv.usr.recoverUser().then(function(isLoggedIn) {
                    console.log(isLoggedIn);
                    if (toState.authenticate && !isLoggedIn) {
                        event.preventDefault();
                        //if toState.authenticate = true and isLoggedIn = false
                        //Redirect to login page
                        $state.go("app.user.login");
                    }
                })
            } else {
                if (toState.authenticate && !userSrcv.usr.isloggedIn) {
                    event.preventDefault();
                    //if toState.authenticate = true and isLoggedIn = false
                    //Redirect to login page
                    $rootScope.toState = toState.name;
                    console.log($rootScope.toState);
                    $state.go("app.user.login");
                }
            }

            //                if (toState.authenticate && !isLoggedIn) {
            //                    event.preventDefault();
            //                    //if toState.authenticate = true and isLoggedIn = false
            //                    //Redirect to login page
            //                    $state.go("app.user.login");
            //                }
            //check if client is trying to access a restricted page
            //toState.authenticate = true and is
            //            console.log(isLoggedIn);
            //            if (toState.authenticate && !$rootScope.isloggedIn) {


            //            if (1) { //toState.name == "app.avaliacao"

            //            }
        })
    })
    .config(function($stateProvider, $urlRouterProvider, $mdThemingProvider) {

        /*Angular theme configuration*/
        $mdThemingProvider.theme('default')
        //            .primaryPalette('teal')
                    .primaryPalette('blue')
//        .primaryPalette('indigo')
            .accentPalette('deep-orange')
        //            .backgroundPalette('white', {
        //                'default': '50'
        //            });

        $stateProvider
            .state('app', {
                url: "^",
                views: {
                    "products@": {
                        templateUrl: 'components/home/home.view.html',
                        controller: 'HomeCtrl as vm',
                        //                        controller: 'ProdutosCtrl as vm', //apagar qdo terminar o teste
                    }
                },
                data: {
                    displayName: 'Home',
                }
            })

        .state('app.produtos', {
            abstract: true,
            url: "/app/produtos",
            template: '<ui-view/>',
            data: {
                proxy: 'app.produtos.list'
            }
        })

        .state('app.produtos.search', {
            url: "/search",
            views: {
                "products@": {
                    templateUrl: 'components/produtos/productLista.view.html',
                    controller: 'PrdCtrl as vm'
                }
            }
        })

        .state('app.produtos.section', {
            url: "/:section",
            views: {
                "products@": {
                    templateUrl: 'components/produtos/productSection.view.html',
                    controller: 'PrdSectionCtrl as vm',
                    authenticate: false,
                    function($scope, section) {
                        $scope.section = section;
                        console.log($scope.section);
                    }
                }
            },
            data: {
                displayName: '{{section}}',
            },
            resolve: {
                section: function(productSrvc) {
                    return productSrvc.section;
                }
            }
        })

        .state('app.produtos.section.category', {
            url: "/:category",
            views: {
                "products@": {
                    templateUrl: 'components/produtos/productLista.view.html',
                    controller: 'PrdCtrl as vm',
                    authenticate: true,
                    function($scope, category, section) {
                        $scope.category = category;
                        $scope.section = section;
                        console.log($scope.category);
                    }
                }
            },
            data: {
                displayName: '{{category}}',
            },
            resolve: {
                category: function(productSrvc) {
                    return productSrvc.category;

                },
                section: function(productSrvc) {
                    return productSrvc.section;
                }
            }
        })

        .state('app.produtos.section.category.detail', {
            url: "/:id",
            views: {
                'products@': {
                    templateUrl: 'components/produtos/productDetail.view.html',
                    controller: 'PrdDetailCtrl as vm',
                    authenticate: false
                }
            },
            data: {
                displayName: 'Tbnb'
            }
        })

        .state('app.avaliacao', {
            url: "/avaliacao/:id",
            templateUrl: 'components/rating/ratingProduct.view.html',
            controller: 'RatingProductCtrl as vm',
            authenticate: false

        })

        .state('app.minhaCesta', {
            url: "/minhaCesta",
            //            authenticate: true,
            views: {
                'products@': {
                    templateUrl: 'components/kart/kart.view.html',
                    controller: 'KartCtrl as vm',

                }
            },
            data: {
                displayName: 'Meu carrinho',
            }
        })
            .state('app.minhaCesta.checkout', {
                url: "/checkout",
                authenticate: true,
                views: {
                    'products@': {
                        templateUrl: 'components/kart/kartCheckout.view.html',
                        controller: 'KartCtrl as vm',
                        authenticate: true,
                        data: {
                            displayName: 'Finalizar compra',
                        }
                    }
                }
            })


        .state('app.user.signup', {
            url: "/signup",
            views: {
                'products@': {
                    templateUrl: 'components/signup/usrSignup.view.html',
                    controller: 'SignupCtrl as vm'
                }
            },
            data: {
                displayName: 'Criar conta'
            }
        })

        .state('app.user', {
            abstract: true,
            url: "/app/user",
            template: '<ui-view/>',
        })
            .state('app.user.login', {
                url: "/login",
                views: {
                    'products@': {
                        templateUrl: 'components/login/usrLogin.view.html',
                        controller: 'usrLoginCtrl as vm',
                        //            template : '<h1>Funciona</h1>',
                    }
                },
                data: {
                    displayName: 'Login'
                }
            })
            .state('app.user.forgetPassword', {
                url: "/forgetPassword",
                views: {
                    'products@': {
                        templateUrl: 'components/login/forgotPassword.view.html',
                        controller: 'UserCtrl as vm',
                        //            template : '<h1>Funciona</h1>',
                    }
                },
                data: {
                    displayName: 'Esqueci minha senha'
                }
            })
            .state('app.user.forgetPassword.token', {
                url: "/:token",
                views: {
                    'products@': {
                        template: '',
                        controller: 'UserCtrl as vm',
                        //            template : '<h1>Funciona</h1>',
                    }
                },
                data: {
                    displayName: 'Redefinição de senha'
                }
            })
            .state('app.user.resetPassword', {
                url: "/resetPassword",
                views: {
                    'products@': {
                        templateUrl: 'components/login/resetPassword.view.html',
                        controller: 'UserCtrl as vm',
                        //            template : '<h1>Funciona</h1>',
                    }
                },
                data: {
                    displayName: 'Redefinição de senha'
                }
            })

        .state('app.user.dashboard', {
            url: "/dashboard",
            authenticate: false,
            views: {
                'products@': {
                    templateUrl: 'components/dashboard/dashboard.view.html',
                    controller: 'userDashboardCtrl as vm',
                }
            },
            data: {
                displayName: 'Dashboard'
            }

        })

        .state('app.user.dashboard.email', {
            url: "/email",
            templateUrl: 'components/dashboard/userAlterarEmail.view.html',
            //            controller: 'blala as vm',
            //            template : '<h1>Funciona</h1>',
            authenticate: true
        })
            .state('app.user.dashboard.password', {
                url: "/password",
                templateUrl: 'components/dashboard/userAlterarSenha.view.html',
                controller: 'userDashboardCtrl as vm',
                authenticate: true
            })
            .state('app.user.dashboard.dados', {
                url: "/dados",
                templateUrl: 'components/dashboard/userAlterarDados.view.html',
                controller: 'userDashboardCtrl as vm',
                data: {
                    displayName: 'Dados da conta',
                }

                //                authenticate: true
            })
            .state('app.user.dashboard.endereco', {
                url: "/endereco",
                templateUrl: 'components/dashboard/userAlterarEndereco.view.html',
                authenticate: true,
                data: {
                    displayName: 'Meus endereços'
                }
            })
            .state('app.user.dashboard.pedidos', {
                url: "/pedidos",
                templateUrl: 'components/dashboard/pedidos.view.html',
                controller: 'DashboardPedidosCtrl as vm',
                authenticate: true,
                data: {
                    displayName: 'Meus Pedidos',
                }

            })

        $urlRouterProvider.otherwise("app")

    });