angular.module('myApp').service('authentication', ['httpLoginService',
    function(httpLoginService) {

        this.signup = function(query, callback) {

            httpLoginService.save({
                acao: 'signup',
            }, query).$promise.then(function(data) {
                data.abc = true;
                //console.log(data);
                return callback(data);
            });

        };

        this.loginLocal = function(query, callback) {
            httpLoginService.save({
                acao: 'login',
            }, query).$promise.then(function(data) {
                data.abc = true;
                //console.log(data);
                return callback(data);
            });

        };

        this.loginFacebook = function(callback) {
            httpLoginService.get({
                acao: 'login',
                social:'facebook'
            }).$promise.then(function(data) {
                data.abc = true;
                //console.log(data);
                return callback(data);
            });

        };
        this.isloggedin = function(callback) {
            httpLoginService.get({
                acao: 'isloggedin',
            }, function(data) {
                return callback(data);
            });

        };

        this.logOut = function(callback) {
            httpLoginService.get({
                acao: 'logout',
            }, function(data) {
                return callback(data);
            });

        };
    }
])