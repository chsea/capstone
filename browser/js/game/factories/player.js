app.factory('Player', (Minion, Socket, $rootScope) => {
  class Player {
    constructor() {
      this.name = '';
      this.hp = 30;
      this.hand = [];
      this.summonedMinions = [];
      this.mana = 0;
      this.turns = 0;
      this.attackable = true;
    }

    startTurn(card) {
      this.turns++;
      this.turn = true;
      this.mana = this.turns > 10 ? 10 : this.turns;
      if (card) this.hand.push(card);
      else this.hp--;
      this.summonedMinions.forEach(minion => minion.startTurn());
      $rootScope.$digest();
    }
    opponentTurn() {
      this.checkTaunt();
      $rootScope.$digest();
    }
    endTurn () {
      this.turn = false;
      this.summonedMinions.forEach(minion => minion.endTurn());
    }

    checkTaunt() {
      let taunt = this.summonedMinions.some(minion => minion.logic.taunt);
      this.summonedMinions.forEach(minion => minion.checkTaunt(taunt));
      if (taunt) this.attackable = false;
      else this.attackable = true;
    }

    summoned(card) {
      _.remove(this.hand, handCard => handCard.id === card.id);
      let minion = new Minion(card);

      this.mana -= card.cost;
      this.summonedMinions.push(minion);
      this.checkTaunt();
      $rootScope.$digest();
    }

    minionDeath(minion) {
      minion.death();
      _.remove(this.summonedMinions, m => m.id === minion.id);
      if (minion.logic.taunt) checkTaunt();
    }

    attacked(attacker) {
      let minion = _.find(this.summonedMinions, m => m.id === attacker.id);
      minion.attacked(attacker.hp);
      if (!attacker.hp) this.minionDeath(minion);
      $rootScope.$digest();
    }
    wasAttacked(attackee) {
      if (!attackee.id) this.hp = attackee.hp;
      else {
        let minion = _.find(this.summonedMinions, m => m.id === attackee.id);
        minion.wasAttacked(attackee.hp);
        if (!attackee.hp) this.minionDeath(minion);
      }
      $rootScope.$digest();
    }

    healed(patient) {
      if (!patient.id) this.hp = patient.hp;
      else {
        let minion = _.find(this.summonedMinions, m => m.id === patient.id);
        minion.healed(patient.hp);
      }
      $rootScope.$digest();
    }
  }

  return Player;
});
