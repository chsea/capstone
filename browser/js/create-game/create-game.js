app.config($stateProvider => {
  $stateProvider.state('createGame', {
    url: '/create-game',
    templateUrl: 'js/home/create-game.html',
    controller: 'CreateGameController',
    // resolve: {
    //   users:
    // }
  });
}).controller('CreateGameController', ($state) => {

});
