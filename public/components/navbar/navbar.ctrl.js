(function() {

    'use strict';

    angular.module('myApp').controller('NavbarCtrl', ['$scope', 'productSrvc', '$mdToast', '$document', NavbarCtrl]);

    function NavbarCtrl($scope, productSrvc, $mdToast, $document) {
        var vm = this;
        var prd = productSrvc;

        //Dados dos produtos colocados no carrinho
        vm.dataChange = productSrvc.prdKartDataChange; //Esta variavel e compartilhado ent. ctrl
       //Get all kart data
        vm.kartData = prd.prdKartData

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
        /*Get clicked product caterory*/
        vm.prdgetSelCatg = function(category) {
            //            vm.getSelectedProductSection(selecteProductSection);
            var prdCatg = prd.prdGetCatg(productSrvc.prdCatg, category);
            console.log('mudou para', prdCatg);
            //             console.log($rootScope.dataChange);
        };
        //-------------------------------------------------
        /*Watch for product by (if user click on buy)*/
        $scope.$watch('dataChange', function() {
            console.log("No navbar Produto adicionado no carrinho");
            console.log(prd.prdKartData);
            vm.kartSize = prd.prdGetKartSize(prd.prdKartData);
            console.log(vm.kartSize);
        });
    }
}());