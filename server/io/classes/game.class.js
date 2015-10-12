var _ = require('lodash');
var Spell = require('./spell.helper.js');

class Game {
  constructor(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
    this.state = 'initialCards';
    this.currentPlayer = null;
    this.waitingPlayer = null;
    this.idx = 30;

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

  cast(logic) {
    if (logic && logic.target && logic.target.select === 'selectable') {
      this.decidingSpell = logic.spells;
      this.currentPlayer.emit('selectTarget');
      return;
    }

    let selectableTargets = [],
        targets = [];
    if (logic.target && logic.target.targets){
      logic.target.targets.forEach(target => {
        switch (target) {
          case 'self':
            selectableTargets.push({player: this.currentPlayer, opponent: this.waitingPlayer});
            break;
          case 'opponent':
            selectableTargets.push({player: this.waitingPlayer, opponent: this.currentPlayer});
            break;
          case 'playerMinions':
            this.currentPlayer.summonedMinions.forEach(minion => selectableTargets.push({player: this.currentPlayer, opponent: this.waitingPlayer, minion: minion}));
            break;
          case 'opponentMinions':
            this.waitingPlayer.summonedMinions.forEach(minion => selectableTargets.push({player: this.waitingPlayer, opponent: this.currentPlayer, minion: minion}));
            break;
          default:
            let minion = _.find(this.currentPlayer.summonedMinions, m => m.id === target);
            if (minion) {
              selectableTargets.push({player: this.currentPlayer, opponent: this.waitingPlayer, minion: minion});
            } else {
              minion = _.find(this.waitingPlayer.summonedMinions, m => m.id === target);
              selectableTargets.push({player: this.waitingPlayer, opponent: this.currentPlayer, minion: minion});
            }
        }
      });
    }

    if (logic && logic.target && logic.target.select === 'all') targets = selectableTargets;
    else if (logic.target && logic.target.select === 'random') {
      while (targets.length < logic.target.qty) {
        let i = Math.floor(Math.random() * selectableTargets.length);
        targets.push(selectableTargets[i]);
      }
    }

    for (let spell in logic.spells) {
      Spell[spell](targets, logic.spells[spell].amount, logic.spells[spell].property);
    }
  }

  summon(id) {
    let summoned = _.remove(this.currentPlayer.hand, handCard => handCard.id === id)[0];
    if (summoned && summoned.type === 'minion') {
      this.currentPlayer.summon(summoned, this);
      this.waitingPlayer.emit('opponentSummoned', summoned);
    } else if (summoned) {
      this.cast(summoned.logic);
    }
  }

  attack(attackerId, attackeeId) {
    let attacker = _.find(this.currentPlayer.summonedMinions, minion => minion.id === attackerId);
    // if (!attacker.canAttack) return;
    let attackee;
    if (attackeeId) attackee = _.find(this.waitingPlayer.summonedMinions, minion => minion.id === attackeeId);
    else attackee = this.waitingPlayer;
    console.log(`${attacker.name} attacking ${attackee.name}`);

    attacker.attacked(attackee, this);
    attackee.wasAttacked(attacker.ap, this);

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
