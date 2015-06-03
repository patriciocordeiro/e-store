myApp.service('authentication', ['httpLoginService',
    function(httpLoginService) {

        this.signup = function(query, callback) {

            httpLoginService.save({
                acao: 'signup',
            }, query, function(data) {
                data.abc = true;
                //console.log(data);
                return callback(data);
            });

        };

        this.login = function(query, callback) {
            httpLoginService.save({
                acao: 'login',
            }, query, function(data) {
                data.abc = true;
                //console.log(data);
                return callback(data);
            });

        };
    }
])