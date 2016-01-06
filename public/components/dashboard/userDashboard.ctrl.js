(function() {

        'use strict';

        angular.module('myApp').controller('userDashboardCtrl', ['userSrcv', '$q', '$mdDialog', '$scope', userDashboardCtrl])

        function userDashboardCtrl(userSrcv, $q, $mdDialog, $scope) {
            var vm = this;
            //pass the user data to vm
            vm.user = userSrcv.usr.login.data.local
            vm.userUpdateData = function(userData) {
                //TODO: update service function
                userSrcv.usr.update(userData);
            }
        };
    
})();