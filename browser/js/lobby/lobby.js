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


app.controller('LobbyController', function($scope,user ) {
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
