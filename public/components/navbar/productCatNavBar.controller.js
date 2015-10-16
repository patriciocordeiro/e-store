(function() {
    "use strict";
    angular.module('myApp').controller('productCatNavBar', ['productCategory', productCatNavBar]);

    function productCatNavBar(productCategory) {


        var vm = this;
        // for open navigation tab on mouseover
        //        $scope.isTabActive = false;

        //        vm.productNavCategories = [{
        //            name: 'Celular & Tablet',
        //            icon:'tablet',
        //        }, {
        //            name: 'Tv & Video',
        //            icon:'tv',
        //        }, {
        //            name: 'Audio & Home Theater',
        //            icon:'theaters',
        //        }, {
        //            name: 'Cameras Digitais',
        //            icon:'photo_camera',
        //        }, {
        //            name: 'Cameras de Vídeo',
        //            icon:'videocam',
        //        }, {
        //            name: 'Vídeo Games',
        //            icon:'games',
        //        },{ 
        //            name: 'Informática',
        //            icon:'laptop_mac'
        //        }];
        //        
        var imgProductNavFolder = '../../assets/img/productNavBarSection/productsNavBarSubsectionImg/';

        vm.productNavCategories = [{
            name: 'Eletrônicos',
            icon: 'tv',
            subcat: [{
                name: 'Celulares & Tablets',
                imgPath: imgProductNavFolder + 'eletronicos/' + 'CelularTablet.png',
                subsubcat: [{
                    imgPath: imgProductNavFolder + 'eletronicos/' + 'subsection/' + 'navTablet.png',
                    name: 'tablet'
                }, {
                    imgPath: imgProductNavFolder + 'eletronicos/' + 'subsection/' + 'navCelular.png',
                    name: 'dual chip'
                }, {
                    imgPath: imgProductNavFolder + 'eletronicos/' + 'subsection/' + 'navIphone.png',
                    name: 'iphone'
                }]
            }, {
                name: 'Cameras',
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
            subcat: [
            {
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
            },
            {
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
            subcat: [
            {
                name: 'Ventilador'
            }, {
                name: 'Ar-condicionado'
            },
            {
                name: 'Umidificador'
            }]

        }, {
            name: 'Móveis',
            icon: 'domain',
            subcat: [
            {
                name: 'Prateleira'
            }, {
                name: 'Armário'
            },
            {
                name: 'Sofá e cama'
            }]

        }, {
            name: 'Saúde & Beleza',
            icon: 'mood',
            subcat: [
            {
                name: 'Academia'
            }, {
                name: 'Cosmético'
            },
            {
                name: 'Esporte'
            }]
        }, {
            name: 'Entretenimento',
            icon: 'directions_run',
            subcat: [
            {
                name: 'Console'
            }, {
                name: 'Jogo de mesa'
            },
            {
                name: 'Jogo para console'
            }]

        }];
        //
        //        vm.productNavSubcategories = [{
        //            eletronicos: [
        //                [{
        //                    name: 'Tablets',
        //                    imgPath: imgProductNavFolder + 'celular/' + 'MobilenavTablets.png'
        //                }, {
        //                    name: 'Multichip',
        //                    imgPath: imgProductNavFolder + 'celular/' + 'celular_dual_chip.png'
        //                }, {
        //                    name: 'Desbloqueados',
        //                    imgPath: imgProductNavFolder + 'celular/' + 'snyUSSubNavsoundBars.png'
        //                }],
        //                [{
        //                    name: 'Home Theather',
        //                    imgPath: imgProductNavFolder + 'celular/' + 'snyUSSubNavhomeTheaterSystems.png'
        //
        //                }, {
        //                    name: 'Home Theather',
        //                    imgPath: imgProductNavFolder + 'celular/' + 'snyUSSubNavhomeTheaterSystems.png'
        //
        //                }, {
        //                    name: 'Home Theather',
        //                    imgPath: imgProductNavFolder + 'celular/' + 'snyUSSubNavhomeTheaterSystems.png'
        //
        //                }],
        //
        //                [{
        //                    name: 'TV LED',
        //                    imgPath: imgProductNavFolder + 'tv-video/' + 'TVnavAllTV.png'
        //
        //                }, {
        //                    name: 'TV 3D',
        //                    imgPath: imgProductNavFolder + 'tv-video/' + 'navtv3d.png'
        //
        //                }, {
        //                    name: 'Smart TV',
        //                    imgPath: imgProductNavFolder + 'tv-video/' + 'TVnavAllTV.png'
        //
        //                }, {
        //                    name: 'Full HD',
        //                    imgPath: imgProductNavFolder + 'tv-video/' + 'LEDHDTVs.png'
        //
        //                }, {
        //                    name: 'Ultra HD',
        //                    imgPath: imgProductNavFolder + 'tv-video/' + 'TVnav4k.png'
        //
        //                }, {
        //                    name: 'TV LCD',
        //                    imgPath: imgProductNavFolder + 'tv-video/' + 'TVnav4k.png'
        //
        //                }, {
        //                    name: 'TV Plasma',
        //                    imgPath: imgProductNavFolder + 'tv-video/' + 'TVnav4k.png'
        //
        //                }, {
        //                    name: 'TV Monitor',
        //                    imgPath: imgProductNavFolder + 'tv-video/' + 'TVnav4k.png'
        //
        //                }]
        //            ]
        //        }, {
        //            informatica: [{
        //                name: 'informatica 1',
        //                imgPath: imgProductNavFolder + 'celular/' + 'MobilenavTablets.png'
        //            }, {
        //                name: 'informatica 2',
        //                imgPath: imgProductNavFolder + 'celular/' + 'MobilenavTablets.png'
        //            }, {
        //                name: 'informatica 3',
        //                imgPath: imgProductNavFolder + 'celular/' + 'MobilenavTablets.png'
        //            }]
        //        }];
        //
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

        //        $scope.productCategory = productCategory;
        //        console.log('catgreeting', $scope.productCategory.category)
        //        var categoria;
        vm.getSelectedCategory = function(selectedCategory) {

            //            var selected = vm.productNavSubcategories[selectedCategory]
            console.log(selectedCategory)
            productCategory.category = selectedCategory;
            //            console.log('mudou para', productCategory.category)
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