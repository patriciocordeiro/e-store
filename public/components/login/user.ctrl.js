(function() {
    'use strict';
    angular.module('myApp').controller('UserCtrl', ['userSrcv', '$stateParams', UserCtrl]);

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

    }
})();