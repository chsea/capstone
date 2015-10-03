app.config($stateProvider => {
  $stateProvider.state('play', {
    url: '/play',
    templateUrl: 'js/play/play.html',
    controller: 'PlayController',
    resolve: {
      user: AuthService => AuthService.getLoggedInUser()
    }
  });
}).controller('PlayController', ($scope, $state, user) => {
  if (!user) $scope.notLoggedIn = true;
  $scope.games = user.games;
  $scope.select = () => {
    $scope.gameSelected = true;
    $state.go('play.selectDeck', {name: $scope.selectedGame});
  };
});
