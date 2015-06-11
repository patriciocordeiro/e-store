angular.module("myApp", ['ngResource', 'ui.router', 'ui.bootstrap'])

.run(function($rootScope, $state) {
    $rootScope.$on('$stateChangeStart', function(event, toState, fromState, toParams) {

        var loggedIn = false;
        console.log('Hello root', $rootScope.logedUser)

        console.log('mudei de estado', toState)

        console.log($rootScope.logedUser)
        //        var restrictedPage = null;
        //        restrictedPage = (toState, 'app.dashboard');
        //        if (fromState.url === '^') {
        if (toState.authenticate && !$rootScope.logedIn) {
            event.preventDefault();
            $state.go("app.login");
        }
        //        else {
        //             event.preventDefault();
        //            $state.go("app.dashboard")
        //        };
        //        }
    })
    console.log('Hello')
})
    .config(function($stateProvider, $urlRouterProvider) {


        $stateProvider
            .state('app', {
                abstract: true,
                url: "/home",
                template: '<ui-view/>',

            })

        .state('app.home', {
            url: "/home",
            templateUrl: 'components/home/home.view.html',
            controller: 'HomeCtrl'
        })


        .state('app.categoria', {
            url: "/categoria",
            templateUrl: 'components/categoria/categoria.view.html',
            controller: 'CategoriaCtrl as vm',
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

        .state('app.dashboard', {
            url: "/dashboard",
            templateUrl: 'components/dashboard/dashboard.view.html',
            controller: 'Dashboard as vm',
            //            template : '<h1>Funciona</h1>',
//            authenticate: true


        })
        console.log('router')
        $urlRouterProvider.otherwise('home/home');
    });