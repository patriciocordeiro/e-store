'use strict'
angular.module("myApp", ['ngResource', 'ui.router', 'ui.bootstrap', 'ngCookies', 'LocalStorageModule', 'validation.match', 'ui.mask', 'awesome-rating', 'ngMaterial', 'ncy-angular-breadcrumb', 'angularUtils.directives.uiBreadcrumbs', 'ngMessages', 'md.data.table'])
    .run(function($rootScope, $state, authentication, $cookies, localStorageService) {
        //Check if user is loggedin (cookies)
        var lastState = $cookies.get('lastState');

        //from user service, sinalize that user is logged in or not
        //this variable is used on navbar to hide/show login/logout  button
        $rootScope.isloggedIn = false;
        $rootScope.loggedUserName = '';

        authentication.isloggedin(function(response) {
            console.log(!response.user);
            if (response.user !== false) {
                console.log('resposta', response.local.firstName)
                $rootScope.isloggedIn = true;

                if (lastState === "app.produtosDetail" || lastState === "app.avaliacao") {
                    $state.go(lastState || "app.dashboard", {
                        id: localStorageService.get('idProdutoDetalhe')
                    });
                } else {
                    $state.go(lastState || "app.dashboard");
                }
                $rootScope.loggedUserName = response.local.fullName;

            }
        });

        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState) {
            console.log('mudei de estado', toState)
            var isLoggedIn = $rootScope.isloggedIn;
            if (fromState !== toState) {
                $cookies.put('lastState', toState.name);
            }
            //check if client is trying to access a restricted page
            //toState.authenticate = true and is
            if (toState.authenticate && !isLoggedIn) {
                event.preventDefault();
                //if toState.authenticate = true and isLoggedIn = false
                //Redirect to login page
                $state.go("app.user.login");
            }

            if (1) { //toState.name == "app.avaliacao"
                console.log("Esse eh o meu estado atual: ", toState.name);
                console.log("Esse o estado de onde venho: ", fromState.name);
            }
        })
        console.log('Hello')
    })
    .config(function($stateProvider, $urlRouterProvider, $mdThemingProvider) {

        /*Angular theme configuration*/
        $mdThemingProvider.theme('default')
            .primaryPalette('teal')
            .accentPalette('orange');

        $stateProvider
            .state('app', {
                url: "^",
                views: {
                    "products@": {
                        templateUrl: 'components/home/home.view.html',
                        //                        controller: 'HomeCtrl',
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

        .state('app.produtos.section', {
            url: "/:section",
            views: {
                "products@": {
                    templateUrl: 'components/produtos/productSection.view.html',
                    controller: 'PrdSectionCtrl as vm',
                    authenticate: false,
                    function($scope, section) {
                        //                        $scope.category = category;
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
                    //                    return productSrvc.category;

                }
            }
        })

        .state('app.produtos.section.category', {
            url: "/:category",
            views: {
                "products@": {
                    templateUrl: 'components/produtos/produtosLista.view.html',
                    controller: 'PrdCtrl as vm',
                    authenticate: true,
                    function($scope, category, section) {
                        //                        $scope.category = category;
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
                    templateUrl: 'components/produtos/produtoDetail.view.html',
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
            views: {
                'products@': {
                    templateUrl: 'components/produtos/kart.view.html',
                    controller: 'KartCtrl as vm',
                    authenticate: true,
                    //            template : '<h1>Funciona</h1>',
                    data: {
                        displayName: 'Meu Carrinho',
                    }
                }
            }
        })

        .state('app.search', {
            url: "/search",
            templateUrl: 'components/search/search.view.html',
            controller: 'SearchResultsCtrl as vm'
            //            template : '<h1>Funciona</h1>',

        })

        .state('app.user.signup', {
            url: "/user/signup",
            views: {
                'products@': {
                    templateUrl: 'components/signup/signup.view.html',
                    controller: 'SignupCtrl as vm'
                    //            template : '<h1>Funciona</h1>',
                }
            },
            data: {
                displayName: 'Dashboard'
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
                        templateUrl: 'components/login/login.view.html',
                        controller: 'usrLoginCtrl as vm',
                        //            template : '<h1>Funciona</h1>',
                    }
                },
                data: {
                    displayName: 'Login'
                }
            })

        .state('app.user.dashboard', {
            url: "/dashboard",
            authenticate: true,
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
            //                authenticate: true
        })
            .state('app.user.dashboard.password', {
                url: "/password",
                templateUrl: 'components/dashboard/userAlterarSenha.view.html',
                controller: 'userDashboardCtrl as vm',
                //                authenticate: true
            })
            .state('app.user.dashboard.dados', {
                url: "/dados",
                templateUrl: 'components/dashboard/userAlterarDados.view.html',
                controller: 'userDashboardCtrl as vm'

                //                authenticate: true
            })
            .state('app.user.dashboard.endereco', {
                url: "/endereco",
                templateUrl: 'components/dashboard/userAlterarEndereco.view.html',
                data: {
                    displayName: 'Meus endereços'
                }
                //                controller: 'blala as vm',
                //                authenticate: true
            })
            .state('app.user.dashboard.pedidos', {
                url: "/pedidos",
                templateUrl: 'components/dashboard/pedidos.view.html',
                controller: 'DashboardPedidosCtrl as vm',
                data: {
                    displayName: 'Meus endereços',
                }
                //                authenticate: true
            })


    });