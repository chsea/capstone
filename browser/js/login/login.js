app.config(function ($stateProvider) {

    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'js/login/login.html',
        controller: 'LoginCtrl'
    });

});

app.controller('LoginCtrl', function ($scope, AuthService, $state, UserFactory) {
    
    $scope.togglelogin = true;
    $scope.login = {};
    $scope.error = null;
    $scope.$emailValid = true;

    var regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    $scope.emailValidate = function(email) {
        return regex.test(email);
    };

    $scope.sendLogin = function (loginInfo) {
        $scope.error = null;
        AuthService.login(loginInfo).then(function () {
            $state.go('home');
        }).catch(function () {
            $scope.error = 'Invalid login credentials.';
        });

    };

    $scope.sendSignup = function() {
        if (!$scope.emailValidate($scope.newUser.email)) {
          $scope.$emailValid = false;
        } else {
        UserFactory.create($scope.newUser)
            .then(user => {
              resetUser();
              $state.go('home');
            });
        }
    };

    function resetUser() {
        $scope.newUser = {
          email: null,
          username: null,
          password: null
        };
    }
    
    resetUser();

});
