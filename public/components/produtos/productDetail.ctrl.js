(function () {
    "use strict";
    angular.module('myApp').controller('PrdDetailCtrl', ['$rootScope', '$cookies', '$stateParams', '$mdDialog', 'productSrvc',
        PrdDetailCtrl
    ]);

    function PrdDetailCtrl($rootScope, $cookies, $stateParams, $mdDialog, productSrvc) {
        var vm = this;

        var prd = productSrvc;
        var prdId = $stateParams.id //product id

        vm.prdQty = 1;
        vm.dataChange = {
            value: 'false'
        };

        $rootScope.dataChange = 'false';
        //-----------------------------------------------------------
        //Get the selected product data
        console.log(prd.prd.data);
        vm.prdData = prd.prd.getDetails(prd.prd.data, prdId);
        //-----------------------------------------------------------


        //Get Compra
        vm.prdQty = prd.prdKartBuyQty //store the quantity (uses ng-model)
        vm.prdGetBuy = function (prdQty) {
                prd.prdPutonKart(prd.prdData, prd.prdKartData, prd.prdKartIds, prdId, prdQty);
                //Used to trigger the watch in navbar for Kart
                $rootScope.dataChange = !$rootScope.dataChange;
            }
            //-----------------------------------------------------------
            /*Elevate zoom-------------------------------------*/
        $("#zoom_01").elevateZoom({
            responsive: true
        });

        /*Awesome rating options*/
        vm.awesomeRatingOptions = {
                readonly: true,
                applyHoverCss: false
            }
            //--------------------------------------------------

        /*Social buttons*/
        vm.social = [{
            name: 'facebook',
            icon: 'mdi-facebook',
            class: 'facebook',
            url: 'http://facebook.com/patricio.cordeiro.75'
        }, {
            name: 'twitter',
            icon: 'mdi-twitter',
            class: 'twitter'
        }, {
            name: 'pinterest',
            icon: 'mdi-pinterest',
            class: 'pinterest'
        }, {
            name: 'googleplus',
            icon: 'mdi-google-plus',
            class: 'googleplus'
        }]

        /*Show hide the rating pop over*/
        vm.isShowPopOver = false //initialize closed
        vm.showHideRatingPopOver = function () {
                vm.isShowPopOver = !vm.isShowPopOver
            }
            //-----------------------------------------------------


    }; //End of function PrdDetailCtrl
}());