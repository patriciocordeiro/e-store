(function() {

    'use strict';

    angular.module('myApp').controller('NavbarCtrl', ['$scope', '$rootScope', '$state', 'productSrvc', 'userSrcv', '$mdToast', '$document', NavbarCtrl]);

    function NavbarCtrl($scope, $rootScope, $state, productSrvc, userSrcv, $mdToast, $document) {
        /*Variables declaration*/
        var vm = this;
        var prdSrvc = productSrvc //productSrvc; pass all product services to variable prdSrvc
//        vm.kartSize = prdSrvc.prd.kart.getSize().then(function(kartSize) {
//            console.log(kartSize);
//        });
        console.log(vm.kartSize);
        /*recover kart*/
        prdSrvc.prd.kart.recover(function(data) {
            console.log(data);
            vm.kartData = data;
             vm.kartSize = data.length;
        });
        //        var getSizePromisse = prdSrvc.prd.kart.getSize();
        //        getSizePromisse.then(function(data) {
        //            console.log(data);
        //        })


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
            //Query to send to server
            //			   var reg = new RegExp('^', "i");
            var query = {
                category: category,

                prdMaxPageItems: '20', //Max number of display items in the page
            }
            console.log(query.subcategoria);
            prdSrvc.prd.http.getDataByCatg(query, category, function() {});
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
            console.log('Toast executado');
            $mdToast.show({
                controller: 'myCartToastCtrl as vm',
                templateUrl: '/components/kart/kartPutToast.view.html',
                //                parent: $document[0].querySelector('#myCartToast'),
                hideDelay: 1000,
                position: 'top left'
            });
        }
        //-------------------------------------------------------------------   
        /*Logout user*/
        vm.logout = function() {
            userSrcv.usr.logout.execLogout();
            console.log('Login out');
        }
        //-------------------------------------------------------------------   
        /*Search with elastic search*/
        vm.searchText = ''; //variable for ng-model to get search text
        var query = {};
        vm.searchPrd = function(searchText) {
            //prevent multiple seach request of the same terms
            if (query.terms && query.terms == searchText) {
                console.log('novo termo');
                return;
            }
            query.terms = searchText;
            console.log(query);
            productSrvc.prd.http.getDatabySearch(query, function(data) {
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
    }
}());