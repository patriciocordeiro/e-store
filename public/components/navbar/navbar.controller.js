(function() {

    'use strict';

    angular.module('myApp').controller('NavbarCtrl', ['$rootScope', '$scope', 'productCategory', 'SearchProducts', '$cookies', 'localStorageService', '$mdToast', '$document', 'productSrvc', NavbarCtrl]);

    function NavbarCtrl($rootScope, $scope, productCategory, SearchProducts, $cookies, localStorageService, $mdToast, $document, productSrvc) {
        var vm = this;
        vm.user = $rootScope.user;
        //console.log('rootscope captured user', $rootScope.user)

        /*Toast para mostrar a introducao de um produto no carrinho*/
        vm.showPutedInCartToast = function() {
            $mdToast.show({
                controller: 'myCartToastCtrl as vm',
                templateUrl: '/components/produtos/meuCarrinhoToast.view.html',
                parent: $document[0].querySelector('#myCartToast'),
                hideDelay: 30000,
                position: 'top right'
            });
        }
        vm.SelectedCategory = {
            name: 'selecionar categoria' //initialize the category

        };

        // Obtendo valor a partir do cookie
        // Utiliza-se esse tipo de estrutura para evitar que no local de usuário não apareça nada
        //console.log('Usuario armazenado no cookie', $cookies.get('usuario'));
        /*if($cookies.get('usuario') === undefined){
            $scope.usuarioLogado = "visitante";
        }else{
            $scope.usuarioLogado = $cookies.get('usuario');
        }*/
        $scope.prdCatg = productSrvc.prdCatg;
        console.log($scope.prdCatg);
        //        $scope.productCategory = productCategory;
        //        console.log('catgreeting', $scope.productCategory.category)
        //        var categoria;
        //        vm.getSelectedCategory = function(selectedCategory) {
        //            productCategory.category = selectedCategory;
        //            productSrvc.prdCatg = selectedCategory;
        //            console.log('mudou para', productCategory.category)
        //        };

        vm.SearchProducts = SearchProducts;
        vm.getSearchValue = function(searchValue) {

            SearchProducts.value = searchValue;
            console.log(SearchProducts.value)
        };

        // conta o número de produtos que foram adicionados no carrinho de compra
        // Utiliza-se o watch para ele sempre ficar verificando a variável e atualizá-la automaticamente na página
        console.log("Meu localStorageService: ", localStorageService.get('carrinho'))
        $rootScope.$watch(
            function() {
                if (!localStorageService.get('carrinho')) {
                    vm.numeroProdutosCarrinho = 0;
                } else {
                    console.log(localStorageService.get('carrinho').split(','))
                    //                    vm.numeroProdutosCarrinho = localStorageService.get('carrinho').split(',').length;
                    vm.numeroProdutosCarrinho = localStorageService.get('carrinho').split(',').length;

                }
            }
        );
        console.log(vm.numeroProdutosCarrinho);
        vm.selected = undefined;
        vm.states = {
            'marca': [{
                'samsung': ['samsung tv', 'samsung celular', 'apple celular', 'nokia celular']
            }]
        }

        var imgProductNavFolder = '../../assets/img/productNavBarSection/productsNavBarSubsectionImg/';

        vm.productNavCategories = [{
            name: 'Componentes Passivos',
            icon: 'tv',
            subcat: [{
                name: 'Resistores',
                imgPath: imgProductNavFolder + 'eletronicos/' + 'CelularTablet.png',
                subsubcat: [{
                    imgPath: imgProductNavFolder + 'eletronicos/' + 'subsection/' + 'navTablet.png',
                    name: 'Capacitores'
                }, {
                    imgPath: imgProductNavFolder + 'eletronicos/' + 'subsection/' + 'navCelular.png',
                    name: 'Indutores'
                }, {
                    imgPath: imgProductNavFolder + 'eletronicos/' + 'subsection/' + 'navIphone.png',
                    name: 'iphone'
                }]
            }, {
                name: 'Capacitores',
                imgPath: imgProductNavFolder + 'eletronicos/' + 'CameraFotoVideo.png',
                subsubcat: [{
                    imgPath: imgProductNavFolder + 'eletronicos/' + 'subsection/' + 'navCam1.png',
                    name: 'cam1'
                }, {
                    imgPath: imgProductNavFolder + 'eletronicos/' + 'subsection/' + 'navCam2.png',
                    name: 'cam2'
                }, {
                    imgPath: imgProductNavFolder + 'eletronicos/' + 'subsection/' + 'navCam3.png',
                    name: 'cam3'
                }]
            }, {
                name: 'Tv & Home Theater',
                imgPath: imgProductNavFolder + 'eletronicos/' + 'TvHomeTheater.png',
                subsubcat: [{
                    imgPath: imgProductNavFolder + 'eletronicos/' + 'subsection/' + 'navTv1.png',
                    name: 'Tv1'
                }, {
                    imgPath: imgProductNavFolder + 'eletronicos/' + 'subsection/' + 'navTv2.png',
                    name: 'Tv2'
                }, {
                    imgPath: imgProductNavFolder + 'eletronicos/' + 'subsection/' + 'navTv3.png',
                    name: 'Tv3'
                }]

            }, {
                name: 'Cameras de Vídeo',
                imgPath: imgProductNavFolder + 'eletronicos/' + 'VideoCameras.png',
                subsubcat: [{
                    imgPath: imgProductNavFolder + 'eletronicos/' + 'subsection/' + 'navVideo1.png',
                    name: 'Video1'
                }, {
                    imgPath: imgProductNavFolder + 'eletronicos/' + 'subsection/' + 'navVideo2.png',
                    name: 'Video2'
                }, {
                    imgPath: imgProductNavFolder + 'eletronicos/' + 'subsection/' + 'navVideo3.png',
                    name: 'Video3'
                }]

            }, {
                name: 'Som',
                imgPath: imgProductNavFolder + 'eletronicos/' + 'Som.png',
                subsubcat: [{
                    imgPath: imgProductNavFolder + 'eletronicos/' + 'subsection/' + 'navSom1.png',
                    name: 'Som1'
                }, {
                    imgPath: imgProductNavFolder + 'eletronicos/' + 'subsection/' + 'navSom2.png',
                    name: 'Som2'
                }, {
                    imgPath: imgProductNavFolder + 'eletronicos/' + 'subsection/' + 'navSom3.png',
                    name: 'Som3'
                }]

            }]
        }, {
            name: 'Informática',
            icon: 'laptop_mac',
            subcat: [{
                name: 'Notebook & NetBook',
                imgPath: imgProductNavFolder + 'eletronicos/' + 'noteNet.png',
                subsubcat: [{
                    imgPath: imgProductNavFolder + 'eletronicos/' + 'subsection/' + 'navNote1.png',
                    name: 'Notebook1'
                }, {
                    imgPath: imgProductNavFolder + 'eletronicos/' + 'subsection/' + 'navNote2.png',
                    name: 'Notebook2'
                }, {
                    imgPath: imgProductNavFolder + 'eletronicos/' + 'subsection/' + 'navNote3.png',
                    name: 'Notebook3'
                }]
            }, {
                name: 'HD Externo',
                imgPath: imgProductNavFolder + 'eletronicos/' + 'hdExterno.png',
                subsubcat: [{
                    imgPath: imgProductNavFolder + 'eletronicos/' + 'subsection/' + 'navHD1.png',
                    name: 'HD1'
                }, {
                    imgPath: imgProductNavFolder + 'eletronicos/' + 'subsection/' + 'navHD2.png',
                    name: 'HD2'
                }, {
                    imgPath: imgProductNavFolder + 'eletronicos/' + 'subsection/' + 'navHD3.png',
                    name: 'HD3'
                }]
            }, {
                name: 'Monitor',
                imgPath: imgProductNavFolder + 'eletronicos/' + 'monitor.png',
                subsubcat: [{
                    imgPath: imgProductNavFolder + 'eletronicos/' + 'subsection/' + 'navMon1.png',
                    name: 'Monitor1'
                }, {
                    imgPath: imgProductNavFolder + 'eletronicos/' + 'subsection/' + 'navMon2.png',
                    name: 'Monitor2'
                }, {
                    imgPath: imgProductNavFolder + 'eletronicos/' + 'subsection/' + 'navMon3.png',
                    name: 'Monitor3'
                }]
            }, {
                name: 'Workstation',
                imgPath: imgProductNavFolder + 'eletronicos/' + 'workstation.png',
                subsubcat: [{
                    imgPath: imgProductNavFolder + 'eletronicos/' + 'subsection/' + 'navWork1.png',
                    name: 'Workstation1'
                }, {
                    imgPath: imgProductNavFolder + 'eletronicos/' + 'subsection/' + 'navWork2.png',
                    name: 'Workstation2'
                }, {
                    imgPath: imgProductNavFolder + 'eletronicos/' + 'subsection/' + 'navWork3.png',
                    name: 'Workstation3'
                }]
            }, {
                name: 'Impressora',
                imgPath: imgProductNavFolder + 'eletronicos/' + 'impressora.png',
                subsubcat: [{
                    imgPath: imgProductNavFolder + 'eletronicos/' + 'subsection/' + 'navPrint1.png',
                    name: 'Impressora1'
                }, {
                    imgPath: imgProductNavFolder + 'eletronicos/' + 'subsection/' + 'navPrint2.png',
                    name: 'Impressora2'
                }, {
                    imgPath: imgProductNavFolder + 'eletronicos/' + 'subsection/' + 'navPrint3.png',
                    name: 'Impressora3'
                }]
            }]
        }, {
            name: 'Eletrodomésticos',
            icon: 'power',
            subcat: [{
                name: 'Geladeira',
                imgPath: imgProductNavFolder + 'eletronicos/' + 'geladeira.png',
                subsubcat: [{
                    imgPath: imgProductNavFolder + 'eletronicos/' + 'subsection/' + 'navGel1.png',
                    name: 'Geladeira1'
                }, {
                    imgPath: imgProductNavFolder + 'eletronicos/' + 'subsection/' + 'navGel2.png',
                    name: 'Geladeira2'
                }, {
                    imgPath: imgProductNavFolder + 'eletronicos/' + 'subsection/' + 'navGel3.png',
                    name: 'Geladeira3'
                }]
            }, {
                name: 'Fogão',
                imgPath: imgProductNavFolder + 'eletronicos/' + 'fogao.png',
                subsubcat: [{
                    imgPath: imgProductNavFolder + 'eletronicos/' + 'subsection/' + 'navFog1.png',
                    name: 'Fogao1'
                }, {
                    imgPath: imgProductNavFolder + 'eletronicos/' + 'subsection/' + 'navFog2.png',
                    name: 'Fogao2'
                }, {
                    imgPath: imgProductNavFolder + 'eletronicos/' + 'subsection/' + 'navFog3.png',
                    name: 'Fogao3'
                }]
            }, {
                name: 'Máquina de lavar',
                imgPath: imgProductNavFolder + 'eletronicos/' + 'lavar.png',
                subsubcat: [{
                    imgPath: imgProductNavFolder + 'eletronicos/' + 'subsection/' + 'navLav1.png',
                    name: 'Lavar1'
                }, {
                    imgPath: imgProductNavFolder + 'eletronicos/' + 'subsection/' + 'navLav2.png',
                    name: 'Lavar2'
                }, {
                    imgPath: imgProductNavFolder + 'eletronicos/' + 'subsection/' + 'navLav3.png',
                    name: 'Lavar3'
                }]
            }]

        }, {
            name: 'Ar & Ventilação',
            icon: 'local_hotel',
            subcat: [{
                name: 'Ventilador',
                imgPath: imgProductNavFolder + 'eletronicos/' + 'ventilador.png',
                subsubcat: [{
                    imgPath: imgProductNavFolder + 'eletronicos/' + 'subsection/' + 'navVent1.png',
                    name: 'Ventilador1'
                }, {
                    imgPath: imgProductNavFolder + 'eletronicos/' + 'subsection/' + 'navVent2.png',
                    name: 'Ventilador2'
                }, {
                    imgPath: imgProductNavFolder + 'eletronicos/' + 'subsection/' + 'navVent3.png',
                    name: 'Ventilador3'
                }]
            }, {
                name: 'Ar-condicionado',
                imgPath: imgProductNavFolder + 'eletronicos/' + 'ar.png',
                subsubcat: [{
                    imgPath: imgProductNavFolder + 'eletronicos/' + 'subsection/' + 'navAr1.png',
                    name: 'Ar1'
                }, {
                    imgPath: imgProductNavFolder + 'eletronicos/' + 'subsection/' + 'navAr2.png',
                    name: 'Ar2'
                }, {
                    imgPath: imgProductNavFolder + 'eletronicos/' + 'subsection/' + 'navAr3.png',
                    name: 'Ar3'
                }]
            }]

        }, {
            name: 'Móveis',
            icon: 'domain',
            subcat: [{
                name: 'Armário',
                imgPath: imgProductNavFolder + 'eletronicos/' + 'armario.png',
                subsubcat: [{
                    imgPath: imgProductNavFolder + 'eletronicos/' + 'subsection/' + 'navArm1.png',
                    name: 'Armario1'
                }, {
                    imgPath: imgProductNavFolder + 'eletronicos/' + 'subsection/' + 'navArm2.png',
                    name: 'Armario2'
                }, {
                    imgPath: imgProductNavFolder + 'eletronicos/' + 'subsection/' + 'navArm3.png',
                    name: 'Armario3'
                }]
            }, {
                name: 'Sofá e cama',
                imgPath: imgProductNavFolder + 'eletronicos/' + 'sofa.png',
                subsubcat: [{
                    imgPath: imgProductNavFolder + 'eletronicos/' + 'subsection/' + 'navSofa1.png',
                    name: 'Sofa1'
                }, {
                    imgPath: imgProductNavFolder + 'eletronicos/' + 'subsection/' + 'navSofa2.png',
                    name: 'Sofa2'
                }, {
                    imgPath: imgProductNavFolder + 'eletronicos/' + 'subsection/' + 'navSofa3.png',
                    name: 'Sofa3'
                }]
            }]

        }, {
            name: 'Saúde & Beleza',
            icon: 'mood',
            subcat: [{
                name: 'Academia',
                imgPath: imgProductNavFolder + 'eletronicos/' + 'academia.png',
                subsubcat: [{
                    imgPath: imgProductNavFolder + 'eletronicos/' + 'subsection/' + 'navAca1.png',
                    name: 'Academia1'
                }, {
                    imgPath: imgProductNavFolder + 'eletronicos/' + 'subsection/' + 'navAca2.png',
                    name: 'Academia2'
                }, {
                    imgPath: imgProductNavFolder + 'eletronicos/' + 'subsection/' + 'navAca3.png',
                    name: 'Academia3'
                }]
            }, {
                name: 'Cosmético',
                imgPath: imgProductNavFolder + 'eletronicos/' + 'cosmetico.png',
                subsubcat: [{
                    imgPath: imgProductNavFolder + 'eletronicos/' + 'subsection/' + 'navCos1.png',
                    name: 'Cosmetico1'
                }, {
                    imgPath: imgProductNavFolder + 'eletronicos/' + 'subsection/' + 'navCos2.png',
                    name: 'Cosmetico2'
                }, {
                    imgPath: imgProductNavFolder + 'eletronicos/' + 'subsection/' + 'navCos3.png',
                    name: 'Cosmetico3'
                }]
            }, {
                name: 'Esporte',
                imgPath: imgProductNavFolder + 'eletronicos/' + 'esporte.png',
                subsubcat: [{
                    imgPath: imgProductNavFolder + 'eletronicos/' + 'subsection/' + 'navEsp1.png',
                    name: 'Esporte1'
                }, {
                    imgPath: imgProductNavFolder + 'eletronicos/' + 'subsection/' + 'navEsp2.png',
                    name: 'Esporte2'
                }, {
                    imgPath: imgProductNavFolder + 'eletronicos/' + 'subsection/' + 'navEsp3.png',
                    name: 'Esporte3'
                }]
            }]
        }, {
            name: 'Entretenimento',
            icon: 'directions_run',
            subcat: [{
                name: 'Console',
                imgPath: imgProductNavFolder + 'eletronicos/' + 'consoles.png',
                subsubcat: [{
                    imgPath: imgProductNavFolder + 'eletronicos/' + 'subsection/' + 'navGame1.png',
                    name: 'Console1'
                }, {
                    imgPath: imgProductNavFolder + 'eletronicos/' + 'subsection/' + 'navGame2.png',
                    name: 'Console2'
                }, {
                    imgPath: imgProductNavFolder + 'eletronicos/' + 'subsection/' + 'navGame3.png',
                    name: 'Console3'
                }]
            }, {
                name: 'Jogo de mesa',
                imgPath: imgProductNavFolder + 'eletronicos/' + 'table.png',
                subsubcat: [{
                    imgPath: imgProductNavFolder + 'eletronicos/' + 'subsection/' + 'navTab1.png',
                    name: 'Mesa1'
                }, {
                    imgPath: imgProductNavFolder + 'eletronicos/' + 'subsection/' + 'navTab2.png',
                    name: 'Mesa2'
                }, {
                    imgPath: imgProductNavFolder + 'eletronicos/' + 'subsection/' + 'navTab3.png',
                    name: 'Mesa3'
                }]
            }, {
                name: 'Jogo para console',
                imgPath: imgProductNavFolder + 'eletronicos/' + 'jogos.png',
                subsubcat: [{
                    imgPath: imgProductNavFolder + 'eletronicos/' + 'subsection/' + 'navJog1.png',
                    name: 'Jogo1'
                }, {
                    imgPath: imgProductNavFolder + 'eletronicos/' + 'subsection/' + 'navJog2.png',
                    name: 'Jogo2'
                }, {
                    imgPath: imgProductNavFolder + 'eletronicos/' + 'subsection/' + 'navJog3.png',
                    name: 'Jogo3'
                }]
            }]

        }];
        vm.productNavSubcategories = [{

            //            name: 'eletronicos',
            category: [{
                //                name: 'celular&tablet',
                itens: ['tablet', 'dual chip', 'iphone']
            }, {
                //                name: 'cameras',
                itens: ['digital', 'profisional', 'amador']
            }]
        }, {

            //            name: 'informatica',
            category: [{
                //                name: 'computador',
                itens: ['comp1', 'comp2']
            }, {
                //                name: 'hd externo',
                itens: ['hd1', 'hd2']
            }]
        }];

        vm.getSelectedCategory = function(selecteProductSection, selectedCategory) {
            console.log(selectedCategory)
            productCategory.category = selectedCategory;
            vm.getSelectedProductSection(selecteProductSection);
            productSrvc.prdCatg = selectedCategory;
            console.log('mudou para', productCategory.category)
        };

        vm.getSelectedProductSection = function(selecteProductSection) {
            productCategory.section = selecteProductSection;
            console.log(productCategory.section);
        }

        var productNavCatLength = vm.productNavCategories.length;
        vm.showSubMenu = new Array(productNavCatLength);
        var i = 0;

        while (i < productNavCatLength) {
            vm.showSubMenu[i++] = '';
        }

        console.log(vm.showSubMenu);

        vm.getSelectedSubMenu = function(index) {
            vm.showSubMenu[index] = !vm.showSubMenu[index];
            console.log(vm.showSubMenu);
        }

        vm.subCatisCollapsed = true;

        /*Sub submenu controls*/
        vm.subCatisCollapsed = [true, true, true, true, true];
        var i = 0;
        vm.collapseSubSubMenu = function(index, value) {
            for (i = 0; i < productNavCatLength; i++) {
                vm.subCatisCollapsed[i] = true;
            }
            vm.subCatisCollapsed[index] = !value;
            console.log(vm.subCatisCollapsed)
        }

    };
})();