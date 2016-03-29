(function() {
    'use strict';
    angular.module('myApp').controller('contactCtrl', ['$scope', '$timeout', '$log', '$mdMedia', '$window', contactCtrl]);

    function contactCtrl($scope, $timeout, $log, $mdMedia, $window) {
        var vm = this;

        /*Message form---------------------*/
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

        //Social buttons
        vm.social = [{
            name: 'facebook',
            icon: 'mdi-facebook',
            class: 'facebook',
            url: 'http://facebook.com/patricio.cordeiro.75'
        }, {
            name: 'instagram',
            icon: 'mdi-instagram',
            class: 'instagram'
        }, {
            name: 'twitter',
            icon: 'mdi-twitter',
            class: 'twitter'
        }, {
            name: 'googleplus',
            icon: 'mdi-google-plus',
            class: 'googleplus'
        }, {
            name: 'linkedin',
            icon: 'mdi-linkedin',
            class: 'linkedin'
        }, {
            name: 'youtube',
            icon: 'mdi-youtube-play',
            class: 'youtube'
        }]

        vm.openExternalUrl = function() {
            $window.location.href = 'http://www.google.com'; //You should have http here.
			console.log('acessando url externo');
        }

        //Show hide msg form on xs, sm and md devices
        vm.mdMedia = $mdMedia;
        vm.isShowMsgForm = false;
        vm.showHideMsgForm = function() {
            vm.isShowMsgForm = !vm.isShowMsgForm;
            console.log(vm.isShowMsgForm);
            if ($mdMedia('sm')) {
                console.log('Im in a small device');
            }
        }
        //Google map
        //		-1.375504,-48.443129,19
        var latitude = Number(-1.3756506925129375);
        var longitude = Number(-48.44359536747646);


        vm.map = {
            center: {
                latitude: latitude,
                longitude: longitude
            },
            zoom: 16
        };

        $scope.marker = {
            id: 0,
            coords: {
                latitude: latitude,
                longitude: longitude
            },
            options: {
                draggable: true
            },
            events: {
                dragend: function(marker, eventName, args) {
                    $log.log('marker dragend');
                    var lat = marker.getPosition().lat();
                    var lon = marker.getPosition().lng();
                    $log.log(lat);
                    $log.log(lon);

                    vm.marker.options = {
                        draggable: true,
                        labelContent: "lat: " + vm.marker.coords.latitude + ' ' + 'lon: ' + vm.marker.coords.longitude,
                        labelAnchor: "100 0",
                        labelClass: "marker-labels"
                    };
                }
            }
        };
        $scope.$watchCollection("marker.coords", function(newVal, oldVal) {
            if (_.isEqual(newVal, oldVal))
                return;
            vm.coordsUpdates++;
        });
        $timeout(function() {
            $scope.marker.coords = {
                latitude: latitude,
                longitude: longitude
            };
            vm.dynamicMoveCtr++;
            $timeout(function() {
                $scope.marker.coords = {
                    latitude: latitude,
                    longitude: longitude
                };
                vm.dynamicMoveCtr++;
            }, 2000);
        }, 1000);
        //        //        };
    }
})();