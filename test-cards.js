var minions = [
  {
    name: "Marketing Intern",
    cost: 1,
    ap: 1,
    hp: 1,
    portrait: 'market-intern.jpg',
  },

  {
    name: "Driven Engineer",
    portrait: 'driven-engineer.jpg',
    cost: 1, //2,
    ap: 2,
    hp: 3,
    logic: {
      charge: true
    }
  },
  {
    name: "Loyal Employee",
    cost: 1, //4,
    ap: 3,
    hp: 6,
    portrait: 'loyal-employee.jpg',
    logic: {
      taunt: true
    }
  },
  {
    name: "Junior Front-End Engineer",
    cost: 1, //2,
    ap: 2,
    hp: 1,
    portrait: 'junior-front-end-engineer.jpg',
    logic: {
      battlecry: {
        target: {
          targets: ['playerMinions'],
          select: 'all',
        },
        spells: {
          heal: {
            amount: 2
          }
        }
      },
      charge: true
    }
  },
  {
    name: "Senior Front-End Engineer",
    cost: 1, //4,
    ap: 6,
    hp: 3,
    // portrait: 'http://www.fullstackacademy.com/img/team/zeke_nierenberg.jpg',
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
    portrait: 'scrum-master.jpg',
    logic: {
      windfury: true,
    }
  },
  {
    name: "David Yang",
    cost: 5,
    ap: 10,
    hp: 10,
    rarity: 3,
    portrait: "david-yang.jpg",
    logic: {
      taunt: true,
      divineShield: true,
      windfury: true
    }
  }
];

var spells = [
  {
    name: "Burn Out",
    cost: 1,
    // portraits: '',
    description: 'Remove all special properties from an employee',
    logic: {
      target: {
        targets: ["opponentMinions"],
        select: "all"
      },
      spells: {
        changeProperty: {
          amount: {
            all: true
          },
          property: 'logic'
        }
      }
    }
  },
  {
    name: "Determined",
    cost: 1,
    // portrait: '',
    description: 'Give an employ charge.',
    logic: {
      target: {
        targets: ["playerMinions"],
        select: "all"
      },
      spells: {
        changeProperty: {
          amount: {
            property: "charge",
            amount: true
          },
          property: 'logic'
        }
      }
    }
  },
  {
    name: "In The Zone",
    cost: 1,
    // portrait: '',
    description: "Increase one of your employee's attack by 3.",
    logic: {
      target: {
        targets: ["playerMinions"],
        select: "selectable"
      },
      spells: {
        changeProperty: {
          amount: 3,
          property: 'ap'
        }
      }
    }
  },
  {
    name: "Demote",
    cost: 1,
    description: "Change an employee's health to 1.",
    logic: {
      target: {
        targets: ["selectable"],
      },
      spells: {
        changeProperty: {
          property: 'hp',
          amount: 1
        }
      }
    }
  },
  {
    name: "Market Crash",
    cost: 1,
    description: "Deal 3 damage to all minions",
    logic: {
      target: {
        targets: ["playerMinions", "opponentMinions"],
        select: "all"
      },
      spells: {
        damage: {
          amount: 3
        }
      }
    }
  },
  {
    name: "return test.pass",
    cost: 1,
    description: "Deal 30 damage to your opponent.",
    logic: {
      target: {
        targets: ["opponent"],
        select: "all"
      },
      spells: {
        damage: {
          amount: 30
        }
      }
    }
  }
];

module.exports = {
  minions: minions,
  spells: spells
};
