var CardModel = require('mongoose').model('Card');
var _ = require('lodash');
var Promise = require('bluebird');
var Card = require('./classes/card');
var Minion = Card.Minion;
var Spell = Card.spell;
var Player = require('./classes/player');
var Game = require('./classes/game');

var games = [];
var p1;

module.exports = (io, socket) => {
  let i = () => socket.game - 1;
  let player = () => socket.p1 ? games[i()].p1 : games[i()].p2;
  let opponent = () => socket.p1 ? games[i()].p2 : games[i()].p1;

  socket.on('playerReady', (name, deck) => {
    console.log(`player joined as ${p1 ? 'p2' : 'p1'}`);
    socket.game = 1;
    if (!games.length && !p1) {
      p1 = {name: name, deck: deck, socket: socket};
      socket.p1 = true;
      return;
    }

    let decks = [CardModel.find({_id: {$in: p1.deck}}).exec(), CardModel.find({_id: {$in: deck}}).exec()];
    Promise.all(decks).then(resolvedDecks => {
      let decks = resolvedDecks.map(deck => {
        return deck.map(card => {
          return card.type === 'Minion' ? new Minion(card.name, card.cost, card.description, card.hitPoints, card.attackPoints) : new Spell(card.name, card.cost, card.description)
        });
      });
      let player1 = new Player(p1.name, decks[0], p1.socket);
      let player2 = new Player(name, decks[1], socket);
      player1.shuffle();
      player2.shuffle();
      games[i()] = new Game(player1, player2);
      socket.emit('gameStart', {player: player().name, opponent: opponent().name});
      opponent().socket.emit('gameStart', {player: opponent().name, opponent: player().name});
    });
  });

  socket.on('initialDraw', () => {
    if (!socket.game) return;
    if (games[i()].state !== 'initialCards') return;

    games[i()].currentPlayer = Math.random() > 0.5 ? games[i()].p1 : games[i()].p1;

    player().decidingCards = [player().deck.pop(), player().deck.pop(), player().deck.pop()];
    player().deciding = true;
    console.log(player().name, player());
    socket.emit('initialCards', player().decidingCards);
    // setTimeout(() => {
    //   if (player().deciding) setInitialHand();
    //   if (opponent().waiting) {
    //     opponent().waiting = false;
    //     opponent().socket.emit('startTurn1', opponent().hand)
    //   }
    //   socket.emit('startTurn1', player().hand);
    // }, 5000);
  });

  function setInitialHand() {
    player().hand = player().decidingCards;
    player().deciding = false;
    player().decidingCards = [];
  }

  socket.on('rejectCards', cards => {
    cards.forEach(i => player().deck.push(player().decidingCards.splice(i, 1)));
    player().shuffle();
    setInitialHand();
    while (player().hand.length < 3) player().draw();

    if (opponent().deciding) {
      player().waiting = true;
      socket.emit('wait');
    } else {
      opponent().waiting = false;
      opponent().socket.emit('startTurn1', opponent().hand)
      socket.emit('startTurn1', player().hand);
    }
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
    games = [];
  })
  return socket;
};
