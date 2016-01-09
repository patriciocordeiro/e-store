(function() {
    'use strict';
    angular.module('myApp').controller('usrLoginCtrl', ['userSrcv', '$mdDialog', usrLoginCtrl]);

    function usrLoginCtrl(userSrcv, $mdDialog) {
        var vm = this;
        vm.user = {
            email: '',
            password: '',
            newPassword: ''
        };
        vm.loginMsg = '';
        /*Execute login*/
        vm.loginLocal = function(user, isSaveSection) {
            userSrcv.usr.login.local(user, isSaveSection, function(msg) {
                vm.loginMsg = msg;
                userSrcv.usr.login.clearForm(user, function(clearUser) {
                    vm.user = clearUser;
                })
            })

        };

        vm.forgotPass = function(email) {
            userSrcv.usr.forgotPass(email);
        }

        vm.resetPass = function(user) {
            userSrcv.usr.resetPass(user.newPassword);
        }

    }
})();