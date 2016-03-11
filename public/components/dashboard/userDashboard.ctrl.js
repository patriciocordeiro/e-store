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

        //---------user general settings update--------------------------- 
        vm.userUpdate = {};
        var nSettings = 5; // number of settings
        generalSrvc.closeAll(nSettings).then(function(data) {
            vm.userIsEditSettings = data; //set all to false
            console.log(vm.userIsEditAddress);
        });

        vm.userEditSettings = function(index) {
            //first close all edit area
            generalSrvc.closeAll(nSettings).then(function(data) {
                //close all
                vm.userIsEditSettings = data;
                //open the clicked address edit area
                vm.userIsEditSettings[index] = true;
                console.log(vm.userIsEditSettings);
            });
        }

        vm.userUpdateSettings = function(user) {
            console.log(user);
            if (user == 'cancell')
            //close all 
                generalSrvc.closeAll(nSettings).then(function(data) {
                    //close all
                    vm.userIsEditSettings = data;
                    console.log(vm.userIsEditSettings);
                });
            else {
                //update user settings
                console.log(user);
                userSrcv.usr.update(user);
            }
        }
        vm.userEditSettingsCancell = function() {
            generalSrvc.closeAll(nAddress).then(function(data) {
                //close all
                vm.userIsEditAddress = data;
                console.log(vm.userIsEditAddress);
            });
        }

        //---------------------------------------------------------------

        //Address update handle------------------------------------------
        var nAddress = vm.user.endereco.length; // number of addresses
        generalSrvc.openAll(nAddress).then(function(data) {
            vm.userIsEditAddress = data;
            console.log(vm.userIsEditAddress);
        });
        console.log(vm.userIsEditAddress);
        vm.userEditAddress = function(index) {
            console.log(index);
            //first close all edit area
            generalSrvc.openAll(nAddress).then(function(data) {
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
        //-----------------------------------------------------------------------------


    };

})();