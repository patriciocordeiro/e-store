'use strict'
angular.module("myApp", ['ngResource', 'ui.router', 'ui.bootstrap', 'ngCookies', 'LocalStorageModule', 'validation.match', 'ui.mask'])
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
    .config(function($stateProvider, $urlRouterProvider) {


        $stateProvider
            .state('app', {
                abstract: true,
                url: "/app",
                template: '<ui-view/>',

            })

        .state('app.home', {
            url: "/home",
            templateUrl: 'components/home/home.view.html',
            controller: 'HomeCtrl'
        })


        .state('app.produtos', {
            url: "/produtos",
            templateUrl: 'components/produtos/produtos.view.html',
            controller: 'ProdutosCtrl as vm',
            authenticate: true
            //            template : '<h1>Funciona</h1>',

        })

        .state('app.produtosDetail', {
            url: "/produtos/:id",
            templateUrl: 'components/produtos/produtoDetail.view.html',
            controller: 'produtoDetailCtrl as vm',
            authenticate: true

        })

        .state('app.avaliacao', {
            url: "/avaliacao/:id",
            templateUrl: 'components/rating/ratingProduct.view.html',
            controller: 'RatingProductCtrl as vm',
            authenticate: true

        })

        .state('app.minhaCesta', {
            url: "/minhaCesta",
            templateUrl: 'components/produtos/minhaCesta.view.html',
            controller: 'MinhaCestaCtrl as vm',
            authenticate: true
            //            template : '<h1>Funciona</h1>',

        })

        .state('app.search', {
            url: "/search",
            templateUrl: 'components/search/search.view.html',
            controller: 'SearchResultsCtrl as vm'
            //            template : '<h1>Funciona</h1>',

        })

        .state('app.signup', {
            url: "/signup",
            templateUrl: 'components/signup/signup.view.html',
            controller: 'SignupCtrl as vm'
            //            template : '<h1>Funciona</h1>',

        })

        .state('app.login', {
            url: "/login",
            templateUrl: 'components/login/login.view.html',
            controller: 'LoginCtrl as vm',
            //            template : '<h1>Funciona</h1>',



        })

        .state('dashboard', {
            url: "/dashboard",
            templateUrl: 'components/dashboard/dashboard.view.html',
            controller: 'Dashboard as vm',
            //            template : '<h1>Funciona</h1>',
            authenticate: true,




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
        .state('dashboard.email', {
            url: "/email",
            templateUrl: 'components/dashboard/userAlterarEmail.view.html',
            //            controller: 'blala as vm',
            //            template : '<h1>Funciona</h1>',
            //                authenticate: true
        })
            .state('dashboard.password', {
                url: "/password",
                templateUrl: 'components/dashboard/userAlterarSenha.view.html',
                controller: 'Dashboard as vm',
                //                authenticate: true
            })
            .state('dashboard.dados', {
                url: "/dados",
                templateUrl: 'components/dashboard/userAlterarDados.view.html',
                controller: 'Dashboard as vm',
                //                authenticate: true
            })
            .state('dashboard.endereco', {
                url: "/endereco",
                templateUrl: 'components/dashboard/userAlterarEndereco.view.html',
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