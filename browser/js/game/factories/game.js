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

    let attack = (player, attackerMinion, attackeeMinion) => {
      let opponent = player === 'player' ? 'opponent' : 'player';
      let attacker = _.find(game[player].summonedMinions, minion => minion.id === attackerMinion.id);
      let attackee = attackeeMinion.id ?  _.find(game[opponent].summonedMinions, minion => minion.id === attackeeMinion.id) : game[opponent];
      attacker.canAttack = false;
      attacker.hp = attackerMinion.hp;
      attackee.hp = attackeeMinion.hp;

      if (!attacker.hp) _.remove(game[player].summonedMinions, minion => minion.id === attacker.id);
      if (!attackee.hp) _.remove(game[opponent].summonedMinions, minion => minion.id === attackee.id);
      $rootScope.$digest();
    };
    Socket.on('attacked', (attacker, attackee) => {
      console.log('attacked!');
      attack('player', attacker, attackee);
    });
    Socket.on('wasAttacked', (attacker, attackee) => {
      console.log('was attacked!');
      attack('opponent', attacker, attackee);
    });

    return game;
  };
  return game;
});
