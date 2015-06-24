(function {

    'use strict'

    angular.module('myApp').service('myFilters')

    function() {
        this.filtroComum = function() {

        }

        this.filtroFaixa = function() {

        }

        this.remDuplicate = function(value) {
            //console.log("Meus objetos ", objetos);
            var v = [];
            var exit = true;
            var j = 0;
            if (objetos.length != 0) { // Quando é clicado em "selecionar categoria", a função ng-click entende como uma ação e 
                // manda um vetor vazio para a função, então não deve-se fazer nada
                // Esse loop elimina os elementos iguais para serem mostrados no filtro
                for (var i = 0; i < objetos.length; i++) {
                    if (v.length != 0) {
                        while (exit) {
                            if (objetos[i].marca === v[j].marca) {
                                exit = false;
                            } else if ((objetos[i].marca !== v[j].marca) && (j == v.length - 1)) {
                                v.push(objetos[i]);
                            }
                            j++;
                        }
                        j = 0;
                        exit = true;
                    } else {
                        v.push(objetos[i]);
                    }
                }
            }
            console.log("Minhas marcas nesse vetor: ", v);
            return (v);
        }
    }

})();