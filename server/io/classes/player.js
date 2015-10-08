var _ = require('lodash');

class Player {
  constructor(name, deck, socket) {
    this.name = name;
    this.socket = socket;
    this.hp = 30;
    this.deck = deck;
    this.discard = [];
    this.hand = [];
    this.summonedMinions = [];
    this.mana = 10;
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

  startTurn(turn) {
    console.log('start turn');
    let m = Math.ceil(turn / 2);
    this.mana = m > 10 ? 10 : m;
    this.summonedMinions.forEach(minion => {
      if (!minion.canAttack) minion.canAttack = true;
    });
    let card = this.draw();
    this.socket.emit('startTurn', card);
  }

  summonMinion(cardId) {
    let card = _(Player.deck).find(card => card.id = cardId);
    if (card.logic.charge) card.canAttack = true;
    if (card.taunt) {
      this.summonedMinions.forEach(minion => minion.attackable = false);
    }
    this.summonedMinions.push(card);
    _.remove(this.hand, handCard => handCard.name === card.name);
    this.mana -= card.cost;
  }
}

module.exports = Player;
