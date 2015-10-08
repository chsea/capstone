app.factory('Self', (Player, Socket, $rootScope) => {
  let player = new Player();

  Socket.on('gameStart', players => {
    player.name = players.player;
    $rootScope.$digest();
    Socket.emit('initialDraw');
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
    console.log(cards);
    player.decidingCards = cards;
    $rootScope.$digest();
  });
  Socket.on('setInitialHand', (hand, turn) => {
    $('#initial').remove();
    player.hand = hand;
    player.turn = turn;
    $rootScope.$digest();
    Socket.emit('initialHandSet');
  });

  //turns
  Socket.on('startTurn', card => {
    console.log(`start turn - ${card.name}`);
    player.summonedMinions.forEach(minion => {
      if (!minion.canAttack) minion.canAttack = true;
    });
    player.message = "Your turn!";
    player.startTurn(card);
  });
  Socket.on('wait', () => {
    player.message = "Opponent's turn!";
    $rootScope.$digest();
  });
  player.endTurn = () => {
    player.turn = false;
    Socket.emit('endTurn');
  };

  //summoning
  player.summon = card => {
    Socket.emit('summon', card);
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
  
  return player;
});
