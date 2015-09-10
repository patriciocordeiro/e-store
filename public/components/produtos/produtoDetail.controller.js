(function() {

    "use strict";

    angular.module('myApp').controller('produtoDetailCtrl', ['$scope', '$location', '$anchorScroll', '$rootScope', '$stateParams', 'produtosApi', 'localStorageService', '$cookies', produtoDetailCtrl]);

    function produtoDetailCtrl($scope, $location, $anchorScroll, $rootScope, $stateParams, produtosApi, localStorageService, $cookies) {
        var vm = this;
//        vm.myImage = ["../../assets/img/large/image1.jpg"]

        //Get the product id from the state params
        //The Id is passed via url
        //$stateParams.id = localStorageService.get('idProdutoDetalhe');

        //                $(document).ready(function() {
        //                alert('ola')
        //        $('#zoom_01').elevateZoom({
        //            zoomType: "inner",
        //            cursor: "crosshair",
        //            zoomWindowFadeIn: 500,
        //            zoomWindowFadeOut: 750
        //        });
        //            });

        $("#img_01").elevateZoom({
            gallery: 'gal1',
            cursor: 'pointer',
            galleryActiveClass: "active",
            imageCrossfade: true,
            //            loadingIcon: "http://www.elevateweb.co.uk/spinner.gif"
        });

        $("#img_01").bind("hover", function(e) {
            //            alert('hello')
            //            alert( $('#img_01').prop('src') );

            var ez = $('#img_01').data('elevateZoom');
            ez.closeAll(); //NEW: This function force hides the lens, tint and window	
            $.fancybox(ez.getGalleryList());
            return false;
        });



        vm.productId = $stateParams.id
        vm.idExists = false; //Exibe uma mensagem quando o produto já existe no carrinho
        var query = {}
        $rootScope.CarrinhoItens = [];
        $rootScope.CarrinhoProdutos = [];

        query.id = $stateParams.id

        console.log("O id do produto eh ", $stateParams.id);
        //get the product data on the server db
        produtosApi.getProductDetails(query, function(response) {
            vm.selectedProduct = response[0];
            var postDate = new Date(vm.selectedProduct.avaliacao_produto[0].data);
            console.log('data da postagem', postDate.getMonth());

        });

        //------------------------------------------------------------------------
        //Leitura de cookies
        //------------------------------------------------------------------------
        //verifique se os cookies com os Ids existem 
        if (localStorageService.get('carrinho')) {
            //Armazene os ids 
            $rootScope.CarrinhoItens = localStorageService.get('carrinho').split(',');
            console.log('Carinho no detalhe', $rootScope.CarrinhoItens)
        }
        //------------------------------------------------------------------------
        //------------------------------------------------------------------------

        //------------------------------------------------------------------------
        //funcçao para obter a compra
        //------------------------------------------------------------------------
        vm.getCompra = function() {
            //verifique se o ID já existe (Se o produto já está no carrinho) 
            vm.idExists = _.includes($rootScope.CarrinhoItens, vm.productId);
            if (vm.idExists == false) {
                //Se o id não existe:
                //Adicicione o novo ID no array de itens
                $rootScope.CarrinhoItens.push(vm.productId);
                $rootScope.CarrinhoProdutos.push(vm.selectedProduct);
                //verifique se os cookies com os Ids existem 
                if (!localStorageService.get('carrinho')) {
                    //Não existem: Adicione o primeiro ID
                    localStorageService.set('carrinho', $rootScope.CarrinhoProdutos[0]._id);
                } else {
                    //Existe: Adicione mais IDs aos existentes
                    localStorageService.set('carrinho', localStorageService.get('carrinho') + "," + $rootScope.CarrinhoProdutos[0]._id);
                }
                console.log("Variavel recupera id = ", localStorageService.get('carrinho'));
            } else {
                console.log('Produto já se encontra no carrinho')
            }

            //            console.log('Número de Itens no carrinho', $rootScope.CarrinhoItens.length);
            //            console.log('Itens no carrinho', $rootScope.CarrinhoProdutos[0]);
            //$cookies.meuCarrinho = $rootScope.CarrinhoProdutos._id;
            //localStorageService.set('carrinho', $rootScope.CarrinhoProdutos[0]._id);

            // recuperar o valor de localStorage (LS)
            // concatenar a medida que o usuário vai inserindo produto no carrinho

            //            if (localStorageService.get('carrinho') === null) {
            //                localStorageService.set('carrinho', $rootScope.CarrinhoProdutos[0]._id);
            //            } else {
            //                localStorageService.set('carrinho', localStorageService.get('carrinho') + "," + $rootScope.CarrinhoProdutos[0]._id);
            //            }
            //            console.log("Variavel recupera id = ", localStorageService.get('carrinho'));
        }

        // Função para armazenamento local da informação do id e nome do produto
        vm.armazenarInformacao = function(id, nome) {
            //console.log("EU RECEBI ", id);
            //console.log("EU RECEBI ", nome);
            localStorageService.set('idProdutoAvaliado', id);
            localStorageService.set('nomeProdutoAvaliado', nome);
        }

        //Automatic scroll down
        $scope.gotoBottom = function() {
            // set the location.hash to the id of
            // the element you wish to scroll to.
            $location.hash('product-information');

            // call $anchorScroll()
            $anchorScroll();
        };

        //Resumo da avaliação do produto
        //        vm.numeroEstrelas =  

        /*Initialize the bootstrap rating
         with plugin options*/
        //        $(document).ready(function() {
        //            $("#input-2").rating({
        //                //            console.log('hello')
        //                min: 1,
        //                max: 5,
        //                step: 1,
        //                size: 'lg'
        //            });
        //        });

        vm.rating = 2.2;
        vm.options = {
            values: [1, 2, 3, 4, 5],
//             cssFractional       : "rating-star-fractional",
            allowFractional	: true,
//            cssBaseSelected: "fa-star",
//            cssBaseUnselected: "fa-star-o",
            readonly: true,
            applyHoverCss: false
        };
        console.log('TATE')

    }
}());