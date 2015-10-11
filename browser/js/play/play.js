app.config($stateProvider => {
  $stateProvider.state('play', {
    url: '/play',
    templateUrl: 'js/play/play.html',
    controller: 'PlayController',
    resolve: {
      user: AuthService => AuthService.getLoggedInUser()
    }
  });
});

app.controller('PlayController', ($scope, $state, user) => {
  $scope.isLoggedIn = true;
  if (!user) {
    $scope.isLoggedIn = false;
  }
  $scope.games = user.games;
  $scope.select = () => {
    $scope.gameSelected = true;
    $state.go('play.selectDeck', {name: $scope.selectedGame});
  };
});
