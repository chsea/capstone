class Card {
  constructor(name, cost, description) {
    this.name = name;
    this.cost = cost;
    this.description = description;
  }
}
class Spell extends Card {
  constructor(name, cost, description) {
    super(name, cost, description);
  }
}
class Minion extends Card {
  constructor(name, cost, description, hp, ap) {
    super(name, cost, description);
    this.hp = hp;
    this.ap = ap;
  }
}

module.exports = {
  Spell: Spell,
  Minion: Minion
};
