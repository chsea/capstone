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


  $scope.user = user;
  $scope.showCards = [];
  $scope.lastFiveCards = null;

  $scope.openPack = function(){
    if (user.packs < 1 ) return;
    user.packs -= 1;

    UserFactory.update(user, {packs: user.packs} , {suffix:'/packs'})
    .then(function(updatedUser){
      user.cards = updatedUser.cards;
      $scope.toggleModal();
    });
  };

  $scope.modalShown = false;
  $scope.toggleModal = function() {
    $scope.lastFiveCards = user.cards.slice(-5);
    console.log($scope.lastFiveCards);
    $scope.modalShown = !$scope.modalShown;
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
