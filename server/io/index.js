var socketio = require('socket.io');
var io = null;
var _ = require('lodash');

module.exports = function (server) {
  if (io) return io;

  io = socketio(server);

  let avalibleUsers = [];
  let pendingUsers = [];
  let avalibleGames = [];
  let pendingGames = [];

  let waitingPlayers = [];
  io.on('connection', socket => {
    console.log('user connected');

    socket.on('enterCreateRoom', user => {
      if (!_.find(avalibleUsers, { _id: user._id}) && !_.find(pendingUsers, { _id: user._id})) avalibleUsers.push(user);
      io.emit('newUser', avalibleUsers, avalibleGames);
    });

    socket.on('joinGame', (i, user) => {
      if (!avalibleGames[i]) avalibleGames.push({player1: user});
      else {
        avalibleGames[i].player2 = user;
        let newGame = avalibleGames.splice(i, 1)[0];
        pendingGames.push(newGame);
      }
      _.remove(avalibleUsers, avalibleUser => avalibleUser._id == user._id);
      pendingUsers.push(user);
      io.emit('gameJoined', avalibleUsers, avalibleGames);
    });

    socket.on('join', (player, deck) => {
      if (_.find(waitingPlayers, {player: {_id: player._id}})) return;

      let matchingPlayers = waitingPlayers.map((player, i) => {
        return {player: player, index: i};
      }).filter(matchingPlayer => matchingPlayer.player._id === player._id);
      if (matchingPlayers.length) {
        waitingPlayers.splice(matchingPlayers[0].index, 1);
        Socket.emit('startGame');
      }
      else {
        waitingPlayers.push({player: player, deck: deck});
        socket.emit('waitForPlayer');
      }
    });
  });

  return io;
};
