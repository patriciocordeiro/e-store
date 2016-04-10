(function () {

    'use strict';

    angular.module('myApp').controller('NavbarCtrl', ['$scope', '$rootScope', '$state', 'productSrvc', 'userSrcv', '$mdToast', '$document', '$q', '$mdMedia', '$timeout', NavbarCtrl]);

    function NavbarCtrl($scope, $rootScope, $state, productSrvc, userSrcv, $mdToast, $document, $q, $mdMedia, $timeout) {
        /*Variables declaration*/
        var vm = this;
        var prdSrvc = productSrvc //productSrvc; pass all product services to variable prdSrvc
            //        vm.kartSize = prdSrvc.prd.kart.getSize().then(function(kartSize) {
            //            console.log(kartSize);
            //        });
        console.log(vm.kartSize);
        /*recover kart*/
        prdSrvc.prd.kart.recover(function (data) {
            console.log(data);
            vm.kartData = data;
            vm.kartSize = data.length;
        });


        //Will apply specific height according to screen size	
        vm.$mdMedia = $mdMedia;

        //---------------------------------------------------------
        /*Get all kart data*/
        vm.kartData = prdSrvc.prd.kart.data;
        //---------------------------------------------------------
        /*Menu Itens*/
        var imgProductNavFolder = '../../assets/img/navbar/';
        vm.navBar = ['Produtos', 'Tutoriais', ]

        vm.productNavCategories = [{
                name: 'Componentes eletrônicos',
                imgPath: imgProductNavFolder + 'raspberry_sect.png',

                subcat: [{
                    name: 'Resistores',
                    imgPath: imgProductNavFolder + 'resistores.png',
            }, {
                    name: 'Capacitores',
                    imgPath: imgProductNavFolder + 'capacitores.png',
            }, {
                    name: 'Transistores',
                    imgPath: imgProductNavFolder + 'transistores.png',
            }, {
                    name: 'LEDs',
                    imgPath: imgProductNavFolder + 'leds.png',
            }, {
                    name: 'Displays',
                    imgPath: imgProductNavFolder + 'displays.png',
            }, {
                    name: 'Circuitos integrados',
                    imgPath: imgProductNavFolder + 'circuito_integrado.jpg',
            }]
        }, {
                name: 'Arduino',
                imgPath: imgProductNavFolder + 'arduino_sect.png',

                subcat: [{
                    name: 'Placas',
                    imgPath: imgProductNavFolder + 'arduino_board.png',
            }, {
                    name: 'Shields',
                    imgPath: imgProductNavFolder + 'arduino_shields.png',
            }, {
                    name: 'Kits',
                    imgPath: imgProductNavFolder + 'arduino_kits.png',
            }, {
                    name: 'Acessórios',
                    imgPath: imgProductNavFolder + 'arduino_acessorios.png',
            }]
        }, {
                name: 'Raspbery',
                imgPath: imgProductNavFolder + 'raspberry_board.png',

                subcat: [{
                    name: 'Placas',
                    imgPath: imgProductNavFolder + 'raspberry_board.png',
            }, {
                    name: 'Kits',
                    imgPath: imgProductNavFolder + 'raspberrypi_kits.png',
            }, {
                    name: 'Acessórios',
                    imgPath: imgProductNavFolder + 'raspberrypi_acessorios.png',
            }]
        }, {
                name: 'Cabos & Conectores',
                imgPath: imgProductNavFolder + 'raspberry_sect.png',

                subcat: [{
                    name: 'Conectores',
                    imgPath: imgProductNavFolder + 'conectores.png',
            }, {
                    name: 'Cabos',
                    imgPath: imgProductNavFolder + 'cabos.png',
            }, {
                    name: 'Fios & Jumpers',
                    imgPath: imgProductNavFolder + 'fios_jumpers.png',
            }]
        }
//                                   {
                               //            name: 'Kits de eletrônica',
                               //            imgPath: imgProductNavFolder + 'raspberry_sect.png',
                               //
                               //            subcat: [{
                               //                name: 'Kit raspberry',
                               //                imgPath: imgProductNavFolder + 'arduino_board_subsec.jpg',
                               //            }, {
                               //                name: 'Kit arduino',
                               //                imgPath: imgProductNavFolder + 'arduino/' + 'arduino.jpg',
                               //            }, {
                               //                name: 'Kit portas lógicas',
                               //                imgPath: imgProductNavFolder + 'arduino/' + 'arduino.jpg',
                               //            }]
                               //        }
                                  ];
        //-------------------------------------------------
        /*Get selected product caterory*/
        vm.getCatg = function (section, category) {
            prdSrvc.prd.getCatg(section, category)
                //Query to send to server
                //			   var reg = new RegExp('^', "i");
            var query = {
                category: category,

                prdMaxPageItems: '20', //Max number of display items in the page
            }
            console.log(query.subcategoria);
            prdSrvc.prd.http.getDataByCatg(query, category, function () {});
        };
        //        vm.prdSrvcgetSect = function(section) {
        //            prdSrvc.section = section;
        //            console.log(productCategory.section);
        //        }
        //-------------------------------------------------
        /*Watch for COMPRA by (if user click on COMPRAR)*/
        $scope.$watch('dataChange', function (newValue, oldValues) {
            console.log('navbar watch fired up');
            //Calculate the kart size imediatelly after user click on COMPRAR
            vm.kartSize = prdSrvc.prd.kart.ids.length;
            /*pop-over para to show new products on kart when clic buy*/
            console.log(vm.kartSize);
            if (newValue != oldValues) {
                /*Get all kart data to update the pop-over*/
                vm.kartData = prdSrvc.prd.kart.data;
                console.log(oldValues);
                vm.isShowKartPopOver = true;
                $timeout(function () {
                    vm.isShowKartPopOver = false
                }, 3000);
            }

            //            vm.showPutedInCartToast();
        });
        //-------------------------------------------------------------------   
        //        vm.showPutedInCartToast = function() {
        //            console.log('Toast executado');
        //            $mdToast.show({
        //                controller: 'myCartToastCtrl as vm',
        //                templateUrl: '/components/kart/kartPutToast.view.html',
        //                //                parent: $document[0].querySelector('#myCartToast'),
        //                hideDelay: 1000,
        //                position: 'top left'
        //            });
        //        }
        //-------------------------------------------------------------------   
        /*Logout user*/
        vm.logout = function () {
                userSrcv.usr.logout.execLogout();
                console.log('Login out');
            }
            //-------------------------------------------------------------------   
            /*Search with elastic search*/
        vm.searchText = ''; //variable for ng-model to get search text
        var query = {};
        vm.searchPrd = function (searchText) {
            //prevent multiple seach request of the same terms
            if (query.terms && query.terms == searchText) {
                console.log('novo termo');
                return;
            }
            query.terms = searchText;
            console.log(query);
            productSrvc.prd.http.getDatabySearch(query, function (data) {
                vm.searchResultsData = data;
                if (data) {
                    //go to search results page if not there
                    console.log($state);
                    $state.go('app.produtos.search');
                }
                //clear the seach oninput
                vm.searchText = '';
            });

        }

        /*Navbar menu*/
        vm.showMenu = false;
        var closeAll = function (length) {
                var temp = _.range(length).map(function () {
                    return false
                })
                return $q.when(temp);
            }
            //        vm.showSubMenu = closeAll(vm.productNavCategories.length);
        vm.showSubMenu = -1;
        vm.OpenMenu = function () {
            vm.showMenu = !vm.showMenu;
            console.log(vm.showMenu);
            //close submenu if menu is closed
            if (vm.showMenu) {
                vm.showSubMenu = -1;
                vm.isSubMenuOpen = false;
            }
        }

        vm.openSubMenu = function (idx) {
            console.log('my idx', idx);
            vm.activeMenuIdx = idx;
            vm.showSubMenu = idx;
            vm.isSubMenuOpen = true;
            //            closeAll(vm.productNavCategories.length).then(function(data) {
            //                vm.showSubMenu = data;
            //                vm.showSubMenu[idx] = !vm.show
            //                console.log(vm.showSubMenu);
            //            })

        }

        vm.closeMenus = function () {
            vm.showMenu = false;
            //            closeAll(vm.productNavCategories.length).then(function(data) {
            //Set show menu index=-1
            vm.showSubMenu = -1;
            //The submenu is closed
            vm.isSubMenuOpen = false;

            //            });
            console.log('clossing all menus and submenus');
        }

        vm.isActive = function (menuItem) {
            if (menuItem == vm.currentMenuItem) {
                return 'active-menu';
            }
        }

        /*User Pop over*/
        vm.isShowUserPopOver = false // closed at firts
        vm.showHideUserPopOver = function () {
            vm.isShowUserPopOver = !vm.isShowUserPopOver;
        }

        /*Kart pop over*/
        vm.isShowKartPopOver = false;
        vm.showHideKartPopOver = function () {
            vm.isShowKartPopOver = !vm.isShowKartPopOver;
            console.log('YAPAPPAPA');
        }

    }
}());