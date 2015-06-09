myApp.controller('loginCtrl', ['$scope', 'authentication',
    function($scope, authentication) {
        //        var user = {
        //            username: '',
        //            userpassword: ''
        //        }

        $scope.login = function(user) {
            if (user) {
                authentication.login({
                    user
                }, function(data) {
                    console.log(data)
                });
            } else{
                console.log('Error: No user')
            }
        }

    }
]);