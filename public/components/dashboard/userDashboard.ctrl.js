(function() {

    'use strict';

    angular.module('myApp').controller('userDashboardCtrl', ['userSrcv', 'generalSrvc', '$q', '$mdDialog', '$scope', '$mdSidenav', userDashboardCtrl])

    function userDashboardCtrl(userSrcv, generalSrvc, $q, $mdDialog, $scope, $mdSidenav) {
        var vm = this;
        //pass the user data to vm
        vm.user = userSrcv.usr.login.data.local
        vm.userUpdateData = function(userData) {
            //TODO: update service function
            userSrcv.usr.update(userData);
        }

        //---------user general settings update--------------------------- 
        vm.userUpdate = {};
        //Pass the user email. Will be used for authentication

        var claearForm = function() {
            vm.userUpdateForm.$setUntouched();
            vm.userUpdateForm[1].$setValidity();
            vm.userUpdateForm[1].$setPristine();
            vm.userUpdate.data = {};
        }

        var nSettings = 5; // number of settings

        generalSrvc.closeAll(nSettings).then(function(data) {
            vm.userIsEditSettings = data; //set all to false
            console.log(vm.userIsEditAddress);
        });

        //function to open the editing settings area 
        vm.userEditSettings = function(index) {
            //first close all edit area
            generalSrvc.closeAll(nSettings).then(function(data) {
                //close all
                vm.userIsEditSettings = data;
                //open the clicked address edit area
                vm.userIsEditSettings[index] = true;
                console.log(vm.userIsEditSettings);
            });
        }

        //Get password for update confirmation
        vm.userGetPassword = function(userPassword) {
            console.log(userPassword);
            $mdDialog.hide(userPassword);
        }
        //Close dialogs
        vm.closeDiag = function() {
            userSrcv.usr.cancelDialog();

        }
        //Function to update user settings
        vm.userUpdateSettings = function(user, ev) {
            console.log(user);
            if (user == 'cancel') {
                //clear the form

                console.log('cancel');
                console.log(vm.userUpdate);
                vm.userUpdateFormName.$setUntouched();
                vm.userUpdateFormName.$setValidity();
                vm.userUpdateFormName.$setPristine();

                vm.userUpdateFormPhones.$setUntouched();
                vm.userUpdateFormPhones.$setValidity();
                vm.userUpdateFormPhones.$setPristine();

                vm.userUpdateFormPassword.$setUntouched();
                vm.userUpdateFormPassword.$setValidity();
                vm.userUpdateFormPassword.$setPristine();

                vm.userUpdateFormEmail.$setUntouched();
                vm.userUpdateFormEmail.$setValidity();
                vm.userUpdateFormEmail.$setPristine();
                vm.userUpdate = {};
                //close all 
                generalSrvc.closeAll(nSettings).then(function(data) {
                    //close all
                    vm.userIsEditSettings = data;
                    console.log(vm.userIsEditSettings);
                });
            } else {
                //update user settings
                console.log(user);
                $mdDialog.show({
                    controller: 'userDashboardCtrl as vm',
                    templateUrl: 'components/dashboard/userUpdateDiag.view.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: false
                })
                    .then(function(answer) {
                        $scope.status = 'You said the information was "' + answer + '".';
                        var query = {
                            email: vm.user.email,
                            password: answer,
                            data: {}
                        };
                        //The bellow construct a entire query with the field
                        // and the value for update

                        //Get all keys that will be updated
                        var myUpdateKeys = Object.keys(vm.userUpdate.data);
                        //For each key, set a new key called local.{key}
                        _(myUpdateKeys).forEach(function(value) {
                            query.data['local.' + value] = vm.userUpdate.data[value];
                        });

                        //clear the form
                        vm.userUpdate = {};
                        //closeediting
                        generalSrvc.closeAll(nSettings).then(function(data) {
                            //close all
                            vm.userIsEditSettings = data;
                            console.log(vm.userIsEditSettings);
                        });

                        //run the update
                        userSrcv.usr.update(query);

                    }, function() {
                        $scope.status = 'You cancelled the dialog.';
                    });
            };


        }
        vm.userEditSettingsCancell = function() {
            generalSrvc.closeAll(nAddress).then(function(data) {
                //close all
                vm.userIsEditAddress = data;
                console.log(vm.userIsEditAddress);
            });
        }

        //---------------------------------------------------------------

        //Address update handle------------------------------------------
		var nAddress = 0 ;//Total of user addresses
		if(vm.user.endereco){
			var nAddress = vm.user.endereco.length;
		}
        generalSrvc.openAll(nAddress).then(function(data) {
            vm.userIsEditAddress = data;
            console.log(vm.userIsEditAddress);
        });

        vm.userEditAddress = function(index) {
            console.log(index);
            //first close all edit area
            generalSrvc.openAll(nAddress).then(function(data) {
                //close all
                vm.userIsEditAddress = data;
                //open the clicked address edit area
                vm.userIsEditAddress[index] = false;
                console.log(vm.userIsEditAddress);
            });
        }
        vm.userUpdateAddress = function(userAddress) {
            console.log(userAddress);
            generalSrvc.openAll(nAddress).then(function(data) {
                vm.userIsEditAddress = data;
                console.log(vm.userIsEditAddress);
            });
        }

        /*Remove address*/
        vm.userRemoveAddress = function(addressId, ev) {
            console.log(addressId);
            //TODO: confirm dialog
            var confirm = $mdDialog.confirm()
                .title('Exluir endereço de entrega')
                .textContent('Tem certeza de que deseja excluir este endereço de entrega?')
                .ariaLabel('excluir Endereco Entrega')
                .targetEvent(ev)
                .ok('Confirmar!')
                .cancel('Cancelar');
            $mdDialog.show(confirm).then(function() {
                // TODO: Here send query to server
                console.log(vm.user.email);
                userSrcv.usr.address.remove(addressId, vm.user.email, function( newData) {
                  //update the adress immediately
					vm.user.endereco = newData.local.endereco;
                });

            }, function() {
                //                    if not confirmed
                //DO NOTHING
            });
        }

        /*New Address dialog*/
        vm.addNewAddressDialog = function(ev) {
            userSrcv.usr.address.dialog(ev, $scope)
        }
        // Add new address
        vm.addNewAddress = function(newAddress) {
            console.log(newAddress);
            userSrcv.usr.address.add(newAddress, function(newData){
				  //update the address immediately
				vm.user.endereco = newData.local.endereco;
				console.log(vm.user.endereco);
			});

        };
        //        vm.testDialog = function(ev) {
        //            var message = {};
        //            message.sucess = 0;
        //            message.title = 'Endereço excluido com sucesso!';
        //            userSrcv.usr.dialog(message);
        //        }


        //-----------------------------------------------------------------------------

        //Handle the left navbar-----------------------
        vm.settingsList = [{
            name: 'Minha conta',
            icon: 'settings',
            link: 'app.user.dashboard.dados',
            sectionTitle: 'Configurações gerais da conta'
        }, {
            name: 'Endereços',
            icon: 'location_on',
            link: 'app.user.dashboard.endereco',
            sectionTitle: 'Endereços de entrega'
        }, {
            name: 'Pedidos',
            icon: 'local_shipping',
            link: 'app.user.dashboard.pedidos',
            sectionTitle: 'Pedidos'
        }];

        //set the first item active at page-load
        vm.active = 0;
        vm.settingsListActive = function(index) {
            vm.active = index;
        }
        //----------------------------------------------

        /*Left navbar----------------------------------------*/
        vm.openLeftSidenav = function() {
            $mdSidenav('left').toggle();
        };
        vm.closeSidenavLeft = function() {
            $mdSidenav('left').close()
        }


    };

})();