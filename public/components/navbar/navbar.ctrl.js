(function() {

    'use strict';

    angular.module('myApp').controller('NavbarCtrl', ['$scope', 'productSrvc', '$mdToast', '$document', NavbarCtrl]);

    function NavbarCtrl($scope, productSrvc, $mdToast, $document) {
        /*Variables declaration*/
        var vm = this;
        var prd = productSrvc//productSrvc; pass all product services to variable prd
        //---------------------------------------------------------
        /*Get all kart data*/
        vm.kartData = prd.prdKartData;
        //---------------------------------------------------------
        /*Menu Itens*/
        var imgProductNavFolder = '../../assets/img/productNavBarSection/productsNavBarSubsectionImg/';
        vm.productNavCategories = [{
            name: 'Componentes Passivos',
            icon: 'tv',
            subcat: [{
                name: 'Resistores',
                imgPath: imgProductNavFolder + 'eletronicos/' + 'CelularTablet.png',
            }, {
                name: 'Capacitor',
                imgPath: imgProductNavFolder + 'eletronicos/' + 'CelularTablet.png',
            }]
        }];
        //-------------------------------------------------
        /*Get selected product caterory*/
        vm.prdgetSelCatg = function(category) {
            //            vm.getSelectedProductSection(selecteProductSection);
            var prdCatg = prd.prdGetCatg(productSrvc.prdCatg, category);
            console.log('mudou para', prdCatg);
            //             console.log($rootScope.dataChange);
        };
        //-------------------------------------------------
        /*Watch for COMPRA by (if user click on COMPRAR)*/
        $scope.$watch('dataChange', function() {
            //Calculate the kart size imediatelly after user click on COMPRAR
            vm.kartSize = prd.prdKartGetSize(prd.prdKartData);
        });
    }
}());