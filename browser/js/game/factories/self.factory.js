app.factory('Self', (Player, Minion, Socket, $rootScope) => {
  let player = new Player();

  Socket.on('gameStart', players => {
    player.name = players.player;
    $rootScope.$digest();
    // Socket.emit('initialDraw');
  });

  //initial draw
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
    $rootScope.$digest();
  });
  Socket.on('setInitialHand', (hand, turn) => {
    $('#initial').remove();
    player.hand = hand;
    player.turn = turn;
    $rootScope.$digest();
    // Socket.emit('initialHandSet');
  });

  //turns
  Socket.on('startTurn', card => {
    console.log(`start turn - ${card.name}`);
    player.message = "Your turn!";
    player.startTurn(card);
  });
  Socket.on('wait', () => {
    player.message = "Opponent's turn!";
    player.opponentTurn();
  });
  player.emitEndTurn = () => {
    player.endTurn();
    Socket.emit('endTurn');
  };

  //summoning
  player.summon = id => {
    _.remove(player.hand, card => card.id === id);
    Socket.emit('summon', id);
  };
  Socket.on('summoned', card => {
    console.log(`summoned ${card.name}`);
    player.summoned(card);
  });

  //attacking
  player.attack = data => {
    let attackee = data.attackee ? data.attackee.id : null;
    Socket.emit('attack', data.attacker.id, attackee);
  };
  Socket.on('attacked', attacker => {
    console.log('Attacked!');
    player.attacked(attacker);
  });
  Socket.on('wasAttacked', (attacker, attackee) => {
    console.log('Was attacked!');
    player.wasAttacked(attackee);
  });

  //spells
  Socket.on('healed', patient => {
    console.log('Healed!');
    player.healed(patient);
  });

  //ending
  Socket.on('win', () => {
    player.message("You win!");
    $rootScope.$digest();
    setTimeout(() => $state.go('lobby'), 3000);
  });
  Socket.on('lose', () => {
    player.setMessage("You lose!");
    $rootScope.$digest();
    setTimeout(() => $state.go('lobby'), 3000);
  });

  return player;
});
