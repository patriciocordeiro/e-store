myApp.controller('navbarCtrl', ['$scope', 'productCategory',
    function($scope, productCategory) {


        $scope.categories = ['tv', 'celular', 'tablet'];
        $scope.SelectedCategory = {
            name: 'selecionar categoria' //initialize the category

        }

        $scope.productCategory = productCategory;
        console.log('catgreeting', $scope.productCategory.category)
        var categoria;
        $scope.getSelectedCategory = function(selectedCategory) {
            productCategory.category = selectedCategory;
            console.log('mudou para', productCategory.category)
        }


    }
]);