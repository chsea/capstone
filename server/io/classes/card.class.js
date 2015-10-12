const _ = require('lodash');

class Card {
  constructor(card, id) {
    this.name = card.name;
    this.cost = card.cost;
    this.description = card.description;
    this.id = id;
    this.logic = card.logic;
  }
}

class Spell extends Card {
  constructor(card, id) {
    super(card, id);
    this.type = 'spell';
  }
}

class Minion extends Card {
  constructor(card, id) {
    super(card, id);
    this.type = 'minion';
    this.initialHp = card.hp;
    this.initialAp = card.ap;
    this.hp = card.hp;
    this.ap = card.ap;
    this.canAttack = false;
    this.attackable = true;

    let logic = this.logic;
    // console.log('log', logic);
    // console.log('l', logic.prototype);
    for (var x in logic) {
      if(logic.hasOwnProperty( x ) ) console.log('x', x);
    }
  }

  summoned(game) {
    console.log('hi');
    if (this.logic.battlecry) game.cast(this.logic.battlecry);
  }
  startTurn(game) {
    if (this.logic.eachTurn) game.cast(this.logic.eachTurn);
  }

  attacked(attackee, game) {
    if (attackee.id) {
      if (this.logic.divineShield && attackee.ap) this.logic.divineShield = false;
      else this.hp -= attackee.ap;
    }
    if (this.hp > 0 && this.hp < this.initialHp && this.logic.enrage) {
      game.cast(this.logic.enrage);
      this.enraged = true;
    }
    if (this.hp <= 0) {
      this.hp = 0;
      this.death(game);
    }
  }
  wasAttacked(amount, game) {
    if (this.logic.divineShield) this.logic.divineShield = false;
    else this.hp -= amount;
    this.hp = this.hp < 0 ? 0 : this.hp;
  }

  heal(amount) {
    this.hp += amount;
    if (this.hp > this.initialHp) this.hp = this.initialHp;
  }

  changeProperty(property, amount) {
    if (property === 'logic') {
      if (amount.all) this.logic = {};
      else this.logic[amount.property] = amount.amount;
    } else {
      this[property] += amount;
    }
  }

  death(game) {
    if (this.logic.deathRattle) game.cast(this.logic.deathRattle);
  }
}

module.exports = {
  Spell: Spell,
  Minion: Minion
};
