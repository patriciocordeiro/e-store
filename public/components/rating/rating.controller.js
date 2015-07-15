(function () {
	'use strict';

	angular.module('myApp').controller('RatingProductCtrl', ['$scope', '$rootScope', '$stateParams', 'localStorageService', 'produtosApi', '$state', RatingProductCtrl]);
	

	vm.avaliacaoNotOK = false;

	vm.avaliacao = 0;

	function RatingProductCtrl ($scope, $rootScope, $stateParams, localStorageService, produtosApi, $state){
		var vm = this;
		//localStorageService.set('idProdutoAvaliacao', $stateParams.id);
		vm.title = "Avaliação: " + localStorageService.get('nomeProdutoAvaliado');

		vm.botaoConfirmar = function(){
			var query = {};

			query.id = localStorageService.get('idProdutoAvaliado');

			query.titulo = vm.titulo;
			query.avaliacao = parseInt(vm.avaliacao);
			query.opiniao = vm.opiniao;
			query.nome = vm.nome;
			query.email = vm.email;

			console.log("Eu vou enviar para o servidor: ", query);

			if(query.titulo === undefined || query.avaliacao === NaN || query.nome === undefined || query.email === undefined){
				vm.avaliacaoNotOK = true;
			}else{
				produtosApi.getRatingProduct(query, function(data){
					console.log("Dado retornado da minha avaliacao: ", data);

					if(data[0].retorno === "Obrigado por avaliar"){
						$state.go("app.home");
					}else{
						vm.avaliacaoNotOK = true;
					}
				});
			}
		}

		vm.botaoCancelar = function(){
			console.log("Qualquer coisa");
			$state.go("app.home");
		}
	}
})();