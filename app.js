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
    
        .state('app.login', {
        url: "/login",
        templateUrl: 'components/registerLogin/registerLogin.html',
        controller: 'registerLoginCtrl'
        //            template : '<h1>Funciona</h1>',

    })
    
    
    console.log('router')
    $urlRouterProvider.otherwise('home/home');
});