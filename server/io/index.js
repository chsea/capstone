var socketio = require('socket.io');
var io = null;
var _ = require('lodash');

module.exports = function (server) {
  if (io) return io;

  io = socketio(server);

  // let availableUsers = [];
  // let pendingUsers = [];
  // let availableGames = [];
  // let pendingGames = [];

  let games = [];
  io.on('connection', socket => {
    console.log('user connected');

    // socket.on('enterCreateRoom', user => {
    //   if (!_.find(availableUsers, { _id: user._id}) && !_.find(pendingUsers, { _id: user._id})) availableUsers.push(user);
    //   io.emit('newUser', availableUsers, availableGames);
    // });
    //
    // socket.on('joinGame', (i, user) => {
    //   if (!availableGames[i]) availableGames.push({player1: user});
    //   else {
    //     availableGames[i].player2 = user;
    //     let newGame = availableGames.splice(i, 1)[0];
    //     pendingGames.push(newGame);
    //   }
    //   _.remove(availableUsers, availableUser => availableUser._id == user._id);
    //   pendingUsers.push(user);
    //   io.emit('gameJoined', availableUsers, availableGames);
    // });
    require('./join')(io, socket, games);
    require('./game')(io, socket, games);

    // Testing:
    // require('./test')(io, socket);
  });

  return io;
};
