var myApp = angular.module('myApp', ['ngResource', 'ui.router'])


.config(function($stateProvider, $urlRouterProvider) {


    $stateProvider
        .state('app', {
            abstract: true,
            url: "/home",
            template: '<ui-view/>',

        })

    .state('app.home', {
        url: "/home",
        templateUrl: 'components/home/home.html',
        controller: 'homeCtrl'
    })


    .state('app.categoria', {
        url: "/categoria",
        templateUrl: 'components/categoria/categoria.html',
        controller: 'categoriaCtrl'
        //            template : '<h1>Funciona</h1>',

    })

    .state('app.search', {
        url: "/search",
        templateUrl: 'components/searchResults/searchResults.html',
        controller: 'searchResultsCtrl'
        //            template : '<h1>Funciona</h1>',

    })

    .state('app.signup', {
        url: "/signup",
        templateUrl: 'components/signup/signup.html',
        controller: 'signupCtrl'
        //            template : '<h1>Funciona</h1>',

    })

    .state('app.login', {
        url: "/login",
        templateUrl: 'components/login/login.html',
        controller: 'loginCtrl',
        //            template : '<h1>Funciona</h1>',
        authenticate:true
        

    })
    console.log('router')
    $urlRouterProvider.otherwise('home/home');
});