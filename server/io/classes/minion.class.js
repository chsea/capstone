class Minion {
  constructor(minion, id, player) {
    this.name = minion.name;
    this.id = id;
    this.player = player;
    this.initialHp = minion.hp;
    this.initialAp = minion.ap;
    this.hp = minion.hp;
    this.ap = minion.ap;
    this.logic = minion.logic;
    this.canAttack = false;
    this.attackable = true;

    for (let spell in this.logic) {
      if (this.logic[spell].target && this.logic[spell].target.targets[0] === 'thisMinion') this.logic[spell].target.targets[0] = this.id;
    }
  }

  summoned() {
    if (this.logic.battlecry) this.player.cast(this.logic.battlecry);
  }
  startTurn() {
    if (this.logic.eachTurn) this.player.cast(this.logic.eachTurn);
  }

  attacked(attackee) {
    if (attackee.id) {
      if (this.logic.divineShield && attackee.ap) this.logic.divineShield = false;
      else this.hp -= attackee.ap;
    }
    if (this.hp > 0 && this.hp < this.initialHp && this.logic.enrage) {
      this.player.cast(this.logic.enrage);
      this.enraged = true;
    }
    if (this.hp <= 0) {
      this.hp = 0;
      this.death();
    }
  }
  wasAttacked(amount) {
    if (this.logic.divineShield) this.logic.divineShield = false;
    else this.hp -= amount;
    if (this.hp > 0 && this.hp < this.initialHp && this.logic.enrage) {
      this.player.cast(this.logic.enrage);
      this.enraged = true;
    }
    if (this.hp <= 0) {
      this.hp = 0;
      this.death();
    }
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
      if (amount.equal) this[property] = amount.amount;
      else this[property] += amount.amount;
    }
  }

  death() {
    console.log('death', this.name);
    if (this.logic.deathRattle) this.player.cast(this.logic.deathRattle, this.player);
  }
}

module.exports = Minion;
