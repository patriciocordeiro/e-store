(function () {
    'use strict';

    angular.module('myApp').controller('PrdSectionCtrl', ['$mdBottomSheet', PrdSectionCtrl]);

    function PrdSectionCtrl($mdBottomSheet) {
        var vm = this;
        vm.showSubsec = false;
        vm.showListBottomSheet = function () {
                vm.showSubsec = !vm.showSubsec;
            }
            //        vm.showListBottomSheet = function($event) {
            ////            $scope.alert = '';
            //            $mdBottomSheet.show({
            //                templateUrl: 'components/produtos/productSubsection.view.html',
            //                controller: 'PrdSectionCtrl',
            //                targetEvent: $event,
            //                parent: "#subSectbootomSheet"
            //            }).then(function(clickedItem) {
            ////                $scope.alert = clickedItem['name'] + ' clicked!';
            //            });
            //        };

        /*Menu Itens*/
        var imgProductNavFolder = '../../assets/img/navbar/';

        vm.productNavCategories = [{
            name: 'Componentes eletrônicos',
            imgPath: imgProductNavFolder + 'raspberry_sect.png',

            subcat: [{
                name: 'Resistores',
                imgPath: imgProductNavFolder + 'resistores.png',
            }, {
                name: 'Capacitores',
                imgPath: imgProductNavFolder + 'capacitor_eletro.png',
            }, {
                name: 'Transistores',
                imgPath: imgProductNavFolder + 'transistores.png',
            }, {
                name: 'LEDs',
                imgPath: imgProductNavFolder + 'leds.png',
            }, {
                name: 'Displays',
                imgPath: imgProductNavFolder + 'display_lcd.jpg',
            }, {
                name: 'Circuitos integrados',
                imgPath: imgProductNavFolder + 'circuito_integrado.jpg',
            }]
        }, {
            name: 'Arduino',
            imgPath: imgProductNavFolder + 'arduino_sect.png',

            subcat: [{
                name: 'Placas',
                imgPath: imgProductNavFolder + 'arduino_board_subsec.jpg',
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
            imgPath: imgProductNavFolder + 'raspberry_sect.png',

            subcat: [{
                name: 'Placas',
                imgPath: imgProductNavFolder + 'raspberrypi.png',
            }, {
                name: 'Kits',
                imgPath: imgProductNavFolder + 'raspberrypi_kits.jpg',
            }, {
                name: 'Acessórios',
                imgPath: imgProductNavFolder + 'arduino/' + 'arduino.jpg',
            }]
        }, {
            name: 'Conexão',
            imgPath: imgProductNavFolder + 'raspberry_sect.png',

            subcat: [{
                name: 'Conectores',
                imgPath: imgProductNavFolder + 'arduino_board_subsec.jpg',
            }, {
                name: 'Cabos',
                imgPath: imgProductNavFolder + 'arduino/' + 'arduino.jpg',
            }, {
                name: 'Fios',
                imgPath: imgProductNavFolder + 'arduino/' + 'arduino.jpg',
            }]
        }, {
            name: 'Kits de eletrônica',
            imgPath: imgProductNavFolder + 'raspberry_sect.png',

            subcat: [{
                name: 'Kit raspberry',
                imgPath: imgProductNavFolder + 'arduino_board_subsec.jpg',
            }, {
                name: 'Kit arduino',
                imgPath: imgProductNavFolder + 'arduino/' + 'arduino.jpg',
            }, {
                name: 'Kit portas lógicas',
                imgPath: imgProductNavFolder + 'arduino/' + 'arduino.jpg',
            }]
        }];
        //Show hide subsection
        vm.isShowSubsection = false
        vm.secFlex = 100;
        vm.subSecFlex = 0;
        vm.showSubsection = function (index) {
            vm.isShowSubsection = index
            vm.secFlex = 10;
            vm.subSecFlex = 80;
            console.log(vm.showSubsection);
        }

        vm.closeSubMenu = function () {
            vm.isShowSubsection = -1
        }

        vm.isShowAllSections = false;
        vm.showAll = function (value) {
            if (value == 1)
                vm.isShowAllSections = true;
            vm.isShowAllSections = false;
        }
    }
}());