const heal = (targets, amount) => {
  targets.forEach(target => {
    let patient = target.minion ? target.minion : target.player;
    let id = target.minion ? target.minion.id : null;
    patient.healed(amount);
    target.player.emit('healed', {id: id, hp: patient.hp});
    target.opponent.emit('opponentHealed', {id: id, hp: patient.hp});
  });
};

const damage = (targets, amount) => {
  targets.forEach(target => {
    let attackee = target.minion ? target.minion : target.player;
    let id = target.minion ? target.minion.id : null;
    attackee.wasAttacked(amount);
    target.player.emit('damaged', {id: id, hp: attackee.hp});
    target.opponent.emit('opponentDamageed', {id: null, hp: target.player.hp});

    if (!attackee.hp) {
      if (attackee.id) {
        _.remove(target.player.summonedMinions, minion => minion.id = attackee.id);
      } else {
        target.player.emit('lose');
        target.opponent.emit('win');
      }
    }
  });
};

const draw = (targets, amount) => {
  targets.forEach(target => {
    let cards = target.player.draw(amount);
    target.player.emit('drew', cards);
    target.opponent.emit('opponentDrew', cards.length);
  });
};

module.exports = {
  heal: heal,
  damage: damage
};
