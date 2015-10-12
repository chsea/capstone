const CardModel = require('mongoose').model('Card');
const _ = require('lodash');
const Promise = require('bluebird');
const Card = require('./classes/card.class');
const Minion = Card.Minion;
const Spell = Card.Spell;
const Player = require('./classes/player.class');
const Game = require('./classes/game.class');

const games = [];

module.exports = (io, socket, createdGames) => {
  const i = () => socket.game - 1;
  const player = () => socket.p1 ? games[i()].p1 : games[i()].p2;
  const opponent = () => socket.p1 ? games[i()].p2 : games[i()].p1;
  const p = () => socket.p1 ? 'p1' : 'p2';

  socket.on('playerReady', () => {
    if (!socket.game) return;

    console.log(`player joined as ${p()}`);
    if (!games[i()]) return games[i()] = true;

    let game = createdGames[i()];
    let decks = [CardModel.find({_id: {$in: game.p1.deck}}).exec(), CardModel.find({_id: {$in: game.p2.deck}}).exec()];
    Promise.all(decks).then(resolvedDecks => {
      console.log(resolvedDecks);
      let id = 0;
      let decks = resolvedDecks.map(deck => {
        return deck.map(card => card.type === 'Minion' ? new Minion(card, id++) : new Spell(card, id++));
      });

      let player1 = new Player(game.p1.name, decks[0], game.p1.socket);
      let player2 = new Player(game.p2.name, decks[1], game.p2.socket);
      player1.shuffle();
      player2.shuffle();
      games[i()] = new Game(player1, player2);
    });
  });

  socket.on('initialDraw', () => {
    if (!socket.game || games[i()].state !== 'initialCards') return;

    if (!games[i()].currentPlayer) games[i()].setFirstPlayer();
    player().setInitialCards();

    setTimeout(() => {
      if (games[i()].state !== 'initialCards') return;

      if (player().deciding) {
        player().setInitialHand([]);
        socket.emit('setInitialHand', player().hand, socket.turn);
        if (!opponent().deciding) games[i()].state = 'setInitialHand';
      }
      if (opponent().waiting) opponent().endInitialWait();
    }, 10000);
  });

  socket.on('rejectCards', rejectedCards => {
    if (!socket.game || games[i()].state !== 'initialCards') return;

    player().setInitialHand(rejectedCards);

    if (opponent().deciding) {
      player().waiting = true;
      socket.emit('waitInitial');
    } else {
      opponent().endInitialWait();
      games[i()].state = 'setInitialHand';
      socket.emit('setInitialHand', player().hand, socket.turn);
    }
  });
  socket.on('initialHandSet', () => {
    if (games[i()].state != 'setInitialHand') return;
    games[i()].startPlaying();
  });

  socket.on('summon', card => {
    // if (games[i()].currentPlayer !== player() || player().mana < card.cost || !player().hand.some(handCard => handCard.id === card.id)) return;
    // if (card.type === 'spell') return;
    console.log(`${p()} summoning ${card}`);
    games[i()].summon(card);
  });

  socket.on('cast', target => {
    console.log('selecting', target);
    let logic = {
      target: {
        targets: [target],
        select: 'all'
      },
      spells: games[i()].decidingSpell
    };
    games[i()].cast(logic);
  });

  socket.on('attack', (attackerId, attackeeId) => {
    games[i()].attack(attackerId, attackeeId);
  });

  socket.on('endTurn', () => {
    if (games[i()].currentPlayer !== player()) return;

    console.log(`${p()} ended their turn.`);
    games[i()].nextTurn();
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
  });
  return socket;
};
