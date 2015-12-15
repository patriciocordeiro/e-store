(function() {

    "use strict";

    angular.module('myApp').controller('produtoDetailCtrl', ['$scope', '$location', '$anchorScroll', '$rootScope', '$stateParams', 'produtosApi', 'localStorageService', '$cookies', produtoDetailCtrl]);

    function produtoDetailCtrl($scope, $location, $anchorScroll, $rootScope, $stateParams, produtosApi, localStorageService, $cookies) {
        var vm = this;
        $("#img_01").elevateZoom({
            gallery: 'gal1',
            cursor: 'pointer',
            galleryActiveClass: "active",
            imageCrossfade: true,
            //            loadingIcon: "http://www.elevateweb.co.uk/spinner.gif"
        });

        $("#img_01").bind("hover", function(e) {
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
        vm.rating = 2.2;
        vm.options = {
            values: [1, 2, 3, 4, 5],
            //             cssFractional       : "rating-star-fractional",
            allowFractional: true,
            //            cssBaseSelected: "fa-star",
            //            cssBaseUnselected: "fa-star-o",
            readonly: true,
            applyHoverCss: false
        };
        /*Area de atributos do produto*/
        vm.prdDetail = {};
        vm.prdDetail.atr = {};
        vm.prdDetail.disp = {};
        vm.prdDetail = {
            atr: [{
                name: "No Ref. da MP",
                value: 363366
            }, {
                name: "No Ref. do fabricante",
                value: 658877
            }, {
                name: "Fabricante",
                value: "Resistores de Filme Espesso -SMD 1k 1w 5%"
            }, {
                name: "Descrição",
                value: "Resistores de Filme Espesso -SMD 1k 1w 5%"
            }]
        }


        vm.prdDetailDisp = [{
            estoque: "Estoque",
            estoqueVal: 36.00
        }, {
            pedidoMin: "Pedido mínimo",
            pedidoMinVal: "10 unidades"
        }, {
            unitPrice: "Preço Unitário",
            unitPriceVal: "0.60"
        }]
        //Product specifications
        vm.prdSpec = [{
            name: "Marca",
            value: "Philips"
        }, {
            name: "Categoria",
            value: "Resistor"
        }, {
            name: "Resistência",
            value:"1 k"
        }, {
            name: "Tolerância",
            value: "1%"
        }, {
            name: "Potência",
            value: "1 W"
        }, {
            name: "tipo de acabamento",
            value: "SMT/SMD"
        }]


    }
}());