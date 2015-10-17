app.config($stateProvider => {
  $stateProvider.state('game', {
    url: '/game/:id',
    templateUrl: 'js/game/game.html',
    controller: 'GameController',
  });
}).controller('GameController', ($scope, $state, $compile, Socket, Game) => {
  let players = Game($scope);
  $scope.enlarge = undefined;
  $scope.enlargedDescription = undefined;
  $scope.player = players.player;
  $scope.opponent = players.opponent;
  Socket.emit('playerReady');

  let rejectedCards = [];
  $scope.reject = idx => {
    $scope.player.decide(idx, rejectedCards);
  };

  $scope.summon = (card, e) => {
    $scope.player.summon(card.id);
  };

  $scope.select = data => {
    if (data.selector) $scope.player.attack({attacker: data.selector, attackee: data.selectee});
    else $scope.player.selected(data.selectee);
  };

  $scope.endTurn = () => {
    $scope.player.emitEndTurn();
  };

  $scope.leave = () => {
    Socket.emit('leave');
  };
 
  $scope.enlargeCard = (card) => {
    $scope.enlarge = card;
  };

  $scope.describeAbilities = function(card) {
    if (!card){
      $scope.enlargedDescription = undefined;
    }
    // takes a card or minion, returns a description of the cards ability in the form of a string
    if (card.description){
      console.log(card.name + " " + card.description);
      $scope.enlargedDescription = card.name + " " + card.description;
      return;
    }
    else if (!card.logic) {
      $scope.enlargedDescription = "this minion has no special powers";
      return;
    }
    var desc = card.name + " has ";
    var count = 0;
    for (var key in card.logic){
      if (card.logic[key] === true || typeof(card.logic[key]) === "object"){
        desc += key + ", ";
        count++;
      }
    }
    if (count < 1){
      $scope.enlargedDescription = "this minion has no special powers";
      return;
    }
    $scope.enlargedDescription = desc.slice(0,-2);
  };




});
