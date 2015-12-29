(function() {
    'use strict';

    angular.module('myApp').controller('PrdSectionCtrl', ['$mdBottomSheet', PrdSectionCtrl]);

    function PrdSectionCtrl($mdBottomSheet) {
        var vm = this;
        vm.showSubsec = false;
         vm.showListBottomSheet = function(){
             vm.showSubsec = !vm.showSubsec;
         }
//        vm.showListBottomSheet = function($event) {
////            $scope.alert = '';
//            $mdBottomSheet.show({
//                templateUrl: 'components/produtos/productSubsection.view.html',
//                controller: 'PrdSectionCtrl',
//                targetEvent: $event,
//                parent: "#subSectbootomSheet"
//            }).then(function(clickedItem) {
////                $scope.alert = clickedItem['name'] + ' clicked!';
//            });
//        };
    }
}());