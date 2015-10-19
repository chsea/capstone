var _ = require('lodash');
var Spell = require('./spell.helper.js');

class Game {
  constructor(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
    this.state = 'initialCards';
    this.currentPlayer = null;
    this.waitingPlayer = null;
    this.idx = this.p1.deck.length + this.p2.deck.length;

    this.p1.opponent = this.p2;
    this.p2.opponent = this.p1;

    this.p1.emit('gameStart', {player: p1.name, opponent: p2.name});
    this.p2.emit('gameStart', {player: p2.name, opponent: p1.name});
    //testing only
    // this.setFirstPlayer();
    // this.waitingPlayer.draw(4);
    // this.currentPlayer.draw(3);
    // this.p1.emit('setInitialHand', this.p1.hand, this.p1.socket.turn);
    // this.p2.emit('setInitialHand', this.p2.hand, this.p2.socket.turn);
    // this.startPlaying();
  }

  setFirstPlayer() {
    if (Math.random() > 0.5) {
      this.currentPlayer = this.p1;
      this.waitingPlayer = this.p2;
    } else {
      this.currentPlayer = this.p2;
      this.waitingPlayer = this.p1;
    }
    this.currentPlayer.socket.turn = true;
  }
  startPlaying() {
    this.state = 'playing';
    this.waitingPlayer.emit('wait');
    this.currentPlayer.startTurn();
  }

  nextTurn () {
    let p = this.currentPlayer;
    this.currentPlayer = this.waitingPlayer;
    this.currentPlayer.socket.turn = true;
    this.currentPlayer.mana++;
    p.socket.turn = false;
    this.waitingPlayer = p;

    this.waitingPlayer.wait();
    this.currentPlayer.startTurn(this);
  }
}

module.exports = Game;
