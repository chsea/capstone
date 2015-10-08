app.factory('Player', (Socket, $rootScope) => {
  class Player {
    constructor() {
      this.name = '';
      this.hp = 30;
      this.mana = 0;
      this.summonedMinions = [];
    }

    startTurn(card) {
      this.turn = true;
      this.hand.push(card);
      this.mana++;
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
