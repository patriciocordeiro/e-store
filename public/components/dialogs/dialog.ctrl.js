(function() {
    'use strict';
    angular.module('myApp').controller('DialogCtrl', ['$mdDialog', DialogCtrl]);

    function DialogCtrl($mdDialog) {
        var vm = this;
        vm.closeDialog = function() {
            $mdDialog.hide();
        }
    }
})();