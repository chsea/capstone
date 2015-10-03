class Card {
  constructor(name) {
    this.name = name;
  }
}
class Spell extends Card {
  constructor(name) {
    super(name);
  }
}
class Minion extends Card {
  constructor(name, hp, ap) {
    super(name);
    this.hp = hp;
    this.ap = ap;
  }
}

module.exports = {
  Spell: Spell,
  Minion: Minion
};
