'use strict';
var socketio = require('socket.io');
var io = null;

module.exports = function (server) {

  if (io) return io;

  io = socketio(server);

  let users = [];
  io.on('connection', socket => {
    console.log('user connected');

    socket.on('createGame', user => {
      users.push(user);
      console.log(user);
    })
  });

  return io;

};
