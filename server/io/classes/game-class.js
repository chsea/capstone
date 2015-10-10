var _ = require('lodash');

class Game {
  constructor(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
    this.state = 'initialCards';
    this.currentPlayer = null;
    this.waitingPlayer = null;

    this.p1.emit('gameStart', {player: p1.name, opponent: p2.name});
    this.p2.emit('gameStart', {player: p2.name, opponent: p1.name});
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
    this.currentPlayer.startTurn();
  }

  attack(attackerId, attackeeId) {
    let attacker = _.find(this.currentPlayer.summonedMinions, minion => minion.id === attackerId);
    // if (!attacker.canAttack) return;
    let attackee;
    if (attackeeId) attackee = _.find(this.waitingPlayer.summonedMinions, minion => minion.id === attackeeId);
    else attackee = this.waitingPlayer;
    console.log(`${attacker.name} attacking ${attackee.name}`);

    attacker.attacked(attackee);
    attackee.wasAttacked(attacker);

    this.currentPlayer.emit('attacked', {id: attackerId, hp: attacker.hp}, {id: attackeeId, hp: attackee.hp});
    if (!attacker.hp) _.remove(this.currentPlayer.summonedMinions, minion => minion.id === attacker.id);

    this.waitingPlayer.emit('wasAttacked', {id: attackerId, hp: attacker.hp}, {id: attackeeId, hp: attackee.hp});
    if (!attackee.hp) {
      if (attackerId) _.remove(this.waitingPlayer.summonedMinions, minion => minion.id = attackee.id);
      else {
        this.currentPlayer.emit('win');
        this.waitingPlayer.emit('lose');
      }
    }
  }
}

module.exports = Game;
