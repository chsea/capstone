const CardModel = require('mongoose').model('Card');
const _ = require('lodash');
const Promise = require('bluebird');
const Card = require('./classes/card-class');
const Minion = Card.Minion;
const Spell = Card.spell;
const Player = require('./classes/player-class');
const Game = require('./classes/game-class');

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
      if (games[i()].state !== 'initialCards') return;

      if (player().deciding) {
        player().setInitialHand([]);
        socket.emit('setInitialHand', player().hand, socket.turn);
        if (!opponent().deciding) games[i()].state = 'setInitialHand';
      }
      if (opponent().waiting) {
        opponent().waiting = false;
        opponent().socket.emit('setInitialHand', opponent().hand, opponent().socket.turn);
      }
    }, 10000);
  });

  socket.on('rejectCards', rejectedCards => {
    if (!socket.game || games[i()].state !== 'initialCards') return;

    player().setInitialHand(rejectedCards);
    let l = socket.turn ? 3 : 4;
    while (player().hand.length < l) player().draw();

    if (opponent().deciding) {
      player().waiting = true;
      socket.emit('waitInitial');
    } else {
      opponent().waiting = false;
      opponent().socket.emit('setInitialHand', opponent().hand, opponent().socket.turn);
      games[i()].state = 'setInitialHand';
      socket.emit('setInitialHand', player().hand, socket.turn);
    }
  });
  socket.on('initialHandSet', () => {
    if (games[i()].state != 'setInitialHand') return;
    games[i()].state = 'playing';
    games[i()].waitingPlayer.socket.emit('wait');
    games[i()].turns++;
    games[i()].currentPlayer.startTurn(games[i()].turn);
  });

  socket.on('summon', card => {
    // if (games[i()].currentPlayer !== player() || player().mana < card.cost || !player().hand.some(handCard => handCard.id === card.id)) return;
    // if (card.type === 'spell') return;
    console.log(`${p()} summoning ${card.name}`);

    if (card.type === 'minion') player().summonMinion(card);

    socket.emit('summoned', card);
    opponent().socket.emit('opponentSummoned', card);
  });

  socket.on('attack', (attackerId, attackeeId) => {
    console.log(`${p()}: ${attackerId} attacking ${attackeeId}`);
    let hps = games[i()].attack(attackerId, attackeeId);
    if (!hps[1] && !attackeeId) {
      socket.emit('win');
      opponent().socket.emit('lose');
    } else {
      socket.emit('attacked', {id: attackerId, hp: hps[0]}, {id: attackeeId, hp: hps[1]});
      opponent().socket.emit('wasAttacked', {id: attackerId, hp: hps[0]}, {id: attackeeId, hp: hps[1]});
    }
  });

  socket.on('endTurn', () => {
    if (games[i()].currentPlayer !== player()) return;

    console.log(`${p()} ended their turn.`);
    games[i()].endTurn();
    socket.emit('wait');
    opponent().startTurn(games[i()].turn);
    console.log(`Next turn.`);
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
