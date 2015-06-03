myApp.controller('signupCtrl', ['$scope', 'authentication',
    function($scope, authentication) {

        //        console.log(usersApi)
        var user = {
            firstName: '',
            lastName: '',
            email: '',
            password: ''

        }

        $scope.save = function(user) {
            if (user) {
                console.log(user)
                authentication.signup({
                    user
                }, function(data) {
                    console.log(data)
                });

            }

        }


    }
]);