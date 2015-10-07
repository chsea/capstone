var CardModel = require('mongoose').model('Card');
var _ = require('lodash');
var Promise = require('bluebird');
var Card = require('./classes/card');
var Minion = Card.Minion;
var Spell = Card.Spell;
var Player = require('./classes/player');
var Game = require('./classes/game');

var games = [];
var p1;

module.exports = (io, socket) => {
  let i = () => socket.game - 1;
  let player = () => socket.p1 ? games[i()].p1 : games[i()].p2;
  let opponent = () => socket.p1 ? games[i()].p2 : games[i()].p1;
  let p = () => socket.p1 ? 'p1' : 'p2';

  socket.on('playerReady', (name, deck) => {
    console.log(`player joined as ${socket.p1 ? 'p1' : 'p2'}`);
    socket.game = 1;
    if (!games.length && !p1) {
      p1 = {name: name, deck: deck, socket: socket};
      socket.p1 = true;
      return;
    }

    let decks = [CardModel.find({_id: {$in: p1.deck}}).exec(), CardModel.find({_id: {$in: deck}}).exec()];
    Promise.all(decks).then(resolvedDecks => {
      let id = 0;
      let decks = resolvedDecks.map(deck => {
        return deck.map(card => {
          return card.type === 'Minion' ? new Minion(card, id++) : new Spell(card, id++);
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
    if (!socket.game || games[i()].state !== 'initialCards') return;

    if (!games[i()].currentPlayer) {
      if (Math.random() > 0.5) {
        games[i()].currentPlayer = games[i()].p1;
        games[i()].waitingPlayer = games[i()].p2;
      } else {
        games[i()].currentPlayer = games[i()].p2;
        games[i()].waitingPlayer = games[i()].p1;
      }
      games[i()].currentPlayer.socket.turn = true;
    }

    player().decidingCards = [player().deck.pop(), player().deck.pop(), player().deck.pop()];
    if (!socket.turn) player().decidingCards.push(player().deck.pop());
    player().deciding = true;
    socket.emit('initialCards', player().decidingCards);
    setTimeout(() => {
      if (player().deciding) {
        setInitialHand();
        if (games[i()].state != 'playing') {
          games[i()].currentPlayer.draw();
          games[i()].state = 'playing';
        }
        socket.emit('startTurn1', player().hand, socket.turn);
        let cp = games[i()].currentPlayer;
      }
      if (opponent().waiting) {
        opponent().waiting = false;
        opponent().socket.emit('startTurn1', opponent().hand, opponent().socket.turn);
      }
    }, 10000);
  });

  function setInitialHand() {
    player().hand = player().decidingCards;
    player().deciding = false;
    player().decidingCards = [];
  }

  socket.on('rejectCards', cards => {
    if (!socket.game || games[i()].state !== 'initialCards') return;

    cards.forEach(i => player().deck.push(player().decidingCards.splice(i, 1)));
    player().shuffle();
    setInitialHand();
    let l = socket.turn ? 3 : 4;
    while (player().hand.length < l) player().draw();

    if (opponent().deciding) {
      player().waiting = true;
      socket.emit('waitInitial');
    } else {
      games[i()].currentPlayer.draw();
      opponent().waiting = false;
      opponent().socket.emit('startTurn1', opponent().hand, opponent().socket.turn);
      socket.emit('startTurn1', player().hand, socket.turn);
      games[i()].state = 'playing';
    }
  });

  socket.on('summon', card => {
    if (games[i()].currentPlayer !== player() || player().mana < card.cost || !player().hand.some(handCard => handCard.id === card.id)) return;
    console.log(`${p()} summoning ${card.name}`);

    if (card.type === 'minion') player().summonMinion(card);

    socket.emit('summoned', card);
    opponent().socket.emit('opponentSummoned', card);
  });

  socket.on('attack', (attackerId, attackeeId) => {
    console.log(`${p()}: ${attackerId} attacking ${attackeeId}`);
    let hps = games[i()].attack(attackerId, attackeeId);
    socket.emit('attacked', {id: attackerId, hp: hps[0]}, {id: attackeeId, hp: hps[1]});
    opponent().socket.emit('wasAttacked', {id: attackerId, hp: hps[0]}, {id: attackeeId, hp: hps[1]});
  });

  socket.on('endTurn', () => {
    console.log(`${p()} ended their turn.`);
    if (games[i()].currentPlayer !== player()) return;
    games[i()].endTurn();
    socket.emit('wait');
    let newCard = opponent().draw();
    console.log(`Next turn - ${newCard.name}.`);
    opponent().socket.emit('startTurn', newCard);
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
  });
  return socket;
};
