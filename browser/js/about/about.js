app.config(function ($stateProvider) {
  $stateProvider.state('about', {
      url: '/about',
      templateUrl: 'js/about/about.html',
      controller: 'AboutController',
      resolve: {
				user: function(AuthService) {
					return AuthService.getLoggedInUser();
				}
			}
    });
});


app.controller('AboutController', function($scope, user) {

  $scope.user = user;
  // $scope.showCards = [];
  // $scope.lastFiveCards = null;



});
