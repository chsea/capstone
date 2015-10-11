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
  }

  summoned() {
    if (this.logic.battlecry) return;
  }

  attacked(attackee) {
    if (attackee.id) {
      if (this.logic.divineShield && attackee.ap) this.logic.divineShield = false;
      else this.hp -= attackee.ap;
    }
    this.hp = this.hp < 0 ? 0 : this.hp;
  }
  wasAttacked(amount) {
    if (this.logic.divineShield) this.logic.divineShield = false;
    else this.hp -= amount;
    this.hp = this.hp < 0 ? 0 : this.hp;
  }

  healed(amount) {
    this.hp += amount;
    if (this.hp > this.initialHp) this.hp = this.initialHp;
  }
}

module.exports = {
  Spell: Spell,
  Minion: Minion
};
