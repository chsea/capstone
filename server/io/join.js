var _ = require('lodash');

let waitingPlayers = [];
module.exports = (io, socket, games) => {
  socket.on('join', (player, deck) => {
    //If user is already waiting, return.
    if (_.find(waitingPlayers, {player: player})) return;

    // let matchingPlayers = waitingPlayers.filter(matchingPlayer => matchingPlayer.player._id === player._id);
    let matchingPlayers = waitingPlayers;
    //Match found
    if (matchingPlayers.length) {
      //add players to game
      let p1 = waitingPlayers.splice(matchingPlayers[0].index, 1)[0];
      let p2 = {player: player, deck: deck, socket: socket};
      games.push({p1: p1, p2: p2});
      p1.socket.game = games.length;
      p1.socket.p1 = true;
      socket.game = games.length;
      //set up socket room
      p1.socket.join(`game${games.length}`);
      socket.join(`game${games.length}`);
      io.to(`game${games.length}`).emit('gameReady', games.length);
    }
    //no match
    else {
      waitingPlayers.push({player: player, deck: deck, socket: socket, index: waitingPlayers.length});
      socket.emit('waitForPlayer');
    }
  });

  return socket;
};
