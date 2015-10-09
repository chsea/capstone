app.factory('Opponent', (Player, Socket, $rootScope) => {
  let opponent = new Player();

  //initial draw
  Socket.on('gameStart', players => {
    opponent.name = players.opponent;
    $rootScope.$digest();
  });
  Socket.on('setInitialHand', (hand, turn) => {
    opponent.hand = [{}, {}, {}];
    if (turn) opponent.hand.push({});
    $rootScope.$digest();
  });

  //opponent turn
  Socket.on('startTurn', () => {
    opponent.opponentTurn();
  });
  Socket.on('wait', () => {
    opponent.startTurn({});
  });

  //summoning
  Socket.on('opponentSummoned', card => {
    console.log(`opponent summoned ${card.name}`);
    opponent.hand.pop();
    opponent.summoned(card);
  });

  //attacking
  Socket.on('attacked', (attacker, attackee) => {
    console.log('attacked!');
    opponent.wasAttacked(attackee);
  });
  Socket.on('wasAttacked', (attacker, attackee) => {
    console.log('was attacked!');
    opponent.attacked(attacker);
  });

  return opponent;
});
