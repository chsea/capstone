var _ = require('lodash');

function Player(name, deck, socket) {
  this.name = name;
  this.socket = socket;
  this.hp = 100;
  this.deck = deck;
  this.discard = [];
  this.hand = [];
  this.summonedMinions = [];
}
Player.prototype.shuffle = function() {
  this.deck = _.shuffle(this.deck);
  return this.deck;
};
Player.prototype.draw = function() {
  let card = this.deck.pop();
  this.hand.push(card);
  return card;
};

module.exports = Player;
