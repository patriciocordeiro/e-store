angular.module('myApp').service('myFilters', [

    function() {
        console.log('SERVICO FILTRO INICIADO')
        this.revomeDuplicates = function(myObject) {
            var result = [];
            _(myObject[0]).forEach(
                function(n, key) {
                    result.push(key);
                }).value();
            //remova os campos que não deseja usar como filtro
            var filtersNameTemp = _.without(result, '_id', 'tags', 'nome', 'lancamento', 'avaliacao_produto', 'preco', 'categoria')
            //remova os caracteres como:"_", "/", etc\
            filtersNameLength = filtersNameTemp.length;
            var filtersName =[];
            for(var i=0; i<filtersNameLength; i++){
//                filtersName[i] = filtersNameTemp[i].replace(/_/g, ' ')
                filtersName[i] = filtersNameTemp[i]
            }

            //Abaixo usamos lodash para filtrar e tal
            var uniqueValueArray = [];
            uniqueValueArray.push(filtersName);
            var uniquefiltered = [];
            var test = {};
            _(filtersName).forEach(function(filterName, n) {
                var uniqueValue = _.chain(myObject)
                    .unique(filterName) //remove duplicados 
                .sortBy(filterName) // Organizar em ordem alfabetica
                .value()
                /*
                    Retorne apenas os campos correspondentes 
                    aos nomes dos filtros
                    Ex:(marca, tamanho_tela, etc)
                */
                _(uniqueValue).forEach(function(val) {
                    /*o pick (lodash) vai retornar 
                      apenas o campo filtername*/
                uniquefiltered.push(_.pick(val, filterName));
                }).value();
                uniqueValueArray.push(_.pluck(uniquefiltered, filterName));
                uniquefiltered = [];
            }).value();
            return uniqueValueArray;
        };

    }
]);