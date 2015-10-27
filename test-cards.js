var minions = [
  {
    name: "Marketing Intern",
    cost: 1,
    ap: 1,
    hp: 1,
    portrait: 'marketing-intern.jpg'
  },
  {
    name: "Fullstack Developer",
    portrait: 'fullstack-developer.jpg',
    cost: 2,
    ap: 2,
    hp: 2,
  },
  {
    name: "Rain-Maker",
    portrait: 'rain-maker.jpg',
    cost: 3,
    ap: 2,
    hp: 3,
    logic: {
      charge: true
    }
  },
  {
    name: "Product Owner",
    cost: 5,
    ap: 3,
    hp: 6,
    portrait: 'product-owner.jpg',
    logic: {
      taunt: true
    },
  },
  {
    name: "Solutions Architect",
    cost: 4,
    ap: 2,
    hp: 3,
    portrait: 'solutions-architect.jpg',
    logic: {
      divineShield: true
    }
  },
  {
    name: "Scrum Master",
    cost: 5,
    ap: 3,
    hp: 5,
    rarity: 1,
    portrait: 'scrum-master.jpg',
    logic: {
      windfury: true,
    }
  },
  {
    name: "Nimit Maru",
    cost: 9,
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
    }
  },
  {
    name: "David Yang",
    cost: 9,
    ap: 9,
    hp: 9,
    rarity: 3,
    portrait: "david-yang.jpg",
    logic: {
      taunt: true,
      divineShield: true,
      windfury: true
    }
  },
  {
    name: "QA Specialist",
    cost: 2,
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
    }
  },
  {
    name: "Distributed Sys. Analyst",
    cost: 4,
    ap: 4,
    hp: 4,
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
    }
  },
  {
    name: "Info. Security Lead",
    cost: 3,
    ap: 3,
    hp: 2,
    portrait: "information-security.jpg",
    description: "Severance: deal 2 damage to all opponent employees.",
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
    }
  },
  {
    name: "Database Administrator",
    cost: 6,
    ap: 5,
    hp: 6,
    portrait: "database-administrator.jpg",
    description: "Heal yourself for 2 every turn.",
    logic: {
      eachTurn: {
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
    }
  },
  {
    name: "UI Designer",
    cost: 1,
    ap: 1,
    hp: 1,
    portrait: "ui-designer.jpg"
  }
];

var spells = [
  {
    name: "Bottle Neck",
    cost: 2,
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
    }
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
    }
  },
  {
    name: "In The Zone",
    cost: 2,
    portrait: 'in-the-zone.jpg',
    description: "Increases a random employee's attack by 3.",
    logic: {
      target: {
        targets: ["playerMinions"],
        select: "random",
        qty: 1
      },
      spells: {
        changeProperty: {
          amount: {
            amount: 3
          },
          property: 'ap'
        }
      }
    }
  },
  {
    name: "Technical-Debt",
    cost: 2,
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
          amount: {
            amount: 1,
            equal: true
          }
        }
      }
    }
  },
  {
    name: "Build-Breaker",
    cost: 3,
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
    }
  }
];

module.exports = {
  minions: minions,
  spells: spells
};
