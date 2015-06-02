myApp.controller('navbarCtrl', ['$scope', 'productCategory', 'searchProducts',

    function($scope, productCategory, searchProducts) {


        $scope.categories = ['tv', 'celular', 'tablet'];
        $scope.SelectedCategory = {
            name: 'selecionar categoria' //initialize the category

        }

        $scope.productCategory = productCategory;
        console.log('catgreeting', $scope.productCategory.category)
//        var categoria;
        $scope.getSelectedCategory = function(selectedCategory) {
            productCategory.category = selectedCategory;
            console.log('mudou para', productCategory.category)
        }

        
        
        $scope.searchProducts = searchProducts;
        console.log($scope.getSearch)
        
        $scope.getSearchValue = function(searchValue){
            
            searchProducts.value = searchValue;
            console.log(searchProducts.value)
        }
    }




]);