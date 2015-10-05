app.config(function($stateProvider) {
  $stateProvider.state('signup', {
    url: '/signup',
    templateUrl: 'js/login/signup.html',
    controller: 'signupCtrl'
  })
})

app.controller('signupCtrl', function($scope, AuthService, UserFactory) {

   $scope.signup = function(){

   }



})
