app.config(function($stateProvider) {
  $stateProvider.state('managedeck', {
    url: '/managedeck',
    templateUrl: '/js/lobby/managedeck.html',
    controller: 'manageDeckController',
    resolve: {
      users: function(UserFactory) {
        return UserFactory.findAll()
      },
      user: function(AuthService, UserFactory) {
        return AuthService.getLoggedInUser().then(function(user) {
          return user
        })
      },
      decks: function(DeckFactory) {
        return DeckFactory.findAll({})
          .then(function(decks) {
            return decks;
          });
      }
    }
  })

})

app.controller('manageDeckController', function(decks, $scope, users, $http, user) {
  console.log(user);
  $scope.decks = decks
  $scope.user = user
    // $scope.userCards = user.cards
    // $scope.currentDeck = user.decks

})
