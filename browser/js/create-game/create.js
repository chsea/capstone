app.config($stateProvider => {
  $stateProvider.state('createGame.create', {
    url: '/create',
    templateUrl: 'js/create-game/create.html',
    controller: 'CreateGameCreateController',
  });
}).controller('CreateGameCreateController', ($scope, $state, Socket, user) => {
  if (!user) $scope.notLoggedIn = true;
});
