app.factory('Minion', (Socket, $rootScope) => {
  class Minion {
    constructor(minion) {
      this.name = minion.name;
      this.cost = minion.cost;
      this.description = minion.description;
      this.id = minion.id;
      this.logic = minion.logic;
      this.hp = minion.hp;
      this.ap = minion.ap;
      this.canAttack = false;
      this.attackable = true;
      this.turns = 1;

      if (this.logic.charge) this.canAttack = true;
      if (this.logic.battlecry) return;
    }

    startTurn() {
      this.turns++;
      this.canAttack = true;
      this.attacked = false;
      if (this.logic.everyTurn) return;
    }
    endTurn() {
      if (this.logic.endTurn) return;
    }

    checkTaunt(taunt) {
      if (taunt && !this.logic.taunt) {
        this.attackable = false;
      }
      else this.attackable = true;
    }
    checkCanAttack(prevLogic) {
      if (!prevLogic.charge && this.logic.charge && this.firstTurn) this.canAttack = true;

      if (!prevLogic.windfury && this.logic.windfury && this.attacked) this.canAttack = true;
    }

    death() {
      if (this.logic.deathRattle) return;
    }
    attacked(hp) {
      if (this.logic.windfury && this.canAttack) {
        if (this.attacked) this.canAttack = false;
      }
      else this.canAttack = false;

      this.attacked = true;
      this.hp = hp;
    }
    wasAttacked(hp) {
      if (this.logic.divineShield) this.logic.divineShield = false;
      else this.hp = hp;
    }

    healed(hp) {
      this.hp = hp;
    }

    propertyChanged(property) {
      let prevLogic = this.logic;
      this[property.property] = property.amount;
      checkCanAttack(prevLogic);
    }
  }

  return Minion;
});
