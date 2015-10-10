app.factory('Game', (Self, Opponent, Socket, $rootScope, $compile) => {
  let game = scope => {
    let game = {
      player: Self,
      opponent: Opponent,
    };

    Socket.on('initialCards', cards => {
      $compile(`<div id="initial"><card card="card" ng-class="{'selected' : card.selected}" ng-repeat="card in player.decidingCards" ng-click="reject(this.$index)"></card><button ng-click="reject()" id="reject">Reject</button></div>`)(scope).appendTo('#gameboard');
    });
    Socket.on('waitInitial', () => {
      $('#initial').remove();
      $compile(`<div id="initial"><h1>Please wait for your opponent to decide.</h1></div>`)(scope).appendTo('#gameboard');
    });
    Socket.on('setInitialHand', () => {
      $('#initial').remove();
    });

    return game;
  };
  return game;
});
