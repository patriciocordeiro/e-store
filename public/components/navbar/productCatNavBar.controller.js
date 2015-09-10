(function() {
    "use strict";
    angular.module('myApp').controller('productCatNavBar', ['productCategory', productCatNavBar]);

    function productCatNavBar(productCategory) {


        var vm = this;
        // for open navigation tab on mouseover
        //        $scope.isTabActive = false;

        vm.productNavCategories = ['Celular & Tablet', 'Tv & Video', 'Audio & Home Theater', 'Cameras Digitais', 'Cameras de Vídeo', 'Vídeo Games', 'Informática'];

        var imgProductNavFolder = '../../assets/img/productNav/'
        vm.productNavSubcategories = [
            [{
                name: 'tablet',
                imgPath: imgProductNavFolder + 'celular/' + 'MobilenavTablets.png'
            }, {
                name: 'Multichip',
                imgPath: imgProductNavFolder + 'celular/' + 'snyUSSubNavsoundBars.png'
            }, {
                name: 'Desbloqueados',
                imgPath: imgProductNavFolder + 'celular/' + 'snyUSSubNavsoundBars.png'
            }],
            [{
                name: 'Home Theather',
                imgPath: imgProductNavFolder + 'celular/' + 'snyUSSubNavhomeTheaterSystems.png'

            }, {
                name: 'Home Theather',
                imgPath: imgProductNavFolder + 'celular/' + 'snyUSSubNavhomeTheaterSystems.png'

            }, {
                name: 'Home Theather',
                imgPath: imgProductNavFolder + 'celular/' + 'snyUSSubNavhomeTheaterSystems.png'

            }],

            [{
                    name: 'TV LED',
                    imgPath: imgProductNavFolder + 'tv-video/' + 'TVnavAllTV.png'

                }, {
                    name: 'TV 3D',
                    imgPath: imgProductNavFolder + 'tv-video/' + 'navtv3d.png'

                }, {
                    name: 'Smart TV',
                    imgPath: imgProductNavFolder + 'tv-video/' + 'TVnavAllTV.png'

                }, {
                    name: 'Full HD',
                    imgPath: imgProductNavFolder + 'tv-video/' + 'LEDHDTVs.png'

                }, {
                    name: 'Ultra HD',
                    imgPath: imgProductNavFolder + 'tv-video/' + 'TVnav4k.png'

                }, {
                    name: 'TV LCD',
                    imgPath: imgProductNavFolder + 'tv-video/' + 'TVnav4k.png'

                }, {
                    name: 'TV Plasma',
                    imgPath: imgProductNavFolder + 'tv-video/' + 'TVnav4k.png'

                }, {
                    name: 'TV Monitor',
                    imgPath: imgProductNavFolder + 'tv-video/' + 'TVnav4k.png'

                }
                //             ,{
                //                name: 'BluRay & DVD Players',
                //                imgPath: imgProductNavFolder + 'tv-video/' + 'VideoBlurayDVDPlayers.png'
                //
                //            }, {
                //                name: 'BluRay & DVD Players',
                //                imgPath: imgProductNavFolder + 'tv-video/' + 'TVnavAcesssorios.png'
                //
                //            }, {
                //                name: 'BluRay & DVD Players',
                //                imgPath: imgProductNavFolder + 'tv-video/' + 'TVnavAcesssorios.png'
                //
                //            }, {
                //                name: 'BluRay & DVD Players',
                //                imgPath: imgProductNavFolder + 'tv-video/' + 'TVnavAcesssorios.png'
                //
                //            }
            ]
        ];

        //        $scope.productCategory = productCategory;
        //        console.log('catgreeting', $scope.productCategory.category)
        //        var categoria;
        vm.getSelectedCategory = function(selectedCategory) {

//            var selected = vm.productNavSubcategories[selectedCategory]
            console.log(selectedCategory)
            productCategory.category = selectedCategory;
            //            console.log('mudou para', productCategory.category)
        };


        //        vm.isCollapsed = true;

        //        console.log(vm.isCollapsed)
    };

})();