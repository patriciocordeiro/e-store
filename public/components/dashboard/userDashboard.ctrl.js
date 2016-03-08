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

        vm.show = [false, false, false, false, false];
		console.log(vm.show);
        vm.userEdit = function(index) {
            vm.show = [false, false, false, false, false];
            vm.show[index] = true;
            console.log(vm.show);
        }
		
		vm.userEditAddress = function(index){
			console.log(userAddress);
		}
		vm.userUpdateAddress = function(userAddress){
			console.log(userAddress);
		}

console.log(vm.user.endereco[0]);
    };

})();