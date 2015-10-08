class Card {
  constructor(card, id) {
    this.name = card.name;
    this.cost = card.cost;
    this.description = card.description;
    this.id = id;
    this.logic = card.logic;
  }
}
class Spell extends Card {
  constructor(card, id) {
    super(card, id);
    this.type = 'spell';
  }
}
class Minion extends Card {
  constructor(card, id) {
    super(card, id);
    this.type = 'minion';
    this.hp = card.hitPoints;
    this.ap = card.attackPoints;
    this.canAttack = false;
    this.attackable = true;
  }
}

module.exports = {
  Spell: Spell,
  Minion: Minion
};
