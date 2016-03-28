(function() {
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
        vm.prdGetBuy = function(prdQty) {
            prd.prdPutonKart(prd.prdData, prd.prdKartData, prd.prdKartIds, prdId, prdQty);
            //Used to trigger the watch in navbar for Kart
            $rootScope.dataChange = !$rootScope.dataChange;
        }
        //-----------------------------------------------------------
		/*Elevate zoom-------------------------------------*/
		$("#zoom_01").elevateZoom();
		//--------------------------------------------------
    }; //End of function PrdDetailCtrl
}());