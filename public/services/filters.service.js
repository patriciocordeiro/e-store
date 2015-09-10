angular.module('myApp').service('myFilters', [

    function() {

        console.log('Filters')
        //        this.revomeDuplicates = function(myObject, type) {
        //            var result = _.chain(myObject)
        //            .unique(type) //remove duplicados 
        //            .sortBy(type) // Organizar em ordem alfabetica
        //            .value();
        //            return result
        //        }

        this.revomeDuplicates = function(myObject) {


            var result = [];
            //            var teste = myObject[0];

            _(myObject[0]).forEach(
                function(n, key) {
                    //                   vm.filterName  = key;
                    console.log(key);
                    result.push(key);
                }).value();
            console.log(result);
            //remova os campos que não deseja usar como filtro
            var filtersNameTemp = _.without(result, '_id', 'tags', 'nome', 'lancamento', 'avaliacao_produto', 'preco', 'categoria')
            //remova os caracteres como:"_", "/", etc\
            filtersNameLength = filtersNameTemp.length;
            var filtersName =[];
            for(var i=0; i<filtersNameLength; i++){
                filtersName[i] = filtersNameTemp[i].replace(/_/g, ' ')
                console.log(filtersName[i]);
            }
            
//            var input = ["mila_cordeiro"] 
//            input.replace(/[^\w\s]/gi, '')
//            console.log(input.replace(/_\W/g, ' '))
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
                console.log(_.pluck(uniquefiltered, filterName));
                uniqueValueArray.push(_.pluck(uniquefiltered, filterName));
                //                uniqueValueArray.push(uniquefiltered);
                uniquefiltered = [];
                //                console.log(test)


            }).value();

            console.log('minha', uniqueValueArray);
            return uniqueValueArray;

        };

    }
]);