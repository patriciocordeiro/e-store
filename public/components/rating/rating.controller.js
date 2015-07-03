(function () {
	'use strict';

	angular.module('myApp').controller('RatingProductCtrl', ['$scope', '$rootScope', '$stateParams', 'localStorageService', 'produtosApi', RatingProductCtrl]);

	function RatingProductCtrl ($scope, $rootScope, $stateParams, localStorageService, produtosApi){
		var vm = this;
		//localStorageService.set('idProdutoAvaliacao', $stateParams.id);
		vm.title = "Avaliação: " + localStorageService.get('idProdutoAvaliado') + " - " + localStorageService.get('nomeProdutoAvaliado');

		vm.botaoConfirmar = function(){
			var query = {};

			query.id = localStorageService.get('idProdutoAvaliado');

			query.titulo = vm.titulo;
			query.avaliacao = parseInt(vm.avaliacao);
			query.opiniao = vm.opiniao;
			query.nome = vm.nome;
			query.email = vm.email;

			console.log("Eu vou enviar para o servidor: ", query);

			produtosApi.getRatingProduct(query, function(data){
				console.log("Dado retornado da minha avaliacao: ", data);
			});
		}
	}
})();