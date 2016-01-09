(function() {
    'use strict';

    angular.module('myApp').controller('SignupCtrl', ['userSrcv', SignupCtrl]);

    function SignupCtrl(userSrcv) {
        var vm = this;
        vm.createUser = function(newUser) {
            console.log(newUser);
            userSrcv.usr.signup.createUsr(newUser);
        };
        vm.closeDialog = function() {
            userSrcv.usr.closeDialog();
        }
    }

})();