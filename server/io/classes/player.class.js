var _ = require('lodash');
var Spell = require('./spell.helper.js');

class Player {
  constructor(name, deck, socket) {
    this.name = name;
    this.socket = socket;
    this.socket.turn = false;
    this.hp = 30;
    this.deck = deck;
    this.discard = [];
    this.hand = [];
    this.summonedMinions = [];
    this.mana = 0;
    this.turns = 0;
  }

  emit(socket, ...data) {
    this.socket.emit(socket, ...data);
  }

  shuffle() {
    this.deck = _.shuffle(this.deck);
    return this.deck;
  }
  draw(amount) {
    amount = amount || 1;
    let cards = [];
    while (cards.length < amount) cards.push(this.deck.pop());
    this.hand = this.hand.concat(cards);
    return cards;
  }

  setInitialCards() {
    this.decidingCards = [this.deck.pop(), this.deck.pop(), this.deck.pop()];
    if (!this.socket.turn) this.decidingCards.push(this.deck.pop());
    this.deciding = true;
    console.log(this.decidingCards);
    this.emit('initialCards', this.decidingCards);
  }
  setInitialHand(rejectedCards) {
    rejectedCards.forEach(i => this.deck.push(this.decidingCards.splice(i, 1)[0]));
    this.shuffle();
    this.hand = this.decidingCards;
    this.deciding = false;
    this.decidingCards = [];

    let l = this.socket.turn ? 3 : 4;
    while (this.hand.length < l) this.draw();
  }
  endInitialWait() {
    this.waiting = false;
    this.emit('setInitialHand', this.hand, this.socket.turn);
  }

  startTurn() {
    console.log('start turn');
    this.waiting = false;
    this.turns++;
    this.mana = this.turns > 10 ? 10 : this.turns;
    // this.summonedMinions.forEach(minion => {
    //   if (!minion.canAttack) minion.canAttack = true;
    // });
    let card;
    if (this.deck.length) card = this.draw()[0];
    else card = null;
    this.emit('startTurn', card);
    this.summonedMinions.forEach(minion => minion.startTurn());
  }
  wait() {
    this.waiting = true;
    this.emit('wait');
  }

  summon(id) {
    let summoned = _.remove(this.hand, handCard => handCard.id === id)[0];
    console.log('summoned', summoned.name);
    // summoned.player = this;
    if (summoned.type === 'minion') {
      this.summonedMinions.push(summoned);
      this.emit('summoned', summoned.name);
      // summoned.summoned();
    } else this.cast(summoned.logic, this);
    this.mana -= summoned.cost;
    this.opponent.emit('opponentSummoned', summoned.name);
  }

  cast(logic) {
    if (logic.target.select === 'selectable') {
      this.decidingSpell = logic.spells;
      this.emit('selectTarget');
      return;
    }

    let selectableTargets = [],
        targets = [];
    if (logic.target && logic.target.targets){
      logic.target.targets.forEach(target => {
        switch (target) {
          case 'self':
            selectableTargets.push({player: this});
            break;
          case 'opponent':
            selectableTargets.push({player: this.opponent});
            break;
          case 'playerMinions':
            this.summonedMinions.forEach(minion => selectableTargets.push({player: this, minion: minion}));
            break;
          case 'opponentMinions':
            this.opponent.summonedMinions.forEach(minion => selectableTargets.push({player: this.opponent, minion: minion}));
            break;
          default:
            let minion = _.find(this.summonedMinions, m => m.id === target);
            if (minion) {
              selectableTargets.push({player: this, minion: minion});
            } else {
              minion = _.find(this.opponent.summonedMinions, m => m.id === target);
              selectableTargets.push({player: this.oppnent, minion: minion});
            }
        }
      });
    }

    if (logic.target.select === 'all') targets = selectableTargets;
    else if (logic.target.select === 'random') {
      while (targets.length < logic.target.qty) {
        let i = Math.floor(Math.random() * selectableTargets.length);
        targets.push(selectableTargets[i]);
      }
    }

    for (let spell in logic.spells) {
      let currentSpell = logic.spells[spell];
      let condition = currentSpell.condition;
      let conditionMet = true;
      if (condition) {
        let targetedPlayer;
        if (condition.target === 'self') targetedPlayer = this;
        else targetedPlayer = this.opponent;

        let property = targetPlayer[condition.property];
        property = property.length || property;
        switch (condition.comparison) {
          case 'includes':
            if (property.some(card => {
              for (let property in condition.amount) {
                if (card[property] === condition.amount[property]) return true;
                else return true;
              }
            })) conditionMet = true;
            else conditionMet = false;
            break;
          case 'greaterThan':
            if (property >= condition.amount) conditionMet = true;
            else conditionMet = false;
            break;
          case 'lessThan':
            if (property <= condition.amount) conditionMet = true;
            else conditionMet = false;
            break;
        }
      }
      if (conditionMet) Spell[spell](this, targets, logic.spells[spell].amount, logic.spells[spell].property);
    }
  }

  attack(attackerId, attackeeId) {
    let attacker = _.find(this.summonedMinions, minion => minion.id === attackerId);
    // if (!attacker.canAttack) return;
    let attackee;
    if (attackeeId) attackee = _.find(this.opponent.summonedMinions, minion => minion.id === attackeeId);
    else attackee = this.opponent;
    // console.log(`attacker`, attacker);
    // console.log(`attackee`, attackee);
    console.log(`${attacker.name} attacking ${attackee.name}`);

    attacker.attacked(attackee, this);
    attackee.wasAttacked(attacker.ap, this);

    this.emit('attacked', {id: attackerId, hp: attacker.hp}, {id: attackeeId, hp: attackee.hp});
    if (!attacker.hp) _.remove(this.summonedMinions, minion => minion.id === attacker.id);

    this.opponent.emit('wasAttacked', {id: attackerId, hp: attacker.hp}, {id: attackeeId, hp: attackee.hp});
    if (!attackee.hp) {
      if (attackerId) _.remove(this.opponent.summonedMinions, minion => minion.id = attackee.id);
      else {
        this.emit('win');
        this.opponent.emit('lose');
      }
    }
  }

  wasAttacked(amount) {
    this.hp -= amount;
    this.hp = this.hp < 0 ? 0 : this.hp;
  }

  heal(amount) {
    this.hp += amount;
    if (this.hp > 30) this.hp = 30;
  }

  changeProperty(property, amount) {
    this[property] += amount;
  }
}

module.exports = Player;
