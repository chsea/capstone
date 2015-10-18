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

  var chargeInfo = "allows a minion to attack on the same turn as when it was summoned";
  var tauntInfo = "protects its allies by forcing the opponent to kill minions with taunt before directing attacks at the other player or minions";
  var divineShieldInfo = "doesn't take damage for one turn after being attacked. Expires after being attacked for the first time";
  var deathRattleInfo = "casts a spell when it dies";
  var battlecryInfo = "casts a spell when its summoned";
  var windfuryInfo = "can attack twice per term";
  var enrageInfo = "emits attacks to a lesser degree when not at full strength";

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

  $scope.describeAbilities = (card) => {
    // takes a card or minion, returns a description of the cards ability
    if (!card){
      $scope.enlargedDescription = undefined;
    } else if (!card.logic) {
      $scope.enlargedDescription = "this minion has no special powers";
    } else if (card.description){
      $scope.enlargedDescription = card.name + " " + card.description;
    } else {
      var abilityList = [];
      var powerList = [];

      for (var ability in card.logic){
        if (card.logic[ability] === true){
          abilityList.push(ability);
        }
      }

      for (var power in card.logic) {
        if (typeof(card.logic[power]) === "object") {
          var str = card.name + " has " + power + ". It ";
          switch (power) {
            case "charge":
              str += chargeInfo;
              break;
            case "taunt":
              str += tauntInfo;
              break;
            case "divineShield":
              str += divineShieldInfo;
              break;
            case "deathRattle":
              str += deathRattleInfo;
              break;
            case "windfury":
              str += windfuryInfo;
              break;
            case "enrage":
              str += enrageInfo;
              break;
            case "battlecry":
              str += battlecryInfo;
              break;
            default:
              break;
          }
          powerList.push(str);
        }
      }

      var description = "";
      if (abilityList.length === 1){
        description = card.name + " has " + abilityList[0] + ". ";
      }
      if (abilityList.length > 1){
        description = card.name + " has " + abilityList.join(", ") + ". ";
      }
      if (powerList.length){
        description += powerList.join(". ") + ".";
      }

      if (abilityList.length || powerList.length){
        $scope.enlargedDescription = description;
      } else {
        $scope.enlargedDescription = "This minion has no special powers.";
      }
    }
  };


});
