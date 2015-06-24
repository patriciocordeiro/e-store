(function() {

    'use strict';

    angular.module('myApp').controller('Dashboard', ['$rootScope', '$cookies', Dashboard])

    function Dashboard($rootScope, $cookies) {
        var vm = this;
        vm.user = 'patricio';

        vm.user = $rootScope.user;
        console.log('usuario logado',  vm.user);
        console.log("usuario logado", $cookies.get('usuario'));

    };

})();