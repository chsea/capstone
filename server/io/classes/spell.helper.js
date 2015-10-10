const heal = (targets, amount) => {
  targets.forEach(target => {
    if (target.minion) {
      target.minion.healed(amount);
      target.player.emit('healed', {id: target.minion.id, hp: target.minion.hp});
      target.opponent.emit('opponentHealed', {id: target.minion.id, hp: target.minion.hp});
    } else {
      target.player.healed(amount);
      target.player.emit('healed', {id: null, hp: target.player.hp});
      target.opponent.emit('opponentHealed', {id: null, hp: target.player.hp});
    }
  });
};

module.exports = {
  heal: heal
};
