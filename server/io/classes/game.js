var _ = require('lodash');

class Game {
  constructor(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
    this.state = 'initialCards';
    this.turn = 0;
    this.currentPlayer = null;
    this.waitingPlayer = null;
  }

  endTurn () {
    this.turn++;
    let p = this.currentPlayer;
    this.currentPlayer = this.waitingPlayer;
    this.currentPlayer.socket.turn = true;
    this.currentPlayer.mana++;
    p.socket.turn = false;
    this.waitingPlayer = p;
  }

  attack(attackerId, attackeeId) {
    let attacker = _.find(this.currentPlayer.summonedMinions, minion => minion.id = attackerId);
    if (!attacker.canAttack) return;
    let attackee = _.find(this.waitingPlayer.summonedMinions, minion => minion.id = attackeeId);
    attacker.canAttack = false;
    attacker.hp -= attackee.ap;
    attackee.hp -= attacker.ap;

    if (attacker.hp <= 0) {
      _.remove(this.currentPlayer.summonedMinions, minion => minion.id = attacker.id);
      attacker.hp = 0;
    }
    if (attackee.hp <= 0) {
      _.remove(this.waitingPlayer.summonedMinions, minion => minion.id = attackee.id);
      attackee.hp = 0;
    }
    console.log(attacker.hp, attackee.hp);
    return [attacker.hp, attackee.hp];
  }
}

module.exports = Game;
