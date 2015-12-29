(function() {
    'use strict';
    angular.module('myApp').controller('usrLoginCtrl', ['userSrcv', usrLoginCtrl]);

    function usrLoginCtrl(userSrcv) {
        var vm = this;
        vm.user = {
            email: '',
            password: ''
        };
        vm.loginMsg ='';
        /*Execute login*/
        vm.loginLocal = function(user, isSaveSection) {
            userSrcv.usr.login.local(user, isSaveSection, function(msg) {
                vm.loginMsg = msg;
                userSrcv.usr.login.clearForm(user, function(clearUser){
                  vm.user = clearUser;  
                })
            })

        };
    }
})();