angular.module('myApp').directive('productCategoryNavBar', function() {

    return {
        restrict: 'AEC',
        replace: true,
        templateUrl: 'directives/navbar/productCategoryNavBar.view.html'
    }
});