app.config($stateProvider => {
  $stateProvider.state('test', {
    url: '/test',
    templateUrl: 'js/game/test.html',
    controller: 'TestController',
    resolve: {
      player: AuthService => AuthService.getLoggedInUser()
    }
  });
}).controller('TestController', ($scope, $state, $compile, Socket, player, Game) => {
  $scope.enlargeCard = function(card) {
    $scope.enlarge = card;
  };
  var chargeInfo = "Allows an employee to attack on the same turn as when they were summoned.";
  var tauntInfo = "When an employee with taunt is summoned, the opponent player can only attack the taunting employees.";
  var divineShieldInfo = "Prevents damage for one turn after being attacked. Expires after being attacked for the first time";
  var deathRattleInfo = "Casts a spell when it dies";
  var battlecryInfo = "casts a spell when its summoned";
  var windfuryInfo = "can attack twice per term";
  var enrageInfo = "emits attacks to a lesser degree when not at full strength";
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

  let players = Game($scope);
  $scope.player = players.player;
  // $scope.player.portrait = player.portrait;
  $scope.opponent = players.opponent;
  $scope.hint = {
    status: 'Show'
  };
  $scope.toggleHint = () => {
    if ($scope.hint.message) {
      $scope.hint.message = null;
      $scope.hint.status = 'Show';
      return;
    }
    $scope.hint.status = 'Hide';
    if ($scope.player.selecting) {
      $scope.hint.message = `Please drag the selector <span><img src="/images/power.png"></span> to your intended target.`;
    } else if ($scope.player.turn) {
      $scope.hint.message = `It's your turn!`;
    } else {
      $scope.hint.message = `It's ${$scope.opponent.name}'s' turn! Please wait while  ${$scope.opponent.name} is dedicing.`;
    }
  };
  let rejectedCards = [];

  let deck = player.decks[0].cards.map(card => card._id);
  Socket.emit('playerReady', player.username, deck);

  $scope.reject = idx => {
    $scope.player.decide(idx, rejectedCards);
  };

  $scope.summon = (card, e) => {
    $scope.player.summon(card.id);
  };

  $scope.select = data => {
    console.log('data', data);
    if (data.selector) $scope.player.attack({attacker: data.selector, attackee: data.selectee});
    else $scope.player.selected(data.selectee);
  };

  $scope.endTurn = () => {
    $scope.player.emitEndTurn();
  };

  $scope.leave = () => {
    console.log("trying to leave");
    Socket.emit('leave');
  };
});
