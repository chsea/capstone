class Card {
  constructor(card, id) {
    this.name = card.name;
    this.cost = card.cost;
    this.description = card.description;
    this.id = id;
  }
}
class Spell extends Card {
  constructor(card) {
    super(card);
    this.type = 'spell';
  }
}
class Minion extends Card {
  constructor(card, id) {
    super(card, id);
    this.type = 'minion';
    this.hp = card.hitPoints;
    this.ap = card.attackPoints;
  }
}

module.exports = {
  Spell: Spell,
  Minion: Minion
};
