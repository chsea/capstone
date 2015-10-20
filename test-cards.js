var minions = [
  {
    name: "Marketing Intern",
    cost: 1,
    ap: 1,
    hp: 1,
    portrait: 'marketing-intern.jpg',
    p1Index: 1,
    p2Index: 1
  },
  {
    name: "Fullstack Developer",
    portrait: 'fullstack-developer.jpg',
    cost: 1, //2,
    ap: 2,
    hp: 2,
    p1Index: 2,
    p2Index: 20
  },
  {
    name: "Rain-Maker",
    portrait: 'rain-maker.jpg',
    cost: 2, //2,
    ap: 2,
    hp: 3,
    logic: {
      charge: true
    },
    p1Index: 3,
    p2Index: 20
  },
  {
    name: "Product Owner",
    cost: 3, //4,
    ap: 3,
    hp: 6,
    portrait: 'product-owner.jpg',
    logic: {
      taunt: true
    },
    p2Index: 5,
    p1Index: 5
  },
  {
    name: "Solutions Architect",
    cost: 2, //4,
    ap: 2,
    hp: 3,
    portrait: 'solutions-architect.jpg',
    logic: {
      divineShield: true
    },
    p1Index: 7,
    p2Index: 20
  },
  {
    name: "Scrum Master",
    cost: 3, //5,
    ap: 3,
    hp: 5,
    rarity: 1,
    portrait: 'scrum-master.jpg',
    logic: {
      windfury: true,
    },
    p1Index: 2
  },
  {
    name: "Nimit Maru",
    cost: 4,
    ap: 9,
    hp: 9,
    rarity: 3,
    portrait: "nimit-maru.jpg",
    description: "Inspiration: deal 10 damage to your opponent.",
    logic: {
      charge: true,
      divineShield: true,
      windfury: true,
      battlecry: {
        target: {
          targets: ['opponent'],
          select: 'all'
        },
        spells: {
          damage: {
            amount: 10
          }
        }
      }
    },
    p1Index: 7,
    p2Index: 7
  },
  {
    name: "David Yang",
    cost: 4,
    ap: 9,
    hp: 9,
    rarity: 3,
    portrait: "david-yang.jpg",
    logic: {
      taunt: true,
      divineShield: true,
      windfury: true
    },
    p2Index: 6,
    p1Index: 20
  },
  {
    name: "QA Specialist",
    cost: 1,
    ap: 1,
    hp: 1,
    portrait: "qa-specialist.jpg",
    description: "Inspiration: draw 2 cards.",
    logic: {
      battlecry: {
        target: {
          targets: ["self"],
          select: "all"
        },
        spells: {
          draw: {
            amount: 2
          }
        }
      }
    },
    p1Index: 6,
    p2Index: 20
  },
  {
    name: "Distributed Sys. Analyst",
    cost: 3,
    ap: 4,
    hp: 6,
    portrait: "distributed-systems.jpg",
    description: "Promotion: gain agile.",
    logic: {
      enrage: {
        target: {
          targets: ["thisMinion"],
          select: "all"
        },
        spells: {
          changeProperty: {
            property: 'logic',
            amount: {
              property: "windfury",
              amount: true
            }
          }
        }
      }
    },
    p1Index: 5,
    p2Index: 4,
  },
  {
    name: "Info. Security Lead",
    cost: 4,
    ap: 3,
    hp: 2,
    portrait: "information-security.jpg",
    description: "Severence: deal 2 damage to all opponent employess.",
    logic: {
      deathRattle: {
        target: {
          targets: ["opponentMinions"],
          select: "all"
        },
        spells: {
          damage: {
            amount: 3
          }
        }
      }
    },
    p1Index: 8,
    p2Index: 20
  },
  {
    name: "Database Administrator",
    cost: 7,
    ap: 5,
    hp: 6,
    portrait: "database-administrator.jpg",
    description: "Heal yourself for 2 every turn.",
    logic: {
      everyTurn: {
        target: {
          targets: ["self"],
          select: "all"
        },
        spells: {
          heal: {
            amount: 2
          }
        }
      }
    },
    p1Index: 20,
    p2Index: 20
  },
  {
    name: "UI Designer",
    cost: 1,
    ap: 1,
    hp: 1,
    portrait: "ui-designer.jpg",
    p1Index: 4,
    p2Index: 2
  }
];

var spells = [
  {
    name: "Bottle Neck",
    cost: 4,
    portrait: 'bottle-neck.jpg',
    description: 'Remove all special properties from your opponent\'s employees.',
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
    },
    p2Index: 20,
    p1Index: 20
  },
  {
    name: "Branching",
    cost: 1,
    portrait: 'branching.jpg',
    description: 'Give one of your employees initiative.',
    logic: {
      target: {
        targets: ["playerMinions"],
        select: "selectable"
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
    },
    p2Index: 3,
    p1Index: 20
  },
  {
    name: "In The Zone",
    cost: 5,
    portrait: 'in-the-zone.jpg',
    description: "Increases a random employee's attack by 3.",
    logic: {
      target: {
        targets: ["playerMinions"],
        select: "random"
      },
      spells: {
        changeProperty: {
          amount: 3,
          property: 'ap'
        }
      }
    },
    p2Index: 20,
    p1Index: 20
  },
  {
    name: "Technical-Debt",
    cost: 7,
    portrait: 'technical-debt.jpg',
    description: "Changes an employee's health to 1.",
    logic: {
      target: {
        targets: ["playerMinions, opponentMinions"],
        select: "selectable"
      },
      spells: {
        changeProperty: {
          property: 'hp',
          amount: 1
        }
      }
    },
    p2Index: 20,
    p1Index: 20
  },
  {
    name: "Build-Breaker",
    cost: 6,
    portrait: 'build-breaker.jpg',
    description: "Deal 3 damage to all summoned employees.",
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
    },
    p2Index: 4,
    p1Index: 20
  },
  {
    name: "return test.pass",
    cost: 1,
    portrait: 'test-pass.jpg',
    description: "Deal 30 damage to your opponent",
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
    },
    p1Index: 9,
    p2Index: 20
  }
];

module.exports = {
  minions: minions,
  spells: spells
};
