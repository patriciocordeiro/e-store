(function() {

    'use strict';

    angular.module('myApp').controller('userDashboardCtrl', ['userSrcv', '$q', '$mdDialog', '$scope', userDashboardCtrl])

    function userDashboardCtrl(userSrcv, $q, $mdDialog, $scope) {
        var vm = this;
        //pass the user data to vm
        vm.user = userSrcv.usr.login.data.local
        vm.userUpdateData = function(userData) {
            //TODO: update service function
//            userSrcv.usr.update(userData);
            vm.show = [false, false, false, false, false];

        }

        vm.show = [false, false, false, false, false];
        console.log(vm.show);
        vm.userEdit = function(index) {
            vm.show = [false, false, false, false, false];
            vm.show[index] = true;
            console.log(vm.show);
        }

        vm.userChangeName = function(userNewName) {
            console.log(userNewName);
            vm.show = false;
            console.log(vm.show);
        }

        vm.userChangePass = function(userNewPass) {
            console.log(userNewPass);
        }

        vm.userChangeCellPhone = function(userNewCellPhone) {
            console.log(userNewCellPhone);
        }
        vm.userChangePhone = function(userNewPhone) {
            console.log(userNewPhone);
        }

    };

})();