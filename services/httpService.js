//angular.module('.httpService', [])
myApp.factory('httpService', function($resource) {
       return $resource('http://localhost:3000/produtos/:acao:categoria/:id/:tipo_filtro',
       {categoria:'@categoria', tipo_filtro: '@filtro', id:'@id', acao:'@acao'},{'get':{method:'GET', isArray:true},'save':{method:'POST', isArray:true}})
});

myApp.factory('httpServiceAvaliacao', function($resource) {
       return $resource('http://localhost:3000/produtos/avaliar/:categoria/:avaliacao',
       {categoria:'@categoria', avaliacao: '@avaliacao'},{'get':{method:'GET', isArray:true},'save':{method:'POST', isArray:true}})
}); 