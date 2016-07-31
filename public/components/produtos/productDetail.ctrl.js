(function() {
    "use strict";
    angular.module('myApp').controller('PrdDetailCtrl', ['$rootScope', '$scope', '$cookies', '$stateParams', '$mdDialog', 'productSrvc', '$filter',
        PrdDetailCtrl
    ]);

    function PrdDetailCtrl($rootScope, $scope, $cookies, $stateParams, $mdDialog, productSrvc, $filter) {
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


        /* Get Compra*/
        //        vm.prdQty = prd.prdKartBuyQty //store the quantity (uses ng-model
        vm.prdQty = 1;
        vm.prdGetBuy = function(prdQty) {
            console.log(prdId);
            prd.prd.kart.addItem(prdId, prdQty);
            //Used to trigger the watch in navbar for Kart
            $rootScope.dataChange = !$rootScope.dataChange;
            //restart Qty
            vm.prdQty = prdSrvc.prd.qty;
        }
        //-----------------------------------------------------------
        /*Elevate zoom-------------------------------------*/

        $("#zoom_01").elevateZoom({
            gallery: 'gal1',
            cursor: 'pointer',
            galleryActiveClass: "active",
            imageCrossfade: true,
            responsive: true
        });

        $("#zoom_01").bind("hover", function(e) {
            var ez = $('#zoom_01').data('elevateZoom');
            ez.closeAll(); //NEW: This function force hides the lens, tint and window
            $.fancybox(ez.getGalleryList());
            return false;
        });

        /*Awesome rating options*/
        vm.awesomeRatingOptions = {
            readonly: true,
            applyHoverCss: false
        }

        vm.ReviewStars = 0; //Total review stars (start with 0)
        vm.awesomeRatingReviewOptions = {
            readonly: false,
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

        /*============Rating==========*/
        /*Show hide the rating pop over*/
        vm.isShowPopOver = false //initialize closed
        vm.showHideRatingPopOver = function() {
            vm.isShowPopOver = !vm.isShowPopOver
        }

        //TODO: to be replaced by real data
        vm.productRating = [{
            stars: 5,
            qty: 20,
            percent: 50
        }, {
            stars: 4,
            qty: 10,
            percent: 25
        }, {
            stars: 3,
            qty: 5,
            percent: 10,
        }, {
            stars: 2,
            qty: 0,
            percent: 0
        }, {
            stars: 1,
            qty: 25,
            percent: 15
        }]


        /*Product review-----------------------------------------*/
        /*Product review dialog*/
        vm.reviewDialog = function(ev) {
            $mdDialog.show({
                scope: $scope,
                preserveScope: true,
                controller: function DialogController($scope, $mdDialog) {
                    $scope.cancelDialog = function() {
                        $mdDialog.cancel();
                    }
                    $scope.closeDialog = function() {
                        $mdDialog.hide();
                    }
                },
                //                        controller: 'userDashboardCtrl as vm',
                templateUrl: 'components/produtos/productReviewDialg.view.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            })
        }
        //Send product review
        vm.review={};
        vm.productReview = function(review) {
            //http call
            console.log(review);
            var query = {};
            query.review = review
            query.id = prdId;
            query.review.author = 'patricio'
            query.review.date = new Date();
            console.log('Enviando Review', query);
                        prd.prd.http.reviewProduct(query,prdId, function(res) {
                console.log(res);
            })

        }


        /*-----------------------------------------------------------------------*/
        //Text area Character count*/
        //this will have the message
        vm.contactMsg = '';
        //max number of chars
        vm.maxNumOfChars = 1000;
        //remaining chars to enter
        vm.remainChars = vm.maxNumOfChars;
        vm.getNumOfChars = function() {
            console.log(vm.contactMsg.length);
            vm.remainChars = vm.maxNumOfChars - vm.contactMsg.length
        }
        //-----------------------------------------------------

        /*Users Review Comments*/
        //TODO: To be replaced by real data
        var date = new Date();
        vm.usersReview = [{
            author: 'Patrício',
            stars: 3,
            usefull: 1,
            notUsefull: 4,
            date: $filter('date')(date),
            comment: {
                title: 'Muito bom',
                text: 'Morbi leo mi, nonummy eget, tristique non, rhoncus non, leo. Nullam faucibus mi quis velit. Integer in sapien. Fusce tellus odio, dapibus id, fermentum quis, suscipit id, erat. Fusce aliquam vestibulum ipsum. Aliquam erat volutpat. Pellentesque sapien. Cras elementum. Nulla pulvinar eleifend'
            }
        }, {
            author: 'Pedrito',
            stars: 4,
            usefull: 24,
            notUsefull: 2,
            date: $filter('date')(date),
            comment: {
                title: 'Produto excelente',
                text: 'Maecenas ipsum velit, consectetuer eu, lobortis ut, dictum at, dui. In rutrum. Sed ac dolor sit amet purus malesuada congue. In laoreet, magna id viverra tincidunt, sem odio bibendum justo, vel imperdiet sapien wisi sed libero. Suspendisse sagittis ultrices augue. Mauris metus.'
            }
        }, {
            author: 'Bla blau',
            stars: 4,
            usefull: 3,
            notUsefull: 6,
            date: $filter('date')(date),
            comment: {
                title: 'Muito bom',
                text: 'Praesent in mauris eu tortor porttitor accumsan. Mauris suscipit, ligula sit amet pharetra semper, nibh ante cursus purus, vel sagittis velit mauris vel metus. Aenean fermentum risus id tortor. Integer imperdiet lectus quis justo. Integer tempor. Vivamus ac urna vel leo pretium'
            }
        }]

        vm.totalReviews = vm.usersReview.length;
        vm.averageStars = _.meanBy(vm.usersReview, 'stars')
        console.log(vm.averageStars);
        vm.averageStarsOptions = {
            allowFractional: true,
            readonly: true,
        }
    }; //End of function PrdDetailCtrl





}());
