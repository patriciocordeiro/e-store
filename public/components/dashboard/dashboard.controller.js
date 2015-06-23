(function() {

    'use strict';

    angular.module('myApp').controller('Dashboard', ['$rootScope', Dashboard])

    function Dashboard($rootScope) {
        var vm = this;
        vm.user = 'patricio';

        vm.user = $rootScope.user;
        console.log('usuario logado',  vm.user)

    };

})();