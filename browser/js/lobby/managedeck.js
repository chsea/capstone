app.config( function($stateProvider){
  $stateProvider.state('managedeck', {
      url:'/managedeck',
      templateUrl:'/js/lobby/managedeck.html',
      controller: 'manageDeckController',
      resolve: {
        users: function(UserFactory){
          return UserFactory.findAll()
        },
        user: function(AuthService){
          return AuthService.getLoggedInUser()
        }
      }
  })

})

app.controller('manageDeckController', function($scope, users,$http, user){
  console.log(user);
  $scope.users = users;
  $scope.userCards = user.cards
  $scope.currentDeck = user.decks[0]

})
