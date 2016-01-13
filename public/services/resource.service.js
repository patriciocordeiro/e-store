angular.module('myApp').service('httpService', function($resource) {
    this.prd =
        $resource('http://localhost:3000/produtos/:acao/:categoria/:id/:tipo_filtro', {
            categoria: '@categoria',
            tipo_filtro: '@filtro',
            id: '@id',
            acao: '@acao'
        }, {
            'get': {
                method: 'GET',
                isArray: true
            },
            'save': {
                method: 'POST',
                isArray: false
            }
        })
})

angular.module('myApp').factory('httpServiceAvaliacao', function($resource) {
    return $resource('http://localhost:3000/produtos/avaliar/:categoria/:avaliacao', {
        categoria: '@categoria',
        avaliacao: '@avaliacao'
    }, {
        'get': {
            method: 'GET',
            isArray: true
        },
        'save': {
            method: 'POST',
            isArray: true
        }
    })
});


//htt sevice for signup and login
angular.module('myApp').factory('httpLoginService', function($resource) {
    return $resource('http://localhost:3000/:acao/:social', {
        acao: '@acao',
        social: '@social'
    }, {
        'get': {
            method: 'GET',
            isArray: false
        },
        'save': {
            method: 'POST',
            isArray: false
        }
    })
});

angular.module('myApp').factory('httpUserService', function($resource) {
    return $resource('http://localhost:3000/user/:acao', {
        acao: '@acao'
    }, {
        'get': {
            method: 'GET',
            isArray: false
        },
        'save': {
            method: 'POST',
            isArray: false
        }
    })
});