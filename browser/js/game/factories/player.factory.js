app.factory('Player', (Minion, Socket, CardFactory, $rootScope) => {
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

    drew(cards) {
      cards.forEach(card => {
        console.log(`drew - ${card.name}`);
        this.hand.push(card);
        $rootScope.$digest();
      });
    }

    startTurn(card) {
      this.turns++;
      this.turn = true;
      this.mana = this.turns > 10 ? 10 : this.turns;
      this.summonedMinions.forEach(minion => minion.startTurn());
      if (card) this.drew([card]);
      else this.fatigue();
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

    summoned(name) {
      let card = _.find(CardFactory.getAll(), c => c.name === name);
      card.id = card._id;
      if (card.type === "Spell") return;
      let minion = new Minion(card);
      this.summonedMinions.push(minion);
      this.checkTaunt();
      $rootScope.$digest();
    }

    minionDeath(minion) {
      minion.death();
      _.remove(this.summonedMinions, m => m.id === minion.id);
      if (minion.logic.taunt) this.checkTaunt();
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

    propertyChanged(property) {
      if (!property.id) this[property.property] = property.amount;
      else {
        let minion = _.find(this.summonedMinions, m => m.id === property.id);
        minion.propertyChanged(property);
      }
      $rootScope.$digest();
    }

    fatigue() {
      console.log('fatigued');
      this.hp--;
      $rootScope.$digest();
    }
  }

  return Player;
});
