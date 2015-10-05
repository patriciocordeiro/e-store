angular.module('myApp').service('productCategory', function ProductCategory() {
    
    var productCategory = this;
    
    console.log("Servico productCategory INICIALIZADO");
    productCategory.category = '';
    productCategory.section = '';

})