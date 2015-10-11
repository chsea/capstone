var _ = require('lodash');

class Player {
  constructor(name, deck, socket) {
    this.name = name;
    this.socket = socket;
    this.socket.turn = false;
    this.hp = 30;
    this.deck = deck;
    this.discard = [];
    this.hand = [];
    this.summonedMinions = [];
    this.mana = 0;
    this.turns = 0;
  }

  emit(socket, ...data) {
    this.socket.emit(socket, ...data);
  }

  shuffle() {
    this.deck = _.shuffle(this.deck);
    return this.deck;
  }
  draw(amount) {
    amount = amount || 1;
    let cards = [];
    while (cards.length < amount) cards.push(this.deck.pop());
    this.hand = this.hand.concat(cards);
    return cards;
  }

  setInitialCards() {
    this.decidingCards = [this.deck.pop(), this.deck.pop(), this.deck.pop()];
    if (!this.socket.turn) this.decidingCards.push(this.deck.pop());
    this.deciding = true;
    this.emit('initialCards', this.decidingCards);
  }
  setInitialHand(rejectedCards) {
    rejectedCards.forEach(i => this.deck.push(this.decidingCards.splice(i, 1)[0]));
    this.shuffle();
    this.hand = this.decidingCards;
    this.deciding = false;
    this.decidingCards = [];

    let l = this.socket.turn ? 3 : 4;
    while (this.hand.length < l) this.draw();
  }
  endInitialWait() {
    this.waiting = false;
    this.emit('setInitialHand', this.hand, this.socket.turn);
  }

  startTurn() {
    console.log('start turn');
    this.waiting = false;
    this.turns++;
    this.mana = this.turns > 10 ? 10 : this.turns;
    // this.summonedMinions.forEach(minion => {
    //   if (!minion.canAttack) minion.canAttack = true;
    // });
    let card;
    if (this.deck.length) card = this.draw()[0];
    else card = null;
    this.emit('startTurn', card);
  }
  wait() {
    this.waiting = true;
    this.emit('wait');
  }

  summon(minion) {
    this.summonedMinions.push(minion);
    minion.summoned();
    this.mana -= minion.cost;
    this.emit('summoned', minion);
  }

  wasAttacked(amount) {
    this.hp -= amount;
    this.hp = this.hp < 0 ? 0 : this.hp;
  }

  healed(amount) {
    this.hp += amount;
    if (this.hp > 30) this.hp = 30;
  }
}

module.exports = Player;
