'use strict'
angular.module("myApp", ['ngResource', 'ui.router', 'ui.bootstrap', 'ngCookies', 'LocalStorageModule', 'validation.match', 'ui.mask', 'awesome-rating', 'ngMaterial', 'ncy-angular-breadcrumb', 'angularUtils.directives.uiBreadcrumbs', 'md.data.table'])
    .run(function($rootScope, $state, authentication, $cookies, localStorageService) {
        console.log('My $rootScope', $rootScope)
        //Check if user is loggedin (cookies)
        var lastState = $cookies.get('lastState');
        // $rootScope.getCategory('tv'); 
        $rootScope.loggedIn = false;
        authentication.isloggedin(function(response) {
            console.log(!response.user);
            if (response.user !== false) {
                console.log('resposta', response.local.firstName)
                $rootScope.loggedIn = true;

                //Ultimo estado visitado antes do refresh

                //            $state.go(lastState || "app.dashboard");
                //$state.go(lastState || "dashboard");
                //console.log("MEU ULTIMO ESTADO: ", lastState);
                if (lastState === "app.produtosDetail" || lastState === "app.avaliacao") {
                    $state.go(lastState || "app.dashboard", {
                        id: localStorageService.get('idProdutoDetalhe')
                    });
                } else {
                    $state.go(lastState || "app.dashboard");
                }
                //            $state.reload();
                $rootScope.loggedUser = response.local.fullName;
                //            $rootScope.loggedUser = $cookies.get('usuario');
                //var test = true;
                //            if(test==true){
                // if(toState.name === "app.produtosDetail"){
                // console.log("ESTOU RODANDO AQUI NO PRODUCT DETAIL ", toState);//55633a204ce147e1f98ec41e


                //$state.go("app.produtosDetail",{id:"55633a204ce147e1f98ec41e"});
                //$state.go(lastState || "app.dashboard");

                //}
            }
        });

        $rootScope.logOut = function() {
            authentication.logOut(function(data) {
                console.log(data);
                //remove all cookies
                $cookies.remove('usuario');
                $cookies.remove('produtos');
                $cookies.remove('lastState');
                $state.go("app.home");
                $rootScope.loggedIn = false;
            });
        }


        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState) {
            console.log('mudei de estado', toState)
            var isLoggedIn = $rootScope.loggedIn;
            if (fromState !== toState) {
                $cookies.put('lastState', toState.name);
                console.log('Cookie do estado atual adicionado com sucesso', toState.name);


            }

            //check if client is trying to access a restricted page
            //toState.authenticate = true and is
            if (toState.authenticate && !isLoggedIn) {
                event.preventDefault();
                //if toState.authenticate = true and isLoggedIn = false
                //Redirect to login page
                $state.go("app.login");
            }

            if (1) { //toState.name == "app.avaliacao"
                console.log("Esse eh o meu estado atual: ", toState.name);
                console.log("Esse o estado de onde venho: ", fromState.name);
            }
        })
        console.log('Hello')
    })
    .config(function($stateProvider, $urlRouterProvider, $mdThemingProvider) {

        $mdThemingProvider.theme('default')
            .primaryPalette('indigo')
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



        //        .state('app.produtos', {
        //            url: "/produtos",
        //            views: {
        //                "products@": {
        //                    templateUrl: 'components/produtos/produtos.view.html',
        //                    controller: 'ProdutosCtrl as vm',
        //                    authenticate: false,
        //                    data: {
        //                        displayName: 'Eletronicos'
        //                    }
        //                }
        //            }
        //
        //        })

        .state('app.produtos.section', {
            url: "/:section",
            views: {
                "products@": {
                    template: 'HUHUHUHUhHUH',
                    //                    controller: 'ProdutosCtrl as vm',
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
                section: function(productCategory) {
                    return productCategory.section;
                    //                    return productCategory.category;

                }
            }
        })

        .state('app.produtos.section.category', {
            url: "/:category",
            views: {
                "products@": {
                    templateUrl: 'components/produtos/produtosLista.view.html',
                    controller: 'PrdCtrl as vm',
                    authenticate: false,
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
                category: function(productCategory) {
                    return productCategory.category;

                },
                section: function(productCategory) {
                    return productCategory.section;
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

        .state('app.signup', {
            url: "/signup",
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

        .state('app.login', {
            url: "/login",
            views: {
                'products@': {
                    templateUrl: 'components/login/login.view.html',
                    controller: 'LoginCtrl as vm',
                    //            template : '<h1>Funciona</h1>',
                }
            },
            data: {
                displayName: 'Login'
            }
        })

        .state('app.dashboard', {
            url: "/app/dashboard",
            views: {
                'products@': {
                    templateUrl: 'components/dashboard/dashboard.view.html',
                    controller: 'Dashboard as vm',
                    authenticate: false,
                }
            },
            data: {
                displayName: 'Dashboard'
            }

        })
        //            .state('dashboard.email', {
        //                url: '/email',
        //                views: {
        //                    "user@app": {
        //                        template: '<h1 style="margin-top:200px">Viwe password</h1>',
        //                        controller: 'controller as vm',
        //                    }
        //                }
        //            })
        .state('app.dashboard.email', {
            url: "/email",
            templateUrl: 'components/dashboard/userAlterarEmail.view.html',
            //            controller: 'blala as vm',
            //            template : '<h1>Funciona</h1>',
            //                authenticate: true
        })
            .state('app.dashboard.password', {
                url: "/password",
                templateUrl: 'components/dashboard/userAlterarSenha.view.html',
                controller: 'Dashboard as vm',
                //                authenticate: true
            })
            .state('app.dashboard.dados', {
                url: "/dados",
                templateUrl: 'components/dashboard/userAlterarDados.view.html',
                controller: 'Dashboard as vm'

                //                authenticate: true
            })
            .state('app.dashboard.endereco', {
                url: "/endereco",
                templateUrl: 'components/dashboard/userAlterarEndereco.view.html',
                data: {
                    displayName: 'Meus endereços'
                }
                //                controller: 'blala as vm',
                //                authenticate: true
            })
            .state('app.dashboard.pedidos', {
                url: "/pedidos",
                templateUrl: 'components/dashboard/pedidos.view.html',
                controller: 'DashboardPedidosCtrl as vm',
                data: {
                    displayName: 'Meus endereços',
                }
                //                controller: 'blala as vm',
                //                authenticate: true
            })



        //        .state('dashboard', {
        //            url: "/dashboard",
        //            views: {
        //                '': {
        //                    templateUrl: 'components/dashboard/dashboard.view.html',
        //                    controller: 'Dashboard as vm'
        //                },
        //                "email@": {
        //                    template: '<h1 style="margin-top:200px">Viwe password</h1>'
        //                },
        //                "password@": {
        //                    template: '<<h1 style="margin-top:200px">view password</h1>>'
        //
        //                }
        //                //                templateUrl: 'components / dashboard / dashboard.view.html ',
        //                //                controller: 'Dashboard as vm',
        //                //                //            template : ' < h1 > Funciona < /h1>',
        //                //                authenticate: true
        //            }
        //        })
        //        console.log('router') $urlRouterProvider.otherwise('home/home');


    });