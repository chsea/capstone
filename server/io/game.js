var CardModel = require('mongoose').model('Card');
var _ = require('lodash');
var Promise = require('bluebird');
var Card = require('./card');
var Minion = Card.Minion;
var Spell = Card.spell;
var Player = require('./player');

function Game (p1, p2) {
  this.p1 = p1;
  this.p2 = p2;
  this.state = 'initialCards';
}

var games = [];

module.exports = (io, socket, createdGames) => {
  let i = () => socket.game - 1;
  let player = () => socket.p1 ? games[i()].p1 : games[i()].p2;
  let opponent = () => socket.p1 ? games[i()].p2 : games[i()].p1;

  socket.on('playerReady', () => {
    if (!socket.game) return;
    console.log(`player joined as ${socket.p1 ? 'p1' : 'p2'}`);

    let game = createdGames[i()];
    let decks = [CardModel.find({_id: {$in: game.p1.deck}}).exec(), CardModel.find({_id: {$in: game.p2.deck}}).exec()];
    Promise.all(decks).then(resolvedDecks => {
      let decks = resolvedDecks.map(deck => {
        return deck.map(card => {
          return card.type === 'Minion' ? new Minion(card.name, card.cost, card.description, card.hitPoints, card.attackPoints) : new Spell(card.name, card.cost, card.description)
        });
      });
      let p1 = new Player(game.p1.name, decks[0], game.p1.socket);
      let p2 = new Player(game.p2.name, decks[1], game.p2.socket);
      p1.shuffle();
      p2.shuffle();
      games[i()] = new Game(p1, p2);
      socket.emit('gameStart', {player: player().name, opponent: opponent().name});
    });
  });

  socket.on('initialDraw', () => {
    if (!socket.game) return;
    if (games[i()].state !== 'initialCards') return;

    games[i()].currentPlayer = Math.random() > 0.5 ? games[i()].p1 : games[i()].p2;

    player().decidingCards = [player().deck.pop(), player().deck.pop(), player().deck.pop()];
    socket.emit('initialCards', player().decidingCards);
  });

  socket.on('rejectCards', cards => {
    cards.forEach(i => player().deck.push(player().decidingCards.splice(i, 1)));
    player().shuffle();
    player().hand = player().decidingCards;
    while (player().hand.length < 3) player().draw();
    socket.emit('startTurn1', player().hand);
  });

  socket.on('leave', () => {
    if (!socket.game) return;

    socket.emit('lose');
    opponent().socket.emit('win');
    opponent().socket.game = undefined;
    opponent().socket.p1 = undefined;
    games[i()] = undefined;
    createdGames[i()] = undefined;
    socket.game = undefined;
    socket.p1 = undefined;
  });

  socket.on('disconnect', () => {
    if (!socket.game) return;
    
    opponent().socket.emit('win');
    opponent().socket.game = undefined;
    opponent().socket.p1 = undefined;
    games[i()] = undefined;
    createdGames[i()] = undefined;
  })
  return socket;
};
