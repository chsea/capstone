var minions = [
  {
    name: "Marketing Intern",
    cost: 1,
    ap: 1,
    hp: 1,
    portrait: 'marketing-intern.jpg',
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
    name: "Steadfast Engineer",
    cost: 1, //4,
    ap: 6,
    hp: 3,
    portrait: 'steadfast-engineer.jpg',
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
    name: "Hackathon Junkie",
    cost: 1,
    ap: 1,
    hp: 1,
    portrait: "hackathon-junkie.jpg",
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
    name: "Overworked Coder",
    cost: 1,
    ap: 1,
    hp: 1,
    portrait: "overworked-coder.jpg",
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
  {
    name: "Database Administrator",
    cost: 1,
    ap: 1,
    hp: 1,
    portrait: "database-administrator.jpg",
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
    }
  }
];

var spells = [
  {
    name: "Burn Out",
    cost: 1,
    portrait: 'burn-out.jpg',
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
    portrait: 'determined.jpg',
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
    portrait: 'in-the-zone.jpg',
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
    portrait: 'demote.jpg',
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
    portrait: 'market-crash.jpg',
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
    portrait: 'test-pass.jpg',
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
