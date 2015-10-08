app.factory('Self', (Player, Game, Socket, $rootScope, $compile) => {
  let self = scope => {
    let player = new Player();

    Socket.on('gameStart', players => {
      player.name = players.player;
      $rootScope.$digest();
      Socket.emit('initialDraw');
    });

    player.decide = (idx, rejectedCards) => {
      if (idx + 1) {
        player.decidingCards[idx].selected = !player.decidingCards[idx].selected;
        let i = rejectedCards.indexOf(idx);
        if (i > -1) rejectedCards.splice(i, 1);
        else rejectedCards.push(idx);
      } else Socket.emit('rejectCards', rejectedCards);
    };
    Socket.on('initialCards', cards => {
      player.decidingCards = cards;
      $compile(`<div id="initial"><card card="card" ng-class="{'selected' : card.selected}" ng-repeat="card in player.decidingCards" ng-click="reject(this.$index)"></card><button ng-click="reject()" id="reject">Reject</button></div>`)(scope).appendTo('#gameboard');
    });
    Socket.on('waitInitial', () => {
      $('#initial').remove();
      $compile(`<div id="initial"><h1>Please wait for your opponent to decide.</h1></div>`)(scope).appendTo('#gameboard');
    });
    Socket.on('setInitialHand', (hand, turn) => {
      $('#initial').remove();
      player.hand = hand;
      player.turn = turn;
      $rootScope.$digest();
      Socket.emit('initialHandSet');
    });

    player.summon = card => {
      Socket.emit('summon', card);
    };
    Socket.on('summoned', card => {
      console.log(`summoned ${card.name}`);
      player.summoned(card);
    });

    Socket.on('startTurn', card => {
      console.log(`start turn - ${card.name}`);
      player.startTurn(card);
      player.summonedMinions.forEach(minion => {
        if (!minion.canAttack) minion.canAttack = true;
      });
      Game(scope).setMessage("Your turn!");
    });
    player.endTurn = () => {
      player.turn = false;
      Socket.emit('endTurn');
    };

    return player;
  };

  return self;
});
