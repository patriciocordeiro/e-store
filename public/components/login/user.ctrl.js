(function() {
    'use strict';
    angular.module('myApp').controller('UserCtrl', ['userSrcv', '$mdDialog','$state', UserCtrl]);

    function UserCtrl(userSrcv, $mdDialog, $state) {
        var vm = this;


        //Execute the password reset if any
        userSrcv.usr.checkResetPassToken();
        vm.user = {
            newPassword: '',
            //            token:$stateParams.token,
        };



        vm.forgotPass = function(email) {
            userSrcv.usr.forgotPass(email);
        }

        vm.resetPass = function(user) {
            userSrcv.usr.resetPass(user.newPassword);
        }

        vm.addNewAddress = function(newAddress) {
            console.log(newAddress);
            userSrcv.usr.addNewAddress.creteNew(newAddress);
        };

        vm.closeDialog = function(answer) {
            $mdDialog.hide(answer)
            console.log(answer);
        };

        vm.cancelDialog = function() {
            $mdDialog.cancel();
        };


    }
})();