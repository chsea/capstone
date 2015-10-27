app.factory('Opponent', (Player, Socket, UserFactory, $rootScope) => {
  let opponent = new Player();
  opponent.portrait = 'tiger.png';

  //initial draw
  Socket.on('gameStart', players => {
    opponent.name = players.opponent;
    $rootScope.$digest();
    // PlayerFactory.findAll({name: players.opponent}).then(players => {
    //   opponent.portrait = players[0].portrait;
    // });
  });
  Socket.on('setInitialHand', (hand, turn) => {
    opponent.hand = [{}, {}, {}];
    if (turn) opponent.hand.push({});
    $rootScope.$digest();
  });

  //opponent turn
  Socket.on('startTurn', () => opponent.opponentTurn());
  Socket.on('opponentFatigue', () => opponent.hp--);
  Socket.on('wait', () => opponent.startTurn({}));

  //summoning
  Socket.on('opponentSummoned', (minion, id) => {
    console.log(`Opponent summoned ${minion}`);
    opponent.hand.pop();
    opponent.summoned(minion, id);
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
    $rootScope.$digest();
  });

  Socket.on('opponentDrew', length => {
    console.log(`Drew ${length} cards`);
    let cards = _.fill(Array(length), {});
    opponent.drew(cards);
  });

  return opponent;
});
