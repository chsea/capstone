const _ = require('lodash');
const Minion = require('./card.class').Minion;

const heal = (targets, amount) => {
  targets.forEach(target => {
    let patient = target.minion ? target.minion : target.player;
    let id = target.minion ? target.minion.id : null;
    patient.heal(amount);
    target.player.emit('healed', {id: id, hp: patient.hp});
    target.player.opponent.emit('opponentHealed', {id: id, hp: patient.hp});
  });
};

const damage = (targets, amount) => {
  targets.forEach(target => {
    let attackee = target.minion ? target.minion : target.player;
    let id = target.minion ? target.minion.id : null;
    attackee.wasAttacked(amount);
    target.player.emit('damaged', {id: id, hp: attackee.hp});
    target.player.opponent.emit('opponentDamaged', {id: id, hp: attackee.hp});

    if (!attackee.hp) {
      if (attackee.id) {
        _.remove(target.player.summonedMinions, minion => minion.id = attackee.id);
      } else {
        target.player.emit('lose');
        target.player.opponent.emit('win');
      }
    }
  });
};

const draw = (targets, amount) => {
  targets.forEach(target => {
    let cards = target.player.draw(amount);
    target.player.emit('drew', cards);
    target.player.opponent.emit('opponentDrew', cards.length);
  });
};

const changeProperty = (targets, amount, property) => {
  targets.forEach(target => {
    let t = target.minion ? target.minion : target.player;
    let id = target.minion ? target.minion.id : null;
    t.changeProperty(property, amount);
    target.player.emit('propertyChanged', {id: id, property: property, amount: t[property]});
    target.player.opponent.emit('opponentPropertyChanged', {id: id, property: property, amount: t[property]});
  });
};

const summon = (targets, amount) => {
  targets.forEach(target => {
    let minion;
    switch (amount.type) {
      case 'new':
        minion = new Minion(amount.minion, dx++);
        break;
      case 'hand':
        minion = _.remove(target.player.hand, handCard => handCard.id === amount.id)[0];
        break;
      case 'deck':
        minion = _.remove(target.player.deck, deckCard => deckCard.id === amount.id)[0];
        break;
    }

    minion.cost = 0;
    target.player.summon(minion);
    target.player.opponent.emit('opponentSummoned', minion);
  });
};

module.exports = {
  heal: heal,
  damage: damage,
  draw: draw,
  changeProperty: changeProperty,
  summon: summon
};
