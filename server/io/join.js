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
      let p1 = matchingPlayers[0];
      _.remove(waitingPlayers, player => player.name === p1.name);
      let p2 = {name: player, deck: deck, socket: socket};
      let i = games.indexOf('undefined');
      if (i < 0) i = games.length;
      games[i++] = {p1: p1, p2: p2};
      p1.socket.game = i;
      p1.socket.p1 = true;
      socket.game = i;
      //set up socket room
      p1.socket.join(`game${i}`);
      socket.join(`game${i}`);
      io.to(`game${i}`).emit('gameReady', i);
    }
    //no match
    else {
      waitingPlayers.push({name: player, deck: deck, socket: socket});
      socket.emit('waitForPlayer');
    }
  });

  return socket;
};
