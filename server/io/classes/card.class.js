const _ = require('lodash');

class Card {
  constructor(card, id) {
    this.name = card.name;
    this.cost = card.cost;
    this.description = card.description;
    this.id = id;
    this.logic = card.logic;
    this.portrait = card.portrait;
    this.type = card.type;
    this.hp = card.hp;
    this.ap = card.ap;
  }
}

module.exports = Card;
