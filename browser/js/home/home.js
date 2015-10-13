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

  $scope.openPack = function(){
    console.log('clicked openpack');
    if (user.packs < 1 ) return;
    user.packs -= 1;

    UserFactory.update(user, {packs: user.packs} , {suffix:'/packs'})    
//     CardFactory.findAll().then(cards => {
//       let chosenCards = _.sample(cards,5);
//       $scope.showCards = chosenCards;
//       $scope.showPack = true;
//       return chosenCards;
//     }).then(theCards => {
//       var cardIds = [];
//       theCards.forEach(card => {
//         cardIds.push(card._id);
//       });
//       user.cards = user.cards.concat(cardIds);
//       return UserFactory.update(user , {cards: user.cards, packs: user.packs   , isAdmin:false});
//     });
// >>>>>>> manageDeckState
  };

  $scope.lastFiveCards = user.cards.slice(-5);
  $scope.modalShown = false;
  $scope.toggleModal = function() {
    console.log("modal clicked");
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
