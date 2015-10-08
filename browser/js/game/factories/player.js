app.factory('Player', (Socket, $rootScope) => {
  class Player {
    constructor() {
      this.name = '';
      this.hp = 30;
      this.summonedMinions = [];
      this.turns = 10;
    }

    startTurn(card) {
      this.turns++;
      this.turn = true;
      this.hand.push(card);
      this.mana = this.turns > 10 ? 10 : this.turns;
      $rootScope.$digest();
    }

    summoned(card) {
      _.remove(this.hand, handCard => handCard.id === card.id);
      this.mana -= card.cost;
      this.summonedMinions.push(card);
      $rootScope.$digest();
    }
  }

  return Player;
});
