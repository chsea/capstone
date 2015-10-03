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
    let game = createdGames[i()];
    console.log('game', game);
    let decks = [CardModel.find({_id: {$in: game.p1.deck}}).exec(), CardModel.find({_id: {$in: game.p2.deck}}).exec()];
    Promise.all(decks).then(resolvedDecks => {
      let decks = resolvedDecks.map(deck => {
        return deck.map(card => card.type === 'Minion' ? new Minion(card.name, card.hitPoints, card.attackPoints) : new Spell(card.name));
      });
      _.shuffle(decks[0]);
      _.shuffle(decks[1]);
      let p1 = new Player(game.p1.player, decks[0]);
      let p2 = new Player(game.p2.player, decks[1]);
      games[i()] = new Game(p1, p2);
      console.log('g', games);
      console.log('p', player());
      socket.emit('gameReady', {player: player().name, opponent: opponent().name});
    });
  });

  socket.on('start', () => {
    if (!socket.game) return;
    if (games[i()].state !== 'initialCards') return;

    let cards = [player().draw(), player().draw(), player().draw()];
    socket.emit('initialCards', cards);
  });

  return socket;
};
