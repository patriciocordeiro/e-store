angular.module('myApp').directive('modalAvaliacao', function(){
    return {
        restrict:'AEC',
        templateUrl: 'directives/modal/modalAvaliacao.view.html'
    }
});

angular.module('myApp').directive('modalVisualizacao', function(){
    return {
        restrict:'AEC',
        templateUrl: 'directives/modal/modalVisualizacao.view.html'
    }
});