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

  let waitingPlayers = [];
  let games = [];
  function Game (p1, p2) {
    this.player1 = p1;
    this.player2 = p2;
  }
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

    socket.on('join', (player, deck) => {
      if (_.find(waitingPlayers, {player: {_id: player._id}})) return;
      // let matchingPlayers = waitingPlayers.filter(matchingPlayer => matchingPlayer.player._id === player._id);
      let matchingPlayers = waitingPlayers;
      if (matchingPlayers.length) {
        let player1 = waitingPlayers.splice(matchingPlayers[0].index, 1)[0];
        let player2 = {player: player, deck: deck, socket: socket};
        games.push(new Game(player1, player2));
        player1.socket.game = games.length - 1;
        player1.socket.player1 = true;
        socket.game = games.length - 1;
        player1.socket.join(`game${games.length}`);
        socket.join(`game${games.length}`);
        io.to(`game${games.length}`).emit('startGame', games.length);
      }
      else {
        waitingPlayers.push({player: player, deck: deck, socket: socket, index: waitingPlayers.length});
        socket.emit('waitForPlayer');
      }
    });

    socket.on('startedGame', () => {
      let game = games[socket.game];
      let players = socket.player1 ? {player: game.player1.player.username, opponent: game.player2.player.username} : {player: game.player2.player.username, opponent: game.player1.player.username};
      let deck = socket.player1 ? game.player1.deck : game.player2.deck;
      socket.emit('players', players, {card1: deck.cards[0].name, card2: deck.cards[1].name});
    });
  });

  return io;
};
