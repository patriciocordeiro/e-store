angular.module('myApp').directive('myBootstrapNavBar', function() {

    return {
        restrict: 'AEC',
        replace: true,
        templateUrl: 'components/navbar/navbar.view.html'
    }
});