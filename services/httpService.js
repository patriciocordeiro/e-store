//angular.module('.httpService', [])
myApp.factory('httpService', function($resource) {
       return $resource('http://localhost:3000/produtos/:categoria/:id/:tipo_filtro',
       {categoria:'@categoria', tipo_filtro: '@filtro', id:'@id'},{'get':{method:'GET', isArray:true},'save':{method:'POST', isArray:true}})
}); 