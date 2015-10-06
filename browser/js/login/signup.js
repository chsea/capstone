app.config(function($stateProvider) {
  $stateProvider.state('signup', {
    url: '/signup',
    templateUrl: 'js/login/signup.html',
    controller: 'signupCtrl'
  })
})

app.controller('signupCtrl', function($scope, $state, AuthService, UserFactory) {
  var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  $scope.emailValidate = function(email) {
    return re.test(email)
  }




  $scope.$emailValid = true;

  function resetUser() {
    $scope.newUser = {
      email: null,
      username: null,
      password: null
    }
  }

  $scope.signup = function() {
    if (!$scope.emailValidate($scope.newUser.email)) {
      $scope.$emailValid = false
      console.log('lol')
    } else {
      UserFactory.create($scope.newUser)
        .then(user => {
          console.log(user)
          resetUser()
          $state.go('login')
        })
    }
  }




  resetUser()

})
