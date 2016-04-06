(function() {
    'use strict';

    angular.module('myApp').controller('PrdSectionCtrl', ['$mdBottomSheet', PrdSectionCtrl]);

    function PrdSectionCtrl($mdBottomSheet) {
        var vm = this;
        vm.showSubsec = false;
        vm.showListBottomSheet = function() {
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
            name: 'C. Eletrônicos',
            icon: 'tv',
            imgPath: imgProductNavFolder + 'raspberry_sect.png',

            subcat: [{
                name: 'Resistor',
                imgPath: imgProductNavFolder + 'resistor.jpg',
            }, {
                name: 'Capacitor',
                imgPath: imgProductNavFolder + 'capacitor.jpg',
            }, {
                name: 'Transistor',
                imgPath: imgProductNavFolder + 'capacitor/' + 'capPTH.jpg',
            }, {
                name: 'LED',
                imgPath: imgProductNavFolder + 'capacitor/' + 'capPTH.jpg',
            }, {
                name: 'Displays',
                imgPath: imgProductNavFolder + 'capacitor/' + 'capPTH.jpg',
            }, {
                name: 'CI',
                imgPath: imgProductNavFolder + 'capacitor/' + 'capPTH.jpg',
            }]
        }, {
            name: 'Arduino',
            icon: 'tv',
            imgPath: imgProductNavFolder + 'arduino_sect.png',

            subcat: [{
                name: 'Placas',
                imgPath: imgProductNavFolder + 'arduino_board_subsec.jpg',
            }, {
                name: 'Shields',
                imgPath: imgProductNavFolder + 'arduino/' + 'arduino.jpg',
            }, {
                name: 'Kits',
                imgPath: imgProductNavFolder + 'arduino/' + 'arduino.jpg',
            }, {
                name: 'Acessórios',
                imgPath: imgProductNavFolder + 'arduino/' + 'arduino.jpg',
            }]
        }, {
            name: 'Raspbery',
            icon: 'tv',
            imgPath: imgProductNavFolder + 'raspberry_sect.png',

            subcat: [{
                name: 'Placas',
                imgPath: imgProductNavFolder + 'arduino_board_subsec.jpg',
            }, {
                name: 'Kits',
                imgPath: imgProductNavFolder + 'arduino/' + 'arduino.jpg',
            }, {
                name: 'Acessórios',
                imgPath: imgProductNavFolder + 'arduino/' + 'arduino.jpg',
            }]
        }, {
            name: 'Conexão',
            icon: 'tv',
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
            name: 'Kits',
            icon: 'tv',
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
        }];
        //Show hide subsection
        vm.isShowSubsection = false
        vm.secFlex = 100;
        vm.subSecFlex = 0;
        vm.showSubsection = function(index) {
            vm.isShowSubsection = index
            vm.secFlex = 10;
            vm.subSecFlex = 80;
            console.log(vm.showSubsection);
        }
		
		vm.closeSubMenu = function(){
			 vm.isShowSubsection = -1
		}
    }
}());