var minions = [
  {
    name: "Marketing Intern",
    cost: 1,
    ap: 1,
    hp: 1,
    logic: {
      charge: true
      // divineShield: true
    }
  },
  {
    name: "Junior Back-End Engineer",
    cost: 1, //2,
    ap: 1,
    hp: 2,
    logic: {
      charge: true
      // divineShield: true
    }
  },
  {
    name: "Senior Back-End Engineer",
    cost: 1, //4,
    ap: 3,
    hp: 6,
    logic: {
      taunt: true
    }
  },
  {
    name: "Junior Front-End Engineer",
    cost: 1, //2,
    ap: 2,
    hp: 1,
    logic: {
      charge: true
    }
  },
  {
    name: "Senior Front-End Engineer",
    cost: 1, //4,
    ap: 6,
    hp: 3,
    logic: {
      charge: true,
      windfury: true
    }
  },
  {
    name: "Scrum Master",
    cost: 1, //5,
    ap: 5,
    hp: 5,
    rarity: 1,
    logic: {
      charge: true,
      taunt: true,
      // enrage: {
      //   propertyChange: {
      //     target: 'self',
      //     property: 'ap',
      //     amount: 3
      //   }
      // }
    }
  }
];

var spells = [
  {
    name: "Self-Heal",
    cost: 1,
    logic: {
      heal: {
        target: {
          targets: ["self"],
          select: "all"
        },
        amount: 1
      }
    }
  },
  {
    name: "Opponent Heal",
    cost: 1,
    logic: {
      heal: {
        target: {
          targets: ["opponent"],
          select: "all"
        },
        amount: 10
      }
    }
  },
  {
    name: "Opponent Minion Heal",
    cost: 1,
    logic: {
      heal: {
        target: {
          targets: ["opponentMinions"],
          select: "all"
        },
        amount: 1
      }
    }
  },
  {
    name: "Player Minion Heal",
    cost: 1,
    logic: {
      heal: {
        target: {
          targets: ["playerMinions"],
          select: "all"
        },
        amount: 1
      }
    }
  },
  {
    name: "Player + Minion Heal",
    cost: 1,
    logic: {
      heal: {
        target: {
          targets: ["self", "playerMinions"],
          select: "all"
        },
        amount: 10
      }
    }
  },
  {
    name: "Random Player + Minion Heal",
    cost: 1,
    logic: {
      heal: {
        target: {
          targets: ["self", "playerMinions"],
          select: "random",
          qty: 4
        },
        amount: 1
      }
    }
  }
];

module.exports = {
  minions: minions,
  spells: spells
};
