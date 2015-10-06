app.config(function($stateProvider) {

  $stateProvider.state('lobby', {
    url: '/lobby',
    templateUrl: 'js/lobby/lobby.html',
    controller: 'LobbyController',
    resolve: {
      user: function(AuthService) {
        return AuthService.getLoggedInUser();
      }
    },
    data: {
        authenticate: true
    }
  });
});

app.controller('LobbyController', function($scope, user, UserFactory,CardFactory) {

  $scope.showPack = false
  $scope.showCards = []

  $scope.openPack = function(){
    console.log('clicked openpack')
    if (user.packs < 1 ) return
    user.packs -= 1
    
    CardFactory.findAll().then(cards => {

      let chosenCards = _.sample(cards,5)
      $scope.showCards = chosenCards
      $scope.showPack = true
      return chosenCards
    }).then(theCards => {
      var cardIds = []
      theCards.forEach(card => {
        cardIds.push(card._id)
      })
      user.cards = user.cards.concat(cardIds);
      return UserFactory.update(user , {cards: user.cards, packs: user.packs   , isAdmin:false})

    }).then(function(user){

    })
  }


  $scope.user = user;
  $scope.options = [{
    name: 'Play Now',
    sref: 'play'
  }, {
    name: 'Manage Deck',
    sref: 'managedeck'
  }, {
    name: 'Join Game',
    sref: 'joinGame'
  }, {
    name: 'Create Game',
    sref: 'joinGame'

  }, {
    name: 'Settings',
    sref: 'settings'
  }]

})
