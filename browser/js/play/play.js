app.config($stateProvider => {
  $stateProvider.state('play', {
    url: '/play',
    templateUrl: 'js/play/play.html',
    controller: 'PlayController',
    resolve: {
      user: AuthService => AuthService.getLoggedInUser(),
      games: (GameFactory, user) => GameFactory.findAll({_id: user.games})
    }
  });
}).controller('PlayController', ($scope, $state, games) => {
  $scope.games = games;
  $scope.select = () => {
    $scope.gameSelected = true;
    $state.go('play.selectDeck', {name: $scope.selectedGame});
  };
});
