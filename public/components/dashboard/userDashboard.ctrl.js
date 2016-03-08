(function() {

    'use strict';

    angular.module('myApp').controller('userDashboardCtrl', ['userSrcv', 'generalSrvc', '$q', '$mdDialog', '$scope', userDashboardCtrl])

    function userDashboardCtrl(userSrcv, generalSrvc, $q, $mdDialog, $scope) {
        var vm = this;
        //pass the user data to vm
        vm.user = userSrcv.usr.login.data.local
        vm.userUpdateData = function(userData) {
            //TODO: update service function
            userSrcv.usr.update(userData);
        }


        vm.show = [false, false, false, false, false];
        console.log(vm.show);
        vm.userEdit = function(index) {
            vm.show = [false, false, false, false, false];
            vm.show[index] = true;
            console.log(vm.show);
        }

        //Address update handle
        var nAddress = vm.user.endereco.length; // number of addresses
        generalSrvc.openAll(nAddress).then(function(data) {
            vm.userIsEditAddress = data;
            console.log(vm.userIsEditAddress);
        });
        console.log(vm.userIsEditAddress);
        vm.userEditAddress = function(index) {
            console.log(index);
            //first close all edit area
            vm.userIsEditAddress = generalSrvc.closeAll(nAddress).then(function(data) {
                //close all
                vm.userIsEditAddress = data;
                //open the clicked address edit area
                vm.userIsEditAddress[index] = false;
                console.log(vm.userIsEditAddress);
            });
        }
        vm.userUpdateAddress = function(userAddress) {
            console.log(userAddress);

            generalSrvc.openAll(nAddress).then(function(data) {
                vm.userIsEditAddress = data;
                console.log(vm.userIsEditAddress);
            });
        }

        console.log(vm.user.endereco[0]);
    };

})();