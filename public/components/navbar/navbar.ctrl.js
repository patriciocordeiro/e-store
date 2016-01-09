(function() {

    'use strict';

    angular.module('myApp').controller('NavbarCtrl', ['$scope', '$rootScope', 'productSrvc', 'userSrcv', '$mdToast', '$document', NavbarCtrl]);

    function NavbarCtrl($scope, $rootScope, productSrvc, userSrcv, $mdToast, $document) {
        /*Variables declaration*/
        var vm = this;
        var prdSrvc = productSrvc //productSrvc; pass all product services to variable prdSrvc
        vm.kartSize = prdSrvc.prd.kart.getSize();
        console.log(vm.kartSize);
        var getSizePromisse = prdSrvc.prd.kart.getSize();
        getSizePromisse.then(function(data) {
            console.log(data);
        })
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
        };
        //        vm.prdSrvcgetSect = function(section) {
        //            prdSrvc.section = section;
        //            console.log(productCategory.section);
        //        }
        //-------------------------------------------------
        /*Watch for COMPRA by (if user click on COMPRAR)*/
        $scope.$watch('dataChange', function(newValue, oldValues) {
            console.log('navbar watch fired up');
            //Calculate the kart size imediatelly after user click on COMPRAR
            vm.kartSize = prdSrvc.prd.kart.ids.length;
            /*Toast para mostrar a introducao de um produto no carrinho*/
            console.log(vm.kartSize);
            vm.showPutedInCartToast();
        });
        //-------------------------------------------------------------------   
        vm.showPutedInCartToast = function() {
            $mdToast.show({
                controller: 'myCartToastCtrl as vm',
                templateUrl: '/components/kart/meuCarrinhoToast.view.html',
                parent: $document[0].querySelector('#myCartToast'),
                hideDelay: 1000,
                position: 'top right'
            });
        }
        //-------------------------------------------------------------------   
        /*Logout user*/
        vm.logout = function() {
            userSrcv.usr.logout.execLogout();
            console.log('Login out');
        }
        //-------------------------------------------------------------------   
        /*Search*/
        vm.searchText =''; //variable for ng-model to get search text
        vm.searchPrd = function(query) {
            productSrvc.prd.http.getDatabySearch(query, function(data) {
                vm.productsBySearch = data;
                console.log(data);

            });
        }
    }
}());