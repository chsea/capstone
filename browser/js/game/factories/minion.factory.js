app.factory('Minion', (Socket, $rootScope, $timeout) => {
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
      this.portrait = minion.portrait;
      this.type = "minion";

      if (this.logic.charge) this.canAttack = true;
    }

    startTurn() {
      this.turns++;
      this.canAttack = true;
      this.hasAttacked = false;
      if (this.logic.everyTurn) return;
    }
    endTurn() {
    }

    checkTaunt(taunt) {
      if (taunt && !this.logic.taunt) {
        this.attackable = false;
      }
      else this.attackable = true;
    }
    checkCanAttack(prevLogic) {
      if (!prevLogic.charge && this.logic.charge && this.turns === 1) this.canAttack = true;

      if (!prevLogic.windfury && this.logic.windfury && this.hasAttacked) this.canAttack = true;
    }

    death() {
      this.dying = true;
      $rootScope.$digest();
    }
    attacked(hp) {
      if (this.logic.windfury && this.canAttack) {
        if (this.hasAttacked) this.canAttack = false;
      }
      else this.canAttack = false;

      this.hasAttacked = true;
      this.hp = hp;
    }
    wasAttacked(hp) {
      this.beingAttacked = true;
      if (this.logic.divineShield) this.logic.divineShield = false;
      else this.hp = hp;
    }

    healed(hp) {
      this.hp = hp;
    }

    propertyChanged(property) {
      let prevLogic = this.logic;
      this[property.property] = property.amount;
      this.checkCanAttack(prevLogic);
    }
  }

  return Minion;
});
