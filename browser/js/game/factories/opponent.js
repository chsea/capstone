app.factory('Opponent', (Player, Game, Socket, $rootScope) => {
  let opponent = scope => {
    let opponent = new Player();

    Socket.on('gameStart', players => {
      opponent.name = players.opponent;
    });
    Socket.on('setInitialHand', (hand, turn) => {
      opponent.hand = [{}, {}, {}];
      if (turn) opponent.hand.push({});
      $rootScope.$digest();
    });

    Socket.on('opponentSummoned', card => {
      console.log(`opponent summoned ${card.name}`);
      opponent.summon(card);
    });

    Socket.on('wait', () => {
      opponent.startTurn({});
      Game(scope).setMessage("Opponent's turn!");
    });

    return opponent;
  };

  return opponent;
});
