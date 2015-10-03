var CardModel = require('mongoose').model('Card');
var _ = require('lodash');
var Promise = require('bluebird');

class Card {
  constructor(name) {
    this.name = name;
  }
}
class Spell extends Card {
  constructor(name) {
    super(name);
  }
}
class Minion extends Card {
  constructor(name, hp, ap) {
    super(name);
    this.hp = hp;
    this.ap = ap;
  }
}
function Player(name, deck) {
  this.name = name;
  this.hp = 100;
  this.deck = deck;
  this.discard = [];
  this.hand = [];
  this.summonedMinions = [];
}
Player.prototype.draw = function() {
  let card = this.deck.pop();
  this.hand.push(card);
  return card;
}
function Game (p1, p2) {
  this.player1 = p1;
  this.player2 = p2;
}

var game;
var player = socket => socket.p1 ? game.player1 : game.player2;
var opponent = socket => socket.p1 ? game.player2 : game.player1;

module.exports = (io, socket, games) => {
  socket.on('startGame', () => {
    let createdGame = games[socket.game];
    let p1, p2;
    let decks = [CardModel.find({_id: {$in: createdGame.p1.deck.cards}}).exec(), CardModel.find({_id: {$in: createdGame.p2.deck.cards}}).exec()];
    Promise.all(decks).then(decks => {
      let resolvedDecks = decks.map(deck => {
        return deck.map(card => card.type === 'Minion' ? new Minion(card.name, card.hitPoints, card.attackPoints) : new Spell(card.name));
      });
      _.shuffle(resolvedDecks[0]);
      _.shuffle(resolvedDecks[1]);
      let p1 = new Player(createdGame.p1.player.username, resolvedDecks[0]);
      let p2 = new Player(createdGame.p2.player.username, resolvedDecks[1]);
      game = new Game(p1, p2);
      socket.emit('gameStarted', {player: player(socket).name, opponent: opponent(socket).name});
    });

    socket.on('ready', () => {
      let cards = [player(socket).draw(), player(socket).draw(), player(socket).draw()];
      socket.emit('initialCards', cards);
    });
  });

  return socket;
};
