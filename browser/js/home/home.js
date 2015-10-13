app.config(function ($stateProvider) {
  $stateProvider.state('home', {
      url: '/',
      templateUrl: 'js/home/home.html',
      controller: 'HomeController',
      resolve: {
				user: function(AuthService) {
					return AuthService.getLoggedInUser();
				}
			}
    });
});

app.controller('HomeController', function($scope, user, UserFactory,CardFactory) {



  $scope.showPack = false;
  $scope.showCards = [];

  console.log(user);

  $scope.openPack = function(){
    console.log('clicked openpack');
    if (user.packs < 1 ) return;
    user.packs -= 1;

    UserFactory.update(user, {packs: user.packs} , {suffix:'/packs'})

  };

  $scope.user = user;
  $scope.options = [{
    name: 'Play Now',
    sref: 'play'
  },
  {
    name: 'My Collections',
    sref: 'manageDeck'
  },
  // {
  //   name: 'Join Game',
  //   sref: 'joinGame'
  // },
  // {
  //   name: 'Create Game',
  //   sref: 'joinGame'

  // },
  {
    name: 'User Settings',
    sref: 'settings'
  }];

});
