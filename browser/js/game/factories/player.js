app.factory('Player', (Minion, Socket, $rootScope) => {
  class Player {
    constructor() {
      this.name = '';
      this.hp = 30;
      this.hand = [];
      this.summonedMinions = [];
      this.turns = 10;
    }

    startTurn(card) {
      this.turns++;
      this.turn = true;
      this.hand.push(card);
      this.mana = this.turns > 10 ? 10 : this.turns;
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
      _(this.summonedMinions).remove(m => m.id === minion.id);
      if (minion.logic.taunt) checkTaunt();
    }

    attacked(attacker) {
      let minion = _.find(this.summonedMinions, m => m.id === attacker.id);
      minion.attacked(attacker.hp);
      if (attacker.hp === 0) _(this.summonedMinions).remove(m => m.id === attacker.id);
      $rootScope.$digest();
    }
    wasAttacked(attackee) {
      if (!attackee.id) return this.hp = attackee.hp;

      let minion = _(this.summonedMinions).find(m => m.id === attackee.id);
      minion.wasAttacked(attackee.hp);
      if (attackee.hp === 0) this.minionDeath(minion);
      $rootScope.$digest();
    }
  }

  return Player;
});
