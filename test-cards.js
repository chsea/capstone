var minions = [
  {
    name: "Marketing Intern",
    cost: 1,
    ap: 1,
    hp: 1,
    portrait: 'marketing-intern.jpg',
  },
  {
    name: "Fullstack Developer",
    portrait: 'fullstack-developer.jpg',
    cost: 1, //2,
    ap: 2,
    hp: 3
  },
  {
    name: "Rain-Maker",
    portrait: 'rain-maker.jpg',
    cost: 1, //2,
    ap: 2,
    hp: 3,
    logic: {
      charge: true
    }
  },
  {
    name: "Product Owner",
    cost: 1, //4,
    ap: 3,
    hp: 6,
    portrait: 'product-owner.jpg',
    logic: {
      taunt: true
    }
  },
  {
    name: "Solutions Architect",
    cost: 1, //4,
    ap: 6,
    hp: 3,
    portrait: 'solutions-architect.jpg',
    logic: {
      divineShield: true
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
    name: "Nimit Maru",
    cost: 1,
    ap: 10,
    hp: 10,
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
    }
  },
  {
    name: "Distributed Systems Analyst",
    cost: 1,
    ap: 1,
    hp: 10,
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
    name: "Information Security Lead",
    cost: 1,
    ap: 1,
    hp: 1,
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
            amount: 2
          }
        }
      }
    }
  },
  // {
  //   name: "Database Administrator",
  //   cost: 1,
  //   ap: 1,
  //   hp: 1,
  //   portrait: "database-administrator.jpg",
  //   description: "Heal yourself for 2 every turn.",
  //   logic: {
  //     everyTurn: {
  //       target: {
  //         targets: ["self"],
  //         select: "all"
  //       },
  //       spells: {
  //         heal: {
  //           amount: 2
  //         }
  //       }
  //     }
  //   }
  // },
  {
    name: "UI Designer",
    cost: 1,
    ap: 1,
    hp: 1,
    portrait: "ui-designer.jpg"
  }
];

var spells = [
  // {
  //   name: "Bottle Neck",
  //   cost: 1,
  //   portrait: 'bottle-neck.jpg',
  //   description: 'Remove all special properties from your opponent\'s employees.',
  //   logic: {
  //     target: {
  //       targets: ["opponentMinions"],
  //       select: "all"
  //     },
  //     spells: {
  //       changeProperty: {
  //         amount: {
  //           all: true
  //         },
  //         property: 'logic'
  //       }
  //     }
  //   }
  // },
  {
    name: "Branching",
    cost: 1,
    portrait: 'branching.jpg',
    description: 'Give one of your employees charge.',
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
  // {
  //   name: "In The Zone",
  //   cost: 1,
  //   portrait: 'in-the-zone.jpg',
  //   description: "Increases a random employee's attack by 3.",
  //   logic: {
  //     target: {
  //       targets: ["playerMinions"],
  //       select: "random"
  //     },
  //     spells: {
  //       changeProperty: {
  //         amount: 3,
  //         property: 'ap'
  //       }
  //     }
  //   }
  // },
  // {
  //   name: "Technical-Debt",
  //   cost: 1,
  //   portrait: 'technical-debt.jpg',
  //   description: "Changes an employee's health to 1.",
  //   logic: {
  //     target: {
  //       targets: ["playerMinions, opponentMinions"],
  //       select: "selectable"
  //     },
  //     spells: {
  //       changeProperty: {
  //         property: 'hp',
  //         amount: 1
  //       }
  //     }
  //   }
  // },
  {
    name: "Build-Breaker",
    cost: 1,
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
    }
  }
];

module.exports = {
  minions: minions,
  spells: spells
};
