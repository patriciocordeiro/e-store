(function() {

    'use strict';

    angular.module('myApp').controller('NavbarCtrl', ['$scope', '$rootScope', 'productSrvc', 'userSrcv', '$mdToast', '$document', NavbarCtrl]);

    function NavbarCtrl($scope, $rootScope, productSrvc, userSrcv, $mdToast, $document) {
        /*Variables declaration*/
        var vm = this;
        var prdSrvc = productSrvc //productSrvc; pass all product services to variable prdSrvc

        //---------------------------------------------------------
        /*Get all kart data*/
        vm.kartData = prdSrvc.prd.kart.data;
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
        vm.getCatg = function(section, category) {
            prdSrvc.prd.getCatg(section, category)
            //            prdSrvc.section = section;
            //            prdSrvc.category = category;
            //            var prdSrvcCatg = prdSrvc.prdSrvcGetCatg(prdSrvc.prdSrvcCatg, category);
        };
        vm.prdSrvcgetSect = function(section) {
            prdSrvc.section = section;
            console.log(productCategory.section);
        }
        //-------------------------------------------------
        /*Watch for COMPRA by (if user click on COMPRAR)*/
        $scope.$watch('dataChange', function(newValue, oldValues) {
            //Calculate the kart size imediatelly after user click on COMPRAR
            vm.kartSize = prdSrvc.prd.kart.getSize();
            /*Toast para mostrar a introducao de um produto no carrinho*/
            vm.showPutedInCartToast();
        });

        vm.showPutedInCartToast = function() {
            $mdToast.show({
                controller: 'myCartToastCtrl as vm',
                templateUrl: '/components/kart/meuCarrinhoToast.view.html',
                parent: $document[0].querySelector('#myCartToast'),
                hideDelay: 1000,
                position: 'top right'
            });
        }

        /*Logout user*/
        vm.logout = function() {
            userSrcv.usr.logout.execLogout();
            console.log('Login out');
        }
    }
}());