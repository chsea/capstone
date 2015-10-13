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

  // cast(logic, player) {
  //   if (logic.target.select === 'selectable') {
  //     this.decidingSpell = logic.spells;
  //     this.currentPlayer.emit('selectTarget');
  //     return;
  //   }
  //
  //   let selectableTargets = [],
  //       targets = [];
  //   if (logic.target && logic.target.targets){
  //     logic.target.targets.forEach(target => {
  //       switch (target) {
  //         case 'self':
  //           selectableTargets.push({player: player});
  //           break;
  //         case 'opponent':
  //           selectableTargets.push({player: player.opponent});
  //           break;
  //         case 'playerMinions':
  //           player.summonedMinions.forEach(minion => selectableTargets.push({player: player, minion: minion}));
  //           break;
  //         case 'opponentMinions':
  //           player.opponent.summonedMinions.forEach(minion => selectableTargets.push({player: player.opponent, minion: minion}));
  //           break;
  //         default:
  //           let minion = _.find(player.summonedMinions, m => m.id === target);
  //           if (minion) {
  //             selectableTargets.push({player: player, minion: minion});
  //           } else {
  //             minion = _.find(player.opponent.summonedMinions, m => m.id === target);
  //             selectableTargets.push({player: player.oppnent, minion: minion});
  //           }
  //       }
  //     });
  //   }
  //
  //   if (logic && logic.target && logic.target.select === 'all') targets = selectableTargets;
  //   else if (logic.target && logic.target.select === 'random') {
  //     while (targets.length < logic.target.qty) {
  //       let i = Math.floor(Math.random() * selectableTargets.length);
  //       targets.push(selectableTargets[i]);
  //     }
  //   }
  //
  //   for (let spell in logic.spells) {
  //     let currentSpell = logic.spells[spell];
  //     let condition = currentSpell.condition;
  //     let conditionMet = true;
  //     if (condition) {
  //       let targetedPlayer;
  //       if (condition.target === 'self') targetedPlayer = player;
  //       else targetedPlayer = player.opponent;
  //
  //       let property = targetPlayer[condition.property];
  //       property = property.length || property;
  //       switch (condition.comparison) {
  //         case 'includes':
  //           if (property.some(card => {
  //             for (let property in condition.amount) {
  //               if (card[property] === condition.amount[property]) return true;
  //               else return true;
  //             }
  //           })) conditionMet = true;
  //           else conditionMet = false;
  //           break;
  //         case 'greaterThan':
  //           if (property >= condition.amount) conditionMet = true;
  //           else conditionMet = false;
  //           break;
  //         case 'lessThan':
  //           if (property <= condition.amount) conditionMet = true;
  //           else conditionMet = false;
  //           break;
  //       }
  //     }
  //     if (conditionMet) Spell[spell](this, targets, logic.spells[spell].amount, logic.spells[spell].property);
  //   }
  // }

  // summon(id) {
  //   let summoned = _.remove(this.currentPlayer.hand, handCard => handCard.id === id)[0];
  //   summoned.player = this.currentPlayer;
  //   if (summoned.type === 'minion') {
  //     this.currentPlayer.summon(summoned, this);
  //     this.waitingPlayer.emit('opponentSummoned', summoned);
  //   } else this.cast(summoned.logic, this.currentPlayer);
  // }

  // attack(attackerId, attackeeId) {
  //   let attacker = _.find(this.currentPlayer.summonedMinions, minion => minion.id === attackerId);
  //   // if (!attacker.canAttack) return;
  //   let attackee;
  //   if (attackeeId) attackee = _.find(this.waitingPlayer.summonedMinions, minion => minion.id === attackeeId);
  //   else attackee = this.waitingPlayer;
  //   console.log(`${attacker.name} attacking ${attackee.name}`);
  //
  //   attacker.attacked(attackee, this);
  //   attackee.wasAttacked(attacker.ap, this);
  //
  //   this.currentPlayer.emit('attacked', {id: attackerId, hp: attacker.hp}, {id: attackeeId, hp: attackee.hp});
  //   if (!attacker.hp) _.remove(this.currentPlayer.summonedMinions, minion => minion.id === attacker.id);
  //
  //   this.waitingPlayer.emit('wasAttacked', {id: attackerId, hp: attacker.hp}, {id: attackeeId, hp: attackee.hp});
  //   if (!attackee.hp) {
  //     if (attackerId) _.remove(this.waitingPlayer.summonedMinions, minion => minion.id = attackee.id);
  //     else {
  //       this.currentPlayer.emit('win');
  //       this.waitingPlayer.emit('lose');
  //     }
  //   }
  // }
}

module.exports = Game;
