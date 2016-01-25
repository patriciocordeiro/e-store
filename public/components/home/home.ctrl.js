(function() {
    'use strict'

    angular.module('myApp').controller('HomeCtrl', [HomeCtrl]);

    function HomeCtrl() {
        var vm = this;

        vm.productsShow = [{
            name: 'Arduino',
            imgPath: '../../assets/img/produtos/arduino/arduino_duemila.jpg',
        }, {
            name: 'Raspberry Pi',
            imgPath: '../../assets/img/produtos/raspberry/raspberry-pi-b-board.jpg',
        }, {
            name: 'Kits de eletrônica',
            imgPath: '../../assets/img/produtos/raspberry/raspberry-pi-b-board.jpg',
        }, {
            name: 'Componenstes passivos',
           imgPath: '../../assets/img/produtos/raspberry/raspberry-pi-b-board.jpg',
        }, {
            name: 'Transistores',
			 imgPath: '../../assets/img/produtos/raspberry/raspberry-pi-b-board.jpg',
        }];

        console.log(vm.productsShow);
    }
})();