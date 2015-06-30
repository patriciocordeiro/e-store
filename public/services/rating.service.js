angular.module('myApp').service('ratingService', function(){
    var id;
    var categoria;
    var avaliacao;

    this.getId = function(){
    	return id;
    };

    this.setId = function(value){
    	id = value;
    };

    this.getCategoria = function(){
    	return categoria;
    };

    this.setCategoria = function(value){
    	categoria = value;
    };

    this.getAvaliacao = function(){
    	return avaliacao;
    };

    this.setAvaliacao = function(value){
    	avaliacao = value;
    };
});