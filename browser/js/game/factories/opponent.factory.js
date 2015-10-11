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
    console.log(`Opponent summoned ${card.name}`);
    opponent.hand.pop();
    opponent.summoned(card);
  });

  //attacking
  Socket.on('attacked', (attacker, attackee) => {
    opponent.wasAttacked(attackee);
  });
  Socket.on('wasAttacked', (attacker, attackee) => {
    opponent.attacked(attacker);
  });
  Socket.on('opponentDamaged', attackee => {
    console.log('Opponent was damaged!');
    opponent.wasAttacked(attackee);
  });

  Socket.on('opponentHealed', patient => {
    console.log('Opponent healed!');
    opponent.healed(patient);
  });

  Socket.on('opponentPropertyChanged', property => {
    console.log(`Opponent ${property} changed`);
    opponent.propertyChanged(property);
    opponent.checkTaunt();
  });

  Socket.on('opponentDrew', length => {
    console.log(`Drew ${length} cards`);
    let cards = _.fill(Array(length), {});
    opponent.drew(cards);
  });

  return opponent;
});
