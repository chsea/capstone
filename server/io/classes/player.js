var _ = require('lodash');

class Player {
  constructor(name, deck, socket) {
    this.name = name;
    this.socket = socket;
    this.hp = 100;
    this.deck = deck;
    this.discard = [];
    this.hand = [];
    this.summonedMinions = [];
    this.mana = 9;
  }

  shuffle() {
    this.deck = _.shuffle(this.deck);
    return this.deck;
  }
  draw() {
    let card = this.deck.pop();
    this.hand.push(card);
    return card;
  }

  startTurn() {
    this.mana++;
    this.summonedMinions.forEach(minion => {
      if (!minion.canAttack) minion.canAttack = true;
    });
    return this.draw();
  }

  summonMinion(card) {
    this.summonedMinions.push(card);
    _.remove(this.hand, handCard => handCard.name === card.name);
    this.mana -= card.cost;
  }
}

module.exports = Player;
