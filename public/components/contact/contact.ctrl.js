(function() {
    'use strict';
    angular.module('myApp').controller('contactCtrl', [contactCtrl]);

    function contactCtrl() {
        var vm = this;
        /*Text area Character count*/
        //this will have the message
		vm.contactMsg = '';
		//max number of chars
        vm.maxNumOfChars = 1000;
		//remaining chars to enter
		vm.remainChars = vm.maxNumOfChars;
        vm.getNumOfChars = function() {
            console.log(vm.contactMsg.length);
            vm.remainChars = vm.maxNumOfChars - vm.contactMsg.length
        }
    }

})();