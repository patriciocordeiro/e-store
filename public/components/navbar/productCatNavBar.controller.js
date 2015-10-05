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
            icon: 'tablet',
            subcat: [{
                name: 'Celulares & Tablets',
                imgPath: imgProductNavFolder + 'eletronicos/' + 'CelularTablet.png',
                subsubcat: [{
                    name: 'tablet'
                }, {
                    name: 'dual chip'
                }, {
                    name: 'iphone'
                }]
            }, {
                name: 'Cameras',
                imgPath: imgProductNavFolder + 'eletronicos/' + 'CameraFotoVideo.png',
                subsubcat: [{
                    name: 'cam1'
                }, {
                    name: 'cam2'
                }, {
                    name: 'cam3'
                }]
            }, {
                name: 'Tv & Home Theater',
                imgPath: imgProductNavFolder + 'eletronicos/' + 'TvHomeTheater.png',
                subsubcat: [{
                    name: 'Tv1'
                }, {
                    name: 'Tv2'
                }, {
                    name: 'Tv3'
                }]

            }, {
                name: 'Cameras de Vídeo',
                imgPath: imgProductNavFolder + 'eletronicos/' + 'VideoCameras.png',
                subsubcat: [{
                    name: 'Video1'
                }, {
                    name: 'Video2'
                }, {
                    name: 'Video3'
                }]

            }, {
                name: 'Som',
                imgPath: imgProductNavFolder + 'eletronicos/' + 'Som.png',
                subsubcat: [{
                    name: 'Som1'
                }, {
                    name: 'Som2'
                }, {
                    name: 'Som3'
                }]

            }]
        }, {
            name: 'Informática',
            icon: 'laptop_mac',
            subcat: [{
                name: 'Notebook & NetBook',
                imgPath: imgProductNavFolder + 'eletronicos/' + 'CelularTablet.png',
                subsubcat: [{
                    name: 'Notebook1'
                }, {
                    name: 'Notebook2'
                }, {
                    name: 'Notebook3'
                }]
            }, {
                name: 'HD Externo',
                imgPath: imgProductNavFolder + 'eletronicos/' + 'CameraFotoVideo.png',
            }, {
                name: 'Monitor',
                imgPath: imgProductNavFolder + 'eletronicos/' + 'TvHomeTheater.png'

            }, {
                name: 'Workstation',
                imgPath: imgProductNavFolder + 'eletronicos/' + 'VideoCameras.png'

            }, {
                name: 'Som ',
                imgPath: imgProductNavFolder + 'eletronicos/' + 'Som.png'

            }]
        }, {
            name: 'Eletrodomésticos',
            icon: 'theaters',
            subcat: [{
                name: 'Celulares & Tablets'
            }, {
                name: 'Cameras'
            }]

        }, {
            name: 'Ar & Ventilação',
            icon: 'photo_camera',
            subcat: [{
                name: 'Celulares & Tablets',
                imgPath: imgProductNavFolder + 'eletronicos/' + 'CelularTablet.png'
            }, {
                name: 'Cameras',
                imgPath: imgProductNavFolder + 'eletronicos/' + 'CameraFotoVideo.png'

            }]

        }, {
            name: 'Móveis',
            icon: 'videocam',
            subcat: ['Celulares & Tablets', 'Cameras']

        }, {
            name: 'Saúde & Beleza',
            icon: 'games',
        }, {
            name: 'Entretenimento',
            icon: 'laptop_mac',
            subcat: ['Celulares & Tablets', 'Cameras']

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