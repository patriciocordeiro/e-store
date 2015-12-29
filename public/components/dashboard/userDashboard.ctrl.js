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

            //        $scope.showAlert = function(ev) {
            // Appending dialog to document.body to cover sidenav in docs app
            // Modal dialogs should fully cover application
            // to prevent interaction outside of dialog
            //            $mdDialog.show({
            //                controller: 'userDashboardCtrl as vm',
            //                template: '<md-dialog><md-dialog-content>Hello</md-dialog></md-dialog-content>',
            //                parent: angular.element(document.body),
            //                targetEvxent: ev,
            //                clickOutsideToClose: false
            //
            //            })
        };
    
})();